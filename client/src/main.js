import Login from './pages/Login.js';
import Home from './pages/Home.js';

const page = location.pathname;
const app = document.getElementById('app');

// Clear any existing content
app.innerHTML = '';

if (page === '/login' || page === '/') {
  // Render the login form
  const loginComponent = Login();
  app.appendChild(loginComponent);
} else if (page === '/home') {
  const username = localStorage.getItem('username');

  if (!username) {
    app.innerHTML = '<p>Please log in first. <a href="/login">Go to login</a></p>';
    return;
  }

  // Fetch user info from backend
  fetch(`http://localhost:3000/api/user/${encodeURIComponent(username)}`, {
    credentials: 'include',
  })
    .then(res => {
      if (!res.ok) throw new Error('User fetch failed');
      return res.json();
    })
    .then(user => {
      const homeComponent = Home({
        id: user.user_id,
        name: user.user_name,
        role: user.user_role
      });
      app.appendChild(homeComponent);
    })
    .catch(err => {
      console.error('Failed to load user:', err);
      app.innerHTML = '<p>Failed to load user data. <a href="/login">Retry login</a></p>';
    });
}
