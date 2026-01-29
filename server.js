const express = require('express');
const { google } = require('googleapis');
const twilio = require('twilio');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Google Calendar Setup
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.REDIRECT_URI
);

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

// Twilio Setup
const twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

// Store for scheduled reminders (in production, use Redis or database)
const scheduledReminders = new Map();

// OAuth Routes
app.get('/auth/google', (req, res) => {
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/calendar']
    });
    res.redirect(authUrl);
});

app.get('/oauth/callback', async (req, res) => {
    const { code } = req.query;
    
    try {
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);
        
        // In production, save tokens to database with user ID
        // For now, send to frontend to store
        res.send(`
            <html>
                <body>
                    <h2>Calendar Connected Successfully!</h2>
                    <p>You can close this window and return to Echo Schedule.</p>
                    <script>
                        localStorage.setItem('googleTokens', '${JSON.stringify(tokens)}');
                        setTimeout(() => window.close(), 2000);
                    </script>
                </body>
            </html>
        `);
    } catch (error) {
        console.error('OAuth error:', error);
        res.status(500).send('Authentication failed');
    }
});

// Calendar Routes
app.post('/api/events', async (req, res) => {
    const { summary, description, start, end, attendees } = req.body;
    
    try {
        const event = await calendar.events.insert({
            calendarId: 'primary',
            resource: {
                summary,
                description,
                start: { dateTime: start },
                end: { dateTime: end },
                attendees: attendees ? attendees.map(email => ({ email })) : []
            }
        });
        
        // Schedule reminder call
        await scheduleReminder(event.data);
        
        res.json({ success: true, event: event.data });
    } catch (error) {
        console.error('Calendar error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/events/today', async (req, res) => {
    const now = new Date();
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59);
    
    try {
        const response = await calendar.events.list({
            calendarId: 'primary',
            timeMin: now.toISOString(),
            timeMax: endOfDay.toISOString(),
            singleEvents: true,
            orderBy: 'startTime'
        });
        
        res.json({ events: response.data.items || [] });
    } catch (error) {
        console.error('Calendar error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/events/week', async (req, res) => {
    const now = new Date();
    const endOfWeek = new Date(now);
    endOfWeek.setDate(endOfWeek.getDate() + 7);
    
    try {
        const response = await calendar.events.list({
            calendarId: 'primary',
            timeMin: now.toISOString(),
            timeMax: endOfWeek.toISOString(),
            singleEvents: true,
            orderBy: 'startTime'
        });
        
        res.json({ events: response.data.items || [] });
    } catch (error) {
        console.error('Calendar error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.patch('/api/events/:eventId', async (req, res) => {
    const { eventId } = req.params;
    const { start, end } = req.body;
    
    try {
        // Get existing event
        const existingEvent = await calendar.events.get({
            calendarId: 'primary',
            eventId: eventId
        });
        
        // Update with new times
        const updatedEvent = await calendar.events.update({
            calendarId: 'primary',
            eventId: eventId,
            resource: {
                ...existingEvent.data,
                start: { dateTime: start },
                end: { dateTime: end }
            }
        });
        
        // Reschedule reminder
        cancelReminder(eventId);
        await scheduleReminder(updatedEvent.data);
        
        res.json({ success: true, event: updatedEvent.data });
    } catch (error) {
        console.error('Calendar error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/events/:eventId', async (req, res) => {
    const { eventId } = req.params;
    
    try {
        await calendar.events.delete({
            calendarId: 'primary',
            eventId: eventId
        });
        
        // Cancel scheduled reminder
        cancelReminder(eventId);
        
        res.json({ success: true });
    } catch (error) {
        console.error('Calendar error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Twilio Reminder Call Functions
async function scheduleReminder(event) {
    const meetingTime = new Date(event.start.dateTime || event.start.date);
    const reminderTime = new Date(meetingTime.getTime() - 45 * 60000); // 45 min before
    const delay = reminderTime.getTime() - Date.now();
    
    if (delay > 0) {
        console.log(`Scheduling reminder for ${event.summary} at ${reminderTime}`);
        
        const timeoutId = setTimeout(() => {
            makeReminderCall(event);
        }, delay);
        
        scheduledReminders.set(event.id, timeoutId);
    } else {
        console.log('Meeting time has passed, skipping reminder');
    }
}

function cancelReminder(eventId) {
    const timeoutId = scheduledReminders.get(eventId);
    if (timeoutId) {
        clearTimeout(timeoutId);
        scheduledReminders.delete(eventId);
        console.log(`Cancelled reminder for event ${eventId}`);
    }
}

async function makeReminderCall(event) {
    try {
        const publicUrl = process.env.PUBLIC_URL || 'http://localhost:3000';
        
        console.log(`Making reminder call for: ${event.summary}`);
        
        const call = await twilioClient.calls.create({
            from: process.env.TWILIO_PHONE_NUMBER,
            to: process.env.USER_PHONE_NUMBER,
            url: `${publicUrl}/reminder-call/${event.id}`,
            method: 'GET',
            statusCallback: `${publicUrl}/call-status`,
            statusCallbackMethod: 'POST'
        });
        
        console.log('Twilio call initiated:', call.sid);
        return call;
    } catch (error) {
        console.error('Twilio error:', error);
        throw error;
    }
}

// Twilio Call Flow (TwiML response)
app.get('/reminder-call/:eventId', async (req, res) => {
    const { eventId } = req.params;
    
    try {
        // Fetch event details
        const event = await calendar.events.get({
            calendarId: 'primary',
            eventId: eventId
        });
        
        const meetingTitle = event.data.summary || 'your meeting';
        const meetingTime = new Date(event.data.start.dateTime || event.data.start.date);
        const timeStr = meetingTime.toLocaleTimeString('en-SG', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        });
        
        const publicUrl = process.env.PUBLIC_URL || 'http://localhost:3000';
        
        // TwiML for interactive voice response
        const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say voice="alice" language="en-SG">
        Hello, this is Echo Schedule calling. You have a meeting titled ${meetingTitle} at ${timeStr}.
    </Say>
    <Pause length="1"/>
    <Gather action="${publicUrl}/reminder-response/${eventId}" method="POST" numDigits="1" timeout="10">
        <Say voice="alice" language="en-SG">
            Press 1 if you can make it, press 2 to reschedule, or press 3 to cancel the meeting.
        </Say>
    </Gather>
    <Say voice="alice" language="en-SG">
        I did not receive your response. Please check your Echo Schedule app. Goodbye.
    </Say>
</Response>`;
        
        res.type('text/xml');
        res.send(twiml);
    } catch (error) {
        console.error('Error generating TwiML:', error);
        
        // Fallback TwiML
        const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say voice="alice" language="en-SG">
        This is Echo Schedule calling. You have an upcoming meeting. Please check your calendar app.
    </Say>
</Response>`;
        
        res.type('text/xml');
        res.send(twiml);
    }
});

app.post('/reminder-response/:eventId', async (req, res) => {
    const { eventId } = req.params;
    const digit = req.body.Digits;
    
    console.log(`User pressed: ${digit} for event ${eventId}`);
    
    let twiml = '';
    
    try {
        if (digit === '1') {
            // Confirmed
            twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say voice="alice" language="en-SG">
        Great! See you at the meeting. Goodbye.
    </Say>
</Response>`;
        } else if (digit === '2') {
            // Reschedule
            twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say voice="alice" language="en-SG">
        Okay, I will help you reschedule. Please check your Echo Schedule app to choose a new time. Goodbye.
    </Say>
</Response>`;
            // TODO: Trigger reschedule flow in app via webhook/notification
        } else if (digit === '3') {
            // Cancel meeting
            await calendar.events.delete({
                calendarId: 'primary',
                eventId: eventId
            });
            
            twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say voice="alice" language="en-SG">
        Meeting cancelled. I will notify the participants. Goodbye.
    </Say>
</Response>`;
            // TODO: Trigger notification to attendees
        } else {
            // Invalid input
            twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say voice="alice" language="en-SG">
        Invalid option. Please check your Echo Schedule app. Goodbye.
    </Say>
</Response>`;
        }
    } catch (error) {
        console.error('Error handling response:', error);
        twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say voice="alice" language="en-SG">
        There was an error processing your request. Please check your Echo Schedule app. Goodbye.
    </Say>
</Response>`;
    }
    
    res.type('text/xml');
    res.send(twiml);
});

// Call status callback
app.post('/call-status', (req, res) => {
    const { CallSid, CallStatus, Duration } = req.body;
    console.log(`Call ${CallSid} status: ${CallStatus}, duration: ${Duration}s`);
    res.sendStatus(200);
});

// Manual test endpoint
app.post('/api/test-call', async (req, res) => {
    const { phoneNumber, message } = req.body;
    
    try {
        const publicUrl = process.env.PUBLIC_URL || 'http://localhost:3000';
        
        const call = await twilioClient.calls.create({
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phoneNumber || process.env.USER_PHONE_NUMBER,
            url: `${publicUrl}/test-twiml?message=${encodeURIComponent(message || 'This is a test call from Echo Schedule')}`,
            method: 'GET'
        });
        
        res.json({ success: true, callSid: call.sid });
    } catch (error) {
        console.error('Test call error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/test-twiml', (req, res) => {
    const message = req.query.message || 'This is a test call';
    
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say voice="alice" language="en-SG">${message}</Say>
</Response>`;
    
    res.type('text/xml');
    res.send(twiml);
});

// WhatsApp notification helper
app.post('/api/notify/whatsapp', (req, res) => {
    const { phone, message } = req.body;
    const whatsappUrl = `https://wa.me/${phone.replace(/\+/g, '')}?text=${encodeURIComponent(message)}`;
    res.json({ url: whatsappUrl });
});

// SMS notification helper  
app.post('/api/notify/sms', (req, res) => {
    const { phone, message } = req.body;
    const smsUrl = `sms:${phone}?body=${encodeURIComponent(message)}`;
    res.json({ url: smsUrl });
});

// Health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        twilio: !!process.env.TWILIO_ACCOUNT_SID,
        google: !!process.env.GOOGLE_CLIENT_ID
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Echo Schedule backend running on port ${PORT}`);
    console.log(`🔗 Public URL: ${process.env.PUBLIC_URL || 'http://localhost:3000'}`);
    console.log(`📞 Twilio configured: ${!!process.env.TWILIO_ACCOUNT_SID}`);
    console.log(`📅 Google Calendar configured: ${!!process.env.GOOGLE_CLIENT_ID}`);
});
