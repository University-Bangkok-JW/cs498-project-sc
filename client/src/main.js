import Login from './pages/Login.js';

const page = location.pathname;

if (page === '/login' || page === '/') {
  document.getElementById('app').appendChild(Login());
}
