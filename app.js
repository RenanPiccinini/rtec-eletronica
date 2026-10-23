/**
 * RTEC Eletrônica - Core Web Application Logic
 * 3D Card Tilt, Parallax Scroll, Diagnostic Simulator, Cyber Audio FX
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // =====================================================================
  // 1. WEB AUDIO API - SYNTHESIZED CYBER SFX (ZERO ASSET DEPENDENCY)
  // =====================================================================
  let audioCtx = null;
  let sfxEnabled = false; // Default off, toggled by user

  const sfxToggleBtn = document.getElementById('sfx-toggle');
  const iconSoundOn = sfxToggleBtn?.querySelector('.icon-sound-on');
  const iconSoundOff = sfxToggleBtn?.querySelector('.icon-sound-off');

  function initAudio() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playCyberBlip(freq = 880, type = 'sine', duration = 0.08) {
    if (!sfxEnabled || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.8, audioCtx.currentTime + duration);

      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn('Audio FX error:', e);
    }
  }

  function playSuccessChord() {
    if (!sfxEnabled || !audioCtx) return;
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
      setTimeout(() => playCyberBlip(freq, 'triangle', 0.15), i * 60);
    });
  }

  if (sfxToggleBtn) {
    sfxToggleBtn.addEventListener('click', () => {
      sfxEnabled = !sfxEnabled;
      initAudio();
      if (sfxEnabled) {
        if (iconSoundOn) iconSoundOn.style.display = 'block';
        if (iconSoundOff) iconSoundOff.style.display = 'none';
        sfxToggleBtn.classList.add('active');
        playCyberBlip(900, 'sine', 0.1);
      } else {
        if (iconSoundOn) iconSoundOn.style.display = 'none';
        if (iconSoundOff) iconSoundOff.style.display = 'block';
        sfxToggleBtn.classList.remove('active');
      }
    });
  }

  // Bind clicks for all buttons for cyber sound
  document.querySelectorAll('button, .btn-primary-neon, .btn-secondary-cyber, .nav-link').forEach(el => {
    el.addEventListener('click', () => playCyberBlip(1200, 'sine', 0.05));
  });

  // =====================================================================
  // 2. NAVBAR SCROLL EFFECT & MOBILE MENU
  // =====================================================================
  const navbar = document.getElementById('navbar');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      hamburgerBtn.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburgerBtn.classList.remove('active');
      });
    });
  }

  // Active navigation highlight based on section scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // =====================================================================
  // 3. 3D CARD TILT WITH DYNAMIC SPECULAR SHINE
  // =====================================================================
  const tiltCards = document.querySelectorAll('[data-tilt]');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -12; // Inverted
      const rotateY = ((x - centerX) / centerX) * 12;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

      // Dynamic Glare effect
      let glare = card.querySelector('.card-dynamic-glare');
      if (!glare) {
        glare = document.createElement('div');
        glare.className = 'card-dynamic-glare';
        glare.style.position = 'absolute';
        glare.style.top = '0';
        glare.style.left = '0';
        glare.style.width = '100%';
        glare.style.height = '100%';
        glare.style.pointerEvents = 'none';
        glare.style.borderRadius = 'inherit';
        glare.style.mixBlendMode = 'overlay';
        glare.style.transition = 'opacity 0.2s ease';
        card.appendChild(glare);
      }
      glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 240, 255, 0.35) 0%, transparent 60%)`;
      glare.style.opacity = '1';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      const glare = card.querySelector('.card-dynamic-glare');
      if (glare) glare.style.opacity = '0';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
    });
  });

  // Hero Main 3D Card Special Tilt
  const heroCard3d = document.getElementById('heroCard3d');
  if (heroCard3d) {
    window.addEventListener('mousemove', (e) => {
      const rect = heroCard3d.getBoundingClientRect();
      // Only react if cursor is nearby or over viewport
      const x = (e.clientX - (rect.left + rect.width / 2)) / (window.innerWidth / 2);
      const y = (e.clientY - (rect.top + rect.height / 2)) / (window.innerHeight / 2);

      const rotX = -y * 18;
      const rotY = x * 18;

      heroCard3d.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });
  }

  // =====================================================================
  // 4. PARALLAX SCROLL FOR BACKGROUND LIGHTS & LABELS
  // =====================================================================
  const parallaxElements = document.querySelectorAll('[data-parallax]');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    parallaxElements.forEach(el => {
      const speed = parseFloat(el.getAttribute('data-parallax')) || 0.05;
      const yPos = -(scrollY * speed);
      el.style.transform = `translateY(${yPos}px)`;
    });

    // Parallax on Ambient Glow Orbs
    const glowCyan = document.querySelector('.glow-cyan');
    const glowBlue = document.querySelector('.glow-blue');
    const glowPurple = document.querySelector('.glow-purple');

    if (glowCyan) glowCyan.style.transform = `translate(${scrollY * 0.05}px, ${scrollY * 0.12}px)`;
    if (glowBlue) glowBlue.style.transform = `translate(${-scrollY * 0.08}px, ${-scrollY * 0.06}px)`;
    if (glowPurple) glowPurple.style.transform = `translate(${scrollY * 0.04}px, ${scrollY * 0.08}px)`;
  });

  // =====================================================================
  // 5. NUMBER COUNTER ANIMATION FOR STATS
  // =====================================================================
  const statNumbers = document.querySelectorAll('.stat-num[data-target]');
  let statsAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        statNumbers.forEach(numEl => {
          const target = parseInt(numEl.getAttribute('data-target'), 10);
          const duration = 1500;
          const start = 0;
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.floor(easeProgress * target);

            if (target > 100) {
              numEl.textContent = `+${currentVal.toLocaleString('pt-BR')}`;
            } else {
              numEl.textContent = `${currentVal}%`;
            }

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            }
          }
          requestAnimationFrame(updateCounter);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsStrip = document.querySelector('.stats-strip');
  if (statsStrip) observer.observe(statsStrip);

  // =====================================================================
  // 6. INTERACTIVE 3D DIAGNOSTIC SIMULATOR
  // =====================================================================
  let selectedEquipment = '';
  let selectedSymptom = '';

  const simStage1 = document.getElementById('simStage1');
  const simStage2 = document.getElementById('simStage2');
  const simStage3 = document.getElementById('simStage3');

  const dot1 = document.getElementById('dot1');
  const dot2 = document.getElementById('dot2');
  const dot3 = document.getElementById('dot3');

  const btnBackTo1 = document.getElementById('btnBackTo1');
  const btnRestartSim = document.getElementById('btnRestartSim');
  const selectedEquipPill = document.getElementById('selectedEquipPill');

  const resultDeviceTitle = document.getElementById('resultDeviceTitle');
  const resultSymptomVal = document.getElementById('resultSymptomVal');
  const resultProcedure = document.getElementById('resultProcedure');
  const btnSendWhatsappSim = document.getElementById('btnSendWhatsappSim');

  // Step 1: Select Equipment
  const equipButtons = document.querySelectorAll('.sim-btn-option');
  equipButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      selectedEquipment = btn.getAttribute('data-equip');
      if (selectedEquipPill) selectedEquipPill.textContent = selectedEquipment;

      simStage1.classList.remove('active');
      simStage2.classList.add('active');
      dot1.classList.remove('active');
      dot2.classList.add('active');

      playCyberBlip(1000, 'sine', 0.1);
    });
  });

  // Step 2: Select Symptom
  const symptomButtons = document.querySelectorAll('.sim-btn-symptom');
  symptomButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      selectedSymptom = btn.getAttribute('data-symptom');
      calculateDiagnosis(selectedEquipment, selectedSymptom);

      simStage2.classList.remove('active');
      simStage3.classList.add('active');
      dot2.classList.remove('active');
      dot3.classList.add('active');

      playSuccessChord();
    });
  });

  // Back from 2 to 1
  btnBackTo1?.addEventListener('click', () => {
    simStage2.classList.remove('active');
    simStage1.classList.add('active');
    dot2.classList.remove('active');
    dot1.classList.add('active');
    playCyberBlip(600, 'sine', 0.08);
  });

  // Restart Simulation
  btnRestartSim?.addEventListener('click', () => {
    simStage3.classList.remove('active');
    simStage1.classList.add('active');
    dot3.classList.remove('active');
    dot1.classList.add('active');
    selectedEquipment = '';
    selectedSymptom = '';
    playCyberBlip(600, 'sine', 0.08);
  });

  // Diagnostic Procedure Knowledge Matrix
  function calculateDiagnosis(equip, symptom) {
    if (resultDeviceTitle) resultDeviceTitle.textContent = `Equipamento: ${equip}`;
    if (resultSymptomVal) resultSymptomVal.textContent = symptom;

    let procedureText = '';
    const isMacBook = equip.toLowerCase().includes('macbook') || equip.toLowerCase().includes('apple');

    if (isMacBook) {
      if (symptom.includes('Não liga nada')) {
        procedureText = `Para ${equip}: Análise técnica avançada da placa lógica (Logic Board) sob microscópio óptico. Mapeamento de linhas principais (PPBUS_G3H, PP3V3_G3H e PMIC). Teste de negociação USB-C (5V a 20V) e substituição de chips de carga (CD3217/ISL9240) ou eliminação de curtos em capacitores SMD, recuperando a placa lógica original sem necessidade de substituição completa.`;
      } else if (symptom.includes('sem imagem') || symptom.includes('Tela preta')) {
        procedureText = `Para ${equip}: Diagnóstico do circuito de backlight (retroiluminação) e sinal de vídeo EDP. Verificação do fusível de backlight, diodo elevador, circuito do sensor de ângulo da tampa (hall sensor) e reparo de cabo flexível ou circuito integrado multiplexador de vídeo no padrão Apple.`;
      } else if (symptom.includes('líquido') || symptom.includes('Curto')) {
        procedureText = `Para ${equip} (Urgência Apple - Desoxidação): Banho químico em cuba ultrassônica industrial para estancar corrosão galvânica em componentes BGA. Reconstrução de trilhas microscópicas da Logic Board com fio de cobre esmaltado, preservando memória SSD integrada e os dados do cliente.`;
      } else if (symptom.includes('Superaquecimento') || symptom.includes('Desliga')) {
        procedureText = `Para ${equip}: Manutenção térmica de precisão unibody. Higienização das ventoinhas e dutos de exaustão, aplicação de pasta térmica de alta condutividade e verificação de sensores térmicos SMC/T2/PMU (para solucionar travamento de kernel_task a 100%).`;
      } else if (symptom.includes('Dobradiça') || symptom.includes('quebrada')) {
        procedureText = `Para ${equip}: Ajuste e alinhamento mecânico do mecanismo de articulação unibody em alumínio, substituição de parafusos de retenção e reparo estrutural preservando a integridade da carcaça original.`;
      } else {
        procedureText = `Para ${equip}: Triagem minuciosa em bancada Apple com osciloscópio, medição de ripple e diagnóstico minucioso da Logic Board e periféricos.`;
      }
    } else if (symptom.includes('Não liga nada')) {
      procedureText = `Para ${equip}: Realização de teste com fonte assimétrica para mapear fuga de corrente em miliamperes. Inspeção microscópica nos circuitos de entrada (PWM primário, MOSFETs de alta/baixa e capacitores cerâmicos SMD). Recuperação a nível componente preservando a placa original.`;
    } else if (symptom.includes('Artefatos') || symptom.includes('riscos')) {
      procedureText = `Para ${equip}: Diagnóstico de falha no circuito gráfico (GPU) ou memórias VRAM. Teste com software de diagnóstico MODS/MATS para identificar o chip de memória específico com defeito. Troca de VRAM ou reballing do chip gráfico com esferas Lead-Free e testes de estabilidade 3D.`;
    } else if (symptom.includes('Superaquecimento') || symptom.includes('Desliga')) {
      procedureText = `Para ${equip}: Manutenção térmica de alta performance. Desmontagem completa, limpeza por ultrassom das saídas de ar, desobstrução das ventoinhas, substituição de thermal pads ressecados e aplicação de pasta térmica de prata/cerâmica de altíssima condutividade térmica (>12 W/m-k).`;
    } else if (symptom.includes('líquido') || symptom.includes('Curto')) {
      procedureText = `Para ${equip} (Caso Urgente de Oxidação): Banho químico em cuba ultrassônica com álcool isopropílico para estancar corrosão galvânica. Reconstrução de trilhas rompidas com fio de cobre esmaltado sob microscópio e troca de componentes oxidados.`;
    } else if (symptom.includes('Dobradiça') || symptom.includes('quebrada')) {
      procedureText = `Para ${equip}: Reconstrução estrutural e solda plástica de alta tenacidade nas buchas de fixação dos parafusos. Ajuste da pressão e lubrificação das dobradiças mecânicas para evitar novo rompimento da carcaça plástica ou metálica.`;
    } else {
      procedureText = `Para ${equip}: Inspeção geral de bancada, medição de ripple nas bobinas de fases de alimentação, regravação e limpeza de região ME na BIOS e testes de estresse em bancada.`;
    }

    if (resultProcedure) resultProcedure.textContent = procedureText;

    // Generate WhatsApp Direct Pre-filled message
    const rawMessage = `Olá RTEC Eletrônica! Realizei a triagem inteligente no site:\n\n*Equipamento:* ${equip}\n*Sintoma:* ${symptom}\n\nGostaria de solicitar um orçamento e saber como posso enviar ou levar meu equipamento para diagnóstico.`;
    const encodedMessage = encodeURIComponent(rawMessage);
    const waUrl = `https://wa.me/5585996585319?text=${encodedMessage}`;

    if (btnSendWhatsappSim) {
      btnSendWhatsappSim.href = waUrl;
    }
  }

});
