import Login from './pages/Login.js';
import Home from './pages/Home.js';
import Logout from './pages/Logout.js';
import Learning from './pages/Learning.js';

const app = document.getElementById('app');
let cleanupCurrentPage = null;

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

  if (cleanupCurrentPage) {
    cleanupCurrentPage(); // Clean up from previous page
    cleanupCurrentPage = null;
  }

  app.innerHTML = ''; // Clear previous content

  const page = pageFn({
    id: user.user_id,
    name: user.user_name,
    role: user.user_role
  });

  if (page instanceof HTMLElement) {
    app.appendChild(page);
  } else {
    app.appendChild(page.container);
    cleanupCurrentPage = page.cleanup;
  }
}

// Init router
function init() {
  const page = location.pathname;
  const user = getCachedUser();

  if (cleanupCurrentPage) {
    cleanupCurrentPage();
    cleanupCurrentPage = null;
  }

  app.innerHTML = ''; // Clear previous content

  if (page === '/' || page === '/login') {
    if (user) {
      location.href = '/home';
      return;
    }
    const pageContent = Login();
    if (pageContent instanceof HTMLElement) {
      app.appendChild(pageContent);
    } else {
      app.appendChild(pageContent.container);
      cleanupCurrentPage = pageContent.cleanup;
    }
  } else if (page === '/home') {
    loadPage(Home);
  } else if (page === '/logout') {
    const pageContent = Logout();
    if (pageContent instanceof HTMLElement) {
      app.appendChild(pageContent);
    } else {
      app.appendChild(pageContent.container);
      cleanupCurrentPage = pageContent.cleanup;
    }
  } else if (page === '/learning') {
    loadPage(Learning);
  } else {
    location.href = '/home';
  }
}

// Optional: Clean up on page unload
window.addEventListener('beforeunload', () => {
  if (cleanupCurrentPage) cleanupCurrentPage();
});

init();
