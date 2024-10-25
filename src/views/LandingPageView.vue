<script setup>
import { RouterLink, useRouter } from 'vue-router';
const router = useRouter();
const goToRegister = () => {
    router.push('/register')
  }
</script>

<template>
  <div class="background">
    <div class="bg">
      <div id="stars" />
      <div id="stars2" />
      <div id="stars3" />
      <div id="stars4" />
    </div>
    <header class="header">
      <nav class="nav">
        <div class="logo">
          <div class="logo-placeholder">
            <img
              class="vico-logo"
              src="../assets/images/logo/Logo.png"
              alt=""
              width="200"
            >
          </div>
          <span class="logo-text" />
        </div>
        <button
          class="menu-toggle"
          aria-label="Toggle menu"
          @click="toggleMenu"
        >
          ☰
        </button>
        <div :class="['nav-links', { 'is-open': menuOpen }]">
          <RouterLink
            to="/star-map"
            class="nav-link"
          >
            Star Map
          </RouterLink>
          <RouterLink
            to="/mission"
            class="nav-link"
          >
            Our Mission
          </RouterLink>
          <RouterLink
            to="/login"
            class="nav-link login-link"
          >
            Sign In
          </RouterLink>
          <RouterLink
            to="/register"
            class="nav-link cta-button"
          >
            Sign Up
          </RouterLink>
        </div>
      </nav>
    </header>

    <main class="main">
      <div class="main-content">
        <h1 class="title">
          <span>ViCo</span>Spaces
        </h1>
        <p class="description">
          "A collaborative virtual workspace, built to enhance productivity for collaborators through seamless collaboration."
        </p>
        <div class="features">
          <div class="feature one">
            <div class="feature-icon">
              👨‍🚀
            </div>
            <h3>Virtual Offices</h3>
            <p>Customizable spaces for your team</p>
          </div>
          <div class="feature two">
            <div class="feature-icon">
              💬
            </div>
            <h3>Real-time Chat</h3>
            <p>Instant communication across the cosmos</p>
          </div>
          <div class="feature three">
            <div class="feature-icon">
              ✅
            </div>
            <h3>Task Management</h3>
            <p>Organize your mission with ease</p>
          </div>
          <div class="feature four">
            <div class="feature-icon">
              📊
            </div>
            <h3>Analytics</h3>
            <p>Track your team's progress</p>
          </div>
        </div>
        <div class="signin-info">
          <div class="r-con">
            <button
              class="btn"
              @click="goToRegister"
            >
              <svg
                width="180px"
                height="60px"
                viewBox="0 0 180 60"
                class="border"
              >
                <polyline
                  points="179,1 179,59 1,59 1,1 179,1"
                  class="bg-line"
                />
                <polyline
                  points="179,1 179,59 1,59 1,1 179,1"
                  class="hl-line"
                />
              </svg>
              <span>
                Start Your Journey
              </span>
            </button>
          </div>
          
          <p class="cta-subtext">
            Free Forever.
          </p>     
        </div>
      </div>
    </main>

    <footer class="footer">
      <div class="footer-links">
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
      <p class="copyright">
        &copy; 2024 ViCo. All rights reserved.
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
  overflow-y:unset;
  margin: 0;
  min-height: 100%;
}

a {
  text-decoration: none;
  cursor: pointer;
}
.background {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  background-color: #0a192f;
}
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  color: white;
}
.header {
  background-color: rgba(246, 246, 246, 0.074); 
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1000;
  display: flex;
  justify-content: center;
}
.nav {
  width: 90%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  color: white;
}
.logo {
  display: flex;
  align-items: center;
}
.logo-placeholder {
  width: 40px;
  height: 40px;
  background-color: var(--color-accent);
  border-radius: 50%;
  margin-right: 0.5rem;
}
.logo-text {
  color: var(--color-text-light);
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1.2rem;
}
.menu-toggle {
  display: none;
  background: none;
  border: none;
  color: var(--color-text-light);
  font-size: 1.5rem;
  cursor: pointer;
  width: 40px;
}
.vico-logo{
  position: absolute;
  top: -40px;
}
.nav-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}
.nav-link {
  color: var(--color-text-light);
  font-weight: 500;
  position: relative;
  transition: transform 0.3s ease, color 0.3s ease;
}
.nav-link:hover{
  color: #faae33;
}
.login-link {
  border: 1px solid var(--color-text-light);
  padding: 0.5rem 1rem;
  border-radius: 4px;
}
.cta-button {
  background-color: var(--color-accent);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 600;
}
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  gap: 20px;
}
.main-content {
  text-align: center;
  width: 100%;
  height: 100%;
  max-width: 1200px;
  padding: 2rem;

}
.title {
  font-family: var(--font-heading);
  font-size: 3rem;
  color: var(--color-primary);
  color: white;

}
.title span {
  color: var(--color-secondary);
}
.description {
  margin: 1rem auto;
  font-size: 1.1rem;
  max-width: 700px;
  color: #fff;
  margin-bottom: 90px;
}
.features {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 4px; 
  margin: 0;
  padding: 0
}
.feature{
  width: 100% ;
}
.features .feature {
  padding: 20px;
  background-color: whitesmoke;
  text-align: center;
  transition: transform 0.3s ease, background-color 0.3s ease, border 0.3s ease;
  border: 1px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  width: 250px; 
  gap: 2%;
}

.features .feature:hover {
  transform: translateY(-10px);
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.features .feature-icon {
  font-size: 3rem;
  margin-bottom: 10px;
  transition: transform 0.3s ease, color 0.3s ease;
}

.features .feature:hover .feature-icon {
  transform: scale(1.2);
  color: #ffd700;
}

.features h3 {
  font-size: 1.5rem;
  margin: 10px 0;
}

.features p {
  font-size: 1rem;
  color: #8b8b8b;
  transition: color 0.3s ease;
}

.features .feature:hover h3 {
  color: #ffd700;
}
.features .feature:hover p {
  color: #fff;
}
.signin-info{
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  margin-top: 4%

}
.btn {
  position: relative;
  width: 180px;
  height: 60px;
  cursor: pointer;
  background: transparent;
  border: 1px solid #91C9FF;
  outline: none;
  transition: 1s ease-in-out;
}
.register-bottom {
  color: white;
  text-decoration: none;
}
.cta-subtext{
  color: white;
}
svg {
  position: absolute;
  left: 0;
  top: 0;
  fill: none;
  stroke: #fff;
  stroke-dasharray: 150 480;
  stroke-dashoffset: 150;
  transition: 1s ease-in-out;
}
.btn:hover {
  transition: 1s ease-in-out;
  background: #022d59;
}
.btn:hover svg {
  stroke-dashoffset: -480;
}
.btn span {
  color: white;
  font-size: 18px;
  font-weight: 100;
}
.sj{
  padding: 3px;
}
.footer {
  background-color: var(--color-primary);
  padding: 1rem;
  text-align: center;
  color: #fff;
  position: sticky;
}
.footer-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}
.footer-links a {
  color: var(--color-text-light);
  font-size: 0.9rem;
  transition: transform 0.3s ease, color 0.3s ease;
}
.footer-links a:hover{
  color: #faae33;
}
@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }
  .nav-links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    background-color: rgba(58, 31, 93, 0.9);
  }
  .nav-links.is-open {
    display: flex;
  }
  .features {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 480px) {
  .title {
    font-size: 2rem;
  }
  .description {
    font-size: 0.9rem;
  }
}
.full-wh {
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  width: 100%;
}
.bg-animation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.bg-animation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
@media (max-width: 375px){
  .header {
    background-color: rgba(157, 154, 154, 0.187); 
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 1000;
    display: flex;
    justify-content: center;
  }
}
</style>
