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
    @media (min-width: 480px) and (max-width: 600px) {
      .logo-container{
        height: 50px;
        font-size: 25px;
      }
    }
    
</style>