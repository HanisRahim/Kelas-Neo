# 🚀 Quick Start - Supabase Integration

## What's New? ✨

Your "What Should I Eat?" app now has **cloud database integration** with Supabase!

**New Features:**
- 📜 **Food History** - All your food choices are saved
- 🔄 **Auto-sync** - History updates in real-time
- 🎨 **Beautiful UI** - Animated history display
- ☁️ **Cloud Storage** - Access history from anywhere

---

## 🏃 Quick Setup (3 Steps)

### 1. Create Supabase Project (2 minutes)
- Go to [supabase.com](https://supabase.com)
- Sign up and create a new project
- Wait for project to initialize

### 2. Create Database Table (30 seconds)
- Open **SQL Editor** in Supabase dashboard
- Copy contents of `supabase_table_schema.sql`
- Paste and click **Run**

### 3. Add Your Credentials (30 seconds)
- Get your **Project URL** and **anon key** from Supabase Settings → API
- Open `script.js`
- Replace lines 6-7 with your credentials:

```javascript
const SUPABASE_URL = 'https://YOUR_PROJECT.supabase.co';
const SUPABASE_ANON_KEY = 'your_anon_key_here';
```

**That's it! Open index.html and start using your app!** 🎉

---

## 📂 Files Reference

| File | Purpose |
|------|---------|
| `index.html` | Main app (includes history UI) |
| `script.js` | App logic + Supabase integration |
| `style.css` | All styles (includes history styling) |
| `SUPABASE_SETUP.md` | **Detailed setup guide** (read this!) |
| `supabase_table_schema.sql` | Database schema (copy to Supabase) |
| `QUICKSTART.md` | This file |

---

## ✅ Verify It's Working

1. Open `index.html` in browser
2. Press **F12** to open console
3. Look for: `✅ Supabase initialized successfully!`
4. Make a food choice
5. Check the **"📜 Your Food History"** section
6. Your choice should appear!

---

## 🆘 Not Working?

**Console says "Supabase not configured"?**
- Edit `script.js` lines 6-7 with your real credentials
- Save the file and refresh browser

**Still issues?**
- Read `SUPABASE_SETUP.md` for detailed troubleshooting
- Check Supabase dashboard → Table Editor → food_history

---

## 🎯 What Happens When You Click "Decide For Me"

1. App picks a random food based on your preferences
2. **Displays the result** on the page
3. **Saves to Supabase** (cloud database)
4. **Updates history** in the UI automatically
5. History persists even if you close the browser!

---

## 🌐 Ready to Deploy?

Your app works great as-is! Deploy to:
- **GitHub Pages** (free)
- **Netlify** (free)
- **Vercel** (free)

Just upload your files and it works! No server needed.

**Important**: Your Supabase credentials are safe to use in browser apps (they're designed for public use).

---

## 💡 Pro Tips

1. **Test locally first** - Make sure it works on your computer
2. **Check the console** - Helpful messages show what's happening
3. **View in Supabase** - Check Table Editor to see saved data
4. **Mobile friendly** - Try it on your phone!

---

**Need more help?** Read `SUPABASE_SETUP.md` for comprehensive instructions! 📖

