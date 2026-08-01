let pageHistory = ['home'];

// Dynamic Content Updates & Navigation Stack
function switchPage(pageId, isBack = false) {
    document.querySelectorAll('.page-section').forEach(sec => sec.style.display = 'none');
    
    if (pageId === 'home') {
        document.getElementById('home-page').style.display = 'block';
    } else if (pageId === 'menu') {
        document.getElementById('menu-page').style.display = 'block';
    } else if (pageId === 'details') {
        document.getElementById('details-page').style.display = 'block';
    }
    
    if (!isBack && pageHistory[pageHistory.length - 1] !== pageId) {
        pageHistory.push(pageId);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Go Back Functionality
function goBack() {
    if (pageHistory.length > 1) {
        pageHistory.pop();
        const previousPage = pageHistory[pageHistory.length - 1];
        switchPage(previousPage, true);
    } else {
        switchPage('home', true);
    }
}

// 2 වන පිටුවට යෑම සහ අදාළ කැටගරිය පෙන්වීම
function openMenuPage(categoryName) {
    switchPage('menu');
    showCategory(categoryName);
}

// 2 වන පිටුවේ කැටගරිය Filter කිරීම
function showCategory(catId) {
    // 1. 2nd page එකේ සියලුම cards පෙන්වන්න
    document.querySelectorAll('#menu-page .recipe-card').forEach(card => card.style.display = 'block');
    
    // 2. Drinks Sub-tabs මුලින්ම සඟවන්න
    const subTabBtns = document.querySelector('#drinks .sub-tab-buttons');
    if (subTabBtns) subTabBtns.style.display = 'none';

    document.querySelectorAll('#menu-page .category-content').forEach(c => {
        c.style.display = 'none';
    });

    // 3. තේරූ category එක විතරක් පෙන්වන්න
    const activeSec = document.getElementById(catId);
    if (activeSec) {
        activeSec.style.display = 'block';
    }

    // 4. මාතෘකාව වෙනස් කරන්න
    const titleElem = document.getElementById('category-title');
    if (titleElem) {
        titleElem.innerText = catId.charAt(0).toUpperCase() + catId.slice(1) + " Menu";
    }

    // Drinks කැටගරිය විතරක් තේරුවොත් Sub-tab buttons පෙන්වන්න
    if (catId === 'drinks') {
        if (subTabBtns) subTabBtns.style.display = 'flex';
        showDrinkSub('smoothies');
    }
}

// 3 වන පිටුවට යෑම (Recipe Details Page)
function openDetailPage(type) {
    switchPage('details');

    document.querySelectorAll('.category-detail-group').forEach(g => g.style.display = 'none');
    
    const titleElem = document.getElementById('recipe-main-title');
    if (titleElem) {
        titleElem.innerText = type.charAt(0).toUpperCase() + type.slice(1) + " Recipe Guide";
    }

    const targetSec = document.getElementById(type + '-recipes');
    if (targetSec) {
        targetSec.style.display = 'block';
    }
}

// Drinks Sub-tabs switching
function showDrinkSub(subId, btn) {
    document.querySelectorAll('.drink-sub-content').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.sub-btn').forEach(b => b.classList.remove('active'));

    const subSec = document.getElementById(subId + '-sub');
    if (subSec) subSec.style.display = 'block';
    
    if (btn) {
        btn.classList.add('active');
    } else {
        const defaultBtn = document.querySelector('.sub-btn');
        if(defaultBtn) defaultBtn.classList.add('active');
    }
}

// Handle Search (1st Image Issue Fixed Here)
function handleSearch() {
    const queryInput = document.getElementById('searchInput');
    const query = queryInput.value.toLowerCase().trim();
    const errorMsgDiv = document.getElementById('searchErrorMessage');

    if (errorMsgDiv) errorMsgDiv.innerText = "";

    // 1. හිස්ව Search කළහොත් Message එක පෙන්වීම
    if (!query) {
        if (errorMsgDiv) errorMsgDiv.innerText = "Please enter a meal or ingredient name to search!";
        return;
    }

    let matches = 0;
    document.querySelectorAll('#menu-page .recipe-card').forEach(card => {
        const title = card.getAttribute('data-title') || card.innerText;
        if (title.toLowerCase().includes(query)) {
            matches++;
        }
    });

    // 2. Match වන එකක් නැත්නම් Error Message එක පෙන්වීම
    if (matches === 0) {
        if (errorMsgDiv) errorMsgDiv.innerText = `No recipes found for "${queryInput.value}". Please try another word!`;
        return;
    }

    // 3. Match වන එකක් තිබුණොත් 2nd Page එකට මාරු වීම
    switchPage('menu');
    
    // Search කරද්දී Drink Sub-Menu Buttons සම්පූර්ණයෙන්ම සඟවන්න (1st Image issue fix)
    const subTabBtns = document.querySelector('#drinks .sub-tab-buttons');
    if (subTabBtns) subTabBtns.style.display = 'none';

    document.querySelectorAll('#menu-page .category-content').forEach(c => c.style.display = 'block');
    document.querySelectorAll('#menu-page .drink-sub-content').forEach(s => s.style.display = 'block');
    
    document.getElementById('category-title').innerText = `Search Results for "${queryInput.value}"`;

    document.querySelectorAll('#menu-page .recipe-card').forEach(card => {
        const title = card.getAttribute('data-title') || card.innerText;
        if (title.toLowerCase().includes(query)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Mobile Responsive Menu Toggle
const menuIcon = document.getElementById('menu-icon');
const navLinks = document.querySelector('.nav-links');

if (menuIcon && navLinks) {
    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navLinks.classList.toggle('active');
    };

    document.querySelectorAll('.nav-links a, .nav-links button').forEach(item => {
        item.addEventListener('click', () => {
            menuIcon.classList.remove('bx-x');
            navLinks.classList.remove('active');
        });
    });
}

// Modals Validation Setup
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            event.stopPropagation();

            if (loginForm.checkValidity()) {
                alert('Sign In Successful!');
                const modalEl = document.getElementById('signInModal');
                const modal = bootstrap.Modal.getInstance(modalEl);
                if (modal) modal.hide();
                loginForm.reset();
                loginForm.classList.remove('was-validated');
            } else {
                loginForm.classList.add('was-validated');
            }
        }, false);
    }

    const addRecipeForm = document.getElementById('addRecipeForm');
    if (addRecipeForm) {
        addRecipeForm.addEventListener('submit', function (event) {
            event.preventDefault();
            event.stopPropagation();

            if (addRecipeForm.checkValidity()) {
                alert('Recipe Submitted Successfully for Review!');
                const modalEl = document.getElementById('addRecipeModal');
                const modal = bootstrap.Modal.getInstance(modalEl);
                if (modal) modal.hide();
                addRecipeForm.reset();
                addRecipeForm.classList.remove('was-validated');
            } else {
                addRecipeForm.classList.add('was-validated');
            }
        }, false);
    }
});