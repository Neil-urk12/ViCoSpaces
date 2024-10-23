<template>
  <div class="contact-page">
    <div class="stars" />
    <div class="content">
      <header>
        <h1>Contact ViCo</h1>
        <p>Connect with us across the digital universe</p>
      </header>
  
      <div class="contact-card">
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label>Name</label>
            <input 
              v-model="formData.name"
              type="text"
              placeholder="Your name"
              required
            >
          </div>
  
          <div class="form-group">
            <label>Email</label>
            <input 
              v-model="formData.email"
              type="email"
              placeholder="your@email.com"
              required
            >
          </div>
  
          <div class="form-group">
            <label>Message</label>
            <textarea 
              v-model="formData.message"
              placeholder="Your message here..."
              required
            />
          </div>
  
          <button type="submit">
            <span>Send Message</span>
          </button>
        </form>
  
        <div
          v-if="showSuccess"
          class="success-message"
        >
          Message sent successfully! 🚀
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
  import { ref, reactive } from 'vue'
  
  const formData = reactive({
    name: '',
    email: '',
    message: ''
  })
  
  const showSuccess = ref(false)
  
  const handleSubmit = () => {
    console.log('Form submitted:', formData)
    
    showSuccess.value = true
    setTimeout(() => {
      formData.name = ''
      formData.email = ''
      formData.message = ''
      showSuccess.value = false
    }, 3000)
  }
  </script>
  
  <style scoped>
  .contact-page {
    min-height: 100vh;
    background: linear-gradient(to bottom, #1a1a2e, #16213e, #0f3460);
    position: relative;
    overflow: hidden;
    font-family: Arial, sans-serif;
  }
  
  .stars {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: transparent url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZyBmaWxsPSJ3aGl0ZSI+CiAgICA8Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSIxIiAvPgogICAgPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iMSIgLz4KICAgIDxjaXJjbGUgY3g9IjcwIiBjeT0iNzAiIHI9IjEiIC8+CiAgICA8Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjEiIC8+CiAgICA8Y2lyY2xlIGN4PSIxMzAiIGN5PSIxMzAiIHI9IjEiIC8+CiAgICA8Y2lyY2xlIGN4PSIxNjAiIGN5PSIxNjAiIHI9IjEiIC8+CiAgICA8Y2lyY2xlIGN4PSIxOTAiIGN5PSIxOTAiIHI9IjEiIC8+CiAgPC9nPgo8L3N2Zz4=');
    animation: stars 15s linear infinite;
  }
  
  .content {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  header {
    text-align: center;
    margin-bottom: 3rem;
    color: white;
  }
  
  header h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  }
  
  header p {
    font-size: 1.2rem;
    color: #b8c6db;
  }
  
  .contact-card {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  label {
    display: block;
    color: #b8c6db;
    margin-bottom: 0.5rem;
  }
  
  input, textarea {
    width: 100%;
    padding: 0.8rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 0.5rem;
    color: white;
    font-size: 1rem;
    transition: all 0.3s ease;
  }
  
  textarea {
    height: 150px;
    resize: vertical;
  }
  
  input:focus, textarea:focus {
    outline: none;
    border-color: #7b2cbf;
    box-shadow: 0 0 0 2px rgba(123, 44, 191, 0.3);
  }
  
  button {
    width: 100%;
    padding: 1rem;
    background: linear-gradient(45deg, #7b2cbf, #9d4edd);
    border: none;
    border-radius: 0.5rem;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  
  button:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(157, 78, 221, 0.4);
  }
  
  button:active {
    transform: translateY(0);
  }
  
  button::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transform: translateX(-100%);
  }
  
  button:hover::after {
    transform: translateX(100%);
    transition: transform 0.6s ease;
  }
  
  .success-message {
    text-align: center;
    color: #4ade80;
    margin-top: 1rem;
    font-weight: bold;
    animation: fadeInOut 3s ease;
  }
  
  @keyframes stars {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-100%);
    }
  }
  
  @keyframes fadeInOut {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    10% {
      opacity: 1;
      transform: translateY(0);
    }
    90% {
      opacity: 1;
      transform: translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateY(-10px);
    }
  }
  
  @media (max-width: 768px) {
    header h1 {
      font-size: 2rem;
    }
    
    header p {
      font-size: 1rem;
    }
    
    .contact-card {
      padding: 1.5rem;
      margin: 0 1rem;
    }
    
    input, textarea {
      font-size: 0.9rem;
    }
  }
  
  ::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  </style>