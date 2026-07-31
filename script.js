// Variable to keep track of navigation history
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
    
    // Add to history stack if not triggering a back action
    if (!isBack && pageHistory[pageHistory.length - 1] !== pageId) {
        pageHistory.push(pageId);
    }

    // Smooth Scrolling
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Function to navigate back to previous visited page
function goBack() {
    if (pageHistory.length > 1) {
        pageHistory.pop(); // Remove current page
        const previousPage = pageHistory[pageHistory.length - 1];
        switchPage(previousPage, true);
    } else {
        switchPage('home', true);
    }
}

// Open Second Page with Category
function openMenuPage(categoryName) {
    switchPage('menu');
    showCategory(categoryName);
}

// Filter Category in Second Page
function showCategory(catId, btn) {
    document.querySelectorAll('.category-content').forEach(c => c.style.display = 'none');
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

    const activeSec = document.getElementById(catId);
    if(activeSec) activeSec.style.display = 'block';

    document.getElementById('category-title').innerText = catId.charAt(0).toUpperCase() + catId.slice(1) + " Menu";

    if(btn) {
        btn.classList.add('active');
    } else {
        const buttons = document.querySelectorAll('.tab-btn');
        buttons.forEach(b => {
            if(b.innerText.toLowerCase() === catId) b.classList.add('active');
        });
    }
}

// Open Third Page Recipe Details
function openDetailPage(type) {
    switchPage('details');

    // Hide all main groups
    document.querySelectorAll('.category-detail-group').forEach(g => g.style.display = 'none');

    // Set main title
    document.getElementById('recipe-main-title').innerText = type.charAt(0).toUpperCase() + type.slice(1) + " Recipe Guide";

    // Show target section directly
    const targetSec = document.getElementById(type + '-recipes');
    if (targetSec) {
        targetSec.style.display = 'block';
    }
}

// Function to handle sub-category tabs inside Drinks (2nd Page)
function showDrinkSub(subId, btn) {
    document.querySelectorAll('.drink-sub-content').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.sub-btn').forEach(b => b.classList.remove('active'));

    const subSec = document.getElementById(subId + '-sub');
    if (subSec) subSec.style.display = 'block';
    if (btn) btn.classList.add('active');
}

// Mobile Responsive Menu Toggle (Boxicons)
const menuIcon = document.getElementById('menu-icon');
const navLinks = document.querySelector('.nav-links');

if (menuIcon && navLinks) {
    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navLinks.classList.toggle('active');
    };

    // Close mobile menu when clicking any link or button inside it
    document.querySelectorAll('.nav-links a, .nav-links button').forEach(item => {
        item.addEventListener('click', () => {
            menuIcon.classList.remove('bx-x');
            navLinks.classList.remove('active');
        });
    });
}

// Real-Time Form Validation (Sign In Modal)
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
});