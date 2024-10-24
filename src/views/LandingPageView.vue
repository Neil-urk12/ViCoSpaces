<script setup>
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
const authStore = useAuthStore();
const { isAuthenticated } = authStore;
</script>

<template>
  <div class="cosmic-container">
    <header class="cosmic-header">
      <nav class="cosmic-nav">
        <div class="cosmic-logo">
          <div class="cosmic-logo-placeholder" />
          <span class="cosmic-logo-text">Cosmic ViCo</span>
        </div>
        <button
          class="cosmic-menu-toggle"
          aria-label="Toggle menu"
        >
          ☰
        </button>
        <div class="cosmic-nav-links">
          <RouterLink
            to="/star-map"
            class="cosmic-starmap"
          >
            Star Map
          </RouterLink>
          <RouterLink 
            to="/mission"
            class="cosmic-mission"
          >
            Our Mission
          </RouterLink>
          <RouterLink
            to="/login"
            class="cosmic-login-link"
          >
            Log In
          </RouterLink>
          <RouterLink
            to="/register"
            class="cosmic-cta-button"
          >
            Launch Free Trial
          </RouterLink>
        </div>
      </nav>
    </header>
    <main class="cosmic-main">
      <h1 class="cosmic-title">
        Cosmic<span>ViCo</span>Spaces
      </h1>
      <p class="cosmic-description">
        Elevate your team's collaboration to new dimensions. Cosmic ViCo offers a seamless, 
        intuitive workspace designed for the modern professional. Whether you're managing 
        interstellar projects or coordinating across time zones, your journey to peak 
        productivity begins here.
      </p>
  
      <div class="cosmic-features">
        <div class="cosmic-feature">
          <div class="feature-icon">
            👨‍🚀
          </div>
          <h3>Virtual Offices</h3>
          <p>Customizable spaces for your team</p>
        </div>
        <div class="cosmic-feature">
          <div class="feature-icon">
            💬
          </div>
          <h3>Real-time Chat</h3>
          <p>Instant communication across the cosmos</p>
        </div>
        <div class="cosmic-feature">
          <div class="feature-icon">
            ✅
          </div>
          <h3>Task Management</h3>
          <p>Organize your mission with ease</p>
        </div>
        <div class="cosmic-feature">
          <div class="feature-icon">
            📊
          </div>
          <h3>Analytics Dashboard</h3>
          <p>Track your team's progress</p>
        </div>
      </div>
  
      <button class="cosmic-cta-button main-cta">
        <RouterLink to="/register">
          Start Your Cosmic Journey 🚀
        </RouterLink>
      </button>
      <p class="cosmic-cta-subtext">
        No credit card required. Free 14-day trial.
      </p>
    </main>
  
    <footer class="cosmic-footer">
      <div class="cosmic-footer-links">
        <RouterLink to="/about">
          About Us
        </RouterLink>
        <RouterLink to="/contact">
          Contact
        </RouterLink>
        <RouterLink to="/privacy">
          Privacy Policy
        </RouterLink>
        <RouterLink to="/terms">
          Terms of Service
        </RouterLink>
      </div>
      <p class="cosmic-copyright">
        &copy; 2023 Cosmic ViCo. All rights reserved.
      </p>
    </footer>
  </div>
</template>
  
  <style scoped>
  :root {
    --color-primary: #3a1f5d;
    --color-secondary: #c779d0;
    --color-accent: #4bc0c8;
    --color-background: #f4f7f9;
    --color-text: #333;
    --color-text-light: #fff;
    --font-main: 'Roboto', sans-serif;
    --font-heading: 'Montserrat', sans-serif;
  }
  
  /* Global Styles */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: var(--font-main);
    background-color: var(--color-background);
    color: var(--color-text);
    line-height: 1.6;
  }
  
  .cosmic-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  /* Header and Navigation */
  .cosmic-header {
    background-color: var(--color-primary);
    padding: 1rem 0;
  }
  
  .cosmic-nav {
    background: linear-gradient(to bottom, #0b3d91, #1e2761);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 6px;
    backdrop-filter: blur(10px);
    color: white;
    padding: 0px 10px 0px 10px;
  }
  .cosmic-nav-links a{
    align-content: center;
  }
  
  .cosmic-logo {
    display: flex;
    align-items: center;
  }
  
  .cosmic-logo-placeholder {
    width: 40px;
    height: 40px;
    background-color: var(--color-accent);
    border-radius: 50%;
    margin-right: 0.5rem;
  }
  
  .cosmic-logo-text {
    color: var(--color-text-light);
    font-family: var(--font-heading);
    font-weight: 700;
    font-size: 1.2rem;
  }
  
  .cosmic-menu-toggle {
    display: none;
    background: none;
    border: none;
    color: var(--color-text-light);
    font-size: 1.5rem;
    cursor: pointer;
  }
  
  .cosmic-nav-links {
    display: flex;
    gap: 1.5rem;
  }
  
  .cosmic-nav-links a {
    color: var(--color-text-light);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
  }
  
  .cosmic-nav-links a:hover {
    color: var(--color-accent);
  }
  
  .cosmic-login-link {
    padding: 0.5rem 1rem;
    border: 1px solid var(--color-text-light);
    border-radius: 4px;
  }
  
  .cosmic-cta-button {
    background-color: var(--color-accent);
    color: var(--color-text-light);
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    font-weight: 600;
    text-decoration: none;
    transition: background-color 0.3s ease;
    background-color: #2756a7;
  }
  
  .cosmic-cta-button:hover {
    background-color: white;
    color: linear-gradient(to bottom, #0b3d91, #1e2761);
  }
  
  .cosmic-main {
    padding: 4rem 0;
    text-align: center;
  }
  
  .cosmic-title {
    font-family: var(--font-heading);
    font-size: 3rem;
    color: var(--color-primary);
    margin-bottom: 1rem;
  }
  
  .cosmic-title span {
    color: var(--color-secondary);
  }
  
  .cosmic-description {
    max-width: 800px;
    margin: 0 auto 3rem;
    font-size: 1.1rem;
  }
  
  .cosmic-features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
  }
  
  .cosmic-feature {
    background-color: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }
  
  .cosmic-feature:hover {
    transform: translateY(-5px);
  }
  
  .feature-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  .cosmic-feature h3 {
    font-family: var(--font-heading);
    margin-bottom: 0.5rem;
  }
  
  .main-cta {
    font-size: 1.2rem;
    padding: 0.75rem 1.5rem;
  }
  
  .cosmic-cta-subtext {
    margin-top: 1rem;
    font-size: 0.9rem;
    color: #666;
  }
  
  /* Footer */
  .cosmic-footer {
    background-color: var(--color-primary);
    color: var(--color-text-light);
    padding: 2rem 0;
    text-align: center;
  }
  
  .cosmic-footer-links {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-bottom: 1rem;
  }
  
  .cosmic-footer-links a {
    color: var(--color-text-light);
    text-decoration: none;
    font-size: 0.9rem;
  }
  
  .cosmic-copyright {
    font-size: 0.8rem;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .cosmic-menu-toggle {
      display: block;
    }
  
    .cosmic-nav-links {
      display: none;
      flex-direction: column;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background-color: var(--color-primary);
      padding: 1rem;
    }
  
    .cosmic-nav-links.is-open {
      display: flex;
    }
  
    .cosmic-nav-links a {
      padding: 0.5rem 0;
    }
  
    .cosmic-title {
      font-size: 2.5rem;
    }
  
    .cosmic-description {
      font-size: 1rem;
    }
  
    .cosmic-features {
      grid-template-columns: 1fr;
    }
  }
  
  @media (max-width: 480px) {
    .cosmic-title {
      font-size: 2rem;
    }
  
    .cosmic-description {
      font-size: 0.9rem;
    }
  
    .main-cta {
      font-size: 1rem;
      padding: 0.6rem 1.2rem;
    }
  
    .cosmic-footer-links {
      flex-direction: column;
      gap: 0.5rem;
    }
  }
  </style>