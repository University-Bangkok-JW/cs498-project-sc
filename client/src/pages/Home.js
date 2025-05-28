export default function Home(user) {
  const container = document.createElement('div');
  container.innerHTML = `
    <header class="header">
      <img src="/images/logo2.png" alt="Kubota Logo" class="logo">
      <div class="dropdown">
        <img src="/images/menu.png" alt="เมนู" class="menu-icon" onclick="toggleDropdown()">
        <div id="myDropdown" class="dropdown-content">
          <a href="/home">หน้าแรก</a>
          <a href="/learning">สื่อการเรียนรู้</a>
          <a href="/logout" class="logout-link">ออกจากระบบ</a>
        </div>
      </div>
    </header>

    <aside class="sidebar">
      <div class="user-info">
        <img src="/images/avatar.png" alt="User Avatar">
        <p><strong>ID :</strong> <span id="user-id">${user?.id || '-'}</span></p>
        <p><strong>Name :</strong> <span id="user-name">${user?.name || '-'}</span></p>
        <p><strong>Position :</strong> <span id="user-role">${user?.role || '-'}</span></p>
      </div>
      <nav class="menu">
        <a href="/learning" class="menu-item">E-Learning <span>→</span></a>
      </nav>
    </aside>

    <main class="content">
      <div class="card-container">
        ${getLessonCards()}
      </div>
    </main>
  `;

  // Dropdown menu behavior
  container.querySelector('.menu-icon').addEventListener('click', () => {
    container.querySelector('#myDropdown').classList.toggle('show');
  });
  window.addEventListener('click', (e) => {
    if (!e.target.matches('.menu-icon')) {
      container.querySelectorAll('.dropdown-content.show').forEach(el => el.classList.remove('show'));
    }
  });

  // Logout logic: clear localStorage and redirect
  container.querySelector('.logout-link')?.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('username');
    location.href = '/login';
  });

  return container;
}

function getLessonCards() {
  const cards = [
    {
      img: 'https://p714apsi04wa01skcstorage.blob.core.windows.net/siamkubotacothblob/wp-content/uploads/2024/04/1.4.513-%C3%97-395-pixel.jpg',
      title: 'การแนะนำการส่งมอบโดรน',
      desc: 'เป็นบทเรียนข้อควรรู้เกี่ยวกับโดรนโดยที่จะมีการแนะนำถึงระบบต่างๆ เกี่ยวกับโดรนในเบื้องต้น'
    },
    {
      img: 'https://p714apsi04wa01skcstorage.blob.core.windows.net/siamkubotacothblob/wp-content/uploads/2022/03/pic-T30-s.jpg',
      title: 'DJI AGRAS T10,T30',
      desc: 'ความรู้ผลิตภัณฑ์โดรนเกษตร DJI รุ่น AGRAS T10,T30'
    },
    {
      img: 'https://p714apsi04wa01skcstorage.blob.core.windows.net/siamkubotacothblob/wp-content/uploads/2022/03/0e3d31b4ef6d9c34e9b4b6431cec12de.jpg',
      title: 'การแนะนำการใช้งานแทรกเตอร์',
      desc: 'เป็นบทเรียนข้อควรรู้เกี่ยวกับการใช้งานรถแทรกเตอร์'
    },
    {
      img: 'https://p714apsi04wa01skcstorage.blob.core.windows.net/siamkubotacothblob/wp-content/uploads/2022/03/da8ef31225789cef6baf56bbaf8c0180.png',
      title: 'KW4 & KW6',
      desc: 'ความรู้ผลิตภัณฑ์รถดำนา รุ่น KW4 และ KW6'
    },
  ];

  return cards.map(card => `
    <div class="card">
      <img src="${card.img}" alt="${card.title}">
      <div class="card-body">
        <h5>${card.title}</h5>
        <p>${card.desc}</p>
        <button class="btn-learn">Learn →</button>
      </div>
    </div>
  `).join('');
}
