export default function Home({ id, name, role }) {
  const container = document.createElement('div');

  container.innerHTML = `
    <!-- Header -->
    <header class="header">
      <img src="/images/logo2.png" alt="Kubota Logo" class="logo">
      <div class="dropdown">
        <img src="/images/menu.png" alt="เมนู" class="menu-icon" id="menu-icon">
        <div id="myDropdown" class="dropdown-content">
          <a href="/home">หน้าแรก</a>
          <a href="/learning">สื่อการเรียนรู้</a>
          <a href="/logout" class="logout-link">ออกจากระบบ</a>
        </div>
      </div>
    </header>

    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="user-info">
        <img src="/images/avatar.png" alt="User Avatar">
        <p><strong>ID :</strong> ${id}</p>
        <p><strong>Name :</strong> ${name}</p>
        <p><strong>Position :</strong> ${role}</p>
      </div>
      <nav class="menu">
        <a href="/learning" class="menu-item">E-Learning <span>→</span></a>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="content">
      <div class="card-container">
        <div class="card">
          <img src="https://p714apsi04wa01skcstorage.blob.core.windows.net/siamkubotacothblob/wp-content/uploads/2024/04/1.4.513-%C3%97-395-pixel.jpg" alt="การแนะนำส่งมอบโดรน">
          <div class="card-body">
            <h5>การแนะนำการส่งมอบโดรน</h5>
            <p>เป็นบทเรียนข้อควรรู้เกี่ยวกับโดรนโดยที่จะมีการแนะนำถึงระบบต่างๆ เกี่ยวกับโดรนในเบื้องต้น</p>
            <button class="btn-learn">Learn →</button>
          </div>
        </div>
        <div class="card">
          <img src="https://p714apsi04wa01skcstorage.blob.core.windows.net/siamkubotacothblob/wp-content/uploads/2022/03/pic-T30-s.jpg" alt="DJI AGRAS T10,T30">
          <div class="card-body">
            <h5>DJI AGRAS T10,T30</h5>
            <p>ความรู้ผลิตภัณฑ์โดรนเกษตร DJI รุ่น AGRAS T10,T30</p>
            <button class="btn-learn">Learn →</button>
          </div>
        </div>
        <div class="card">
          <img src="https://p714apsi04wa01skcstorage.blob.core.windows.net/siamkubotacothblob/wp-content/uploads/2022/03/0e3d31b4ef6d9c34e9b4b6431cec12de.jpg" alt="AGRAS T20">
          <div class="card-body">
            <h5>การแนะนำการใช้งานแทรกเตอร์</h5>
            <p>เป็นบทเรียนข้อควรรู้เกี่ยวกับการใช้งานรถแทรกเตอร์</p>
            <button class="btn-learn">Learn →</button>
          </div>
        </div>
        <div class="card">
          <img src="https://p714apsi04wa01skcstorage.blob.core.windows.net/siamkubotacothblob/wp-content/uploads/2022/03/da8ef31225789cef6baf56bbaf8c0180.png" alt="KW4 & KW6">
          <div class="card-body">
            <h5>KW4 & KW6</h5>
            <p>ความรู้ผลิตภัณฑ์รถดำนา รุ่น KW4 และ KW6</p>
            <button class="btn-learn">Learn →</button>
          </div>
        </div>
      </div>
    </main>
  `;

  // Toggle dropdown logic
  const menuIcon = container.querySelector('#menu-icon');
  const dropdown = container.querySelector('#myDropdown');
  menuIcon.addEventListener('click', () => {
    dropdown.classList.toggle('show');
  });

  window.addEventListener('click', (event) => {
    if (!event.target.matches('#menu-icon')) {
      if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
      }
    }
  });

  return container;
}
