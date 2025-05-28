export default function Logout() {
  // Clear localStorage
  localStorage.removeItem('username');

  // Optionally, clear other stored items (like tokens, etc.)
  // localStorage.clear();

  // Redirect to login page
  window.location.href = '/login';

  // Return an empty element in case this is rendered before redirect
  const container = document.createElement('div');
  container.innerText = 'Logging out...';
  return container;
}
