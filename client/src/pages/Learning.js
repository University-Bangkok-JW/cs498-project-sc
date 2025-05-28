export default function Learning() {
  // Redirect to static learning.html
  window.location.href = '/learning.html';

  // Optional loading message before redirect
  const div = document.createElement('div');
  div.innerText = 'Loading learning content...';
  return div;
}
