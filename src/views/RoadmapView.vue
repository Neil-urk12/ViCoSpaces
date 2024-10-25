<template>
  <div class="roadmap-container">
    <header class="roadmap-header">
      <h1>ViCo Roadmap</h1>
      <p>Exploring New Frontiers in Collaborative Work</p>
      <div>
        <button
          class="return-home"
          @click="$router.push('/home')"
        >
          Return to Home
        </button>
      </div>
    </header>
    <div class="timeline">
      <div class="timeline-line" />
      <article class="milestone">
        <div class="milestone-content">
          <div class="milestone-header">
            <div class="planet-icon">
              <div class="planet purple" />
            </div>
            <h3>Launch Phase</h3>
          </div>
          <p class="date">
            Oct 25 2024
          </p>
          <ul>
            <li>Core collaboration features</li>
            <li>Real-time cursors and cursor-based editing</li>
            <li>Real-time document editing (WIP)</li>
            <li>Public and Private Rooms</li>
          </ul>
        </div>
      </article>
      <article class="milestone">
        <div class="milestone-content">
          <div class="milestone-header">
            <div class="planet-icon">
              <div class="planet blue" />
            </div>
            <h3>Migration and Expansion Phase</h3>
          </div>
          <p class="date">
            Q4 2024
          </p>
          <ul>
            <li>AI-powered assistance and chatbots (WIP)</li>
            <li>Advanced project management tools</li>
            <li>Teams of up to 20 people</li>
            <li>Upgrade Servers (WIP) and migrate backend</li>
            <li>Custom cursors (WIP)</li>
            <li>Audio and Video Chat</li>
          </ul>
        </div>
      </article>
      <article class="milestone">
        <div class="milestone-content">
          <div class="milestone-header">
            <div class="planet-icon">
              <div class="planet teal" />
            </div>
            <h3>Enterprise Phase</h3>
          </div>
          <p class="date">
            Q4 2024
          </p>
          <ul>
            <li>Ability to create and edit documents</li>
            <li>Custom workflows</li>
            <li>Enterprise security features (WIP)</li>
            <li>Scale to upto 1000 cuncurrent users</li>
            <li>Launch Desktop and Mobile Apps</li>
          </ul>
        </div>
      </article>
      <article class="milestone">
        <div class="milestone-content">
          <div class="milestone-header">
            <div class="planet-icon">
              <div class="planet pink" />
            </div>
            <h3>Innovation Phase</h3>
          </div>
          <p class="date">
            Q1 2025
          </p>
          <ul>
            <li>Room Templates and AI-generated content</li>
            <li>Cross-platform mobile apps</li>
            <li>Global team features</li>
          </ul>
        </div>
      </article>
    </div>
    <div class="stars-background" />
  </div>
</template>
  
<style scoped>
  .roadmap-container {
    min-height: 100vh;
    background-color: #111827;
    padding: 2rem;
    position: relative;
    font-family: system-ui, -apple-system, sans-serif;
  }
  .roadmap-header {
    text-align: center;
    margin-bottom: 4rem;
    animation: fadeIn 1s ease-out;
  }
  .roadmap-header h1 {
    color: #ffffff;
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  .roadmap-header p {
    color: #9ca3af;
    font-size: 1.1rem;
  }
  .return-home{
    background: none;
    border-radius: 50%;
    border: 2.2px solid #ffdd00;
    color: white;
    outline: none;
    font-size: 1.5rem;
    animation: pulse 2s ease-in-out infinite;
    transition: 0.2s ease-in-out
  }
  .return-home:hover{
    background: #9333ea;
  }
  .timeline {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    padding: 2rem 0;
  } 
  .timeline-line {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg, #9333ea, #3b82f6, #14b8a6);
  }
  .milestone {
    width: 100%;
    margin-bottom: 6rem;
    opacity: 0;
    animation: fadeIn 0.8s ease-out forwards;
  }
  .milestone:nth-child(odd) .milestone-content {
    margin-left: auto;
    margin-right: 4rem;
  }
  .milestone:nth-child(even) .milestone-content {
    margin-left: 4rem;
  }
  .milestone-content {
    width: calc(50% - 2rem);
    background-color: #1f2937;
    border-radius: 0.5rem;
    padding: 1.5rem;
    border: 1px solid #374151;
    transition: border-color 0.3s ease;
  }
  .milestone-content:hover {border-color: #9333ea;}
  .milestone-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  .milestone-header h3 {
    color: #ffffff;
    font-size: 1.25rem;
    font-weight: 600;
  }
  .date {
    color: #9ca3af;
    margin-bottom: 0.5rem;
  }
  .planet-icon {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .planet-icon::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.1);
    animation: orbit 4s linear infinite;
  }
  .planet {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    animation: pulse 2s infinite;
  } 
  .planet.purple { background: linear-gradient(135deg, #9333ea, #7c3aed); }
  .planet.blue { background: linear-gradient(135deg, #3b82f6, #2563eb); }
  .planet.teal { background: linear-gradient(135deg, #14b8a6, #0d9488); }
  .planet.pink { background: linear-gradient(135deg, #ec4899, #db2777); }
  ul {
    list-style-type: disc;
    padding-left: 1.5rem;
    color: #d1d5db;
  }
  li {margin-bottom: 0.5rem;}
  .stars-background {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background: 
      radial-gradient(2px 2px at 20px 30px, #ffffff, rgba(0,0,0,0)),
      radial-gradient(2px 2px at 40px 70px, #ffffff, rgba(0,0,0,0)),
      radial-gradient(2px 2px at 50px 160px, #ffffff, rgba(0,0,0,0)),
      radial-gradient(2px 2px at 90px 40px, #ffffff, rgba(0,0,0,0)),
      radial-gradient(2px 2px at 130px 80px, #ffffff, rgba(0,0,0,0));
    background-size: 200px 200px;
    animation: twinkle 4s infinite;
  }
  @keyframes fadeIn {
    from { 
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes orbit {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes pulse {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.1); opacity: 0.8; }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes twinkle {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.6; }
  }
  @media (max-width: 768px) {
    .timeline-line {
      left: 2rem;
    }
    .milestone-content {
      width: calc(100% - 4rem);
      margin-left: 4rem !important;
    }
    .roadmap-header h1 {
      font-size: 2rem;
    }
  } 
  @media (max-width: 480px) {
    .roadmap-container {
      padding: 1rem;
    }
    .timeline-line {
      left: 1rem;
    }
    .milestone-content {
      width: calc(100% - 2rem);
      margin-left: 2rem !important;
    }
  }
  </style>