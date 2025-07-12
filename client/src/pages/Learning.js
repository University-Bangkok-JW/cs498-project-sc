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

    <div class="ai-model-wrapper"><canvas class="threejs" style="width: 300px; height: 300px;"></canvas></div>
    <div class="ask-ai-wrapper">
      <button id="ask-btn">Ask AI</button><br>
      <select id="lang-select">
        <option value="th-TH">🇹🇭 Thai</option>
        <option value="en-US">🇺🇸 English</option>
      </select>
    </div>
    <div id="log-console"></div>
  `;

  // --- Menu Dropdown ---
  const dropdownToggle = container.querySelector('#menu-icon');
  const dropdown = container.querySelector('#myDropdown');
  const dropdownHandler = () => dropdown.classList.toggle('show');
  const outsideClickHandler = (event) => {
    if (!event.target.matches('.menu-icon')) {
      dropdown.classList.remove('show');
    }
  };
  dropdownToggle.addEventListener('click', dropdownHandler);
  window.addEventListener('click', outsideClickHandler);

  // --- Three.js Setup ---
  const canvas = container.querySelector('.threejs');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(1, 1, 1).normalize();
  scene.add(light);

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

  let animationFrameId;
  function animate() {
    animationFrameId = requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  camera.position.z = 3;
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // --- Voice and AI Interaction ---
  const askBtn = container.querySelector('#ask-btn');
  const langSelect = container.querySelector('#lang-select');
  let currentLang = langSelect.value;
  let aiResponding = false;
  let conversationHistory = [];
  let isListening = false;
  let finalTranscript = '';
  let silenceTimer = null;
  let recognition = null;
  let talkInterval = null;
  let availableVoices = [];

  // Load voices when available
  speechSynthesis.onvoiceschanged = () => {
    availableVoices = speechSynthesis.getVoices();
  };
  speechSynthesis.getVoices();

  langSelect.addEventListener('change', () => {
    currentLang = langSelect.value;
    if (recognition) recognition.lang = currentLang;
  });

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.lang = currentLang;
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      if (aiResponding) return;
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
          if (isListening) setTimeout(() => recognition.start(), 1000);
        }
      });
    };

    recognition.onerror = (e) => {
      console.error('Speech recognition error:', e.error);
      if (e.error === 'no-speech') {
        logToConsole('System', 'No speech detected. Please try again.');
        if (isListening && !aiResponding) {
          recognition.stop();
          setTimeout(() => recognition.start(), 500);
        }
      } else if (e.error === 'network') {
        logToConsole('System', 'Network error. Check your connection.');
      } else if (e.error === 'not-allowed') {
        logToConsole('System', 'Microphone access denied.');
      } else {
        logToConsole('System', `Speech error: ${e.error}`);
      }
    };
  } else {
    alert('Your browser does not support Speech Recognition');
  }

  askBtn.addEventListener('click', () => {
    if (!recognition || aiResponding) return;
    isListening = !isListening;
    if (isListening) {
      finalTranscript = '';
      speechSynthesis.cancel();
      recognition.lang = currentLang;
      recognition.start();
      askBtn.textContent = 'Stop';
      askBtn.classList.add('stop');
    } else {
      recognition.stop();
      askBtn.textContent = 'Ask AI';
      askBtn.classList.remove('stop');
      conversationHistory = [];
    }
  });

  function speakMessage(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = currentLang;

    const voice = availableVoices.find(v => v.lang === currentLang);
    if (voice) utterance.voice = voice;

    utterance.onend = () => {
      setTimeout(() => {
        aiResponding = false;
        askBtn.disabled = false;
        askBtn.textContent = isListening ? 'Stop' : 'Ask AI';
        if (isListening && recognition) recognition.start();
      }, 200);
    };

    speechSynthesis.speak(utterance);
  }

  function animateTalk() {
    if (!model) return;
    let t = 0;
    const head = model.getObjectByName('Head') || model;
    talkInterval = setInterval(() => {
      head.rotation.y = Math.sin(t) * 0.1;
      t += 0.1;
      if (!speechSynthesis.speaking) {
        head.rotation.y = 0;
        clearInterval(talkInterval);
      }
    }, 50);
  }

  async function askAndSpeak(message) {
    if (aiResponding) return;
    aiResponding = true;
    askBtn.disabled = true;
    askBtn.textContent = 'Waiting...';

    conversationHistory.push(`User: ${message}`);
    const combinedMessage = conversationHistory.join('\n');

    try {
      const res = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          lang: currentLang,
          message: combinedMessage
        })
      });

      const data = await res.json();
      const reply = data.response || "Sorry, I didn't get that.";
      conversationHistory.push(`AI: ${reply}`);
      logToConsole('AI', reply);
      askBtn.textContent = 'Answering...';
      speakMessage(reply);
      animateTalk();
    } catch (err) {
      console.error('Chat fetch error:', err);
      speakMessage("There was a problem talking to the AI.");
    }
  }

  function logToConsole(type, text) {
    const logBox = container.querySelector('#log-console');
    const entry = document.createElement('div');
    entry.innerHTML = `<strong>${type}:</strong> ${text}`;
    logBox.appendChild(entry);
    logBox.scrollTop = logBox.scrollHeight;
  }

  function resetSilenceTimer(callback) {
    if (silenceTimer) clearTimeout(silenceTimer);
    silenceTimer = setTimeout(callback, 3000);
  }

  function cleanup() {
    cancelAnimationFrame(animationFrameId);
    renderer.dispose();
    scene.clear();
    if (recognition) recognition.abort();
    speechSynthesis.cancel();
    if (talkInterval) clearInterval(talkInterval);
    window.removeEventListener('click', outsideClickHandler);
    dropdownToggle.removeEventListener('click', dropdownHandler);
  }

  return { container, cleanup };
}
