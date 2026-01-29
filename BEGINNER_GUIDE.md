# 🎯 Complete Beginner's Guide to Echo Schedule
## For Non-Technical Users - Step by Step

This guide assumes you have **zero coding experience**. Follow every step exactly as written.

---

## 📋 What You'll Need

Before starting, make sure you have:

- ✅ A computer (Windows, Mac, or Linux)
- ✅ A Singapore phone number (+65)
- ✅ A Google account (Gmail)
- ✅ Internet connection
- ✅ About 1-2 hours of time

**Cost**: SGD 3-10 per month after free trial

---

## Part 1: Install Required Software (30 minutes)

### Step 1.1: Install Node.js

Node.js lets you run the backend server.

#### For Windows:

1. **Open your web browser**
2. **Go to**: https://nodejs.org
3. **Click the big green button** that says "Download Node.js (LTS)"
4. **Wait for download** (about 30 MB)
5. **Find the downloaded file** (usually in "Downloads" folder)
   - File name: `node-v20.xx.x-x64.msi`
6. **Double-click the file** to install
7. **Click "Next"** on all screens (keep default settings)
8. **Click "Install"**
9. **Wait 2-3 minutes** for installation
10. **Click "Finish"**

#### For Mac:

1. **Open your web browser**
2. **Go to**: https://nodejs.org
3. **Click the big green button** that says "Download Node.js (LTS)"
4. **Wait for download** (about 80 MB)
5. **Find the downloaded file** (in "Downloads" folder)
   - File name: `node-v20.xx.x.pkg`
6. **Double-click the file**
7. **Click "Continue"** on all screens
8. **Enter your Mac password** when asked
9. **Wait 2-3 minutes** for installation
10. **Click "Close"**

#### Verify Installation:

**Windows:**
1. Press `Windows Key + R`
2. Type `cmd` and press Enter
3. A black window appears (Command Prompt)
4. Type: `node --version`
5. Press Enter
6. You should see: `v20.xx.x` (version number)

**Mac:**
1. Press `Command + Space`
2. Type `terminal` and press Enter
3. A window appears (Terminal)
4. Type: `node --version`
5. Press Enter
6. You should see: `v20.xx.x` (version number)

✅ **If you see a version number, Node.js is installed correctly!**

---

### Step 1.2: Install a Code Editor (Optional but Recommended)

A code editor helps you edit configuration files easily.

1. **Go to**: https://code.visualstudio.com
2. **Click "Download"** (big blue button)
3. **Download for your system** (Windows/Mac)
4. **Install like any normal program** (click Next, Next, Install)
5. **Open VS Code** after installation

✅ **VS Code is installed!**

---

### Step 1.3: Download Echo Schedule Files

1. **Download all the files** I provided to you earlier:
   - `echo-schedule.html`
   - `server.js`
   - `package.json`
   - `.env.example`
   - `README.md`
   - `TWILIO_SETUP_GUIDE.md`

2. **Create a new folder** on your Desktop:
   - **Windows**: Right-click on Desktop → New → Folder
   - **Mac**: Right-click on Desktop → New Folder
   - **Name it**: `EchoSchedule`

3. **Move all downloaded files** into this `EchoSchedule` folder

4. **Your folder should contain**:
   ```
   EchoSchedule/
   ├── echo-schedule.html
   ├── server.js
   ├── package.json
   ├── .env.example
   ├── README.md
   └── TWILIO_SETUP_GUIDE.md
   ```

---

## Part 2: Set Up Twilio Account (20 minutes)

Twilio will handle the phone call reminders.

### Step 2.1: Create Twilio Account

1. **Open browser** and go to: https://www.twilio.com/try-twilio

2. **Fill in the form**:
   - **First Name**: Your first name
   - **Last Name**: Your last name
   - **Email**: Your email address
   - **Password**: Create a strong password (write it down!)

3. **Select Singapore**:
   - In the dropdown, find and select: **Singapore (+65)**

4. **Enter your Singapore phone number**:
   - Example: `98765432` (no +65, no spaces)

5. **Check the boxes**:
   - ✅ I'm not a robot
   - ✅ I agree to Twilio's Terms

6. **Click "Start your free trial"**

### Step 2.2: Verify Your Phone Number

1. **Check your phone** for an SMS from Twilio
2. You'll receive a **6-digit code**
3. **Enter the code** on the Twilio website
4. **Click "Submit"**

### Step 2.3: Complete the Survey

Twilio asks what you're building:

1. **Which Twilio product are you here to use?**
   - Select: **Voice**

2. **What do you plan to build with Twilio?**
   - Select: **Alerts and Notifications**

3. **How do you want to build with Twilio?**
   - Select: **With code**

4. **What is your preferred coding language?**
   - Select: **Node.js**

5. **Would you like Twilio to host your code?**
   - Select: **No, I'll use my own hosting service**

6. **Click "Get Started with Twilio"**

### Step 2.4: Get Your Credentials

You'll now see the **Twilio Console Dashboard**.

1. **Look for "Account Info"** on the right side
2. You'll see two important values:

   **Account SID**: 
   - Looks like: `ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - **Click the "Copy" icon** next to it

   **Auth Token**:
   - Initially hidden (shows dots: `••••••••`)
   - **Click the "eye" icon** to reveal it
   - Looks like: `abcd1234efgh5678ijkl9012mnop3456`
   - **Click the "Copy" icon** next to it

3. **Save these somewhere safe**:
   - Open Notepad (Windows) or TextEdit (Mac)
   - Paste both values:
     ```
     Account SID: ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
     Auth Token: abcd1234efgh5678ijkl9012mnop3456
     ```
   - Save this file as `twilio-credentials.txt` in your EchoSchedule folder

### Step 2.5: Get a Phone Number (Trial)

During trial, you get a **free US phone number** for testing.

1. In the Twilio Console, **look at the top menu**
2. Click: **# Phone Numbers**
3. Click: **Manage** → **Active numbers**
4. You'll see your **trial phone number** listed
   - Example: `+1 555 987 6543`
5. **Copy this number** and save it:
   ```
   My Twilio Number: +15559876543
   ```

**Note**: This is a US number. After upgrading (costs money), you can buy a Singapore +65 number for SGD 2-3/month.

### Step 2.6: Verify Your Personal Number (Important!)

During trial, Twilio can **only call verified numbers**.

1. In Twilio Console, click: **Phone Numbers** → **Manage** → **Verified Caller IDs**
2. Click: **+ Add a new number**
3. Select: **Call you to verify**
4. Enter your Singapore number: `+6598765432` (with +65)
5. Click: **Call this number**
6. **Answer your phone** (it will ring immediately)
7. You'll hear: "Please enter your verification code"
8. **Look at the Twilio website** - it shows a code like `123-456`
9. **Enter the code** on your phone keypad: `1` `2` `3` `4` `5` `6`
10. You'll hear: "Your phone number has been verified"
11. **Hang up**

✅ **Your phone number is now verified!**

Save it:
```
My Verified Number: +6598765432
```

---

## Part 3: Set Up Google Calendar (15 minutes)

### Step 3.1: Create Google Cloud Project

1. **Go to**: https://console.cloud.google.com
2. **Sign in** with your Google account (Gmail)
3. At the top, you'll see: **"Select a project"**
4. **Click** on it
5. A popup appears
6. **Click**: "NEW PROJECT" (top right of popup)
7. **Project name**: Type `EchoSchedule`
8. **Click**: "CREATE"
9. **Wait 10-20 seconds** while Google creates your project
10. You'll see a notification: "Project created"

### Step 3.2: Enable Google Calendar API

1. In the search bar at the top, type: `Calendar API`
2. Press Enter
3. **Click**: "Google Calendar API" (first result)
4. **Click**: "ENABLE" (big blue button)
5. Wait 5-10 seconds
6. You'll see: "API enabled"

### Step 3.3: Create OAuth Credentials

This allows your app to access your calendar.

1. On the left menu, **click**: "Credentials"
2. If you see a yellow box saying "To create credentials, you must first configure consent screen":
   - **Click**: "CONFIGURE CONSENT SCREEN"
   - Select: **External** (radio button)
   - **Click**: "CREATE"
   
   **Fill in the form**:
   - **App name**: `EchoSchedule`
   - **User support email**: Select your email from dropdown
   - **Developer contact email**: Type your email
   - **Click**: "SAVE AND CONTINUE"
   
   **Scopes page**:
   - **Click**: "ADD OR REMOVE SCOPES"
   - In the filter box, type: `calendar`
   - **Check the box** next to: `Google Calendar API` → `.../auth/calendar`
   - **Click**: "UPDATE"
   - **Click**: "SAVE AND CONTINUE"
   
   **Test users page**:
   - **Click**: "ADD USERS"
   - **Enter your email**: your.email@gmail.com
   - **Click**: "ADD"
   - **Click**: "SAVE AND CONTINUE"
   
   **Summary page**:
   - **Click**: "BACK TO DASHBOARD"

3. Now **create the credentials**:
   - On the left menu, click: "Credentials"
   - At the top, click: **"+ CREATE CREDENTIALS"**
   - Select: **"OAuth client ID"**
   
   **Fill in**:
   - **Application type**: Web application
   - **Name**: `EchoSchedule Web`
   
   **Authorized redirect URIs**:
   - Click: "ADD URI"
   - Enter: `http://localhost:3000/oauth/callback`
   - **Click**: "CREATE"

4. **A popup appears** with your credentials:
   - **Client ID**: `123456789-abc.apps.googleusercontent.com`
   - **Client Secret**: `GOCSPX-xxxxxxxxxxxx`
   
5. **Copy both** and save them:
   - Open your `twilio-credentials.txt` file
   - Add these lines:
     ```
     Google Client ID: 123456789-abc.apps.googleusercontent.com
     Google Client Secret: GOCSPX-xxxxxxxxxxxx
     ```
   - Save the file

✅ **Google Calendar is set up!**

---

## Part 4: Configure the Application (10 minutes)

### Step 4.1: Create .env File

1. **Open VS Code** (or any text editor)
2. **Open your EchoSchedule folder**:
   - File → Open Folder → Select `EchoSchedule` folder
3. **Find the file**: `.env.example`
4. **Right-click** on it → **Rename** → Change to: `.env` (remove the `.example`)
5. **Double-click** to open `.env`

6. **Fill in your credentials**:

```bash
# Google Calendar API Credentials
GOOGLE_CLIENT_ID=paste_your_client_id_here
GOOGLE_CLIENT_SECRET=paste_your_client_secret_here
REDIRECT_URI=http://localhost:3000/oauth/callback

# Twilio Credentials
TWILIO_ACCOUNT_SID=paste_your_account_sid_here
TWILIO_AUTH_TOKEN=paste_your_auth_token_here
TWILIO_PHONE_NUMBER=paste_your_twilio_number_here

# Your Phone Number (with +65)
USER_PHONE_NUMBER=+6598765432

# Server Configuration
PORT=3000
NODE_ENV=development
PUBLIC_URL=http://localhost:3000
```

**Example of filled values**:
```bash
GOOGLE_CLIENT_ID=123456789-abc.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abcd1234efgh5678
REDIRECT_URI=http://localhost:3000/oauth/callback

TWILIO_ACCOUNT_SID=AC1234567890abcdef1234567890abcdef
TWILIO_AUTH_TOKEN=abcd1234efgh5678ijkl9012mnop3456
TWILIO_PHONE_NUMBER=+15559876543

USER_PHONE_NUMBER=+6598765432

PORT=3000
NODE_ENV=development
PUBLIC_URL=http://localhost:3000
```

7. **Save the file**: Press `Ctrl+S` (Windows) or `Cmd+S` (Mac)

✅ **Configuration complete!**

---

## Part 5: Install Dependencies (5 minutes)

### Step 5.1: Open Terminal/Command Prompt in Your Folder

**Windows:**
1. **Open File Explorer**
2. **Navigate** to your `EchoSchedule` folder on Desktop
3. **Click on the address bar** at the top (where it shows the folder path)
4. **Type**: `cmd` and press Enter
5. A black window (Command Prompt) opens **in your folder**

**Mac:**
1. **Open Finder**
2. **Navigate** to your `EchoSchedule` folder on Desktop
3. **Right-click** on the folder
4. Hold **Option key** and you'll see: "Copy "EchoSchedule" as Pathname"
5. **Click** it
6. **Open Terminal**: Press `Cmd+Space`, type `terminal`, press Enter
7. Type: `cd ` (cd space) and then press `Cmd+V` to paste the path
8. Press Enter

### Step 5.2: Install Node Packages

In the terminal/command prompt window:

1. **Type exactly**: 
   ```bash
   npm install
   ```

2. **Press Enter**

3. **Wait 1-2 minutes** while it downloads everything

4. You'll see lots of text scrolling by - **this is normal!**

5. When it finishes, you'll see:
   ```
   added 234 packages in 45s
   ```

✅ **All software packages installed!**

**Don't close this terminal/command prompt window** - you'll need it next.

---

## Part 6: Start the Backend Server (2 minutes)

Still in the same terminal/command prompt window:

1. **Type exactly**:
   ```bash
   npm start
   ```

2. **Press Enter**

3. You should see:
   ```
   ✅ Echo Schedule backend running on port 3000
   🔗 Public URL: http://localhost:3000
   📞 Twilio configured: true
   📅 Google Calendar configured: true
   ```

4. **If you see "true" for both** ✅ Everything is working!

5. **Leave this window open** - your server is running!
   - To stop the server: Press `Ctrl+C`
   - To start again: Type `npm start`

---

## Part 7: Open the Web App (2 minutes)

### Step 7.1: Open the HTML File

1. **Open File Explorer** (Windows) or **Finder** (Mac)
2. **Navigate** to your `EchoSchedule` folder
3. **Find** the file: `echo-schedule.html`
4. **Double-click** it

Your **default web browser** opens with the Echo Schedule app!

**Important**: Use **Chrome** or **Edge** browser for best results. Safari may not work well with voice recognition.

If it opens in the wrong browser:
- **Right-click** on `echo-schedule.html`
- Select: **"Open with"** → Choose **Chrome** or **Edge**

---

## Part 8: Connect Your Accounts (5 minutes)

### Step 8.1: Connect Google Calendar

1. In the Echo Schedule web app, **click the Settings icon** (⚙️) in the top right
2. **Click**: "Connect Calendar" button
3. A new tab opens asking: **"Choose an account"**
4. **Select your Google account**
5. You'll see: "EchoSchedule wants to access your Google Account"
6. **Click**: "Continue"
7. You might see a warning: "Google hasn't verified this app"
   - **Click**: "Advanced"
   - **Click**: "Go to EchoSchedule (unsafe)" 
   - (Don't worry - this is YOUR app, it's safe!)
8. **Review permissions**: "See, edit, share, and permanently delete all calendars"
9. **Click**: "Continue"
10. New page says: **"Calendar Connected Successfully!"**
11. **Close this tab**
12. **Go back** to Echo Schedule tab

✅ **Google Calendar connected!**

### Step 8.2: Enter Twilio Credentials in App

Still in Settings:

1. **Scroll down** to "Twilio Account" section
2. **Fill in**:
   - **Account SID**: Paste your Twilio Account SID
   - **Auth Token**: Paste your Twilio Auth Token
   - **Singapore Number**: Paste your Twilio phone number (e.g., `+15559876543`)
3. **Scroll down** to "Your Phone Number"
4. **Enter**: Your verified Singapore number (e.g., `+6598765432`)
5. **Reminder Time**: Leave as "45 minutes before" (or change if you want)
6. **Click**: "Save Settings" at the bottom

You should see **green dots** (●) next to both "Google Calendar" and "Twilio Account"

✅ **All connections active!**

---

## Part 9: Test the Voice Assistant (5 minutes)

### Step 9.1: Test Voice Commands

1. **Close Settings** (click X or click outside the settings panel)
2. You'll see a big orange **microphone button** in the center
3. **Click the microphone button**
4. Your browser asks: **"Allow echo-schedule.html to use your microphone?"**
   - **Click**: "Allow"
5. The button starts glowing and pulsing
6. **Speak clearly**: 
   > "Schedule a meeting with John tomorrow at 3pm"

7. **Wait** for it to process (2-3 seconds)
8. You'll see:
   - Your words written out (transcript)
   - Assistant's response
   - Buttons to notify via WhatsApp/SMS

### Step 9.2: Test a Phone Call (Optional)

**Important**: During Twilio trial, this only works with your verified number!

1. **In terminal**, type:
   ```bash
   curl -X POST http://localhost:3000/api/test-call \
   -H "Content-Type: application/json" \
   -d '{"message":"This is a test call from Echo Schedule"}'
   ```

2. **Press Enter**

3. **Your phone should ring within 5 seconds!**

4. **Answer** the call

5. You'll hear: "This is a test call from Echo Schedule"

✅ **Phone calls working!**

---

## Part 10: Using Echo Schedule Daily

### How to Start It Every Day

**Every time you want to use Echo Schedule:**

1. **Open Terminal/Command Prompt** in your EchoSchedule folder (see Step 5.1)
2. **Type**: `npm start` and press Enter
3. **Open** `echo-schedule.html` in your browser
4. **Start talking** to your calendar!

### Voice Commands You Can Use

**Create meetings:**
- "Schedule a meeting with Sarah tomorrow at 2pm"
- "Set up a call with David on Friday at 10am"
- "Create a meeting with the team next Monday at 9am"

**Cancel meetings:**
- "Cancel my 3pm meeting today"
- "Delete my meeting with John tomorrow"

**Check schedule:**
- "What meetings do I have today?"
- "Show me tomorrow's schedule"
- "What's on my calendar?"

**Reschedule:**
- "Move my 2pm meeting to 4pm"
- "Reschedule tomorrow's 10am to 11am"

### How Phone Reminders Work

**45 minutes before each meeting:**

1. Your phone rings
2. You hear: "This is Echo Schedule. You have a meeting with John at 3pm."
3. "Press 1 to confirm, 2 to reschedule, or 3 to cancel"
4. **Press**:
   - **1** = Going to the meeting ✅
   - **2** = Need to reschedule 🔄
   - **3** = Cancel the meeting ❌
5. Done!

---

## 🚨 Troubleshooting

### Problem: "npm is not recognized" (Windows)

**Solution:**
1. Close terminal
2. Restart your computer
3. Open terminal again
4. Try `npm install` again

### Problem: "command not found: npm" (Mac)

**Solution:**
1. Node.js didn't install correctly
2. Go back to Step 1.1 and reinstall Node.js
3. Make sure to enter your Mac password when asked

### Problem: Microphone not working

**Solution:**
1. Use **Chrome** or **Edge** browser (not Safari)
2. Click the microphone icon in your browser's address bar
3. Select "Always allow" for microphone access
4. Refresh the page

### Problem: "Calendar Connected" but no green dot

**Solution:**
1. Click Settings again
2. Scroll down
3. Click "Save Settings" again
4. The green dot should appear

### Problem: Phone doesn't ring during test

**Solution:**
1. Check your phone isn't on Do Not Disturb mode
2. Make sure you entered your number with +65: `+6598765432`
3. During trial, you can ONLY call your verified number
4. Verify your number again in Twilio Console (Step 2.6)

### Problem: "Unable to create record: The number is unverified"

**Solution:**
- You're trying to call an unverified number during trial
- Go to Twilio Console → Phone Numbers → Verified Caller IDs
- Add and verify the number you want to call
- OR upgrade your Twilio account (requires payment)

---

## 💰 Costs After Free Trial

### Twilio Trial

- **Free credits**: $15 USD (about SGD 20)
- **Enough for**: ~1000 phone calls
- **Limitation**: Can only call verified numbers
- **No credit card needed**

### After Trial (When You Upgrade)

| Item | Cost |
|------|------|
| Singapore phone number | SGD 2-3/month |
| Each phone call (30 sec) | SGD 0.007 |
| Google Calendar | FREE forever |

**Example Monthly Cost:**
- 5 meetings per day = 150 calls/month
- 150 calls × SGD 0.007 = SGD 1.05
- Plus phone number: SGD 2-3
- **Total: SGD 3-4/month** 💸

---

## 🎉 You're Done!

Congratulations! You now have a **voice-powered calendar assistant** that:

✅ Understands your voice  
✅ Manages your Google Calendar  
✅ Calls you before meetings  
✅ Helps you notify others via WhatsApp/SMS  

### Daily Usage Checklist

Every day:
1. ☐ Open terminal in EchoSchedule folder
2. ☐ Type `npm start` and press Enter
3. ☐ Open `echo-schedule.html` in Chrome/Edge
4. ☐ Click microphone and speak!

### Need More Help?

- **Read**: TWILIO_SETUP_GUIDE.md for detailed Twilio info
- **Read**: README.md for technical details
- **Check**: Twilio Console → Logs → Calls to see call history
- **Ask**: Google "how to [your question] Twilio" for specific help

---

## 📱 Next Steps

### After Testing (Optional Upgrades)

1. **Buy Singapore Number** (SGD 2-3/month):
   - Makes it look more professional
   - Your own +65 number for calls

2. **Deploy to the Internet**:
   - Currently only works on your computer
   - Deploy to Railway/Render to access from anywhere
   - Cost: FREE tier available

3. **Add More Features**:
   - Email notifications
   - Multiple calendars
   - Team scheduling

---

**Enjoy your voice calendar assistant!** 🎙️📅✨
