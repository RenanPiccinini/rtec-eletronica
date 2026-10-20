# RTEC Eletrônica — Portal Tecnológico 3D & Parallax

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> Site institucional moderno, tecnológico e interativo desenvolvido para a **RTEC Eletrônica**, assistência técnica especializada em reparos a nível de componente para Placas-Mãe, Placas de Vídeo (GPUs) e Notebooks em Caucaia e Fortaleza - CE.

---

## ⚡ Principais Recursos

- **🌌 Fundo 3D Interativo com Three.js**:
  - Matriz de 1.400 partículas eletrônicas em tons ciano, azul e branco.
  - Cristais holográficos giratórios com efeito wireframe.
  - Grade cibernética ondulante tipo relevo digital.
  - Câmera em perspectiva com movimentação fluida (Lerp) acompanhando o mouse e o scroll.

- **🃏 3D Card Tilt com Specular Shine**:
  - Inclinação tridimensional dinâmica em todos os cards de serviço, no banner do laboratório e no flyer principal.
  - Reflexo de luz especular dinâmico que segue a posição exata do cursor.

- **🛠️ Simulador de Diagnóstico 3D Inteligente**:
  - Triagem em 3 etapas para Notebooks, Placas de Vídeo, Placas-Mãe e Desktops.
  - Apresenta laudo técnico preliminar imediato.
  - Botão automatizado com mensagem formatada pronta para envio direto ao WhatsApp da assistência: `(85) 99658-5319`.

- **🔬 Vitrine Interativa do Laboratório**:
  - Apresentação da bancada técnica com hotspots interativos pulsantes (Estação BGA, Microscópio Eletrônico, Bancada de Testes GPU).

- **🗺️ Onde Estamos & Rotas**:
  - Localização: Rua José Alves de Oliveira, 9 - Mestre Antonio, Caucaia-CE.
  - Integração com Google Maps, rota rápida Waze e fotos de referência.

- **🔊 Efeitos Sonoros Cyber Nativos**:
  - Síntese de áudio via Web Audio API (sem dependência de arquivos externos).
  - Feedback sonoro suave em botões e seleções com controle liga/desliga no topo.

- **📱 100% Responsivo**:
  - Experiência otimizada para desktops, notebooks, tablets e smartphones com navegação ágil.

---

## 📂 Estrutura de Arquivos

```
rtec-eletronica/
├── index.html                  # Estrutura semântica e SEO
├── style.css                   # Design system futurista (dark mode, glassmorphism e 3D)
├── app.js                      # Lógica do Simulador, Tilt 3D, Web Audio e Contadores
├── three-scene.js              # Motor gráfico 3D Three.js
├── .gitignore                  # Arquivos ignorados pelo Git
└── assets/
    ├── vendor/three.min.js     # Three.js local
    ├── hero-flyer.png          # Flyer institucional RTEC
    ├── service-motherboard.png # Conserto de Placa-Mãe
    ├── service-gpu.png         # Conserto de Placa de Vídeo
    ├── service-laptop.png      # Conserto de Notebook
    ├── lab-workbench.jpg       # Bancada do laboratório
    ├── hologram-chip.jpg       # Microchip holográfico
    └── location-map.png        # Mapa de referência
```

---

## 🚀 Como Executar Localmente

### Opção 1: Com Python (Nativo no Mac/Linux)
```bash
python3 -m http.server 8080
```
Acesse: [http://localhost:8080](http://localhost:8080)

### Opção 2: Com Node.js / npx
```bash
npx serve .
```

### Opção 3: Extensão Live Server
Abra a pasta no VS Code e clique em **Go Live** no canto inferior direito.

---

## 📞 Contatos da RTEC Eletrônica

- **WhatsApp:** (85) 99658-5319
- **Instagram:** [@rtec_eletronica](https://www.instagram.com/rtec_eletronica/)
- **Loja Online:** [rteceletronica.lojazap.com](https://rteceletronica.lojazap.com)
- **Endereço:** R. José Alves de Oliveira, 9 - Mestre Antonio, Caucaia - CE, CEP: 61623-470

---

Desenvolvido com foco em alta tecnologia, performance e conversão.
