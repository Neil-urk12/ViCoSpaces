<template>
  <div class="chat-container">
    <input
      id="chat-toggle"
      type="checkbox"
      class="chat-toggle"
    >
    <label
      for="chat-toggle"
      class="chat-btn"
    >
      <span class="open-icon">🛸</span>
      <span class="close-icon">✧</span>
    </label>
      
    <div class="chat-box">
      <div class="chat-header">
        <h3>🌌 Cosmic AI Assistant</h3>
      </div>
        
      <div class="chat-messages">
        <div class="message bot">
          <span class="bot-icon">👽</span>
          Greetings, Earth dweller! How may I assist you today?
        </div>
        <div class="message user">
          <span class="user-icon">👨‍🚀</span>
          Hello from Earth!
        </div>
        <div class="message bot">
          <span class="bot-icon">👽</span>
          Welcome aboard our cosmic chat interface!
        </div>
      </div>
        
      <div class="chat-input">
        <input
          type="text"
          placeholder="Send your message across the universe..."
        >
        <button>
          <span class="send-icon">🚀</span>
        </button>
      </div>
    </div>
  </div>
</template>
  
  <style scoped>
  @keyframes twinkle {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }
  
  @keyframes cosmic-glow {
    0%, 100% { box-shadow: 0 0 15px rgba(123, 31, 162, 0.5); }
    50% { box-shadow: 0 0 25px rgba(123, 31, 162, 0.8); }
  }
  
  :root {
    --space-bg: #0a0a2e;
    --nebula-primary: #6a1b9a;
    --nebula-secondary: #4a148c;
    --star-color: #fff;
    --cosmic-glow: rgba(147, 51, 234, 0.3);
    --meteor-streak: linear-gradient(45deg, #9c27b0, #673ab7);
    --galaxy-gradient: linear-gradient(135deg, #311b92, #4a148c, #6a1b9a);
  }
  
  .chat-container {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 1000;
  }
  
  .chat-toggle {
    display: none;
  }
  
  .chat-btn {
    width: 4rem;
    height: 4rem;
    background: var(--galaxy-gradient);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    animation: cosmic-glow 2s infinite, float 3s ease-in-out infinite;
  }
  
  .chat-btn::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    z-index: -1;
    animation: cosmic-glow 2s infinite;
  }
  
  .open-icon,
  .close-icon {
    position: absolute;
    color: white;
    font-size: 1.8rem;
    transition: all 0.3s ease;
  }
  
  .close-icon {
    opacity: 0;
    transform: rotate(-180deg) scale(0);
  }
  
  .chat-box {
    position: absolute;
    bottom: 5rem;
    right: 0;
    width: 320px;
    background: var(--space-bg);
    border-radius: 1rem;
    border: 1px solid rgba(147, 51, 234, 0.3);
    opacity: 0;
    transform: translateY(20px) scale(0.95);
    transform-origin: bottom right;
    pointer-events: none;
    transition: all 0.3s ease;
    overflow: hidden;
  }
  
  .chat-box::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at top right, transparent 0%, var(--space-bg) 100%);
    opacity: 0.8;
    z-index: -1;
  }
  
  .chat-toggle:checked ~ .chat-btn .open-icon {
    opacity: 0;
    transform: rotate(180deg) scale(0);
  }
  
  .chat-toggle:checked ~ .chat-btn .close-icon {
    opacity: 1;
    transform: rotate(0) scale(1);
  }
  
  .chat-toggle:checked ~ .chat-box {
    opacity: 1;
    transform: translateY(0) scale(1);
    pointer-events: all;
  }
  
  .chat-header {
    background: var(--galaxy-gradient);
    color: white;
    padding: 1rem;
    border-radius: 1rem 1rem 0 0;
    position: relative;
    overflow: hidden;
  }
  
  .chat-header::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, transparent 0%, rgba(255,255,255,0.1) 100%);
    animation: cosmic-glow 4s infinite;
  }
  
  .chat-header h3 {
    margin: 0;
    font-size: 1.1rem;
    text-shadow: 0 0 10px var(--cosmic-glow);
  }
  
  .chat-messages {
    height: 350px;
    padding: 1rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1' fill='rgba(255,255,255,0.3)'/%3E%3C/svg%3E");
  }
  
  .message {
    max-width: 85%;
    padding: 0.75rem 1rem;
    border-radius: 1rem;
    font-size: 0.875rem;
    line-height: 1.4;
    position: relative;
    color: white;
  }
  
  .message.bot {
    background: rgba(106, 27, 154, 0.4);
    align-self: flex-start;
    border-bottom-left-radius: 0.25rem;
    backdrop-filter: blur(5px);
    border: 1px solid rgba(147, 51, 234, 0.3);
  }
  
  .message.user {
    background: rgba(49, 27, 146, 0.4);
    align-self: flex-end;
    border-bottom-right-radius: 0.25rem;
    backdrop-filter: blur(5px);
    border: 1px solid rgba(147, 51, 234, 0.3);
  }
  
  .bot-icon,
  .user-icon {
    font-size: 1.2rem;
    margin-right: 0.5rem;
    vertical-align: middle;
  }
  
  .chat-input {
    padding: 1rem;
    border-top: 1px solid rgba(147, 51, 234, 0.3);
    display: flex;
    gap: 0.5rem;
    background: rgba(10, 10, 46, 0.9);
  }
  
  .chat-input input {
    flex: 1;
    padding: 0.75rem 1rem;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(147, 51, 234, 0.3);
    border-radius: 0.5rem;
    color: white;
    outline: none;
    transition: all 0.3s ease;
  }
  
  .chat-input input::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  .chat-input input:focus {
    border-color: var(--nebula-primary);
    box-shadow: 0 0 10px var(--cosmic-glow);
  }
  
  .chat-input button {
    background: var(--galaxy-gradient);
    color: white;
    border: none;
    padding: 0.75rem;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    animation: float 3s ease-in-out infinite;
  }
  
  .chat-input button:hover {
    transform: scale(1.05);
    box-shadow: 0 0 15px var(--cosmic-glow);
  }
  
  .send-icon {
    font-size: 1.2rem;
  }
  
  /* Custom scrollbar */
  .chat-messages::-webkit-scrollbar {
    width: 6px;
  }
  
  .chat-messages::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
  }
  
  .chat-messages::-webkit-scrollbar-thumb {
    background: var(--nebula-primary);
    border-radius: 3px;
  }
  
  .chat-messages::-webkit-scrollbar-thumb:hover {
    background: var(--nebula-secondary);
  }
  
  .chat-messages::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(1px 1px at 10% 10%, white 100%, transparent 100%),
      radial-gradient(1px 1px at 20% 20%, white 100%, transparent 100%),
      radial-gradient(1px 1px at 30% 30%, white 100%, transparent 100%),
      radial-gradient(1px 1px at 40% 40%, white 100%, transparent 100%),
      radial-gradient(1px 1px at 50% 50%, white 100%, transparent 100%);
    background-size: 200px 200px;
    opacity: 0.1;
    pointer-events: none;
  }
  
  /* Mobile responsiveness */
  @media (max-width: 640px) {
    .chat-box {
      width: calc(100vw - 2rem);
      right: -1rem;
    }
    
    .chat-messages {
      height: 50vh;
    }
  }
  </style>