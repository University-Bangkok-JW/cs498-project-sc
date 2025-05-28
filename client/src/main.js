import Login from './pages/Login.js';
import Home from './pages/Home.js';
import Logout from './pages/Logout.js';
import Learning from './pages/Learning.js';

const page = location.pathname;
const app = document.getElementById('app');

// Get user object from cache
function getCachedUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

// Render page with user if authenticated
function loadPage(pageFn) {
  const user = getCachedUser();
  if (!user) {
    location.href = '/';
    return;
  }
  app.appendChild(pageFn({
    id: user.user_id,
    name: user.user_name,
    role: user.user_role
  }));
}

// Init router
function init() {
  app.innerHTML = ''; // Clear previous content
  const user = getCachedUser();

  if (page === '/' || page === '/login') {
    if (user) {
      location.href = '/home';
      return;
    }
    app.appendChild(Login());
  } else if (page === '/home') {
    loadPage(Home);
  } else if (page === '/logout') {
    app.appendChild(Logout());
  } else if (page === '/learning') {
    loadPage(Learning);
  } else {
    // Fallback for undefined routes
    location.href = '/home';
  }
}

init();
