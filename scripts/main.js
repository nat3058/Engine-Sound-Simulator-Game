// DOM Elements
const gameTitle = document.getElementById('game-title');
const gameDescription = document.getElementById('game-description');
const ctaButton = document.getElementById('cta-button');
// const playSoundButton = document.getElementById('play-sound-button');
const playTrailerButton = document.getElementById('play-trailer');
const videoPlaceholder = document.getElementById('video-placeholder');
const youtubeEmbed = document.getElementById('youtube-embed');
const cursorFollower = document.getElementById('cursor-follower');
// const hoverSound = document.getElementById('hover-sound');
const engineSample = document.getElementById('engine-sample');

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  initAnimations();
  initScrollReveal();
  initCursorEffect();
  initSoundEffects();
  initParticles();
  initVideo(); // Add video initialization
});

// Initialize video
function initVideo() {
  const iframe = document.createElement('iframe');
  iframe.setAttribute('width', '100%');
  iframe.setAttribute('height', '100%');
  iframe.setAttribute('src', 'https://www.youtube.com/embed/TpT32dbIGWU/?vq=hd1080'); // Removed mute=1
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
  iframe.setAttribute('allowfullscreen', '');
  
  youtubeEmbed.innerHTML = '';
  youtubeEmbed.appendChild(iframe);
  youtubeEmbed.classList.remove('hidden');
  videoPlaceholder.style.display = 'none';
}

// Initialize Animations
function initAnimations() {
  const elements = [gameTitle, gameDescription, ctaButton];
  elements.forEach((element, index) => {
    setTimeout(() => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, 100);
    }, index * 200);
  });
}

// Scroll reveal effect
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  function checkReveal() {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;
    
    revealElements.forEach(element => {
      const revealTop = element.getBoundingClientRect().top;
      
      if (revealTop < windowHeight - revealPoint) {
        element.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', checkReveal);
  checkReveal();
}

// Custom cursor effect
function initCursorEffect() {
  document.addEventListener('mousemove', (e) => {
    if (cursorFollower.style.opacity === '0') {
      cursorFollower.style.opacity = '1';
    }
    
    requestAnimationFrame(() => {
      cursorFollower.style.left = `${e.clientX}px`;
      cursorFollower.style.top = `${e.clientY}px`;
    });
  });
  
  const interactiveElements = document.querySelectorAll('a, button');
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursorFollower.style.width = '40px';
      cursorFollower.style.height = '40px';
      cursorFollower.style.backgroundColor = 'rgba(64, 156, 255, 0.4)';
    });
    
    element.addEventListener('mouseleave', () => {
      cursorFollower.style.width = '20px';
      cursorFollower.style.height = '20px';
      cursorFollower.style.backgroundColor = 'rgba(64, 156, 255, 0.5)';
    });
  });
  
  document.addEventListener('mouseout', (e) => {
    if (e.relatedTarget === null) {
      cursorFollower.style.opacity = '0';
    }
  });
}

// Sound effects
function initSoundEffects() {
  const interactiveElements = document.querySelectorAll('a, button');
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      // playHoverSound();
    });
  });
  
  // playSoundButton.addEventListener('click', () => {
  //   engineSample.currentTime = 0;
  //   engineSample.play();
    
  //   playSoundButton.classList.add('animate-pulse');
  //   setTimeout(() => {
  //     playSoundButton.classList.remove('animate-pulse');
  //   }, 3000);
  // });
}

// Play hover sound with random pitch
function playHoverSound() {
  hoverSound.volume = 0.2;
  hoverSound.playbackRate = 0.8 + Math.random() * 0.4;
  hoverSound.currentTime = 0;
  hoverSound.play().catch(error => {
    console.log("Audio play was prevented:", error);
  });
}

// Create particles
function initParticles() {
  const particleCount = 20;
  const container = document.body;
  
  for (let i = 0; i < particleCount; i++) {
    createParticle(container);
  }
}

function createParticle(container) {
  const particle = document.createElement('div');
  particle.classList.add('particle');
  
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;
  const size = Math.random() * 4 + 1;
  const opacity = Math.random() * 0.5 + 0.1;
  
  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.opacity = opacity;
  
  container.appendChild(particle);
  animateParticle(particle);
}

function animateParticle(particle) {
  const duration = Math.random() * 15 + 10;
  const xMovement = Math.random() * 100 - 50;
  const yMovement = Math.random() * 100 - 50;
  
  particle.style.transition = `all ${duration}s linear`;
  
  setTimeout(() => {
    particle.style.transform = `translate(${xMovement}px, ${yMovement}px)`;
    particle.style.opacity = '0';
    
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
        createParticle(document.body);
      }
    }, duration * 1000);
  }, 100);
}

// Parallax effect
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  document.body.style.backgroundPosition = `center ${scrolled * 0.05}px`;
});