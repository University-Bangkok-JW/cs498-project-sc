import Login from './pages/Login.js';
import Home from './pages/Home.js';
import Logout from './pages/Logout.js';
import Learning from './pages/Learning.js';

const page = location.pathname;
const app = document.getElementById('app');

function init() {
  app.innerHTML = ''; // Clear content
  const username = localStorage.getItem('username');

  if (page === '/' || page === '/login') {
    if (username) {
      location.href = '/home';
      return;
    }
    app.appendChild(Login());
  } else if (page === '/home') {
    if (!username) {
      location.href = '/';
      return;
    }
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
  } else if (page === '/logout') {
    app.appendChild(Logout());
  } else if (page === '/learning') {
    if (!username) {
      location.href = '/';
      return;
    }
    fetch(`http://localhost:3000/api/user/${encodeURIComponent(username)}`, {
      credentials: 'include',
    })
      .then(res => {
        if (!res.ok) throw new Error('User fetch failed');
        return res.json();
      })
      .then(user => {
        app.appendChild(Learning({ id: user.user_id, name: user.user_name, role: user.user_role }));
      })
      .catch(err => {
        console.error('Failed to load user:', err);
        app.innerHTML = '<p>Failed to load user data. <a href="/login">Retry login</a></p>';
      });
  } else {
    location.href = '/home';
  }
}

init();
