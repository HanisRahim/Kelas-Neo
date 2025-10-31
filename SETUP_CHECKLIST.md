# ✅ Supabase Setup Checklist

Use this checklist to set up Supabase for your "What Should I Eat?" app.

---

## 📋 Pre-Setup

- [ ] Read `README_SUPABASE.md` for overview
- [ ] Choose setup guide:
  - [ ] Quick setup → Use `QUICKSTART.md`
  - [ ] Detailed setup → Use `SUPABASE_SETUP.md`
- [ ] Have a web browser ready
- [ ] Have code editor ready (VS Code, Notepad++, etc.)

---

## 🌐 Part 1: Supabase Account (2-3 minutes)

- [ ] Go to [https://supabase.com](https://supabase.com)
- [ ] Click "Start your project"
- [ ] Sign up with:
  - [ ] GitHub, or
  - [ ] Google, or
  - [ ] Email
- [ ] Verify email (if using email signup)
- [ ] Log into Supabase dashboard

**Status:** ✅ Account created!

---

## 🚀 Part 2: Create Project (2 minutes)

- [ ] Click "New Project" in dashboard
- [ ] Create or select an organization
- [ ] Fill in project details:
  - [ ] **Name**: `food-chooser` (or your choice)
  - [ ] **Database Password**: Create strong password
  - [ ] **Save password** somewhere safe!
  - [ ] **Region**: Select closest to you
  - [ ] **Plan**: Select "Free" tier
- [ ] Click "Create new project"
- [ ] ⏳ Wait 1-2 minutes for project initialization
- [ ] See green checkmark when ready

**Status:** ✅ Project created!

---

## 🗄️ Part 3: Create Database Table (1 minute)

- [ ] Click **SQL Editor** in left sidebar
- [ ] Click **"New query"** button
- [ ] Open `supabase_table_schema.sql` from your project
- [ ] Copy entire contents
- [ ] Paste into SQL Editor
- [ ] Click **"Run"** (or press F5)
- [ ] See success message: "Success. No rows returned"
- [ ] Click **Table Editor** in left sidebar
- [ ] Verify `food_history` table exists

**Status:** ✅ Database table created!

---

## 🔑 Part 4: Get API Credentials (1 minute)

- [ ] Click **Settings** (⚙️ icon) in left sidebar
- [ ] Click **API** in settings menu
- [ ] Find "Project URL" section
  - [ ] Copy the URL (looks like: `https://abcdefg.supabase.co`)
  - [ ] Save it temporarily (notepad/clipboard)
- [ ] Find "Project API keys" section
  - [ ] Look for **"anon" "public"** key
  - [ ] Click **Copy** (or reveal and copy)
  - [ ] Save it temporarily (long string starting with `eyJ...`)

**Status:** ✅ Credentials copied!

---

## 💻 Part 5: Configure Your App (2 minutes)

- [ ] Open your project folder
- [ ] Open `script.js` in code editor
- [ ] Find lines 6-7:
```javascript
const SUPABASE_URL = 'YOUR_SUPABASE_URL_HERE';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY_HERE';
```

- [ ] Replace with your actual values:
```javascript
const SUPABASE_URL = 'https://abcdefg.supabase.co'; // Your URL
const SUPABASE_ANON_KEY = 'eyJhbGci...'; // Your key
```

- [ ] **Important**: Keep the quotes `'...'`
- [ ] **Important**: No spaces around `=`
- [ ] Save `script.js`

**Status:** ✅ App configured!

---

## 🧪 Part 6: Test It (2 minutes)

- [ ] Open `index.html` in web browser
- [ ] Press **F12** to open Developer Tools
- [ ] Click **Console** tab
- [ ] Look for one of these messages:
  - [ ] `✅ Supabase initialized successfully!` ← Good!
  - [ ] `⚠️ Supabase not configured...` ← Go back to Part 5
- [ ] Close console (or keep it open)
- [ ] On the webpage:
  - [ ] Select at least one cuisine
  - [ ] Select a meal type
  - [ ] Click **"🎲 Decide For Me!"**
- [ ] See a food recommendation appear
- [ ] Scroll down to **"📜 Your Food History"**
- [ ] See your choice appear in the history!

**Status:** ✅ App working!

---

## 🔍 Part 7: Verify in Supabase (1 minute)

- [ ] Go back to Supabase dashboard
- [ ] Click **Table Editor** in left sidebar
- [ ] Click **food_history** table
- [ ] See your food choice as a row in the table!
- [ ] Columns should have data:
  - [ ] `id` (random UUID)
  - [ ] `food_name` (e.g., "Pizza")
  - [ ] `emoji` (e.g., "🍕")
  - [ ] `cuisine` (e.g., "italian")
  - [ ] `meal_type` (e.g., "lunch")
  - [ ] `description` (food description)
  - [ ] `created_at` (timestamp)

**Status:** ✅ Database verified!

---

## 🎉 Part 8: Final Checks

- [ ] Make 2-3 more food choices
- [ ] Confirm they appear in history
- [ ] Refresh the webpage
- [ ] Confirm history still shows (persisted!)
- [ ] Try on mobile browser (if available)
- [ ] Check Supabase table for all entries

**Status:** ✅ Everything working!

---

## 📊 Setup Complete Summary

If all checkboxes above are checked:

### ✅ You Successfully:
1. Created Supabase account
2. Created project and database
3. Set up database table
4. Configured your app
5. Tested functionality
6. Verified data persistence

### 🎉 Your App Now Has:
- ☁️ Cloud database integration
- 📜 Persistent food history
- 🔄 Real-time updates
- 📱 Mobile support
- 🌐 Ready for deployment

---

## 🚀 What's Next?

### Optional Enhancements:
- [ ] Deploy to GitHub Pages / Netlify / Vercel
- [ ] Add user authentication (see `SUPABASE_SETUP.md`)
- [ ] Customize history display
- [ ] Add delete button for history items
- [ ] Add favorites feature
- [ ] Add statistics/analytics

### Share Your App:
- [ ] Deploy to web hosting
- [ ] Share URL with friends
- [ ] Get feedback
- [ ] Iterate and improve!

---

## 🆘 Troubleshooting Checklist

### If "Supabase not configured" appears:
- [ ] Check `script.js` lines 6-7 are edited
- [ ] Verify no typos in URL or key
- [ ] Ensure quotes are present
- [ ] Save the file after editing
- [ ] Refresh browser (Ctrl+F5 / Cmd+Shift+R)

### If history doesn't appear:
- [ ] Check browser console for errors
- [ ] Verify table name is `food_history` (lowercase)
- [ ] Confirm SQL was executed successfully
- [ ] Check Supabase table for data
- [ ] Try creating a new food choice

### If saving fails:
- [ ] Check Row Level Security policies
- [ ] Verify API key is "anon public" key (not service_role)
- [ ] Check Supabase project is not paused
- [ ] Review Supabase logs (Dashboard → Logs)

### Still having issues?
- [ ] Read `SUPABASE_SETUP.md` troubleshooting section
- [ ] Check browser console (F12) for detailed errors
- [ ] Verify Supabase project status
- [ ] Try creating a new project
- [ ] Review Supabase documentation

---

## 📞 Resources

| Resource | Link/File |
|----------|-----------|
| Quick Setup | `QUICKSTART.md` |
| Detailed Guide | `SUPABASE_SETUP.md` |
| Overview | `README_SUPABASE.md` |
| Technical Details | `CHANGES_SUMMARY.md` |
| SQL Schema | `supabase_table_schema.sql` |
| This Checklist | `SETUP_CHECKLIST.md` |
| Supabase Docs | https://supabase.com/docs |
| Supabase Dashboard | https://supabase.com/dashboard |

---

## 🏆 Completion Badge

Once all checkboxes are complete, you've successfully integrated Supabase!

```
╔════════════════════════════════════╗
║                                    ║
║   🎉 SUPABASE INTEGRATION          ║
║      COMPLETE!                     ║
║                                    ║
║   ✅ Database Connected            ║
║   ✅ History Tracking Active       ║
║   ✅ Cloud Powered                 ║
║   ✅ Production Ready              ║
║                                    ║
║   Great job! 🚀                    ║
║                                    ║
╚════════════════════════════════════╝
```

---

**Setup Time:** ~10 minutes total  
**Difficulty:** ⭐⭐☆☆☆ (Easy)  
**Status:** Ready to use!

Enjoy your cloud-powered food recommendation app! 🍽️✨

