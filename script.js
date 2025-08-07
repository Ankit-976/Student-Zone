// Page navigation
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    // Show selected page
    document.getElementById(pageId).classList.add('active');

    // Update navigation
    updateNavigation();
}

function updateNavigation() {
    const navButtons = document.getElementById('navButtons');
    const isLoggedIn = localStorage.getItem('studyZoneUser');

    if (isLoggedIn) {
        navButtons.innerHTML = '<a href="#" class="btn btn-primary" onclick="showPage(\'dashboard\')">Dashboard</a>';
    } else {
        navButtons.innerHTML = `
                    <a href="#" class="btn btn-secondary" onclick="showPage('login')">Login</a>
                    <a href="#" class="btn btn-primary" onclick="showPage('register')">Register</a>
                `;
    }
}

// Authentication functions
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const alertBox = document.getElementById('alertBox');

    // Simple validation
    if (email && password) {
        const userData = {
            email: email,
            name: 'Student', // In a real app, this would come from the server
            loginTime: new Date().toISOString()
        };

        // Store user data (in a real app, you'd validate with a server)
        localStorage.setItem('studyZoneUser', JSON.stringify(userData));

        // Update user info and navigate to dashboard
        updateUserInfo(userData);
        showPage('dashboard');

        // Show success message
        alertBox.textContent = 'Login successful!';
        alertBox.classList.add('scsBox');
        alertBox.classList.add('show');
        setTimeout(() => {
            alertBox.classList.remove('scsBox');
            alertBox.classList.remove('show');
        }, 4000)
        // alert('Login successful! Welcome to Study Zone!');
    } else {
        alertBox.textContent = 'Please fill in all fields';
        alertBox.classList.add('errBox');
        alertBox.classList.add('show');
        setTimeout(() => {
            alertBox.classList.remove('errBox');
            alertBox.classList.remove('show');
        }, 5000)
        // alert('Please fill in all fields');
    }
}

function handleRegister(event) {
    event.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const college = document.getElementById('registerCollege').value;
    const alertBox = document.getElementById('alertBox');


    // Simple validation
    if (name && email && password && college) {
        const userData = {
            name: name,
            email: email,
            college: college,
            registrationDate: new Date().toISOString()
        };

        // Store user data
        localStorage.setItem('studyZoneUser', JSON.stringify(userData));

        // Update user info and navigate to dashboard
        updateUserInfo(userData);
        showPage('dashboard');

        // Show success message
        alertBox.textContent = 'Registration successful!';
        alertBox.classList.add('scsBox');
        alertBox.classList.add('show');
        setTimeout(() => {
            alertBox.classList.remove('show');
            alertBox.classList.remove('scsBox');
        }, 4000)
        // alert('Registration successful! Welcome to Study Zone!');
    } else {
        alertBox.textContent = 'Please fill in all fields';
        alertBox.classList.add('errBox');
        alertBox.classList.add('show');
        setTimeout(() => {
            alertBox.classList.remove('errBox');
            alertBox.classList.remove('show');
        }, 5000)
        // alert('Please fill in all fields');
    }
}

function updateUserInfo(userData) {
    const userInfoDiv = document.getElementById('userInfo');
    userInfoDiv.innerHTML = `
                <p>Hello, <strong>${userData.name}</strong>!</p>
                <p>Email: ${userData.email}</p>
                ${userData.college ? `<p>College: ${userData.college}</p>` : ''}
            `;
}

function logout() {
    localStorage.removeItem('studyZoneUser');
    showPage('home');
    const alertBox = document.getElementById('alertBox');
    alertBox.textContent = 'Logged out successfully!';
    alertBox.classList.add('lgtBox');
    alertBox.classList.add('show');
    setTimeout(() => {
        alertBox.classList.remove('lgtBox');
        alertBox.classList.remove('show');
    }, 4000)
    // alert('Logged out successfully!');
}

// Check if user is already logged in
function checkLoginStatus() {
    const userData = localStorage.getItem('studyZoneUser');
    if (userData) {
        const user = JSON.parse(userData);
        updateUserInfo(user);
        updateNavigation();
    }
}

// 

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
document.head.appendChild(style);

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function () {
    checkLoginStatus();

    // Add some entrance animations
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

function dropDown(elementId) {
    const d = document.getElementById(elementId);
    const hidemenuLogo = document.getElementById('menuLogo');
    if (d.classList.contains('hidden')) {
        d.classList.remove('hidden');
        d.classList.add('visible');
        hidemenuLogo.classList.add('hidden');
    }
    else {
        d.classList.add('hidden');
        d.classList.remove('visible');
        hidemenuLogo.classList.remove('hidden');
    }
}

const text = "Welcome to Study Zone!";
let i = 0;
function typewriter() {
    if (i < text.length) {
        document.getElementById('typewriter').innerHTML += text.charAt(i);
        i++;
        setTimeout(typewriter, 100);
    }
    else {
        document.querySelector('.cursor').remove();
    }
}

typewriter();
