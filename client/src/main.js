import Login from './pages/Login.js';
import Home from './pages/Home.js';

// Dummy user data — in real use, fetch this from API or session
const userData = {
  id: '123456',
  name: 'สมชาย ใจดี',
  role: 'Trainer'
};

const page = location.pathname;

const app = document.getElementById('app');
app.innerHTML = ''; // Clear any existing content

if (page === '/login' || page === '/') {
  app.appendChild(Login());
} else if (page === '/home') {
  app.appendChild(Home(userData));
}
