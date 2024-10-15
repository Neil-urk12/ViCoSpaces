<script setup>
    import { RouterLink } from 'vue-router';
</script>
<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
    integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
  >
   
  <div class="container">
    <header>
      <nav>
        <div class="leftnav">
          <p class="vicoText">
            ViCoSpaces
          </p><hr>
          <p class="message">
            The everything app for work
          </p>
        </div>
        <div class="rightnav">
          <RouterLink to="/login">
            Log in
          </RouterLink>
        </div>
      </nav>
    </header>

    <main>
      <h1><span class="title">V</span>i<span class="title">C</span>o<span class="title">S</span>paces</h1>
      <p>We’re excited to have you join us today. This is a space where we can work together, stay productive, <br> and keep each other accountable.Whether you're tackling a big project, working through smaller tasks.</p>
        
      <ol type="1">
        <li><b>Check-in:</b> Let us know what you’ll be working on today.</li>
        <li><b>Work Time:</b> We’ll work in focused blocks (e.g., 25 or 50 minutes) followed by short breaks.</li>
        <li><b>Accountability:</b> Feel free to share your progress or ask for feedback.</li>
        <li><b>Stay Connected:</b> Use the chat to encourage and motivate each other, but keep distractions to a minimum.</li>
      </ol>
      <button class="signbutton">
        <RouterLink to="/login">
          Get Started it's FREE &nbsp; <span><i class="fa-solid fa-arrow-right" /></span>
        </RouterLink>
      </button>
      <p style="font-size: 13px; margin:7px 0 0 3%; color:rgba(0, 0, 0, 0.699);">
        Free Forever. No Credit Card.
      </p>
    </main>

    <footer>
      <div class="icons">
        <p class="iconname">
          <i class="fa-brands fa-rocketchat" /><br>Chats
        </p>
        <p class="iconname">
          <i class="fa-solid fa-chalkboard" /><br>Whiteboards
        </p>
        <p class="iconname">
          <i class="fa-solid fa-note-sticky" /><br>Notes
        </p>
        <p class="iconname">
          <i class="fa-solid fa-lock" /><br>Private rooms
        </p>
        <p class="iconname">
          <i class="fa-solid fa-unlock" /><br>Public rooms
        </p>
      </div>
    </footer>
  </div>
</template>


<style scoped>
    body{
        margin: 0;
        padding: 0;
        font-family: Arial, Helvetica, sans-serif;
    }
    .title{
        font-size: 6rem;
        color: rgb(47, 127, 255);
    }
    .container{
        position: absolute;
        width: 100%;
        height: 100vh;
        background-color: white;
    }
    .container h1{
        margin-top: 8%;
        font-size: 4.6rem;
        text-align: center;
        margin-bottom: 1%;
        background: linear-gradient(to right, #004cff, #d900ff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        color: transparent;
    }
    .container p{
        font-size: 1.4rem;
        margin-left: 4.5%;
        text-align: center;
        font-weight: 550;
        color: rgba(0, 0, 0, 0.699);
    }
    .container ol{
        margin-left: 15%;
        font-size: 15px;
        margin-bottom: 2%;
        display: block;
    }
    .container li{
        margin-bottom: 1%;
        color: rgba(0, 0, 0, 0.699);
    }
    .signbutton{
        border-radius: 5px;
        padding: 15px 35px;
        font-size: 1rem;
        margin-left: 43%;
        background-image: linear-gradient(35deg , #004cff, #d900ff);
        background-size: 200%;
        background-position: left;
        transition: background-position 2s;
        background-blend-mode:hard-light;
        border: 0;
        cursor: pointer;
        transition: 0.4s ease-in-out;
        margin-right: 2%;
        animation: changeColor 2.5s ease-in-out infinite;
    }
    .signbutton a{
        font-weight: 600;
        color: rgb(255, 255, 255);
        text-decoration: none;
    }
    .signbutton:hover{
        transform: translateY(-3px);
        box-shadow: 0 0 5px #004cff;
    }
    @keyframes changeColor {
        50%{background-position: right;}
    }
    .icons{
        display: flex;
        gap: 50px;
        justify-content: center;
        margin-top: 40px;
        width: 100%;
        padding: 38px 0;
        overflow-x:visible;
        background-image: linear-gradient(to left, #004cff17, #d900ff17);
        border-top-right-radius: 50%;
        border-top-left-radius: 50%;
    }
    .icons p {
        font-size: 16px;
    }
    .leftnav{
        display: flex;
        box-shadow: 0 0 5px violet;
        width: 16%;
        margin: 1.5% 0 -4% 10%;
        border-radius: 45px;
    }
    .leftnav p {
        font-size: 13px;
    }
    .vicoText{
        margin: 20px 20px 0 0;
    }
    .message{
        margin-right: 10%;
    }
    .rightnav{
        float: right;
        margin: 1% 7% 0 0;
        box-shadow: 0 0 5px violet;
        padding: 10px 35px;
        border-radius: 45px;
        background-image: linear-gradient(35deg , #004cff, #d900ff);
        background-size: 200%;
        background-position: right;
        transition: background-position 1s;
        cursor: pointer;
    }
    .rightnav a{
        color: white;
        text-decoration: none;
    }
    .rightnav:hover{
        background-position: left;
    }
</style>