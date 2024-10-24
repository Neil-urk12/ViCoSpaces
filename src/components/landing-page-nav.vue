<template>
  <nav class="nav-bar">
    <div class="logo-container">
      <img
        src="../assets/svg/filters-2-svgrepo-com.svg"
        class="logo-img"
      >
      <span class="logo-name">ViCoSpaces</span>
    </div>
  </nav>
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
    .logo-container {
      display: flex;
      align-items: center;
      font-size: 35px;
      font-weight: 600;
      color: white;
    }

    @media screen and (min-width: 300px) and (max-width: 320px) and (min-height: 500px) and (max-height: 570px) {
      .logo-container{
        height: 50px;
        font-size: 20px;
        margin: 0 0 0 -5%;
      }
    }

    @media screen and (min-width: 360px) and (max-width: 375px){
      .logo-container{
        height: 50px;
        font-size: 20px;
        margin: 0 0 0 -5%;
      }
    }
    @media screen and (min-width: 375px) and (max-width: 480px) {
      .logo-container{
        height: 50px;
        font-size: 20px;
        margin: 0 0 0 -5%;
      }
    }
    @media screen and (min-width: 481px) and (max-width: 600px) {
      .logo-container{
        height: 50px;
        font-size: 25px;
      }
    }
    @media screen and (min-width: 601px) and (max-width: 900px)   {
      .logo-container{
        height: 50px;
        font-size: 25px;
      }
    }
    
</style>