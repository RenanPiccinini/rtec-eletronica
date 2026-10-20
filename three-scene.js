/**
 * RTEC Eletrônica - Interactive 3D Background Canvas
 * Powered by Three.js
 */

(function () {
  'use strict';

  if (typeof THREE === 'undefined') {
    console.warn('Three.js not loaded. Skipping 3D scene initialization.');
    return;
  }

  const canvas = document.getElementById('bg-3d-canvas');
  if (!canvas) return;

  // 1. Scene, Camera, Renderer Setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 80;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // 2. Cybernetic Particle Matrix (1,400 glowing electronic nodes)
  const particleCount = 1400;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  const cyan = new THREE.Color(0x00f0ff);
  const blue = new THREE.Color(0x0066ff);
  const white = new THREE.Color(0xffffff);

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    // Spread in 3D space
    positions[i3] = (Math.random() - 0.5) * 220;
    positions[i3 + 1] = (Math.random() - 0.5) * 160;
    positions[i3 + 2] = (Math.random() - 0.5) * 180;

    // Mixed colors: 65% cyan, 25% blue, 10% pure white
    const rand = Math.random();
    let mixedColor;
    if (rand < 0.65) {
      mixedColor = cyan;
    } else if (rand < 0.9) {
      mixedColor = blue;
    } else {
      mixedColor = white;
    }

    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  // Circular glow texture generated dynamically on canvas
  function createParticleTexture() {
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 64;
    pCanvas.height = 64;
    const ctx = pCanvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.3, 'rgba(0,240,255,0.8)');
    grad.addColorStop(0.7, 'rgba(0,102,255,0.2)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.Texture(pCanvas);
    texture.needsUpdate = true;
    return texture;
  }

  const particleMaterial = new THREE.PointsMaterial({
    size: 2.2,
    vertexColors: true,
    map: createParticleTexture(),
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const particleSystem = new THREE.Points(geometry, particleMaterial);
  scene.add(particleSystem);

  // 3. Floating 3D Geometric Circuit Crystals (Holographic Icosahedrons)
  const crystalGroup = new THREE.Group();

  function createHolographicCrystal(radius, x, y, z) {
    const geo = new THREE.IcosahedronGeometry(radius, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending
    });
    const crystal = new THREE.Mesh(geo, wireMat);
    crystal.position.set(x, y, z);
    crystal.userData = {
      rotX: (Math.random() - 0.5) * 0.015,
      rotY: (Math.random() - 0.5) * 0.015,
      rotZ: (Math.random() - 0.5) * 0.015,
      baseY: y
    };
    return crystal;
  }

  const crystals = [
    createHolographicCrystal(12, 50, 20, -40),
    createHolographicCrystal(8, -55, -25, -20),
    createHolographicCrystal(15, -45, 35, -60),
    createHolographicCrystal(10, 60, -35, -50),
    createHolographicCrystal(7, 25, 45, -30)
  ];

  crystals.forEach(c => crystalGroup.add(c));
  scene.add(crystalGroup);

  // 4. Digital Undulating Ground Grid
  const gridWidth = 240;
  const gridDepth = 240;
  const gridSegments = 40;
  const gridGeo = new THREE.PlaneGeometry(gridWidth, gridDepth, gridSegments, gridSegments);
  gridGeo.rotateX(-Math.PI / 2);
  gridGeo.translate(0, -60, 0);

  const gridMat = new THREE.MeshBasicMaterial({
    color: 0x0055aa,
    wireframe: true,
    transparent: true,
    opacity: 0.18,
    blending: THREE.AdditiveBlending
  });

  const cyberGrid = new THREE.Mesh(gridGeo, gridMat);
  scene.add(cyberGrid);

  // Original grid vertices for wave motion
  const gridPositions = gridGeo.attributes.position.array;
  const originalY = new Float32Array(gridPositions.length / 3);
  for (let i = 0; i < originalY.length; i++) {
    originalY[i] = gridPositions[i * 3 + 1];
  }

  // 5. Interaction: Mouse Move & Scroll Parallax
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;
  let scrollY = 0;
  let targetScrollY = 0;

  window.addEventListener('mousemove', (e) => {
    // Normalized to [-1, 1]
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
  });

  // 6. Animation Loop (60 FPS)
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // Smooth Lerp for Mouse Parallax
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;
    targetScrollY += (scrollY - targetScrollY) * 0.08;

    // Camera Reactivity (Tilt & Pan)
    camera.position.x = targetX * 12;
    camera.position.y = targetY * 8 - (targetScrollY * 0.04);
    camera.lookAt(0, - (targetScrollY * 0.04), 0);

    // Rotate particle system slowly
    particleSystem.rotation.y = elapsedTime * 0.03;
    particleSystem.rotation.x = targetY * 0.15;

    // Rotate crystals
    crystals.forEach((c, idx) => {
      c.rotation.x += c.userData.rotX;
      c.rotation.y += c.userData.rotY;
      c.rotation.z += c.userData.rotZ;
      c.position.y = c.userData.baseY + Math.sin(elapsedTime * 1.5 + idx) * 3;
    });

    // Wave effect on digital floor
    for (let i = 0; i < originalY.length; i++) {
      const u = (i % (gridSegments + 1)) / gridSegments;
      const v = Math.floor(i / (gridSegments + 1)) / gridSegments;
      gridPositions[i * 3 + 1] = originalY[i] + Math.sin(elapsedTime * 1.5 + u * 8 + v * 8) * 3;
    }
    gridGeo.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }

  animate();

  // 7. Responsive Window Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });
})();
