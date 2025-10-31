# 🚀 Supabase Setup Guide for "What Should I Eat?"

## ✅ What Has Been Added

Your project now has Supabase integration with:
- ✨ **Food History Tracking** - Saves every food choice you make
- 📜 **History Display** - Shows your last 10 food choices
- 🎨 **Beautiful UI** - Animated history section with modern design
- 📱 **Mobile Responsive** - Works perfectly on all devices

---

## 📝 Setup Instructions (5 minutes)

### Step 1: Create a Supabase Account
1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start your project"** (free tier available)
3. Sign up with GitHub, Google, or email

### Step 2: Create a New Project
1. Click **"New Project"**
2. Choose an organization (or create one)
3. Fill in:
   - **Name**: `food-chooser` (or any name you like)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to you
   - **Pricing Plan**: Free tier is perfect
4. Click **"Create new project"**
5. ⏳ Wait 1-2 minutes for setup to complete

### Step 3: Get Your API Credentials
1. In your Supabase dashboard, click **Settings** (⚙️ icon on left sidebar)
2. Click **API** in the settings menu
3. You'll see two important values:
   - **Project URL** (e.g., `https://abcdefghij.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)
4. 📋 Copy both values

### Step 4: Create the Database Table
1. In Supabase dashboard, click **SQL Editor** (on left sidebar)
2. Click **"New query"**
3. Paste this SQL code:

```sql
-- Create food_history table
CREATE TABLE food_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  food_name TEXT NOT NULL,
  emoji TEXT NOT NULL,
  cuisine TEXT NOT NULL,
  meal_type TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create an index for faster queries
CREATE INDEX idx_food_history_created_at ON food_history(created_at DESC);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE food_history ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow anyone to read and insert (for now)
CREATE POLICY "Allow public read access" ON food_history
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert access" ON food_history
  FOR INSERT WITH CHECK (true);
```

4. Click **"Run"** (or press F5)
5. ✅ You should see "Success. No rows returned"

### Step 5: Add Credentials to Your Project
1. Open `script.js` in your code editor
2. Find lines 6-7 at the top:
```javascript
const SUPABASE_URL = 'YOUR_SUPABASE_URL_HERE';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY_HERE';
```

3. Replace with your actual credentials:
```javascript
const SUPABASE_URL = 'https://abcdefghij.supabase.co'; // Your actual URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // Your actual key
```

4. Save the file

### Step 6: Test It!
1. Open `index.html` in your browser
2. Open browser console (F12 or right-click → Inspect → Console)
3. You should see: `✅ Supabase initialized successfully!`
4. Make a food choice by:
   - Selecting cuisines
   - Selecting meal type
   - Clicking "🎲 Decide For Me!"
5. Check the **"📜 Your Food History"** section below
6. Your choice should appear! 🎉

---

## 🧪 Verify Database Connection

1. In Supabase dashboard, click **Table Editor** (left sidebar)
2. Select **food_history** table
3. You should see your food choices appearing as rows!

---

## 🔒 Security Tips (Optional but Recommended)

### For Production / Public Deployment:

1. **Enable Row Level Security (already done in SQL above)**

2. **Add User Authentication** (if you want private histories):
```sql
-- Update policies to require authentication
DROP POLICY "Allow public read access" ON food_history;
DROP POLICY "Allow public insert access" ON food_history;

CREATE POLICY "Users can read own history" ON food_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own history" ON food_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Add user_id column
ALTER TABLE food_history ADD COLUMN user_id UUID REFERENCES auth.users(id);
```

3. **Rate Limiting**: Supabase provides built-in rate limiting on the free tier

---

## 🎨 Features Included

### ✅ Automatic History Tracking
Every food choice is automatically saved to Supabase with:
- Food name
- Emoji
- Cuisine type
- Meal type
- Description
- Timestamp

### ✅ Real-time History Display
- Shows last 10 food choices
- Auto-updates after each decision
- Smooth animations
- Scrollable list

### ✅ Graceful Degradation
If Supabase isn't configured, the app:
- Still works perfectly
- Shows friendly message
- Logs helpful console messages

---

## 🐛 Troubleshooting

### "Supabase not configured" message
- Make sure you replaced `YOUR_SUPABASE_URL_HERE` and `YOUR_SUPABASE_ANON_KEY_HERE`
- Check for typos
- Ensure you saved `script.js`

### "Error saving to history"
- Check browser console for specific error
- Verify table was created correctly
- Confirm Row Level Security policies allow inserts

### History not showing
1. Open browser console (F12)
2. Check for error messages
3. Verify table name is `food_history` (lowercase)
4. Check that data exists: Go to Supabase → Table Editor → food_history

### CORS errors
- Supabase automatically handles CORS
- If you see CORS errors, verify your project URL is correct

---

## 🚀 Next Steps / Enhancement Ideas

1. **Add Delete Button** - Let users remove history items
2. **Add Analytics** - Track most popular foods
3. **Add User Authentication** - Private histories per user
4. **Add Favorites** - Star favorite foods
5. **Export History** - Download as CSV
6. **Add Filters** - Filter history by cuisine/meal type
7. **Add Statistics** - Show most chosen cuisines

---

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)

---

## 🎉 You're All Set!

Your food chooser app now has cloud database integration! Every food choice is saved and displayed beautifully. Enjoy! 🍽️

---

**Need help?** Check the browser console for detailed error messages, or review the Supabase dashboard logs.

