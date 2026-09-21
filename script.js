/* =========================================================
   Yummy.lk — Client-side data & logic
   ========================================================= */

const LS = {
    RECIPES: 'yl_custom_recipes',
    USERS: 'yl_users',
    SESSION: 'yl_session',
    FAVORITES: 'yl_favorites',
    COMMENTS: 'yl_comments',
    CONTACTS: 'yl_contact_messages'
};

/* Default dataset featuring cooking times and preparation steps */
const DEFAULT_RECIPES = [
    {
        id: 1,
        category: 'breakfast',
        sub_category: null,
        title: 'Sri Lankan Milk Rice (Kiribath)',
        prep_time: '10 mins',
        cook_time: '25 mins',
        servings: '4 Persons',
        difficulty: 'Easy',
        description: 'Traditional creamy rice cooked with thick coconut milk, best served with Lunu Miris.',
        ingredients: '2 cups White Raw Rice\n2 cups Thick Coconut Milk\n3 cups Water\n1.5 tsp Salt to taste',
        instructions: 'Wash the raw rice thoroughly and place it in a pot with 3 cups of water.\nCook over medium heat until the water is completely absorbed and rice is soft.\nDissolve salt in thick coconut milk and pour evenly over the cooked rice.\nReduce heat to low and simmer for 8-10 minutes while gently stirring until thick and creamy.\nTransfer onto a flat dish, smooth the surface with a banana leaf or spoon, and cut into diamond shapes.',
        image_url: 'https://i.pinimg.com/736x/8e/f7/2f/8ef72f77d2aa4db8daa990efadc3d253.jpg'
    },
    {
        id: 2,
        category: 'breakfast',
        sub_category: null,
        title: 'Egg Hoppers (Biththara Appa)',
        prep_time: '15 mins + fermenting',
        cook_time: '15 mins',
        servings: '4 Persons',
        difficulty: 'Medium',
        description: 'Crispy fermented rice flour pancakes with a soft-cooked egg nestled in the center.',
        ingredients: '2 cups Rice Flour\n1 cup Coconut Milk\n1 tsp Active Yeast\n4 Eggs\n1 tsp Sugar\nSalt and Crushed Black Pepper',
        instructions: 'Mix rice flour, yeast, sugar, and lukewarm water to make a smooth batter; leave to ferment overnight.\nAdd thick coconut milk and salt to bring it to a pouring pancake consistency.\nHeat a hopper pan (thachchiya), pour in a ladle of batter, and swirl the pan to coat edges.\nCrack an egg into the center, cover with lid, and cook on medium flame for 2-3 minutes.\nSprinkle with black pepper and salt, then gently lift out.',
        image_url: 'https://i.pinimg.com/1200x/d9/93/34/d99334d807cd20387bd4d8c7ade15c8c.jpg'
    },
    {
        id: 3,
        category: 'breakfast',
        sub_category: null,
        title: 'Pol Roti with Lunu Miris',
        prep_time: '15 mins',
        cook_time: '20 mins',
        servings: '4 Persons',
        difficulty: 'Easy',
        description: 'Rustic coconut flatbread roasted dry on a griddle, served with spicy onion-chili sambol.',
        ingredients: '2 cups All-Purpose Flour\n1.5 cups Fresh Grated Coconut\n1 Green Chili, finely chopped\n1/2 cup Lukewarm Water\n1 tsp Salt',
        instructions: 'In a large mixing bowl, combine flour, grated coconut, chopped green chili, and salt.\nAdd lukewarm water gradually and knead into a soft, pliable, non-sticky dough.\nDivide into 5-6 equal dough balls.\nFlatten each ball on a banana leaf or board into circular flatbreads of 1/4 inch thickness.\nCook on a hot dry skillet or griddle for 3-4 minutes per side until golden brown spots appear.',
        image_url: 'https://i.pinimg.com/736x/c3/89/6d/c3896d054ccc22c7a94b1fb2a4e9649a.jpg'
    },
    {
        id: 4,
        category: 'lunch',
        sub_category: null,
        title: 'Traditional Rice & Chicken Curry Platter',
        prep_time: '20 mins',
        cook_time: '40 mins',
        servings: '4 Persons',
        difficulty: 'Medium',
        description: 'Authentic roasted curry powder chicken simmered in rich coconut gravy.',
        ingredients: '500g Chicken, cut into pieces\n2 tbsp Sri Lankan Roasted Curry Powder\n1 tsp Fenugreek Seeds\n1 cup Thick Coconut Milk\n1 Onion, sliced\n2 sprigs Curry Leaves\n3 Cloves Garlic & 1 inch Ginger',
        instructions: 'Marinate chicken with roasted curry powder, chili powder, turmeric, and salt for 15 minutes.\nHeat oil in a clay pot; temper onions, curry leaves, ginger, garlic, and fenugreek seeds.\nAdd the marinated chicken and brown on high flame for 5 minutes.\nAdd 1/2 cup thin coconut milk, cover, and simmer on medium heat for 20 minutes.\nPour in thick coconut milk, simmer uncovered for another 8-10 minutes until oil separates on top.',
        image_url: 'https://i.pinimg.com/736x/d9/96/6b/d9966b3959a0d9fa1d1401bb84b53700.jpg'
    },
    {
        id: 5,
        category: 'lunch',
        sub_category: null,
        title: 'Fish Ambul Thiyal',
        prep_time: '20 mins',
        cook_time: '45 mins',
        servings: '5 Persons',
        difficulty: 'Hard',
        description: 'Dry sour fish curry slow cooked in clay pots with goraka paste and crushed black pepper.',
        ingredients: '500g Fresh Tuna (Kelawalla), cubed\n4 tbsp Goraka Paste\n2 tbsp Crushed Black Pepper\nCurry Leaves & Pandan Leaf\n1 tsp Salt\n1/2 cup Water',
        instructions: 'Boil dried goraka with water and grind into a smooth black paste.\nIn a bowl, mix goraka paste, black pepper, and salt thoroughly.\nCoat each fish cube evenly with the black marinade.\nLayer banana leaves at the bottom of a clay pot and pack fish cubes tightly.\nAdd half a cup of water, cover, and slow-cook on very low heat until liquid completely evaporates.',
        image_url: 'https://i.pinimg.com/736x/36/e9/1f/36e91fc843a2abdee12dccc0a97a6a27.jpg'
    },
    {
        id: 6,
        category: 'dinner',
        sub_category: null,
        title: 'Chicken Kothu Rotti',
        prep_time: '20 mins',
        cook_time: '15 mins',
        servings: '2 Persons',
        difficulty: 'Medium',
        description: 'Sri Lankan street-food classic: shredded godamba roti tossed with spicy chicken gravy, vegetables, and scrambled eggs.',
        ingredients: '4 Plain Godamba Parothas, shredded\n1 cup Cooked Spicy Chicken with Gravy\n2 Eggs\n1 cup Shredded Cabbage & Leeks\n1 Onion & Green Chili',
        instructions: 'Heat a heavy flat griddle or wide skillet with 2 tablespoons of oil.\nSaute sliced onions, green chilies, leeks, and cabbage on high heat for 2 minutes.\nPush veggies to the side, crack in eggs and scramble vigorously.\nAdd shredded parothas, chicken meat, and generous ladles of hot chicken gravy.\nChop and mix rapidly using two flat metal spatulas for 3-4 minutes until evenly blended and steaming.',
        image_url: 'https://i.pinimg.com/1200x/d6/d0/75/d6d0759eea5d87f87488272a9fa5eb71.jpg'
    },
    {
        id: 8,
        category: 'desserts',
        sub_category: null,
        title: 'Sri Lankan Watalappan',
        prep_time: '20 mins',
        cook_time: '40 mins',
        servings: '6 Persons',
        difficulty: 'Medium',
        description: 'Velvety steamed dessert made from pure kithul jaggery, fresh coconut cream, and aromatic nutmeg.',
        ingredients: '250g Dark Kithul Jaggery, grated\n5 Large Eggs\n1 cup Thick Coconut Cream\n1/2 tsp Ground Cardamom & Nutmeg\n2 tbsp Chopped Cashew Nuts',
        instructions: 'Melt the grated kithul jaggery with 3 tablespoons of water in a saucepan over low heat; cool slightly.\nIn a bowl, whisk eggs gently without creating excess froth.\nWhisk coconut milk and melted jaggery into the eggs.\nStir in cardamom, nutmeg, and strain the mixture through a fine muslin sieve twice.\nPour into a heatproof dish, scatter cashews on top, cover tightly with foil, and steam for 35-40 minutes.',
        image_url: 'https://i.pinimg.com/1200x/86/67/e6/8667e6d6df88eca115254236e17e1eaa.jpg'
    },
    {
        id: 15,
        category: 'drinks',
        sub_category: 'smoothies',
        title: 'Mixed Berry Smoothie',
        prep_time: '5 mins',
        cook_time: '0 mins',
        servings: '1 Glass',
        difficulty: 'Easy',
        description: 'Thick and luscious smoothie made with fresh strawberries, blueberries, and chilled yogurt.',
        ingredients: '1 cup Fresh Strawberries\n1/2 cup Blueberries\n1/2 cup Greek Yogurt\n1 tbsp Honey\n1/2 cup Crushed Ice',
        instructions: 'Wash berries thoroughly.\nPlace berries, yogurt, and honey in a blender.\nBlend on high speed until completely thick and smooth.\nPour into a tall chilled glass and serve garnished with berries.',
        image_url: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 16,
        category: 'drinks',
        sub_category: 'mojito',
        title: 'Virgin Mint Mojito',
        prep_time: '5 mins',
        cook_time: '0 mins',
        servings: '1 Glass',
        difficulty: 'Easy',
        description: 'A crisp combination of crushed mint leaves, fresh lime slices, and sparkling soda.',
        ingredients: '1 Lime, cut into wedges\n10 Fresh Mint Leaves\n2 tbsp Sugar Syrup\nChilled Club Soda\nCrushed Ice',
        instructions: 'Muddle lime wedges and mint leaves in a glass with sugar syrup.\nFill the glass with crushed ice.\nTop up with club soda and stir gently.',
        image_url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 17,
        category: 'drinks',
        sub_category: 'freshjuice',
        title: 'Fresh Lime & Mint Cooler',
        prep_time: '10 mins',
        cook_time: '0 mins',
        servings: '2 Glasses',
        difficulty: 'Easy',
        description: 'Refreshing tropical beverage infused with garden mint and fresh lime juice.',
        ingredients: '3 Fresh Limes, juiced\n12 Fresh Mint Leaves\n3 tbsp Sugar Syrup\n1.5 cups Chilled Soda or Water\nCrushed Ice Cubes',
        instructions: 'Muddle fresh mint leaves with lime juice and sugar syrup in a tall shaker.\nAdd ice cubes and shake well for 10 seconds.\nStrain into glasses, top with chilled soda, and garnish with a sprig of mint.',
        image_url: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=600&q=80'
    }
];

function getJSON(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
        return fallback;
    }
}
function setJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getAllRecipes() {
    const custom = getJSON(LS.RECIPES, []);
    return DEFAULT_RECIPES.concat(custom);
}
function getRecipeById(id) {
    return getAllRecipes().find(r => String(r.id) === String(id));
}
function addCustomRecipe(recipe) {
    const custom = getJSON(LS.RECIPES, []);
    recipe.id = 'c' + Date.now();
    recipe.custom = true;
    custom.push(recipe);
    setJSON(LS.RECIPES, custom);
    return recipe;
}

/* Favorites & Comments */
function getFavorites() { return getJSON(LS.FAVORITES, []); }
function isFavorite(id) { return getFavorites().map(String).includes(String(id)); }
function toggleFavorite(id) {
    let favs = getFavorites();
    if (isFavorite(id)) {
        favs = favs.filter(item => String(item) !== String(id));
    } else {
        favs.push(id);
    }
    setJSON(LS.FAVORITES, favs);
    return isFavorite(id);
}

function getComments(id) { return getJSON(LS.COMMENTS, {})[id] || []; }
function addComment(id, comment) {
    const all = getJSON(LS.COMMENTS, {});
    if (!all[id]) all[id] = [];
    all[id].push(comment);
    setJSON(LS.COMMENTS, all);
}
function getAverageRating(id) {
    const c = getComments(id);
    if (!c.length) return null;
    const avg = (c.reduce((a, b) => a + Number(b.rating), 0) / c.length).toFixed(1);
    return { avg, count: c.length };
}

/* Page Navigation */
let pageHistory = ['home'];
let currentLoadedRecipes = [];
let currentDetailRecipeId = null;

function switchPage(pageId, isBack = false) {
    document.querySelectorAll('.page-section').forEach(s => s.style.display = 'none');
    const target = document.getElementById(pageId + '-page');
    if (target) target.style.display = 'block';

    if (!isBack && pageHistory[pageHistory.length - 1] !== pageId) {
        pageHistory.push(pageId);
    }
    if (pageId === 'favorites') renderFavoritesPage();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goBack() {
    if (pageHistory.length > 1) {
        pageHistory.pop();
        switchPage(pageHistory[pageHistory.length - 1], true);
    } else {
        switchPage('home', true);
    }
}

function scrollToSection(sectionId) {
    if (document.getElementById('home-page').style.display === 'none') {
        switchPage('home');
    }

    setTimeout(() => {
        const targetElement = document.getElementById(sectionId);
        if (targetElement) {
            const navHeight = document.querySelector('nav.navbar')?.offsetHeight || 70;
            const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: elementPosition - navHeight - 10,
                behavior: 'smooth'
            });
        }
    }, 120);

    const navLinks = document.querySelector('.nav-links');
    if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    }
}

/* Render Recipe Cards */
function renderRecipeCards(recipes, gridId) {
    const grid = document.getElementById(gridId);
    if (!grid) return;

    if (!recipes || !recipes.length) {
        grid.innerHTML = `<p class="text-muted py-5 text-center w-100">No recipes found. Try searching another meal!</p>`;
        return;
    }

    grid.innerHTML = recipes.map(r => {
        const fav = isFavorite(r.id);
        const rating = getAverageRating(r.id);
        return `
        <div class="recipe-card">
            <div class="card-img-wrapper" onclick="openDetailPage('${r.id}')">
                <img src="${r.image_url}" alt="${r.title}">
                <span class="recipe-time-badge"><i class='bx bx-time-five'></i> ${r.cook_time || '20 mins'}</span>
            </div>
            <button class="fav-toggle-btn ${fav ? 'is-fav' : ''}" onclick="event.stopPropagation(); handleFavClick('${r.id}', this)">
                <i class='bx ${fav ? 'bxs-heart' : 'bx-heart'}'></i>
            </button>
            <div class="card-body" onclick="openDetailPage('${r.id}')">
                <h3>${r.title}</h3>
                <p>${r.description}</p>
                <div class="mt-2 text-warning small">
                    ${rating ? `★ ${rating.avg} (${rating.count} reviews)` : '<span class="text-muted">No reviews yet</span>'}
                </div>
            </div>
        </div>
        `;
    }).join('');
}

function handleFavClick(id, btn) {
    const isNowFav = toggleFavorite(id);
    btn.classList.toggle('is-fav', isNowFav);
    btn.innerHTML = `<i class='bx ${isNowFav ? 'bxs-heart' : 'bx-heart'}'></i>`;
}

function openMenuPage(cat) {
    switchPage('menu');
    document.getElementById('category-title').innerText = cat.toUpperCase() + ' MENU';
    const filtered = getAllRecipes().filter(r => r.category === cat);
    currentLoadedRecipes = filtered;

    const drinksNav = document.getElementById('drinksSubNav');
    if (cat === 'drinks') {
        drinksNav.style.display = 'flex';
        const activeSubBtn = document.querySelector('#drinksSubNav .sub-btn.active') || document.querySelector('#drinksSubNav .sub-btn');
        filterDrinkSub('smoothies', activeSubBtn);
    } else {
        drinksNav.style.display = 'none';
        renderRecipeCards(filtered, 'menu-recipe-grid');
    }
}

function filterDrinkSub(subType, btn) {
    document.querySelectorAll('#drinksSubNav .sub-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    const filtered = currentLoadedRecipes.filter(r => !r.sub_category || r.sub_category === subType);
    renderRecipeCards(filtered, 'menu-recipe-grid');
}

function filterMenuRecipes(query) {
    const q = query.toLowerCase().trim();
    const res = currentLoadedRecipes.filter(r => r.title.toLowerCase().includes(q) || r.ingredients.toLowerCase().includes(q));
    renderRecipeCards(res, 'menu-recipe-grid');
}

function renderFavoritesPage() {
    const favs = getFavorites();
    const items = getAllRecipes().filter(r => favs.map(String).includes(String(r.id)));
    renderRecipeCards(items, 'favorites-recipe-grid');
}

/* Detail Page */
function openDetailPage(id) {
    const r = getRecipeById(id);
    if (!r) return;
    currentDetailRecipeId = r.id;
    switchPage('details');

    document.getElementById('detailsCategoryHeading').innerText = (r.category || 'Recipe') + ' Guide';
    document.getElementById('cardRecipeTitle').innerText = r.title;
    document.getElementById('cardRecipeDesc').innerText = r.description;
    document.getElementById('detailsRecipeImage').src = r.image_url;

    document.getElementById('cardPrepTime').innerText = r.prep_time || '15 mins';
    document.getElementById('cardCookTime').innerText = r.cook_time || '25 mins';
    document.getElementById('cardServings').innerText = r.servings || '4 Persons';
    document.getElementById('cardDifficulty').innerText = r.difficulty || 'Easy';

    const ingList = document.getElementById('cardRecipeIngredients');
    const lines = (r.ingredients || '').split('\n').filter(Boolean);
    ingList.innerHTML = lines.map(line => `<li>${line}</li>`).join('');

    const stepBox = document.getElementById('cardRecipeSteps');
    const steps = (r.instructions || 'Prepare ingredients and cook on medium flame.').split('\n').filter(Boolean);
    stepBox.innerHTML = steps.map((step, idx) => `
        <div class="step-card">
            <div class="step-num">${idx + 1}</div>
            <p class="step-text">${step}</p>
        </div>
    `).join('');

    renderFavButton();
    renderComments();
}

function renderFavButton() {
    const btn = document.getElementById('detailsFavBtn');
    const fav = isFavorite(currentDetailRecipeId);
    btn.classList.toggle('is-fav', fav);
    btn.innerHTML = `<i class='bx ${fav ? 'bxs-heart' : 'bx-heart'}'></i> ${fav ? 'Saved' : 'Save Recipe'}`;
}

function toggleFavoriteCurrent() {
    toggleFavorite(currentDetailRecipeId);
    renderFavButton();
}

function renderComments() {
    const rating = getAverageRating(currentDetailRecipeId);
    document.getElementById('detailsAvgRating').innerHTML = rating ? `★ ${rating.avg} / 5 (${rating.count} reviews)` : 'No reviews yet';
    const comments = getComments(currentDetailRecipeId);
    document.getElementById('commentCount').innerText = comments.length;
    const list = document.getElementById('commentsList');
    list.innerHTML = comments.length ? comments.slice().reverse().map(c => `
        <div class="border-bottom py-2">
            <strong>${c.name}</strong> <span class="text-warning small">${'★'.repeat(c.rating)}</span>
            <p class="mb-0 text-muted small">${c.text}</p>
        </div>
    `).join('') : '<p class="text-muted small">Be the first to leave a review!</p>';
}

/* Add Recipe Form Handler */
function toggleSubCategoryField() {
    const cat = document.getElementById('recipeCategoryInput').value;
    document.getElementById('subCategoryWrapper').style.display = cat === 'drinks' ? 'block' : 'none';
}

document.getElementById('addRecipeForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const title = document.getElementById('recipeTitleInput').value.trim();
    const category = document.getElementById('recipeCategoryInput').value;
    const sub_category = category === 'drinks' ? document.getElementById('recipeSubCategoryInput').value : null;
    const prep_time = document.getElementById('recipePrepTimeInput').value.trim() || '15 mins';
    const cook_time = document.getElementById('recipeCookTimeInput').value.trim() || '20 mins';
    const servings = document.getElementById('recipeServingsInput').value.trim() || '4 Persons';
    const difficulty = document.getElementById('recipeDifficultyInput').value;
    const description = document.getElementById('recipeDescInput').value.trim();
    const ingredients = document.getElementById('recipeIngredientsInput').value.trim();
    const instructions = document.getElementById('recipeInstructionsInput').value.trim();
    const fileInput = document.getElementById('recipeImageInput');
    const fallback = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';

    const save = (img) => {
        addCustomRecipe({ title, category, sub_category, prep_time, cook_time, servings, difficulty, description, ingredients, instructions, image_url: img });
        alert('Recipe successfully published with cooking times and steps!');
        bootstrap.Modal.getInstance(document.getElementById('addRecipeModal'))?.hide();
        document.getElementById('addRecipeForm').reset();
    };

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = ev => save(ev.target.result);
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        save(fallback);
    }
});

/* Contact Form */
document.getElementById('dpHomeContactForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you! Your inquiry has been submitted successfully.');
    this.reset();
});

/* Mobile Menu & Search */
const menuIcon = document.getElementById('menu-icon');
const navLinks = document.querySelector('.nav-links');
if (menuIcon && navLinks) {
    menuIcon.onclick = () => navLinks.classList.toggle('active');
}

function handleSearch() {
    const q = document.getElementById('searchInput').value.trim().toLowerCase();
    if (!q) return;
    switchPage('menu');
    document.getElementById('category-title').innerText = `Results for "${q}"`;
    const res = getAllRecipes().filter(r => r.title.toLowerCase().includes(q) || r.ingredients.toLowerCase().includes(q));
    currentLoadedRecipes = res;
    renderRecipeCards(res, 'menu-recipe-grid');
}

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('searchInput')?.addEventListener('keydown', e => {
        if (e.key === 'Enter') handleSearch();
    });
});

/* =========================================================
   Browser Back/Forward & Keyboard Navigation Snippet
   ========================================================= */

// Initial load par browser history state set karna
window.addEventListener('DOMContentLoaded', () => {
    if (!history.state) {
        history.replaceState({ page: 'home', extra: null }, '', '#home');
    }
});

// UI update karne ka main function
function renderCurrentPageUI(pageId, extraData) {
    document.querySelectorAll('.page-section').forEach(s => s.style.display = 'none');
    const target = document.getElementById(pageId + '-page');
    if (target) target.style.display = 'block';

    if (pageId === 'favorites') {
        renderFavoritesPage();
    } else if (pageId === 'menu' && extraData) {
        openMenuPage(extraData, false);
    } else if (pageId === 'details' && extraData) {
        openDetailPage(extraData, false);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Page change karne ke saath browser history push karna
function switchPage(pageId, pushHistory = true, extraData = null) {
    renderCurrentPageUI(pageId, extraData);

    if (pushHistory) {
        history.pushState({ page: pageId, extra: extraData }, '', '#' + pageId);
    }
}

// Back function (browser history back trigger karta hai)
function goBack() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        switchPage('home', true);
    }
}

// Browser Back (←) aur Forward (→) buttons par listen karne wala event
window.addEventListener('popstate', (event) => {
    const state = event.state;
    if (state && state.page) {
        renderCurrentPageUI(state.page, state.extra);
    } else {
        renderCurrentPageUI('home');
    }
});

// Keyboard keys (Esc, Backspace, Alt + Left Arrow) ke liye event listener
window.addEventListener('keydown', (e) => {
    const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
    const isInputActive = activeTag === 'input' || activeTag === 'textarea';
    const isModalOpen = document.querySelector('.modal.show');

    // 1. Escape key
    if (e.key === 'Escape' && !isModalOpen) {
        goBack();
    }

    // 2. Alt + ArrowLeft ya text field ke bahar Backspace dabane par
    if ((e.altKey && e.key === 'ArrowLeft') || (e.key === 'Backspace' && !isInputActive && !isModalOpen)) {
        e.preventDefault();
        goBack();
    }
});