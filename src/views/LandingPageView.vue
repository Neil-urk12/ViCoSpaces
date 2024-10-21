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
          <!-- <h5>ViCoSpaces</h5> -->
          <div class="logo">
            <img
              src="../images/logo/logo.png"
              class="logo-img"
            >
          </div>

          <div class="roadmap">
            <RouterLink
              target="_blank"
              to="/roadmap"
            >
              Road map
              <!-- <i class="fa-solid fa-angle-down"></i> -->
            </RouterLink>
          </div>

          <div class="aboutpage">
            <RouterLink
              target="_blank"
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
          
          <div class="signupForFree">
            <RouterLink to="/register">
              Sign up free
            </RouterLink>
          </div>
        </div>
        <!-- <div class="leftnav">
                <p class="vicoText">
                  ViCoSpaces
                </p><hr>
                <p class="message">
                  The everything app for work
                </p>
          </div>
        --> 
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
      <p
        class="buttonMessage"
        style="font-size: 12px;margin: 7px 0 0 4%;color:rgba(0, 0, 0, 0.699);"
      >
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

.roadmap {
  margin: 17px 20px 0 63%;
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
  width: 80%;
  margin: 1.2rem 0 0 12%;
  display: flex;
  padding: 6px 0;
  border-radius: 10px;
}
.logo{
  margin: 0 0 0 1.1rem;
}
.logo img{
  width: 55px;
  height: 50px; 
  border-radius: 50%;
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
  margin-top: 48px;
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
.rightnav{
  margin: 7px 2% 0 2%;
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

/* @media screen and (max-width: 600px) {
  .navigations{
    margin: 0;
    background-image: linear-gradient(to left, #004cff0b, #d900ff0e);
    width: 100%;
  }
  .roadmap{
    font-size: 13px;
    margin-left: 0;
    margin-right: 0;
  }
  .signupForFree{
    height: 20px;
  }
  .signupForFree a{
    font-size: 13px;
  }
  .rightnav{
    height: 10px;
    font-size: 15px;
    padding: 10px 10px;
    margin-left: -40%;
  }
  .title{
    font-size: 5rem;
  }
  .container h1{
    margin: 15% 0 5% 0;
    font-size: 3.5rem;
  }
  .container p{
    font-size: 1px;
    margin: 0 0 5% 0;
  }
  .container ol{
    margin: 0 0 5% 0;
  }
  .container li{
    font-size: 11.5px;
  }
  .signbutton{
    margin: 0 0 0 34%;
    padding: 10px;
  }
  .signbutton a{
    font-size: 15px;
  }
  .icons{
    margin-top: 11%;
    padding: 30px 0;
    border-top-right-radius: 40%;
    border-top-left-radius: 40%;

  }
  .icons p{
    padding: 40px 0 0 0;
    font-size: 12px;
  }
} */
@media screen and (min-width: 600px) and (max-width: 900px) {
  .navigations{
    width: 100%;
    margin: 0;
  }
  .roadmap{
    margin: 0 0 0 0;
  }
  .signupForFree{
    margin: 0 0 0 5%;
    font-size: 10px;
    padding: 10px 10px;
  }
  .rightnav{
    margin:0 0 0 0%;
    font-size: 15px;
    padding: 10px 10px;
  }
  .title{
    font-size: 5rem;
  }
  .container h1{
    margin: 10% 0 5% 0;
    font-size: 3.5rem;
  }
  .container p{
    font-size: 1px;
    margin: 0 0 5% 0;
  }
  .container ol{
    margin: 3% 0 10% 0;
  }
  .container li{
    font-size: 13px;
  }
  .signbutton{
    margin: 0 0 0 34%;
    padding: 10px;
  }
  .icons{
    margin-top: 28.5%;
    padding: 30px 0;
    border-top-left-radius: 30%;
    border-top-right-radius: 30%;
  }
  .iconname{
    padding: 20px 0 0 0;
    font-size: 5px;
  }
}

@media screen and (min-width: 901px) and (max-width:1200px){
    .rightnav{
      margin: 0 0 0 51%;
    }
    .roadmap{
      margin: 15px 0 0 43%;
    }
    .aboutpage{
      margin: 15px 15px 0 10px;
    }
    .signupForFree{
      margin: 5px 0 0 1%;
      font-size: 15px;
      padding: 8px 10px;
      width: 80px;
    }
    .signupForFree a{
      font-size: 14px;
    }
    .rightnav{
      width: 50px;
      padding: 8px 10px;
      margin:5px 0 0 0;
    }
    .container h1{
    margin: 13% 0 5% 0;
    font-size: 3.5rem;
  }
  .container p{
    font-size: 1px;
    margin: 0 0 5% 0;
  }
  .container ol{
    margin: 3% 0 5% -1%;
  }
  .container li{
    font-size: 13px;
  }
  .signbutton{
    margin: 0 0 0 34%;
    padding: 10px;
  }
  .container p{
    margin: 0 0 0 0;
    font-size: 18px;
  }
  .signbutton{
    margin: 0 0 0 40%;
    padding: 10px;
  }
  .icons{
    margin-top: 15%;
    padding: 30px 0;
    border-top-left-radius: 30%;
    border-top-right-radius: 30%;
  }
  .iconname{
    padding: 20px 0 0 0;
    font-size: 5px;
  }
}

</style>