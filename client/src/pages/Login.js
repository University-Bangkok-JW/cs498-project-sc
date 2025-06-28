export default function Login() {
  const container = document.createElement('div');
  container.className = 'login-container';
  container.innerHTML = `
    <!-- ส่วนของโลโก้ -->
    <div class="logo">
      <img src="/images/logo.png" alt="Kubota Logo">
    </div>

    <!-- ส่วนของฟอร์ม -->
    <div class="form-container">
      <form id="login-form">
        <input type="text" name="user_name" class="form-control" placeholder="Enter your Username" required>
        <input type="password" name="password" class="form-control" placeholder="Enter your Password" required>
        <button type="submit" class="btn btn-login">เข้าสู่ระบบ</button>
      </form>
    </div>
  `;

  const form = container.querySelector('#login-form');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get('user_name');
    const password = formData.get('password');

    try {
      const res = await fetch('http://localhost:3000/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          user_name: username,
          password: password,
        }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        alert(error || "Login failed");
        return;
      }

      const { user } = await res.json();
      localStorage.setItem('user', JSON.stringify(user));
      location.href = '/home';
    } catch (err) {
      alert("Network error or server down.");
      console.error("Login error:", err);
    }
  };

  form.addEventListener('submit', handleSubmit);

  function cleanup() {
    form.removeEventListener('submit', handleSubmit);
  }

  return { container, cleanup };
}
