export default function Logout() {
  localStorage.removeItem('user');
  window.location.href = '/login';

  const container = document.createElement('div');
  container.innerText = 'Logging out...';

  function cleanup() {
    // No ongoing processes to clean, but placeholder kept for consistency
  }

  return { container, cleanup };
}
