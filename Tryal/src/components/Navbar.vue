<template>
   <header>
     <nav class="nav-bar">
       <div class="nav-div">
         <div class="logo-container">
           <img src="../assets/svg/filters-2-svgrepo-com.svg" alt="ViCoSpaces-Logo" class="logo-img">
           <span class="logo-name">ViCoSpaces</span>
         </div>
         <div class="nav-links-and-buttons">
           <ul class="pages-container">
             <li><a href="#">Home</a></li>
             <li><a href="#">About</a></li>
             <li><a href="#">Contact</a></li>
           </ul>
           <div class="auth-buttons">
             <button class="sign-btn">Sign In</button>
             <button class="sign-btn">Sign Up</button>
           </div>
         </div>
       </div>
     </nav>
   </header>
 </template>
 
 
 <style scoped>
* {
  text-decoration: none;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.nav-bar {
  background: #2d8eff;
  font-family: Calibri, sans-serif;
  align-items: center;
  height: 70px;
  padding: 15px;
}

.nav-div {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-container {
  display: flex;
  align-items: center;
  font-size: 35px;
  font-weight: 600;
  color: white;
}

.logo-img {
  height: 40px;
  margin-right: 10px;
}

.nav-links-and-buttons {
  display: flex;
  align-items: center;
}

.pages-container {
  display: flex;
  list-style: none;
  gap: 20px;
  margin: 0; /* Ensure no extra margin is affecting alignment */
}

.pages-container li {
  list-style: none;
}

.pages-container li a {
  color: white;
  font-size: 18px;
  font-weight: bold;
}

.auth-buttons {
  display: flex;
  gap: 10px;
  margin-left: 20px; /* Controls the space between the links and buttons */
}

.sign-btn {
  background-color: white;
  color: #2d8eff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
}

.sign-btn:hover {
  background-color: #fff3e0;
}
</style>


