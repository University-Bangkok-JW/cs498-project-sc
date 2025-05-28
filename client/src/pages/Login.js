export default function Login() {
  const container = document.createElement('div');
  container.innerHTML = `
    <form id="login-form" style="max-width: 300px; margin: auto;">
      <h2>Login</h2>
      <input name="user_name" type="text" placeholder="Username" required class="form-control" />
      <input name="password" type="password" placeholder="Password" required class="form-control" />
      <button type="submit" class="btn btn-primary mt-2">Login</button>
    </form>
  `;

  container.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const res = await fetch('/login', {
      method: 'POST',
      body: new URLSearchParams(formData),
      credentials: 'include',
    });
    if (res.ok) {
      alert("Login successful");
    } else {
      alert("Login failed");
    }
  });

  return container;
}
