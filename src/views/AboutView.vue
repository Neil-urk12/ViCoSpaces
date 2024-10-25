<template>
  <div class="space-background">
    <div class="about-container">
      <button
        class="home-button"
        @click="$router.push('/')"
      >
        Return to Home
      </button>
      <header>
        <h1>{{ appName }} <span class="subtitle">{{ fullName }}</span></h1>
      </header>
      <main>
        <section class="intro">
          <h2>About Our Cosmic Collaboration</h2>
          <p><strong>Target Audience:</strong> {{ targetAudience }}</p>
        </section>
        <section class="purpose">
          <h2>Our Galactic Mission</h2>
          <ul>
            <li
              v-for="(purpose, index) in purposes"
              :key="index"
            >
              {{ purpose }}
            </li>
          </ul>
        </section>
        <section class="features">
          <h2>Stellar Features</h2>
          <ul>
            <li
              v-for="(feature, index) in formattedFeatures"
              :key="index"
            >
              <h3>{{ feature.name }}</h3>
              <ul v-if="feature.details && feature.details.length">
                <li
                  v-for="(detail, detailIndex) in feature.details"
                  :key="detailIndex"
                >
                  {{ detail }}
                </li>
              </ul>
            </li>
          </ul>
        </section>
      </main>
    </div>
  </div>
</template>
  
<script setup>
  import { ref, computed } from 'vue'
  
  const appName = ref('ViCo')
  const fullName = ref('Virtual Co-working and Virtual Collaboration Spaces')
  const targetAudience = ref('Primarily students ( expanding for corporate use in the future! )')
  const purposes = ref([
    'Facilitate idea visualization across the cosmos',
    'Minimize miscommunication caused by interstellar communication barriers'
  ])
  
  const features = ref([
    {
      name: 'Real-time intergalactic chat functionality',
      details: []
    },
    {
      name: 'Support for both private and public space stations',
      details: []
    },
    {
      name: 'Collaborative cosmic whiteboard',
      details: [
        'Creation of star charts using celestial shapes, comets, and space text',
        'Ability to insert nebula images onto the cosmic whiteboard'
      ]
    }
  ])
  const formattedFeatures = computed(() => {
    return features.value.map(feature => {
      if (feature.details.length === 0) return { name: feature.name }
      else return feature
    })
  })
</script>
  
<style scoped>
  .space-background {
    background: linear-gradient(to bottom, #0b3d91, #1e2761);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
  }
  .space-background::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 40px),
      radial-gradient(white, rgba(255,255,255,.15) 1px, transparent 30px),
      radial-gradient(white, rgba(255,255,255,.1) 2px, transparent 40px);
    background-size: 550px 550px, 350px 350px, 250px 250px;
    background-position: 0 0, 40px 60px, 130px 270px;
    animation: twinkle 10s linear infinite;
  }
  @keyframes twinkle {
    0% { transform: translateY(0); }
    100% { transform: translateY(-550px); }
  }
  .about-container {
    max-width: 800px;
    margin: 2rem;
    padding: 2rem;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    color: #e0e0e0;
    position: relative;
    z-index: 1;
  }
  .home-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background-color: #00ffff;
    color: #0b3d91;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s, transform 0.1s;
  }
  .home-button:hover {
    background-color: #40e0d0;
    transform: scale(1.05);
  }
  .home-button:active {
    transform: scale(0.95);
  }
  header {
    text-align: center;
    margin-bottom: 2rem;
  }
  h1 {
    color: #00ffff;
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  }
  .subtitle {
    display: block;
    font-size: 1rem;
    color: #b0e0e6;
  }
  h2 {
    color: #ff69b4;
    border-bottom: 2px solid #ff69b4;
    padding-bottom: 0.5rem;
    margin-top: 2rem;
  }
  h3 {
    color: #ffd700;
    margin-top: 1rem;
  }
  ul {
    padding-left: 0;
    list-style-type: none;
  }
  li {
    margin-bottom: 0.5rem;
    display: flex;
    align-items: flex-start;
  }
  li::before {
    content: '🚀';
    margin-right: 0.5rem;
    flex-shrink: 0;
  }
  strong {
    color: #40e0d0;
  }
  section {
    margin-bottom: 2rem;
  }
  .features ul ul {
    padding-left: 1.5rem;
  }
  .features ul ul li::before {
    content: '🌟';
  }
  @media (max-width: 600px) {
    .about-container {
      padding: 1rem;
      margin: 1rem;
    }
    h1 {
      font-size: 2rem;
    }
    h2 {
      font-size: 1.5rem;
    }
    .home-button {
      top: 0.5rem;
      right: 0.5rem;
      padding: 0.3rem 0.6rem;
      font-size: 0.8rem;
    }
  }
  </style>