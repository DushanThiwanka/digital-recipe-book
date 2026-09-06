let pageHistory = ['home'];
let currentLoadedRecipes = [];

function switchPage(pageId, isBack = false) {
    document.querySelectorAll('.page-section').forEach(sec => sec.style.display = 'none');
    
    if (pageId === 'home') document.getElementById('home-page').style.display = 'block';
    else if (pageId === 'menu') document.getElementById('menu-page').style.display = 'block';
    else if (pageId === 'details') document.getElementById('details-page').style.display = 'block';
    
    if (!isBack && pageHistory[pageHistory.length - 1] !== pageId) {
        pageHistory.push(pageId);
    }
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

// Recipes API Call
function openMenuPage(categoryName) {
    switchPage('menu');
    document.getElementById('category-title').innerText = categoryName.charAt(0).toUpperCase() + categoryName.slice(1) + " Menu";

    const drinksNav = document.getElementById('drinksSubNav');
    if (categoryName === 'drinks') {
        drinksNav.style.display = 'flex';
    } else {
        drinksNav.style.display = 'none';
    }

    fetch(`api/recipes.php?action=list&category=${categoryName}`)
        .then(res => res.json())
        .then(res => {
            currentLoadedRecipes = res.data;
            if (categoryName === 'drinks') {
                const activeBtn = document.querySelector('#drinksSubNav .sub-btn.active') || document.querySelector('#drinksSubNav .sub-btn');
                filterDrinkSub('freshjuice', activeBtn);
            } else {
                renderRecipeCards(res.data);
            }
        });
}

function filterDrinkSub(subType, btnElement) {
    document.querySelectorAll('#drinksSubNav .sub-btn').forEach(b => b.classList.remove('active'));
    if (btnElement) btnElement.classList.add('active');

    const filtered = currentLoadedRecipes.filter(r => {
        if (!r.sub_category) return true;
        return r.sub_category.toLowerCase() === subType.toLowerCase();
    });
    renderRecipeCards(filtered);
}

function renderRecipeCards(recipes) {
    const grid = document.getElementById('menu-recipe-grid');
    if (!recipes || recipes.length === 0) {
        grid.innerHTML = `<p class="text-muted py-5 text-center">No recipes found in this category.</p>`;
        return;
    }
    grid.innerHTML = recipes.map(r => `
        <div class="recipe-card" onclick="openDetailPage(${r.id})">
            <div class="card-img-wrapper">
                <img src="${r.image_url}" alt="${r.title}">
            </div>
            <div class="card-body">
                <h3>${r.title}</h3>
                <p>${r.description}</p>
            </div>
        </div>
    `).join('');
}

function openDetailPage(recipeId) {
    const r = currentLoadedRecipes.find(x => x.id == recipeId);
    if (!r) return;

    switchPage('details');
    document.getElementById('detailsCategoryHeading').innerText = (r.category.charAt(0).toUpperCase() + r.category.slice(1)) + " Recipe Guide";
    document.getElementById('cardRecipeTitle').innerText = r.title;
    document.getElementById('cardRecipeDesc').innerText = r.description;

    const ingContainer = document.getElementById('cardRecipeIngredients');
    if (r.ingredients) {
        const lines = r.ingredients.split('\n').filter(line => line.trim() !== '');
        ingContainer.innerHTML = lines.map(item => `<li>${item.trim()}</li>`).join('');
    } else {
        ingContainer.innerHTML = `<li>Authentic traditional ingredients</li>`;
    }
}

// Search API Call
function handleSearch() {
    const query = document.getElementById('searchInput').value.trim();
    if (!query) return alert("Please enter a search term!");

    switchPage('menu');
    document.getElementById('drinksSubNav').style.display = 'none';
    document.getElementById('category-title').innerText = `Search Results for "${query}"`;

    fetch(`api/recipes.php?action=search&q=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(res => {
            currentLoadedRecipes = res.data;
            renderRecipeCards(res.data);
        });
}

// Session Check on Load
window.addEventListener('DOMContentLoaded', () => {
    fetch('api/auth.php?action=check')
        .then(r => r.json())
        .then(data => {
            const slot = document.getElementById('navAuthSlot');
            if (data.logged_in) {
                slot.innerHTML = `
                    <button class="dp-user-badge-btn" data-bs-toggle="modal" data-bs-target="#dpProfileModal">
                        <i class='bx bxs-user-circle'></i> ${data.user.full_name.split(' ')[0]}
                    </button>
                    <button class="signin-btn ms-2" onclick="handleLogout()">Sign Out</button>
                `;
                document.getElementById('profileHeaderName').innerText = data.user.full_name;
                document.getElementById('profileHeaderEmail').innerText = data.user.email;
                document.getElementById('editProfileName').value = data.user.full_name;
                document.getElementById('editProfilePhone').value = data.user.phone || '';
            }
        });
});

function handleLogout() {
    fetch('api/auth.php?action=logout').then(() => location.reload());
}

// Auth API Calls
document.getElementById('dpSignInForm').addEventListener('submit', function(e) {
    e.preventDefault();
    fetch('api/auth.php?action=login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: document.getElementById('loginIdentifier').value.trim(),
            password: document.getElementById('loginPassword').value
        })
    }).then(res => res.json()).then(data => {
        if (data.status === 'success') location.reload();
        else alert(data.message);
    });
});

document.getElementById('dpRegisterForm').addEventListener('submit', function(e) {
    e.preventDefault();
    fetch('api/auth.php?action=register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            full_name: document.getElementById('regFullName').value.trim(),
            email: document.getElementById('regEmail').value.trim(),
            phone: document.getElementById('regPhone').value.trim(),
            password: document.getElementById('regPassword').value
        })
    }).then(res => res.json()).then(data => {
        if (data.status === 'success') location.reload();
        else alert(data.message);
    });
});

document.getElementById('profileUpdateForm').addEventListener('submit', function(e) {
    e.preventDefault();
    fetch('api/auth.php?action=update_profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            full_name: document.getElementById('editProfileName').value.trim(),
            phone: document.getElementById('editProfilePhone').value.trim()
        })
    }).then(res => res.json()).then(data => {
        if (data.status === 'success') {
            alert('Profile updated!');
            location.reload();
        }
    });
});

// Add Recipe API Call
document.getElementById('createRecipeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    fetch('api/recipes.php?action=add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: document.getElementById('recipeTitleInput').value.trim(),
            category: document.getElementById('recipeCategorySelect').value,
            sub_category: document.getElementById('recipeSubCategorySelect').value,
            description: document.getElementById('recipeDescInput').value.trim(),
            ingredients: document.getElementById('recipeIngInput').value.trim()
        })
    }).then(res => res.json()).then(data => {
        if (data.status === 'success') {
            alert('Recipe published to database!');
            bootstrap.Modal.getInstance(document.getElementById('addRecipeModal')).hide();
            document.getElementById('createRecipeForm').reset();
        }
    });
});

// Contact API Call
const contactForm = document.getElementById('dpContactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        fetch('api/contact.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: document.getElementById('contactName').value.trim(),
                email: document.getElementById('contactEmail').value.trim(),
                message: document.getElementById('contactMessage').value.trim()
            })
        }).then(res => res.json()).then(data => {
            if (data.status === 'success') {
                alert('Thank you! Your message has been saved.');
                bootstrap.Modal.getInstance(document.getElementById('contactModal')).hide();
                contactForm.reset();
            }
        });
    });
}

// Mobile Menu Toggle
const menuIcon = document.getElementById('menu-icon');
const navLinks = document.querySelector('.nav-links');
if (menuIcon && navLinks) {
    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navLinks.classList.toggle('active');
    };
}