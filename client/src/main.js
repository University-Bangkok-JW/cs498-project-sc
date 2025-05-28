import Login from './pages/Login.js';
import Home from './pages/Home.js';

const page = location.pathname;
const app = document.getElementById('app');

function init() {
  app.innerHTML = ''; // Clear content

  if (page === '/login' || page === '/') {
    app.appendChild(Login());
  } else if (page === '/home') {
    const username = localStorage.getItem('username');

    if (!username) return (location.href = '/');

    fetch(`http://localhost:3000/api/user/${encodeURIComponent(username)}`, {
      credentials: 'include',
    })
      .then(res => {
        if (!res.ok) throw new Error('User fetch failed');
        return res.json();
      })
      .then(user => {
        app.appendChild(Home({ id: user.user_id, name: user.user_name, role: user.user_role }));
      })
      .catch(err => {
        console.error('Failed to load user:', err);
        app.innerHTML = '<p>Failed to load user data. <a href="/login">Retry login</a></p>';
      });
  }
}

init(); // Call the function to execute the logic
