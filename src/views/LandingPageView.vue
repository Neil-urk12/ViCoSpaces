<script setup>
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
const authStore = useAuthStore();
const { isAuthenticated } = authStore;
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
        <div class="navigations">
          <div class="logo">
            <img
              src="../images/logo/logo.png"
              class="logo-img"
            >
            <p class="vico">
              ViCo
            </p>
          </div>

          <div class="roadmap">
            <RouterLink
              to="/roadmap"
            >
              Road map
              <!-- <i class="fa-solid fa-angle-down"></i> -->
            </RouterLink>
          </div>

          <div class="aboutpage">
            <RouterLink
              to="/about"
            >
              About
              <!-- <i class="fa-solid fa-angle-down"></i> -->
            </RouterLink>
          </div>
       
          <div class="rightnav">
            <RouterLink
              v-if="!isAuthenticated"
              to="/login"
            >
              Log in
            </RouterLink>
            <RouterLink
              v-else
              to="/home"
            >
              Home
            </RouterLink>
          </div>
          
          <div
            v-if="!isAuthenticated"
            class="signupForFree"
          >
            <RouterLink to="/register">
              Sign up free
            </RouterLink>
          </div>
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
        <RouterLink
          v-if="!isAuthenticated"
          to="/login"
        >
          Get Started it's FREE &nbsp; <span><i class="fa-solid fa-arrow-right" /></span>
        </RouterLink>
        <RouterLink
          v-else
          to="/home"
        >
          Continue where you left off &nbsp; <span><i class="fa-solid fa-arrow-right" /></span>
        </RouterLink> 
      </button>
      <div class="buttonMessage">
        <p>
        Free Forever. No Credit Card.
        </p>
      </div>

    </main>

    <footer>
      <div class="icons">
        <span class="iconname">
          <i class="fa-brands fa-rocketchat" /><br>Chats
        </span>
        <span class="iconname">
          <i class="fa-solid fa-chalkboard" /><br>Whiteboards
        </span>
        <span class="iconname">
          <i class="fa-solid fa-note-sticky" /><br>Notes
        </span>
        <span class="iconname">
          <i class="fa-solid fa-lock" /><br>Private rooms
        </span>
        <span class="iconname">
          <i class="fa-solid fa-unlock" /><br>Public rooms
        </span>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.roadmap {
  margin: 17px 20px 0 62%;
}
.roadmap a , .aboutpage a{
  text-decoration: none;
  color: black;
}
.aboutpage{
  margin: 18px 0 0 0;
}
.roadmap a:hover , .aboutpage a:hover{
  color: blue;
}
.navigations{
  background-image: linear-gradient(to left, #004cff0b, #d900ff0e);
  width: 85%;
  margin: 1.2rem 0 0 6%;
  display: flex;
  padding: 6px 0;
  border-radius: 10px;
}
.logo{
  margin: 0 0 0 1.1rem;
  display: flex;
  align-items: center;
}
.logo img{
  width: 55px;
  height: 50px; 
  border-radius: 50%;
}
.vico{
  font-size: 1.5rem;
  font-weight: 700;
}
.signupForFree{
  height: 20px;
  background: linear-gradient(to right, #004cff, #d900ff);
  padding: 10px 15px;
  margin: 7px 0 0 -10px;
  border-radius: 5px;
  background-size: 200%;
  background-position: right;
  transition: background-position 1s;
}
.signupForFree a{
  text-decoration: none;
  color: white;
}
.signupForFree:hover{
  background-position: left;
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
  margin-top: 3%;
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
  font-size: 1.2rem;
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
  margin: 0 auto;
  display: block;
  background-image: linear-gradient(35deg , #004cff, #d900ff);
  background-size: 200%;
  background-position: left;
  transition: background-position 2s;
  background-blend-mode:hard-light;
  border: 0;
  cursor: pointer;
  transition: 0.4s ease-in-out;
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
  gap: 10%;
  justify-content: center;
  margin-top: 6%;
  width: 100%;
  padding: 38px 0;
  background-image: linear-gradient(to left, #004cff17, #d900ff17);
  border-top-right-radius: 50%;
  border-top-left-radius: 50%;
}
.icons i{
  font-size: 20px;
}
.icons span {
  font-weight: 600;

}
.rightnav{
  margin: 7px 2% 0 1%;
  box-shadow: 0 0 1px black;
  padding: 10px 15px;
  height: 20px;
  border-radius: 5px;
  background-color: white;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}
.rightnav a{
  color: rgb(0, 0, 0);
  text-decoration: none;
}
.rightnav:hover{
  background-color: rgb(248, 248, 248);
}
.buttonMessage p{
  font-size: 15px;
  margin: 7px 0 0 1%;
  color:rgba(0, 0, 0, 0.699);
}

@media screen and (min-width: 320px) and (max-width: 399px) and (min-height: 568px) and (max-height: 599px) {
  .vico{
    display: none;
  }
  .navigations{
    margin: 0;
    background-image: linear-gradient(to left, #004cff0b, #d900ff0e);
    width: 100%;
    border-radius: 0;
  }
  .roadmap{
    font-size: 10px;
    margin: 25px 10px 0 8%;
  }
  .aboutpage{
    margin: 25px -10px 0 0;
    font-size: 10px;
  }
  .signupForFree{
    height: 10px;
    font-size: 10px;
    padding: 5px 10px;
    margin: 20px 0 0 5px;
  }
  .rightnav{
    height: 10px;
    font-size: 10px;
    padding: 5px 10px;
    margin: 20px 0 0 5%;
  }
  .title{
    font-size: 3rem;
  }
  .container h1{
    margin: 20% 0 5.5% 0;
    font-size: 2.5rem;
  }
  .container p{
    /* display: none; */
    font-size: 10px;
    margin: 0 0 5% -5px;
  }
  .container ol{
    margin: 0 0 5% 0;
  }
  .container li{
    font-size: 11.5px;
  }
  .signbutton{
    margin: 3% 0 0 30%;
    padding: 7px;
  }
  .signbutton a{
    font-size: 12px;
  }
  .icons{
    margin-top: 16%;
    padding: 20px 0;
    gap: 15px;
    border-top-right-radius: 20%;
    border-top-left-radius: 20%;
  }
  .icons i {
    font-size: 10px;
    margin-left: 33%;
    color:rgba(0, 0, 0, 0.699);
  }
  .icons span{
    padding: 10px 0 0 0;
    font-size: 10px;
    color:rgba(0, 0, 0, 0.699);
  }
  .buttonMessage p{
    margin: 5px 0 14% 8%;
  }
}


@media screen and (min-width: 360px) and (max-width: 399px) and (min-height: 640px) and (max-height: 699px) {
  .vico{
    display: none;
  }
  .navigations{
    margin: 0;
    background-image: linear-gradient(to left, #004cff0b, #d900ff0e);
    width: 100%;
    border-radius: 0;
  }
  .roadmap{
    font-size: 13px;
    margin: 25px 10px 0 2%;
  }
  .aboutpage{
    margin: 25px -10px 0 0;
    font-size: 13px;
  }
  .signupForFree{
    height: 15px;
    font-size: 13px;
    padding: 5px 10px;
    margin: 20px 0 0 5px;
  }
  .rightnav{
    height: 15px;
    font-size: 13px;
    padding: 5px 10px;
    margin: 20px 0 0 5%;
  }
  .title{
    font-size: 3.5rem;
  }
  .container h1{
    margin: 35% 0 5.5% 0;
    font-size: 3rem;
  }
  .container p{
    /* display: none; */
    font-size: 10px;
    margin: 0 0 5% -5px;
  }
  .container ol{
    margin: 0 0 5% 0;
  }
  .container li{
    font-size: 11.5px;
  }
  .signbutton{
    margin: 3% 0 0 30%;
    padding: 7px;
  }
  .signbutton a{
    font-size: 12px;
  }
  .icons{
    margin-top: 21%;
    padding: 20px 0;
    gap: 20px;
    border-top-right-radius: 20%;
    border-top-left-radius: 20%;
  }
  .icons i {
    font-size: 15px;
    margin-left: 33%;
    color:rgba(0, 0, 0, 0.699);
  }
  .icons span{
    padding: 10px 0 0 0;
    font-size: 10px;
    color:rgba(0, 0, 0, 0.699);
  }
  .buttonMessage p{
    margin-left: 1.5%;
    margin-bottom: 14%;
  }
}

@media screen and (min-width: 344px) and (max-width: 399px) and (min-height: 882px) and (max-height: 899px) {
  .vico{
    display: none;
  }
  .navigations{
    margin: 0;
    background-image: linear-gradient(to left, #004cff0b, #d900ff0e);
    width: 100%;
    border-radius: 0;
  }
  .roadmap{
    font-size: 13px;
    margin: 25px 10px 0 2%;
  }
  .aboutpage{
    margin: 25px -10px 0 0;
    font-size: 13px;
  }
  .signupForFree{
    height: 15px;
    font-size: 13px;
    padding: 5px 10px;
    margin: 20px 0 0 5px;
  }
  .rightnav{
    height: 15px;
    font-size: 13px;
    padding: 5px 10px;
    margin: 20px 0 0 5%;
  }
  .title{
    font-size: 3.5rem;
  }
  .container h1{
    margin: 35% 0 5.5% 0;
    font-size: 3rem;
  }
  .container p{
    /* display: none; */
    font-size: 10px;
    margin: 0 0 5% -5px;
  }
  .container ol{
    margin: 0 0 5% 0;
  }
  .container li{
    font-size: 11.5px;
  }
  .signbutton{
    margin: 3% 0 0 30%;
    padding: 7px;
  }
  .signbutton a{
    font-size: 12px;
  }
  .icons{
    margin-top: 34%;
    padding: 20px 0;
    gap: 20px;
    border-top-right-radius: 20%;
    border-top-left-radius: 20%;
  }
  .icons i {
    font-size: 15px;
    margin-left: 33%;
    color:rgba(0, 0, 0, 0.699);
  }
  .icons span{
    padding: 10px 0 0 0;
    font-size: 10px;
    color:rgba(0, 0, 0, 0.699);
  }
  .buttonMessage p{
    margin-left: 1.5%;
    margin-bottom: 14%;
  }
}

@media screen and (min-width: 375px) and (max-width: 399px) and (min-height: 667px) and (max-height: 699px) {
  .vico{
    display: none;
  }
  .navigations{
    margin: 0;
    background-image: linear-gradient(to left, #004cff0b, #d900ff0e);
    width: 100%;
    border-radius: 0;
  }
  .roadmap{
    font-size: 13px;
    margin: 25px 10px 0 5%;
  }
  .aboutpage{
    margin: 25px -10px 0 0;
    font-size: 13px;
  }
  .signupForFree{
    height: 15px;
    font-size: 13px;
    padding: 5px 10px;
    margin: 20px 0 0 5px;
  }
  .rightnav{
    height: 15px;
    font-size: 13px;
    padding: 5px 10px;
    margin: 20px 0 0 5%;
  }
  .title{
    font-size: 3.5rem;
  }
  .container h1{
    margin: 35% 0 5.5% 0;
    font-size: 3rem;
  }
  .container p{
    /* display: none; */
    font-size: 10px;
    margin: 0 0 5% -5px;
  }
  .container ol{
    margin: 0 0 5% 0;
  }
  .container li{
    font-size: 11.5px;
  }
  .signbutton{
    margin: 3% 0 0 30%;
    padding: 7px;
  }
  .signbutton a{
    font-size: 12px;
  }
  .icons{
    margin-top: 25%;
    padding: 20px 0;
    gap: 20px;
    border-top-right-radius: 20%;
    border-top-left-radius: 20%;
  }
  .icons i {
    font-size: 15px;
    margin-left: 33%;
    color:rgba(0, 0, 0, 0.699);
  }
  .icons span{
    padding: 10px 0 0 0;
    font-size: 10px;
    color:rgba(0, 0, 0, 0.699);
  }
  .buttonMessage p{
    margin-left: 1.5%;
    margin-bottom: 14%;
  }
}

@media screen and (min-width: 390px) and (max-width: 399px) and (min-height: 844px) and (max-height: 850px) {
  .vico{
    display: none;
  }
  .navigations{
    margin: 0;
    background-image: linear-gradient(to left, #004cff0b, #d900ff0e);
    width: 100%;
    border-radius: 0;
  }
  .roadmap{
    font-size: 13px;
    margin: 25px 10px 0 9%;
  }
  .aboutpage{
    margin: 25px -10px 0 0;
    font-size: 13px;
  }
  .signupForFree{
    height: 15px;
    font-size: 13px;
    padding: 5px 10px;
    margin: 20px 0 0 5px;
  }
  .rightnav{
    height: 15px;
    font-size: 13px;
    padding: 5px 10px;
    margin: 20px 0 0 5%;
  }
  .title{
    font-size: 3.5rem;
  }
  .container h1{
    margin: 35% 0 5.5% 0;
    font-size: 3rem;
  }
  .container p{
    /* display: none; */
    font-size: 10px;
    margin: 0 0 5% -5px;
  }
  .container ol{
    margin: 0 0 5% 0;
  }
  .container li{
    font-size: 11.5px;
  }
  .signbutton{
    margin: 3% 0 0 30%;
    padding: 7px;
  }
  .signbutton a{
    font-size: 12px;
  }
  .icons{
    margin-top: 25%;
    padding: 20px 0;
    gap: 20px;
    border-top-right-radius: 20%;
    border-top-left-radius: 20%;
  }
  .icons i {
    font-size: 15px;
    margin-left: 33%;
    color:rgba(0, 0, 0, 0.699);
  }
  .icons span{
    padding: 10px 0 0 0;
    font-size: 10px;
    color:rgba(0, 0, 0, 0.699);
  }
  .buttonMessage p{
    margin-left: 1.5%;
    margin-bottom: 14%;
  }
}

@media screen and (min-width: 360px) and (max-width: 370px) and (min-height: 740px) and (max-height: 750px) {
  .vico{
    display: none;
  }
  .navigations{
    margin: 0;
    background-image: linear-gradient(to left, #004cff0b, #d900ff0e);
    width: 100%;
    border-radius: 0;
  }
  .roadmap{
    font-size: 13px;
    margin: 25px 10px 0 5%;
  }
  .aboutpage{
    margin: 25px -10px 0 0;
    font-size: 13px;
  }
  .signupForFree{
    height: 15px;
    font-size: 13px;
    padding: 5px 10px;
    margin: 20px 0 0 5px;
  }
  .rightnav{
    height: 15px;
    font-size: 13px;
    padding: 5px 10px;
    margin: 20px 0 0 5%;
  }
  .title{
    font-size: 3.5rem;
  }
  .container h1{
    margin: 35% 0 5.5% 0;
    font-size: 3rem;
  }
  .container p{
    /* display: none; */
    font-size: 10px;
    margin: 0 0 5% -5px;
  }
  .container ol{
    margin: 0 0 5% 0;
  }
  .container li{
    font-size: 11.5px;
  }
  .signbutton{
    margin: 3% 0 0 30%;
    padding: 7px;
  }
  .signbutton a{
    font-size: 12px;
  }
  .icons{
    margin-top: 30%;
    padding: 20px 0;
    gap: 20px;
    border-top-right-radius: 20%;
    border-top-left-radius: 20%;
  }
  .icons i {
    font-size: 15px;
    margin-left: 33%;
    color:rgba(0, 0, 0, 0.699);
  }
  .icons span{
    padding: 10px 0 0 0;
    font-size: 10px;
    color:rgba(0, 0, 0, 0.699);
  }
  .buttonMessage p{
    margin-left: 1.5%;
    margin-bottom: 14%;
  }
}


@media screen and (min-width: 400px) and (max-width: 499px) {
  .vico{
    display: none;
  }
  .navigations{
    margin: 0;
    background-image: linear-gradient(to left, #004cff0b, #d900ff0e);
    width: 100%;
    border-radius: 0;
  }
  .roadmap{
    font-size: 13px;
    margin: 25px 10px 0 15%;
  }
  .aboutpage{
    margin: 25px -10px 0 0;
    font-size: 13px;
  }
  .signupForFree{
    height: 15px;
    font-size: 13px;
    padding: 5px 10px;
    margin: 20px 0 0 5px;
  }
  .rightnav{
    height: 15px;
    font-size: 13px;
    padding: 5px 10px;
    margin: 20px 0 0 5%;
  }
  .title{
    font-size: 3.5rem;
  }
  .container h1{
    margin: 28% 0 5% 0;
    font-size: 3rem;
  }
  .container p{
    /* display: none; */
    font-size: 12px;
    margin: 0 0 3% -5px;
  }
  .container ol{
    margin: 0 0 5% 0;
  }
  .container li{
    font-size: 10px;
  }
  .signbutton{
    margin: 0 0 0 30%;
    padding: 10px 15px;
  }
  .signbutton a{
    font-size: 12px;
  }
  .icons{
    margin-top: 25.5%;
    padding: 10px 0;
    gap: 28px;
    border-top-right-radius: 20%;
    border-top-left-radius: 20%;
  }
  .icons i {
    font-size: 15px;
    color:rgba(0, 0, 0, 0.699);
    margin-left: 33%;
  }
  .icons span{
    padding: 40px 0 0 0;
    font-size: 10px;
    color:rgba(0, 0, 0, 0.699);
  }
  .buttonMessage p{
    margin-left: 2%;
    margin-bottom: 16%;
    font-size: 10px;
  }
}

@media screen and (min-width: 500px) and (max-width: 599px) {
  .logo  .vico{
    margin: 5px 0 0 10px;
  }
  .navigations{
    margin: 0;
    background-image: linear-gradient(to left, #004cff0b, #d900ff0e);
    width: 100%;
    border-radius: 0;
  }
  .roadmap{
    font-size: 13px;
    margin: 25px 10px 0 25%;
  }
  .aboutpage{
    margin: 25px -10px 0 0;
    font-size: 13px;
  }
  .signupForFree{
    height: 15px;
    font-size: 13px;
    padding: 5px 10px;
    margin: 20px 0 0 5px;
  }
  .rightnav{
    height: 15px;
    font-size: 13px;
    padding: 5px 10px;
    margin: 20px 0 0 5%;
  }
  .title{
    font-size: 4rem;
  }
  .container h1{
    margin: 20% 0 5% 0;
    font-size: 3.5rem;
  }
  .container p{
    /* display: none; */
    font-size: 12px;
    margin: 0 0 3% -5px;
  }
  .container ol{
    margin: 0 0 5% -2.5%;
  }
  .container li{
    font-size: 10px;
  }
  .signbutton{
    margin: 0 0 0 33%;
    padding: 10px 15px;
  }
  .signbutton a{
    font-size: 12px;
  }
  .icons{
    margin-top: 21%;
    padding: 5px 0 10px 0;
    gap: 38px;
    border-top-right-radius: 20%;
    border-top-left-radius: 20%;
  }
  .icons i {
    font-size: 15px;
    color:rgba(0, 0, 0, 0.699);
    margin-left: 33%;
  }
  .icons span{
    padding: 40px 0 0 0;
    font-size: 10px;
    color:rgba(0, 0, 0, 0.699);
  }
  .buttonMessage p{
    margin:1px 0 10% -1%;
    font-size: 10px;
  }
}

@media screen and (min-width: 768px) and (max-width: 800px) and (min-height: 1024px) and (max-height: 1100px) {
  .logo  .vico{
    margin: 5px 0 0 10px;
  }
  .vico{
    font-size: 1.5rem;
  }
  .navigations{
    margin: 0;
    background-image: linear-gradient(to left, #004cff0b, #d900ff0e);
    width: 100%;
    border-radius: 0;
  }
  .roadmap{
    font-size: 13px;
    margin: 20px 10px 0 48%;
  }
  .aboutpage{
    margin: 20px -20px 0 0;
    font-size: 13px;
  }
  .signupForFree{
    height: 15px;
    font-size: 13px;
    padding: 5px 10px;
    margin: 15px 0 0 5px;
  }
  .rightnav{
    height: 15px;
    font-size: 13px;
    padding: 5px 10px;
    margin: 15px 0 0 5%;
  }
  .title{
    font-size: 3.5rem;
  }
  .container h1{
    margin: 10% 0 3% 0;
    font-size: 3rem;
  }
  .container p{
    font-size: 12px;
    margin: 0 0 3% -5px;
  }
  .container ol{
    margin: 0 0 5% 7.5%;
  }
  .container li{
    font-size: 10px;
  }
  .signbutton{
    margin: 0 0 0 40%;
    padding: 10px 15px;
  }
  .signbutton a{
    font-size: 12px;
  }
  .icons{
    margin-top: 22%;
    padding: 5px 0;
    gap: 10%;
    border-top-right-radius: 20%;
    border-top-left-radius: 20%;
  }
  .icons i {
    font-size: 15px;
    color:rgba(0, 0, 0, 0.699);
    margin-left: 33%;
  }
  .icons span{
    padding: 20px 0 20px 0;
    font-size: 10px;
    color:rgba(0, 0, 0, 0.699);
  }
  .buttonMessage p{
    margin: 0 0 10% 2%;
    font-size: 10px;
  }
}


@media screen and (min-width: 800px) and (max-width: 899px){
  .logo  .vico{
    margin: 5px 0 0 10px;
  }
  .navigations{
    margin: 0;
    background-image: linear-gradient(to left, #004cff0b, #d900ff0e);
    width: 100%;
    border-radius: 0;
  }
  .roadmap{
    font-size: 13px;
    margin: 25px 10px 0 50%;
  }
  .aboutpage{
    margin: 25px -20px 0 0;
    font-size: 13px;
  }
  .signupForFree{
    height: 15px;
    font-size: 13px;
    padding: 5px 10px;
    margin: 20px 0 0 5px;
  }
  .rightnav{
    height: 15px;
    font-size: 13px;
    padding: 5px 10px;
    margin: 20px 0 0 5%;
  }
  .title{
    font-size: 5rem;
  }
  .container h1{
    margin: 10% 0 3% 0;
    font-size: 4rem;
  }
  .container p{
    font-size: 15px;
    margin: 0 0 3% -5px;
  }
  .container ol{
    margin: 0 0 5% 1.5%;
  }
  .container li{
    font-size: 12px;
  }
  .signbutton{
    margin: 0 0 0 40%;
    padding: 10px 15px;
  }
  .signbutton a{
    font-size: 12px;
  }
  .icons{
    margin-top: 1%;
    padding: 5px 0;
    gap: 10%;
    border-top-right-radius: 20%;
    border-top-left-radius: 20%;
  }
  .icons i {
    font-size: 15px;
    color:rgba(0, 0, 0, 0.699);
    margin-left: 33%;
  }
  .icons span{
    padding: 20px 0 20px 0;
    font-size: 10px;
    color:rgba(0, 0, 0, 0.699);
  }
  .buttonMessage p{
    margin-left: 2%;
    margin-bottom: 13%;
    font-size: 10px;
  }
}

@media screen and (min-width: 900px) and (max-width: 999px) and (min-height: 1368px) {
  .logo  .vico{
    margin: 5px 0 0 10px;
  }
  .navigations{
    margin: 2% 0 0 5%;
    background-image: linear-gradient(to left, #004cff0b, #d900ff0e);
    width: 90%;
    border-radius: 5px;
  }
  .roadmap{
    font-size: 13px;
    margin: 25px 10px 0 50%;
  }
  .aboutpage{
    margin: 25px -20px 0 0;
    font-size: 13px;
  }
  .signupForFree{
    height: 15px;
    font-size: 13px;
    padding: 5px 10px;
    margin: 20px 0 0 5px;
  }
  .rightnav{
    height: 15px;
    font-size: 13px;
    padding: 5px 10px;
    margin: 20px 0 0 5%;
  }
  .title{
    font-size: 5rem;
  }
  .container h1{
    margin: 5% 0 3% 0;
    font-size: 4rem;
  }
  .container p{
    font-size: 15px;
    margin: 0 0 3% -5px;
  }
  .container ol{
    margin: 0 0 5% 11.5%;
  }
  .container li{
    font-size: 12px;
  }
  .signbutton{
    margin: 0 0 0 40%;
    padding: 10px 15px;
  }
  .signbutton a{
    font-size: 12px;
  }
  .icons{
    margin-top: -2.6%;
    padding: 10px 0;
    gap: 10%;
    border-top-right-radius: 20%;
    border-top-left-radius: 20%;
  }
  .icons i {
    font-size: 15px;
    color:rgba(0, 0, 0, 0.699);
    margin-left: 33%;
  }
  .icons span{
    padding: 30px 0 20px 0;
    font-size: 10px;
    color:rgba(0, 0, 0, 0.699);
  }
  .buttonMessage p{
    margin: 1px 0 13% -1%;
    font-size: 10px;
  }
}

 @media screen and (min-width: 1000px) and (max-width: 1100px) and (min-height: 1366px) and (max-height: 1399px) {
  .logo  .vico{
    margin: 5px 0 0 10px;
  }
  .navigations{
    margin: 2% 0 0 5%;
    background-image: linear-gradient(to left, #004cff0b, #d900ff0e);
    width: 90%;
    border-radius: 5px;
  }
  .roadmap{
    font-size: 13px;
    margin: 20px 10px 0 55%;
  }
  .aboutpage{
    margin: 20px -20px 0 0;
    font-size: 13px;
  }
  .signupForFree{
    height: 15px;
    font-size: 13px;
    padding: 5px 10px;
    margin: 15px 0 0 5px;
  }
  .rightnav{
    height: 15px;
    font-size: 13px;
    padding: 5px 10px;
    margin: 15px 0 0 4%;
  }
  .title{
    font-size: 5rem;
  }
  .container h1{
    margin: 5% 0 3% 0;
    font-size: 4rem;
  }
  .container p{
    font-size: 15px;
    margin: 0 0 3% -5px;
  }
  .container ol{
    margin: 0 0 5% 11.5%;
  }
  .container li{
    font-size: 12px;
  }
  .signbutton{
    margin: 0 0 0 40%;
    padding: 10px 15px;
  }
  .signbutton a{
    font-size: 12px;
  }
  .icons{
    margin-top: -5%;
    padding: 10px 0;
    gap: 10%;
    border-top-right-radius: 20%;
    border-top-left-radius: 20%;
  }
  .icons i {
    font-size: 15px;
    color:rgba(0, 0, 0, 0.699);
    margin-left: 33%;
  }
  .icons span{
    padding: 30px 0 20px 0;
    font-size: 10px;
    color:rgba(0, 0, 0, 0.699);
  }
  .buttonMessage p{
    margin: 1px 0 13% -3%;
    font-size: 10px;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1099px) and (min-height: 600px) and (max-height: 699px) {
  .logo  .vico{
    margin: 5px 0 0 10px;
  }
  .navigations{
    margin: 2% 0 0 5%;
    background-image: linear-gradient(to left, #004cff0b, #d900ff0e);
    width: 90%;
    border-radius: 5px;
  }
  .roadmap{
    font-size: 13px;
    margin: 25px 10px 0 55%;
  }
  .aboutpage{
    margin: 25px -20px 0 0;
    font-size: 13px;
  }
  .signupForFree{
    height: 15px;
    font-size: 13px;
    padding: 5px 10px;
    margin: 20px 0 0 5px;
  }
  .rightnav{
    height: 15px;
    font-size: 13px;
    padding: 5px 10px;
    margin: 20px 0 0 5%;
  }
  .title{
    font-size: 5rem;
  }
  .container h1{
    margin: 2% 0 3% 0;
    font-size: 4rem;
  }
  .container p{
    font-size: 15px;
    margin: 0 0 3% -5px;
  }
  .container ol{
    margin: 0 0 5% 11.5%;
  }
  .container li{
    font-size: 12px;
  }
  .signbutton{
    margin: 0 0 0 40%;
    padding: 10px 15px;
  }
  .signbutton a{
    font-size: 12px;
  }
  .icons{
    margin-top: -10%;
    padding: 10px 0;
    gap: 10%;
    border-top-right-radius: 20%;
    border-top-left-radius: 20%;
  }
  .icons i {
    font-size: 15px;
    color:rgba(0, 0, 0, 0.699);
    margin-left: 33%;
  }
  .icons span{
    padding: 30px 0 20px 0;
    font-size: 10px;
    color:rgba(0, 0, 0, 0.699);
  }
  .buttonMessage p{
    margin: 1px 0 13% -3%;
    font-size: 10px;
  }
}

@media screen and (min-width: 1200px) and (max-width: 1299px) and (min-height: 800px) {
  .logo  .vico{
    margin: 5px 0 0 10px;
  }
  .navigations{
    margin: 2% 0 0 6%;
    background-image: linear-gradient(to left, #004cff0b, #d900ff0e);
    width: 80%;
    border-radius: 5px;
  }
  .roadmap{
    font-size: 13px;
    margin: 25px 10px 0 60%;
  }
  .aboutpage{
    margin: 25px -20px 0 0;
    font-size: 13px;
  }
  .signupForFree{
    height: 15px;
    font-size: 13px;
    padding: 5px 10px;
    margin: 20px 0 0 5px;
  }
  .rightnav{
    height: 15px;
    font-size: 13px;
    padding: 5px 10px;
    margin: 20px 0 0 5%;
  }
  .title{
    font-size: 5rem;
  }
  .container h1{
    margin: 5% 0 1% 0;
    font-size: 4rem;
  }
  .container p{
    font-size: 15px;
    margin: 0 0 3% -5px;
  }
  .container ol{
    margin: 0 0 3% 19%;
  }
  .container li{
    font-size: 12px;
  }
  .signbutton{
    margin: 0 0 0 43%;
    padding: 10px 15px;
  }
  .signbutton a{
    font-size: 12px;
  }
  .icons{
    margin-top: -7%;
    padding: 10px 0;
    gap: 10%;
    border-top-right-radius: 20%;
    border-top-left-radius: 20%;
  }
  .icons i {
    font-size: 15px;
    color:rgba(0, 0, 0, 0.699);
    margin-left: 33%;
  }
  .icons span{
    padding: 30px 0 20px 0;
    font-size: 10px;
    color:rgba(0, 0, 0, 0.699);
  }
  .buttonMessage p{
    margin: 1px 0 13% 0;
    font-size: 10px;
  }
}






</style>