import * as THREE from 'three';

export default function Learning({ id, name, role }) {
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
        <p><strong>ID :</strong> ${id}</p>
        <p><strong>Name :</strong> ${name}</p>
        <p><strong>Position :</strong> ${role}</p>
      </div>
      <nav class="menu">
        <a href="/home" class="menu-item">E-Learning <span></span></a>
      </nav>
      <nav class="menu2">
        <a href="/learning" class="menu2-item">Learning <span>→</span></a>
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

    <canvas class="threejs" style="width: 100%; height: 100vh; display: block;"></canvas>
  `;

  // Dropdown toggle
  container.querySelector('#menu-icon').addEventListener('click', () => {
    container.querySelector('#myDropdown').classList.toggle('show');
  });

  window.addEventListener('click', (event) => {
    if (!event.target.matches('.menu-icon')) {
      const dropdown = container.querySelector('#myDropdown');
      if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
      }
    }
  });

  // Three.js rendering
  const canvas = container.querySelector('.threejs');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);

  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 5;

  function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  }

  animate();

  return container;
}
