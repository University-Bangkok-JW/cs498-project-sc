export default function Learning() {
  const container = document.createElement('div');

  container.innerHTML = `
    <header class="header">
      <img src="/images/logo2.png" alt="Kubota Logo" class="logo">
      <div class="dropdown">
        <img src="/images/menu.png" alt="Menu" class="menu-icon" id="menu-icon">
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
        <p><strong>ID :</strong> <span id="user-id"></span></p>
        <p><strong>Name :</strong> <span id="user-name"></span></p>
        <p><strong>Position :</strong> <span id="user-role"></span></p>
      </div>
      <nav class="menu">
        <a href="/home" class="menu-item">E-Learning <span></span></a>
      </nav>
      <nav class="menu2">
        <a href="/home" class="menu2-item">Learning <span>→</span></a>
      </nav>
      <div class="sidebar-footer">
        <button class="icon-button">
          <img src="/images/settings-icon.png" alt="Settings">
        </button>
        <button class="icon-button">
          <img src="/images/mic-icon.png" alt="Microphone">
        </button>
      </div>
    </aside>

    <main class="content">
      <div id="unity-container" class="unity-desktop">
        <canvas id="unity-canvas" width="960" height="600" tabindex="-1"></canvas>
        <div id="unity-loading-bar">
          <div id="unity-logo"></div>
          <div id="unity-progress-bar-empty">
            <div id="unity-progress-bar-full"></div>
          </div>
        </div>
        <div id="unity-warning"> </div>
        <div id="unity-footer">
          <div id="unity-logo-title-footer"></div>
          <div id="unity-fullscreen-button"></div>
          <div id="unity-build-title">Base-AI-Project</div>
        </div>
      </div>
    </main>
  `;

  // Dropdown toggle
  container.querySelector('#menu-icon').addEventListener('click', () => {
    container.querySelector('#myDropdown').classList.toggle('show');
  });

  // Close dropdown when clicking outside
  window.addEventListener('click', (event) => {
    if (!event.target.matches('.menu-icon')) {
      const dropdown = container.querySelector('#myDropdown');
      if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
      }
    }
  });

  return container;
}
