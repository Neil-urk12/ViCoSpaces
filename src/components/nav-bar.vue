

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
          <a href="" id="user-profile">
            <div class="user-profile">
              <img src="../images/black-default-user-profile-ll(1).webp" alt="">
            </div>
          </a>
        </div>
      </div>
    </nav>
  </header>
</template>


<style scoped>
* {
      text-decoration: none;
      font-family: Arial, Helvetica, sans-serif;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    .nav-bar {
      background: #2d8eff;
      font-family: Calibri, sans-serif;
      align-items: center;
      height: 70px;
      padding: 15px 40px 0px 40px;
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
      gap: 70px; /** adjust the space between progile picture and pages options **/
    }
    
    .pages-container {
      display: flex;
      list-style: none;
      gap: 80px; /** adjust the space between nav pages options **/
      margin: 0;
    }
    .pages-container li a {
      color: white;
      font-size: 18px;
      font-weight: bold;
      position: relative; 
      text-align: center;
    }
    
    .pages-container li a::after {
      content: '';
      position: absolute;
      left: 50%;
      bottom: -2px;
      width: 0;
      height: 2px;
      background-color: white;
      transition: all 0.3s ease-in-out;
      transform: translateX(-50%);
    }
    
    .pages-container li a:hover::after {
      width: 100%;
      left: 50%; 
      transform: translateX(-50%);  
    }
    .user-profile{
        display: flex;
        background-color: white;
        height: 40px;
        width: 40px;
        border-radius: 50%;
        justify-content: center;
    }

</style>


