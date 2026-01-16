document.addEventListener('DOMContentLoaded', () => {
  console.log('Application Loaded');

  // Example interaction: precise hover effects or dynamic greeting
  const heroTitle = document.querySelector('h1');
  if (heroTitle) {
    heroTitle.style.opacity = '0';
    heroTitle.style.transform = 'translateY(20px)';
    heroTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

    setTimeout(() => {
      heroTitle.style.opacity = '1';
      heroTitle.style.transform = 'translateY(0)';
    }, 100);
  }
  // About Page Logic
  const aboutEditor = document.getElementById('about-editor');
  const saveBtn = document.getElementById('save-about-btn');

  if (aboutEditor && saveBtn) {
    // Load saved content
    const savedContent = localStorage.getItem('aboutContent');
    if (savedContent) {
      aboutEditor.innerText = savedContent;
    }

    saveBtn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.setItem('aboutContent', aboutEditor.innerText);
      alert('Content saved successfully!');
    });
  }

  // Gallery Logic
  const fileInput = document.getElementById('gallery-input');
  const galleryGrid = document.querySelector('.gallery-grid');

  if (fileInput && galleryGrid) {
    fileInput.addEventListener('change', (e) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        Array.from(files).forEach(file => {
          if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
              const imgContainer = document.createElement('div');
              imgContainer.className = 'gallery-item';
              const img = document.createElement('img');
              img.src = e.target.result;
              imgContainer.appendChild(img);
              galleryGrid.prepend(imgContainer); // Add new images to the top
            };
            reader.readAsDataURL(file);
          }
        });
      }
    });
  }

  // Game Logic
  const gameButtons = document.querySelectorAll('.play-game-btn');
  const gameMenu = document.getElementById('game-selection-menu');
  const activeGameContainer = document.getElementById('active-game-container');
  const gameBoardArea = document.getElementById('game-board-area');
  const backBtn = document.getElementById('back-to-menu-btn');
  const currentGameTitle = document.getElementById('current-game-title');
  const gameControlsInfo = document.getElementById('game-controls-info');
  const scoreDisplay = document.getElementById('game-score-display');

  let currentGameInstance = null;

  if (gameButtons.length > 0 && gameMenu && activeGameContainer) {
    gameButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const gameName = btn.getAttribute('data-game');
        startGame(gameName);
      });
    });

    backBtn.addEventListener('click', () => {
      stopGame();
    });
  }

  function startGame(gameName) {
    if (!window.Games || !window.Games[gameName]) {
      alert('Game not found or failed to load.');
      return;
    }

    // Switch View
    gameMenu.style.display = 'none';
    activeGameContainer.style.display = 'block';
    currentGameTitle.textContent = gameName.charAt(0).toUpperCase() + gameName.slice(1);
    scoreDisplay.textContent = "Score: 0";

    // Initialize Game
    const gameModule = window.Games[gameName];
    currentGameInstance = gameModule.init(gameBoardArea, (score) => {
      scoreDisplay.textContent = `Score: ${score}`;
    });

    if (currentGameInstance.controls) {
      gameControlsInfo.textContent = currentGameInstance.controls;
    } else {
      gameControlsInfo.textContent = '';
    }
  }

  function stopGame() {
    if (currentGameInstance && currentGameInstance.cleanup) {
      currentGameInstance.cleanup();
    }
    currentGameInstance = null;

    // Clear Board
    gameBoardArea.innerHTML = '';

    // Switch View
    activeGameContainer.style.display = 'none';
    gameMenu.style.display = 'grid'; // Restore grid layout
  }
});
