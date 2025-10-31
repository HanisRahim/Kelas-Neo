// ============================================
// SUPABASE CONFIGURATION
// ============================================
// Replace these with your actual Supabase credentials
// Get them from: https://supabase.com/dashboard/project/YOUR_PROJECT/settings/api
const SUPABASE_URL = 'https://ajygpvkbhpiplyhvbrse.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqeWdwdmtiaHBpcGx5aHZicnNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2Mzc3MzcsImV4cCI6MjA3NzIxMzczN30.yR-WBNL2x5qX7uFG_hfIIeUsmTopJtsgXm0W8K6glPw';

// Initialize Supabase client (will be null if credentials not provided)
let supabase = null;
if (SUPABASE_URL !== 'YOUR_SUPABASE_URL_HERE' && SUPABASE_ANON_KEY !== 'YOUR_SUPABASE_ANON_KEY_HERE') {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('✅ Supabase initialized successfully!');
} else {
    console.log('⚠️ Supabase not configured. Add your credentials in script.js');
}

// ============================================
// FOOD DATABASE
// ============================================
const foodDatabase = {
    italian: {
        breakfast: [
            { name: "Cappuccino & Cornetto", emoji: "☕", desc: "Start your day Italian style with coffee and a pastry" },
            { name: "Frittata", emoji: "🍳", desc: "An Italian omelet loaded with vegetables and cheese" }
        ],
        lunch: [
            { name: "Pasta Carbonara", emoji: "🍝", desc: "Creamy, rich pasta with bacon and eggs" },
            { name: "Margherita Pizza", emoji: "🍕", desc: "Simple, fresh, and absolutely delicious" },
            { name: "Lasagna", emoji: "🍝", desc: "Layers of pasta, meat, and cheese baked to perfection" }
        ],
        dinner: [
            { name: "Osso Buco", emoji: "🍖", desc: "Braised veal shanks with vegetables, white wine, and broth" },
            { name: "Risotto", emoji: "🍚", desc: "Creamy Italian rice dish with endless variations" },
            { name: "Chicken Parmigiana", emoji: "🍗", desc: "Breaded chicken topped with tomato sauce and cheese" }
        ],
        snack: [
            { name: "Bruschetta", emoji: "🍞", desc: "Grilled bread with fresh tomatoes and basil" },
            { name: "Arancini", emoji: "🧆", desc: "Fried rice balls stuffed with cheese or meat" }
        ]
    },
    chinese: {
        breakfast: [
            { name: "Congee", emoji: "🍚", desc: "Warm rice porridge, comforting and filling" },
            { name: "Dim Sum", emoji: "🥟", desc: "Various small dishes including dumplings and buns" }
        ],
        lunch: [
            { name: "Fried Rice", emoji: "🍚", desc: "Stir-fried rice with vegetables, eggs, and your choice of protein" },
            { name: "Kung Pao Chicken", emoji: "🍗", desc: "Spicy stir-fried chicken with peanuts and vegetables" },
            { name: "Sweet and Sour Pork", emoji: "🍖", desc: "Crispy pork in tangy sweet sauce" }
        ],
        dinner: [
            { name: "Peking Duck", emoji: "🦆", desc: "Crispy duck skin with pancakes and hoisin sauce" },
            { name: "Mapo Tofu", emoji: "🌶️", desc: "Spicy Sichuan dish with tofu and minced meat" },
            { name: "Hot Pot", emoji: "🍲", desc: "Interactive meal with simmering broth and fresh ingredients" }
        ],
        snack: [
            { name: "Spring Rolls", emoji: "🥠", desc: "Crispy rolls filled with vegetables or meat" },
            { name: "Egg Tart", emoji: "🥧", desc: "Sweet custard tart with flaky pastry" }
        ]
    },
    japanese: {
        breakfast: [
            { name: "Tamago Gohan", emoji: "🍚", desc: "Rice with raw egg and soy sauce, simple and delicious" },
            { name: "Miso Soup", emoji: "🍜", desc: "Traditional soup with tofu, seaweed, and miso paste" }
        ],
        lunch: [
            { name: "Sushi", emoji: "🍱", desc: "Fresh fish and rice, an art form on a plate" },
            { name: "Ramen", emoji: "🍜", desc: "Rich broth with noodles and toppings" },
            { name: "Tonkatsu", emoji: "🍖", desc: "Crispy breaded pork cutlet" }
        ],
        dinner: [
            { name: "Sashimi", emoji: "🐟", desc: "Fresh raw fish sliced to perfection" },
            { name: "Tempura", emoji: "🍤", desc: "Lightly battered and fried seafood and vegetables" },
            { name: "Sukiyaki", emoji: "🍲", desc: "Hot pot with thinly sliced beef and vegetables" }
        ],
        snack: [
            { name: "Onigiri", emoji: "🍙", desc: "Rice balls filled with various ingredients" },
            { name: "Takoyaki", emoji: "🐙", desc: "Octopus balls with savory sauce" }
        ]
    },
    mexican: {
        breakfast: [
            { name: "Huevos Rancheros", emoji: "🍳", desc: "Eggs on tortillas with salsa and beans" },
            { name: "Chilaquiles", emoji: "🌮", desc: "Fried tortilla chips with salsa and toppings" }
        ],
        lunch: [
            { name: "Tacos", emoji: "🌮", desc: "Soft or hard shell with your favorite fillings" },
            { name: "Burrito", emoji: "🌯", desc: "Large tortilla wrapped around delicious fillings" },
            { name: "Quesadilla", emoji: "🧀", desc: "Grilled tortilla with melted cheese" }
        ],
        dinner: [
            { name: "Enchiladas", emoji: "🌮", desc: "Rolled tortillas covered in sauce and cheese" },
            { name: "Fajitas", emoji: "🌶️", desc: "Sizzling meat and vegetables with tortillas" },
            { name: "Mole Poblano", emoji: "🍗", desc: "Chicken in rich chocolate-chili sauce" }
        ],
        snack: [
            { name: "Guacamole & Chips", emoji: "🥑", desc: "Fresh avocado dip with crispy tortilla chips" },
            { name: "Nachos", emoji: "🧀", desc: "Loaded chips with cheese and toppings" }
        ]
    },
    indian: {
        breakfast: [
            { name: "Masala Dosa", emoji: "🥞", desc: "Crispy crepe filled with spiced potatoes" },
            { name: "Paratha", emoji: "🫓", desc: "Flaky flatbread, perfect with yogurt" }
        ],
        lunch: [
            { name: "Butter Chicken", emoji: "🍛", desc: "Creamy tomato curry with tender chicken" },
            { name: "Biryani", emoji: "🍚", desc: "Fragrant rice with spices and meat" },
            { name: "Palak Paneer", emoji: "🥬", desc: "Spinach curry with cottage cheese" }
        ],
        dinner: [
            { name: "Tandoori Chicken", emoji: "🍗", desc: "Yogurt-marinated chicken cooked in clay oven" },
            { name: "Rogan Josh", emoji: "🍖", desc: "Aromatic lamb curry" },
            { name: "Dal Makhani", emoji: "🫘", desc: "Creamy black lentils cooked overnight" }
        ],
        snack: [
            { name: "Samosa", emoji: "🥟", desc: "Crispy pastry filled with spiced potatoes" },
            { name: "Pakora", emoji: "🌶️", desc: "Vegetable fritters, perfect with chutney" }
        ]
    },
    thai: {
        breakfast: [
            { name: "Jok", emoji: "🍚", desc: "Thai rice porridge with ginger and pork" },
            { name: "Khao Tom", emoji: "🍜", desc: "Rice soup with herbs and meat" }
        ],
        lunch: [
            { name: "Pad Thai", emoji: "🍜", desc: "Stir-fried noodles with tamarind sauce" },
            { name: "Green Curry", emoji: "🍛", desc: "Spicy coconut curry with vegetables" },
            { name: "Tom Yum Soup", emoji: "🍲", desc: "Hot and sour soup with shrimp" }
        ],
        dinner: [
            { name: "Massaman Curry", emoji: "🍛", desc: "Rich, mild curry with peanuts" },
            { name: "Pad Krapow", emoji: "🍚", desc: "Basil stir-fry with meat over rice" },
            { name: "Som Tam", emoji: "🥗", desc: "Spicy green papaya salad" }
        ],
        snack: [
            { name: "Spring Rolls", emoji: "🥠", desc: "Fresh or fried rolls with vegetables" },
            { name: "Mango Sticky Rice", emoji: "🥭", desc: "Sweet rice with fresh mango" }
        ]
    },
    american: {
        breakfast: [
            { name: "Pancakes", emoji: "🥞", desc: "Fluffy stacks with syrup and butter" },
            { name: "Eggs & Bacon", emoji: "🍳", desc: "Classic American breakfast" }
        ],
        lunch: [
            { name: "Burger", emoji: "🍔", desc: "Juicy beef patty with all the fixings" },
            { name: "Hot Dog", emoji: "🌭", desc: "Classic stadium food" },
            { name: "Philly Cheesesteak", emoji: "🥖", desc: "Sliced beef with melted cheese" }
        ],
        dinner: [
            { name: "BBQ Ribs", emoji: "🍖", desc: "Slow-cooked ribs with smoky sauce" },
            { name: "Fried Chicken", emoji: "🍗", desc: "Crispy, golden, and delicious" },
            { name: "Mac and Cheese", emoji: "🧀", desc: "Creamy pasta comfort food" }
        ],
        snack: [
            { name: "Buffalo Wings", emoji: "🍗", desc: "Spicy chicken wings with blue cheese" },
            { name: "Loaded Fries", emoji: "🍟", desc: "Fries topped with cheese and bacon" }
        ]
    },
    korean: {
        breakfast: [
            { name: "Kimchi Fried Rice", emoji: "🍚", desc: "Fried rice with spicy fermented cabbage" },
            { name: "Korean Egg Roll", emoji: "🥚", desc: "Rolled omelet, sweet and savory" }
        ],
        lunch: [
            { name: "Bibimbap", emoji: "🍱", desc: "Mixed rice bowl with vegetables and meat" },
            { name: "Korean Fried Chicken", emoji: "🍗", desc: "Extra crispy with sweet-spicy glaze" },
            { name: "Japchae", emoji: "🍜", desc: "Stir-fried glass noodles with vegetables" }
        ],
        dinner: [
            { name: "Korean BBQ", emoji: "🥩", desc: "Grill your own meat at the table" },
            { name: "Kimchi Jjigae", emoji: "🍲", desc: "Spicy kimchi stew" },
            { name: "Bulgogi", emoji: "🍖", desc: "Marinated beef, sweet and savory" }
        ],
        snack: [
            { name: "Tteokbokki", emoji: "🌶️", desc: "Spicy rice cakes in red sauce" },
            { name: "Kimbap", emoji: "🍙", desc: "Seaweed rice rolls with various fillings" }
        ]
    },
    mediterranean: {
        breakfast: [
            { name: "Shakshuka", emoji: "🍳", desc: "Eggs poached in tomato sauce" },
            { name: "Greek Yogurt & Honey", emoji: "🍯", desc: "Thick yogurt with honey and nuts" }
        ],
        lunch: [
            { name: "Falafel", emoji: "🥙", desc: "Crispy chickpea fritters in pita" },
            { name: "Gyros", emoji: "🌯", desc: "Meat wrapped in warm pita with tzatziki" },
            { name: "Greek Salad", emoji: "🥗", desc: "Fresh vegetables with feta and olives" }
        ],
        dinner: [
            { name: "Lamb Kebab", emoji: "🍖", desc: "Grilled meat skewers with spices" },
            { name: "Moussaka", emoji: "🍆", desc: "Layered eggplant and meat casserole" },
            { name: "Grilled Fish", emoji: "🐟", desc: "Fresh fish with lemon and herbs" }
        ],
        snack: [
            { name: "Hummus & Pita", emoji: "🫓", desc: "Creamy chickpea dip with bread" },
            { name: "Dolma", emoji: "🍃", desc: "Stuffed grape leaves" }
        ]
    }
};

// ============================================
// SUPABASE FUNCTIONS
// ============================================

// Save food choice to Supabase history
async function saveFoodToHistory(food, cuisine, mealType) {
    if (!supabase) {
        console.log('Supabase not configured - skipping history save');
        return;
    }

    try {
        const { data, error } = await supabase
            .from('food_history')
            .insert([
                {
                    food_name: food.name,
                    emoji: food.emoji,
                    cuisine: cuisine,
                    meal_type: mealType,
                    description: food.desc
                }
            ])
            .select();

        if (error) {
            console.error('Error saving to history:', error);
        } else {
            console.log('✅ Saved to history:', data);
            loadFoodHistory(); // Refresh history display
        }
    } catch (err) {
        console.error('Error:', err);
    }
}

// Load food history from Supabase
async function loadFoodHistory() {
    if (!supabase) return;

    try {
        const { data, error } = await supabase
            .from('food_history')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(10);

        if (error) {
            console.error('Error loading history:', error);
        } else {
            displayFoodHistory(data);
        }
    } catch (err) {
        console.error('Error:', err);
    }
}

// Display food history in the UI
function displayFoodHistory(history) {
    const historyContainer = document.getElementById('historyContainer');
    if (!historyContainer || !history || history.length === 0) {
        if (historyContainer) {
            historyContainer.innerHTML = '<p class="no-history">No food history yet. Make your first choice!</p>';
        }
        return;
    }

    historyContainer.innerHTML = history.map(item => `
        <div class="history-item">
            <span class="history-emoji">${item.emoji}</span>
            <div class="history-details">
                <div class="history-name">${item.food_name}</div>
                <div class="history-meta">${item.cuisine} • ${item.meal_type}</div>
            </div>
        </div>
    `).join('');
}

// ============================================
// EVENT HANDLERS
// ============================================

// Handle cuisine selection
document.querySelectorAll('.cuisine-tag').forEach(tag => {
    tag.addEventListener('click', function() {
        this.classList.toggle('active');
    });
});

// Handle meal type selection
document.querySelectorAll('.meal-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.meal-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

function decideFood() {
    const randomMode = document.getElementById('randomMode').checked;
    const resultDiv = document.getElementById('result');
    
    let selectedCuisines = [];
    let selectedMeal = null;

    if (!randomMode) {
        // Get selected cuisines
        document.querySelectorAll('.cuisine-tag.active').forEach(tag => {
            selectedCuisines.push(tag.dataset.cuisine);
        });

        // Get selected meal
        const activeMeal = document.querySelector('.meal-btn.active');
        if (activeMeal) {
            selectedMeal = activeMeal.dataset.meal;
        }

        // Validation
        if (selectedCuisines.length === 0) {
            alert('Please select at least one cuisine type!');
            return;
        }

        if (!selectedMeal) {
            alert('Please select a meal type!');
            return;
        }
    } else {
        // Random mode: select random cuisine and meal
        const allCuisines = Object.keys(foodDatabase);
        selectedCuisines = [allCuisines[Math.floor(Math.random() * allCuisines.length)]];
        const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];
        selectedMeal = mealTypes[Math.floor(Math.random() * mealTypes.length)];
    }

    // Get random cuisine from selected ones
    const randomCuisine = selectedCuisines[Math.floor(Math.random() * selectedCuisines.length)];
    
    // Get available foods for this cuisine and meal
    const availableFoods = foodDatabase[randomCuisine][selectedMeal];
    
    if (availableFoods.length === 0) {
        alert('No food available for this combination!');
        return;
    }

    // Pick random food
    const selectedFood = availableFoods[Math.floor(Math.random() * availableFoods.length)];

    // Save to Supabase history
    saveFoodToHistory(selectedFood, randomCuisine, selectedMeal);

    // Display result
    document.getElementById('resultEmoji').textContent = selectedFood.emoji;
    document.getElementById('resultTitle').textContent = selectedFood.name;
    document.getElementById('resultCuisine').textContent = 
        `${randomCuisine.charAt(0).toUpperCase() + randomCuisine.slice(1)} Cuisine - ${selectedMeal.charAt(0).toUpperCase() + selectedMeal.slice(1)}`;
    document.getElementById('resultDescription').textContent = selectedFood.desc;

    // Update mascot message for result
    updateMascotMessage('result');

    // Show result with animation
    resultDiv.classList.remove('show');
    setTimeout(() => {
        resultDiv.classList.add('show');
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

// Mascot interaction messages
const mascotMessages = {
    initial: "Let me help you find something delicious!",
    selecting: "Great choice! Keep going!",
    deciding: "Hmm... Let me think of something tasty...",
    result: "Enjoy your meal! 😋",
    random: "Feeling adventurous? I love it!"
};

function updateMascotMessage(messageType) {
    const bubble = document.querySelector('.mascot-speech-bubble p');
    const mascot = document.querySelector('.civet-mascot');
    
    if (bubble) {
        bubble.style.animation = 'none';
        setTimeout(() => {
            bubble.textContent = mascotMessages[messageType];
            bubble.style.animation = 'bubblePop 0.5s ease-out';
        }, 50);
    }
    
    // Make mascot excited on certain interactions
    if (messageType === 'result' || messageType === 'random') {
        mascot.classList.add('excited');
        setTimeout(() => {
            mascot.classList.remove('excited');
        }, 500);
    }
}

// Add click handlers for cuisine tags to update mascot message
document.querySelectorAll('.cuisine-tag').forEach(tag => {
    const originalClick = tag.onclick;
    tag.addEventListener('click', function() {
        updateMascotMessage('selecting');
    });
});

// Add click handlers for meal buttons to update mascot message
document.querySelectorAll('.meal-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        updateMascotMessage('selecting');
    });
});

// Update mascot when random mode is toggled
document.getElementById('randomMode').addEventListener('change', function(e) {
    if (e.target.checked) {
        updateMascotMessage('random');
    } else {
        updateMascotMessage('initial');
    }
});

// Make mascot react when user hovers over the decide button
document.querySelector('.decide-btn').addEventListener('mouseenter', function() {
    updateMascotMessage('deciding');
});

document.querySelector('.decide-btn').addEventListener('mouseleave', function() {
    const hasSelections = document.querySelectorAll('.cuisine-tag.active').length > 0 || 
                          document.getElementById('randomMode').checked;
    if (hasSelections) {
        updateMascotMessage('selecting');
    } else {
        updateMascotMessage('initial');
    }
});

// Make mascot clickable with fun messages
const funMascotMessages = [
    "Hungry? Me too! 🍽️",
    "Food is life! 😄",
    "Let's find you something yummy!",
    "I love helping foodies!",
    "Click the button below! ⬇️",
    "Can't decide? That's what I'm here for!",
    "Trust me, I'm a food expert! 😉"
];

document.querySelector('.civet-mascot').addEventListener('click', function() {
    const randomMsg = funMascotMessages[Math.floor(Math.random() * funMascotMessages.length)];
    const bubble = document.querySelector('.mascot-speech-bubble p');
    const mascot = document.querySelector('.civet-mascot');
    
    bubble.style.animation = 'none';
    mascot.classList.add('excited');
    
    setTimeout(() => {
        bubble.textContent = randomMsg;
        bubble.style.animation = 'bubblePop 0.5s ease-out';
    }, 50);
    
    setTimeout(() => {
        mascot.classList.remove('excited');
    }, 500);
});

// Allow Enter key to trigger decision
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        decideFood();
    }
});

// ============================================
// INITIALIZATION
// ============================================
// Load food history when page loads
document.addEventListener('DOMContentLoaded', function() {
    if (supabase) {
        loadFoodHistory();
        console.log('🍽️ Food history loaded!');
    }
});

