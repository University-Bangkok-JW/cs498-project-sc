export default function Logout() {
  // Clear all stored user data
  localStorage.removeItem('user');

  // Redirect to login
  window.location.href = '/login';

  const container = document.createElement('div');
  container.innerText = 'Logging out...';
  return container;
}
