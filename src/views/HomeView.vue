<script setup>
import navBar from '@/components/nav-bar.vue';
import searchBar from '@/components/search-bar.vue';
import categoryBar from '@/components/category-bar.vue';

const join = () =>{
  alert("neil joined the program!");
}
</script>

<template>
  <header>
    <navBar />
    <searchBar />
    <categoryBar />
  </header>
  <main class="room-view-container">
    <div class="room">
      <div class="image-content">
        <div class="hosting-container">
          <div class="host-profile" />
        </div>
      </div>
      <div class="text-content">
        <h2> Production Design</h2><!--Tittle holder to be modified-->
        <div class="joined-users">
          <i class="icon" />
        </div>
        <div class="join-btn-container">  
          <button
            class="join-btn"
            @:click="join"
          >
            Join
          </button>           
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.room-view-container {
  display: grid;
  column-gap: 20px;
  row-gap: 20px;
  grid-template-columns: 28% 1fr 1fr; /
  grid-template-rows: 300px auto auto; 
  background-color: rgb(255, 255, 255);
  width: 96%;
  height: 71.8vh;
  margin: auto;
}
.room {
  border-radius: 12px;
  height: 100%; 
  width: 100%;
  flex-direction: column; 
  overflow: hidden;
  box-shadow: 3px 5px 20px #9e9e9e;
}
.image-content{
  background-image: url(../images/SVG/room-background_2.svg);
  display: grid;
  grid-template-columns: 28% 1fr 1fr; 
  grid-template-rows: auto auto; 
  border-radius: 12px 12px 0px 0px;
  height: 60%;
  background-color: #2d8eff;
}
.hosting-container{
  grid-column: 3;
  background-color: rgb(255, 255, 255);
  height: 64px;
  width: 64px;
  border-radius: 50%;
  align-self: center;
  transform: translate(107px, -20px); 
  background-image: url('../images/UserProfileStocks/megan.jpg'); 
  background-size: 220%; 
  background-size: cover; 
  background-position: center; 
  background-repeat: no-repeat;
}
.text-content {
  display: grid;
  grid-template-columns: auto auto auto 130px;
  grid-template-rows: auto 1fr auto;
  height: 40%; 
  max-height: 100%; 
  max-width: 100%; 
  border-radius: 0px 0px 12px 12px;
  background-color: rgb(255, 255, 255);
  padding: 0px 10px 10px 10px;
  align-items: center;
  box-sizing: border-box; 
}
.title {
  grid-column: 1 / span 3; 
  grid-row: 1; 
  font-size: 24px;
  font-weight: bold;
  align-items: center;
  text-align: center;
}
.title h2 {
  color: white;
}
.joined-users {
  grid-column: 1 / span 1; 
  grid-row: 3; 
  background-color: rgb(9, 255, 140);
  border-radius: 50%;
  height: 32px;
  width: 32px;
  font-size: 24px;
}
.join-btn-container {
  grid-column: 4; 
  grid-row: 3;
  display: flex;
  justify-content: center; 
  align-items: center;
}
.join-btn {
  font-weight: bolder;
  border: none;
  border-radius: 12px;
  height: 42px;
  width: 124px;
  color: white;
  background-color: #2d8eff;
}
</style>