# 🏗️ Architecture Overview

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     USER INTERFACE                          │
│                     (index.html)                            │
│                                                             │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Cuisine    │  │  Meal Type   │  │   Decide     │      │
│  │  Selection  │  │  Selection   │  │   Button     │      │
│  └─────────────┘  └──────────────┘  └──────────────┘      │
│                                                             │
│  ┌───────────────────────────────────────────────────┐     │
│  │           Food Result Display                     │     │
│  │         (emoji, name, description)                │     │
│  └───────────────────────────────────────────────────┘     │
│                                                             │
│  ┌───────────────────────────────────────────────────┐     │
│  │       📜 Food History Section (NEW!)              │     │
│  │  ┌─────────────────────────────────────────────┐  │     │
│  │  │  🍕 Pizza - italian • lunch               │  │     │
│  │  │  🍜 Pad Thai - thai • dinner              │  │     │
│  │  │  🍔 Burger - american • lunch             │  │     │
│  │  └─────────────────────────────────────────────┘  │     │
│  └───────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
                           │
                           │ User Interaction
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                   APPLICATION LOGIC                         │
│                     (script.js)                             │
│                                                             │
│  ┌───────────────────────────────────────────────────┐     │
│  │          Food Database (Local)                    │     │
│  │  - 9 cuisines × 4 meal types                      │     │
│  │  - ~80 food items                                 │     │
│  └───────────────────────────────────────────────────┘     │
│                           │                                 │
│  ┌───────────────────────────────────────────────────┐     │
│  │      Decision Logic                               │     │
│  │  - Filter by preferences                          │     │
│  │  - Random selection                               │     │
│  │  - Display result                                 │     │
│  └───────────────────────────────────────────────────┘     │
│                           │                                 │
│                           │ Save Choice                     │
│                           ▼                                 │
│  ┌───────────────────────────────────────────────────┐     │
│  │    Supabase Functions (NEW!)                      │     │
│  │  - saveFoodToHistory()                            │     │
│  │  - loadFoodHistory()                              │     │
│  │  - displayFoodHistory()                           │     │
│  └───────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
                           │
                           │ HTTP Request (REST API)
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                  SUPABASE CLIENT                            │
│              (@supabase/supabase-js)                        │
│                                                             │
│  ┌───────────────────────────────────────────────────┐     │
│  │  - Authentication                                 │     │
│  │  - Request formatting                             │     │
│  │  - Response parsing                               │     │
│  │  - Error handling                                 │     │
│  └───────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
                           │
                           │ HTTPS
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                   SUPABASE CLOUD                            │
│                 (supabase.com)                              │
│                                                             │
│  ┌───────────────────────────────────────────────────┐     │
│  │           PostgreSQL Database                     │     │
│  │                                                   │     │
│  │   Table: food_history                             │     │
│  │   ┌────────────────────────────────────────┐      │     │
│  │   │ id (UUID)                              │      │     │
│  │   │ food_name (TEXT)                       │      │     │
│  │   │ emoji (TEXT)                           │      │     │
│  │   │ cuisine (TEXT)                         │      │     │
│  │   │ meal_type (TEXT)                       │      │     │
│  │   │ description (TEXT)                     │      │     │
│  │   │ created_at (TIMESTAMP)                 │      │     │
│  │   └────────────────────────────────────────┘      │     │
│  │                                                   │     │
│  └───────────────────────────────────────────────────┘     │
│                                                             │
│  ┌───────────────────────────────────────────────────┐     │
│  │     Row Level Security (RLS)                      │     │
│  │  - Public read policy                             │     │
│  │  - Public insert policy                           │     │
│  └───────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

---

## Data Flow

### 1. User Makes a Food Choice

```
User clicks "Decide For Me"
    ↓
decideFood() function executes
    ↓
Filters food database by preferences
    ↓
Selects random food item
    ↓
Displays result on page
    ↓
Calls saveFoodToHistory()
```

### 2. Save to Supabase (NEW!)

```
saveFoodToHistory(food, cuisine, mealType)
    ↓
Checks if Supabase is configured
    ↓
Creates data object:
{
  food_name: "Pizza",
  emoji: "🍕",
  cuisine: "italian",
  meal_type: "lunch",
  description: "Simple, fresh..."
}
    ↓
supabase.from('food_history').insert([data])
    ↓
HTTP POST to Supabase API
    ↓
Supabase validates with RLS policies
    ↓
Inserts row into PostgreSQL
    ↓
Returns success/error
    ↓
Calls loadFoodHistory()
```

### 3. Load and Display History (NEW!)

```
loadFoodHistory()
    ↓
supabase.from('food_history').select('*')
    ↓
Order by created_at DESC
    ↓
Limit to 10 items
    ↓
HTTP GET from Supabase API
    ↓
Returns array of history items
    ↓
displayFoodHistory(data)
    ↓
Generates HTML for each item
    ↓
Updates historyContainer innerHTML
    ↓
Smooth animation appears
```

---

## File Structure

```
Project Root/
│
├── index.html                    # Main HTML structure
│   ├── Mascot SVG
│   ├── Cuisine selection UI
│   ├── Meal type selection UI
│   ├── Decide button
│   ├── Result display
│   └── History section (NEW!)
│
├── script.js                     # Application logic
│   ├── Supabase config (NEW!)
│   ├── Food database (local)
│   ├── Supabase functions (NEW!)
│   │   ├── saveFoodToHistory()
│   │   ├── loadFoodHistory()
│   │   └── displayFoodHistory()
│   ├── Event handlers
│   ├── Decision logic
│   └── Initialization (NEW!)
│
├── style.css                     # Styles
│   ├── Base styles
│   ├── Component styles
│   ├── History styles (NEW!)
│   │   ├── .history-section
│   │   ├── .history-item
│   │   ├── Animations
│   │   └── Mobile responsive
│   └── Media queries
│
└── Documentation/
    ├── README_SUPABASE.md       # Overview
    ├── QUICKSTART.md            # Quick setup
    ├── SUPABASE_SETUP.md        # Detailed setup
    ├── SETUP_CHECKLIST.md       # Step-by-step checklist
    ├── supabase_table_schema.sql # Database schema
    ├── CHANGES_SUMMARY.md        # Technical changes
    └── ARCHITECTURE.md           # This file
```

---

## Component Interaction Map

```
┌──────────────┐
│ User Browser │
└──────┬───────┘
       │
       ├─── Loads index.html
       │    └─── Loads style.css
       │    └─── Loads Supabase CDN
       │    └─── Loads script.js
       │
       ├─── Initializes Supabase client
       │    ├─── Validates credentials
       │    └─── Connects to cloud
       │
       ├─── Loads initial history
       │    └─── GET /food_history
       │
       ├─── User interacts
       │    ├─── Selects cuisines
       │    ├─── Selects meal type
       │    └─── Clicks decide button
       │
       ├─── App picks food
       │    ├─── Filters local database
       │    ├─── Random selection
       │    └─── Display result
       │
       └─── Saves to database
            ├─── POST /food_history
            ├─── Supabase processes
            ├─── Returns confirmation
            └─── Refreshes history UI
```

---

## Technology Stack

### Frontend
```
┌─────────────────────────┐
│   HTML5                 │
│   - Semantic markup     │
│   - SVG graphics        │
│   - Form elements       │
└─────────────────────────┘
┌─────────────────────────┐
│   CSS3                  │
│   - Gradients           │
│   - Animations          │
│   - Flexbox             │
│   - Grid                │
│   - Media queries       │
└─────────────────────────┘
┌─────────────────────────┐
│   JavaScript (ES6+)     │
│   - Async/await         │
│   - Arrow functions     │
│   - Template literals   │
│   - Array methods       │
│   - Event listeners     │
└─────────────────────────┘
```

### Backend (Supabase)
```
┌─────────────────────────┐
│   PostgreSQL            │
│   - Relational DB       │
│   - ACID compliant      │
│   - Indexes             │
│   - Constraints         │
└─────────────────────────┘
┌─────────────────────────┐
│   REST API              │
│   - PostgREST           │
│   - Auto-generated      │
│   - HTTPS               │
└─────────────────────────┘
┌─────────────────────────┐
│   Row Level Security    │
│   - Policy-based        │
│   - SQL expressions     │
│   - User isolation      │
└─────────────────────────┘
```

---

## Database Schema

```sql
┌───────────────────────────────────────────┐
│         Table: food_history               │
├───────────────┬───────────────┬───────────┤
│   Column      │   Type        │ Nullable  │
├───────────────┼───────────────┼───────────┤
│ id            │ UUID          │ NOT NULL  │ ← Primary Key
│ food_name     │ TEXT          │ NOT NULL  │
│ emoji         │ TEXT          │ NOT NULL  │
│ cuisine       │ TEXT          │ NOT NULL  │
│ meal_type     │ TEXT          │ NOT NULL  │
│ description   │ TEXT          │ NULL      │
│ created_at    │ TIMESTAMP     │ NOT NULL  │ ← Default: NOW()
└───────────────┴───────────────┴───────────┘
              │
              ├─ Index: idx_food_history_created_at
              │  (created_at DESC)
              │
              └─ RLS Policies:
                 - "Allow public read access"
                 - "Allow public insert access"
```

---

## API Endpoints

### Supabase Auto-Generated REST API

```
Base URL: https://[project-id].supabase.co/rest/v1/

┌────────────────────────────────────────────────────┐
│  GET /food_history                                 │
│  - Returns all food history records                │
│  - Supports: ordering, filtering, limit            │
│  - Used by: loadFoodHistory()                      │
└────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────┐
│  POST /food_history                                │
│  - Inserts new food history record                 │
│  - Returns: inserted record                        │
│  - Used by: saveFoodToHistory()                    │
└────────────────────────────────────────────────────┘

Authentication: Bearer [SUPABASE_ANON_KEY]
Content-Type: application/json
```

---

## State Management

```
Application State:
├── selectedCuisines: Array<string>
├── selectedMeal: string | null
├── randomMode: boolean
├── currentResult: Object | null
└── historyData: Array<Object> (NEW!)

Supabase State:
├── client: SupabaseClient | null
├── isInitialized: boolean
└── connectionStatus: 'connected' | 'error' | 'not-configured'

UI State:
├── result.show: boolean
├── historyContainer.innerHTML: string
└── mascotMessage: string
```

---

## Performance Considerations

### Optimizations Implemented:

1. **Lazy Loading**
   - History loads on page load, not on demand
   - Cached in browser memory

2. **Efficient Queries**
   - Indexed on `created_at` for fast sorting
   - Limited to 10 items (reduces payload)

3. **Graceful Degradation**
   - App works without Supabase
   - No blocking errors

4. **Minimal Re-renders**
   - History updates only after save
   - No continuous polling

5. **CSS Animations**
   - GPU-accelerated transforms
   - No JavaScript animations

### Future Optimization Ideas:

- [ ] Local caching with localStorage
- [ ] Debounce save operations
- [ ] Pagination for history
- [ ] Virtual scrolling for large lists
- [ ] Service worker for offline support

---

## Security Architecture

```
┌─────────────────────────────────────────┐
│          Client (Browser)               │
│                                         │
│  ┌───────────────────────────────┐     │
│  │  Supabase Anon Key            │     │
│  │  (Safe to expose publicly)    │     │
│  └───────────────────────────────┘     │
└────────────────┬────────────────────────┘
                 │ HTTPS
                 ▼
┌─────────────────────────────────────────┐
│         Supabase Cloud                  │
│                                         │
│  ┌───────────────────────────────┐     │
│  │  Row Level Security (RLS)     │     │
│  │  - Validates every request    │     │
│  │  - Enforces policies          │     │
│  └───────────────────────────────┘     │
│                                         │
│  ┌───────────────────────────────┐     │
│  │  API Gateway                  │     │
│  │  - Rate limiting              │     │
│  │  - Request validation         │     │
│  └───────────────────────────────┘     │
│                                         │
│  ┌───────────────────────────────┐     │
│  │  PostgreSQL                   │     │
│  │  - Data encryption at rest    │     │
│  │  - Encrypted connections      │     │
│  └───────────────────────────────┘     │
└─────────────────────────────────────────┘
```

### Current Security Posture:

✅ HTTPS enforced  
✅ Row Level Security enabled  
✅ Public read/insert policies (intentional)  
✅ API key authentication  
✅ Rate limiting (Supabase default)  

### Future Security Enhancements:

- [ ] User authentication (Supabase Auth)
- [ ] User-specific data isolation
- [ ] Admin roles and permissions
- [ ] Audit logging
- [ ] IP-based rate limiting

---

## Deployment Architecture

```
┌──────────────────────────────────────────────────┐
│              Static File Host                    │
│     (GitHub Pages / Netlify / Vercel)            │
│                                                  │
│  ┌────────────────────────────────────────┐     │
│  │  index.html                            │     │
│  │  script.js                             │     │
│  │  style.css                             │     │
│  └────────────────────────────────────────┘     │
└───────────────────┬──────────────────────────────┘
                    │
                    │ CDN
                    ▼
┌──────────────────────────────────────────────────┐
│              Content Delivery                    │
│                                                  │
│  ┌────────────────────────────────────────┐     │
│  │  Edge locations worldwide              │     │
│  │  - Fast loading                        │     │
│  │  - Caching                             │     │
│  │  - HTTPS                               │     │
│  └────────────────────────────────────────┘     │
└──────────────────────────────────────────────────┘
                    │
                    │ User requests
                    ▼
┌──────────────────────────────────────────────────┐
│              User's Browser                      │
│                                                  │
│  Connects to Supabase Cloud directly            │
│  (No backend server needed!)                    │
└──────────────────────────────────────────────────┘
```

**Benefits:**
- 🚀 Fast (CDN cached)
- 💰 Free (most hosts)
- 🔧 Simple (no server management)
- 📈 Scalable (automatic)

---

## Extension Points

### Easy to Add:

1. **Delete History Items**
```javascript
async function deleteHistoryItem(id) {
  await supabase.from('food_history').delete().eq('id', id);
}
```

2. **User Authentication**
```javascript
const { user } = await supabase.auth.signUp({
  email, password
});
```

3. **Favorites**
```sql
ALTER TABLE food_history ADD COLUMN is_favorite BOOLEAN DEFAULT false;
```

4. **Statistics**
```javascript
const { data } = await supabase
  .from('food_history')
  .select('cuisine, count:cuisine.count()');
```

---

## Conclusion

Your app now has a **modern, scalable architecture** with:
- 🎨 Beautiful frontend
- ☁️ Cloud database
- 🔒 Built-in security
- 📱 Mobile support
- 🚀 Ready to deploy

The architecture is designed to be:
- **Simple** - Easy to understand
- **Maintainable** - Clean code structure
- **Extensible** - Easy to add features
- **Scalable** - Handles growth automatically

---

*Architecture Document v1.0*  
*Created: October 31, 2025*

