import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

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
    <div class="ask-ai-wrapper">
      <button id="ask-btn">Ask AI</button>
    </div>
    <div id="log-console"></div>
  `;

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

  // Three.js setup
  const canvas = container.querySelector('.threejs');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(1, 1, 1).normalize();
  scene.add(light);

  const clock = new THREE.Clock();
  let model = null;

  const loader = new GLTFLoader();
  loader.load('/models/glbs/fairy.glb', (gltf) => {
    model = gltf.scene;
    model.scale.set(1, 1, 1);
    model.position.set(0, -1, 0);
    scene.add(model);
  }, undefined, (error) => {
    console.error('Error loading model:', error);
  });

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  camera.position.z = 3;
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  let aiResponding = false;

  async function askAndSpeak(message) {
    if (aiResponding) return;
    aiResponding = true;
    askBtn.disabled = true;
    askBtn.textContent = 'Waiting...';

    try {
      const res = await fetch(`http://localhost:3000/chat?message=${encodeURIComponent(message)}`);
      const data = await res.json();
      const reply = data.response || "Sorry, I didn't get that.";
      logToConsole('AI', reply);
      speakMessage(reply);
      animateTalk();
    } catch (err) {
      console.error('Chat fetch error:', err);
      speakMessage("There was a problem talking to the AI.");
    }
  }

  function speakMessage(text) {
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.onend = () => {
      // Wait a short moment to ensure speechSynthesis.speaking is actually false
      setTimeout(() => {
        aiResponding = false;
        askBtn.disabled = false;
        askBtn.textContent = isListening ? 'Stop' : 'Ask AI';

        if (isListening && recognition) {
          recognition.start(); // restart speech recognition after AI finishes
        }
      }, 200); // 200ms delay to ensure speech has actually ended
    };

    speechSynthesis.speak(utterance);
  }

  function animateTalk() {
    if (!model) return;
    let t = 0;
    const head = model.getObjectByName('Head') || model;
    const interval = setInterval(() => {
      head.rotation.y = Math.sin(t) * 0.1;
      t += 0.1;
      if (!speechSynthesis.speaking) {
        head.rotation.y = 0;
        clearInterval(interval);
      }
    }, 50);
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition;
  let silenceTimer;
  let finalTranscript = '';
  let isListening = false;
  const askBtn = container.querySelector('#ask-btn');

  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }

      resetSilenceTimer(() => {
        const cleaned = finalTranscript.trim();
        if (cleaned) {
          logToConsole('User', cleaned);
          askAndSpeak(cleaned);
          finalTranscript = '';
          recognition.stop();

          if (isListening) {
            setTimeout(() => recognition.start(), 1000); // restart after reply
          }
        }
      });
    };

    recognition.onerror = (e) => {
      console.error('Speech recognition error:', e.error);
    };
  } else {
    alert('Your browser does not support Speech Recognition');
  }

  askBtn.addEventListener('click', () => {
    if (!recognition || aiResponding) return;

    if (!isListening) {
      isListening = true;
      finalTranscript = '';
      speechSynthesis.cancel();
      recognition.start();
      askBtn.textContent = 'Stop';
      askBtn.classList.add('stop');
    } else {
      isListening = false;
      recognition.stop();
      askBtn.textContent = 'Ask AI';
      askBtn.classList.remove('stop');
    }
  });

  function resetSilenceTimer(callback) {
    if (silenceTimer) clearTimeout(silenceTimer);
    silenceTimer = setTimeout(callback, 5000);
  }

  function logToConsole(type, text) {
    const logBox = container.querySelector('#log-console');
    const entry = document.createElement('div');
    entry.textContent = `${type}: ${text}`;
    entry.style.color = type === 'User' ? 'blue' : 'green';
    logBox.appendChild(entry);
    logBox.scrollTop = logBox.scrollHeight;
  }

  return container;
}
