<script setup>
import CreateRoom from './buttons/create-room-button.vue';

function notify (){
  // used in the joint btn
  alert('hello babe, I love you');
}
// test functions
const filter = () => {
  alert("fitered");
}

const sort = () => {
  alert("sorted search");
}


// to activale the create room overlay
const emit = defineEmits(['open-room']);




</script>



<template>
  <main>
    <div class="search-bar">
      <div class="search">
        <img
          class="search-icon"
          src="../images\SVG\search-svgrepo-com.svg"
          alt="search-icon"
          width="30px"
        >

        <!-- search bar input -->
        <input
          id=""
          type="text"
          class="search-input"
          name="search-input"
          placeholder="Search here..."

        >

        <div class="filter-sort">
        <a href="" @click="filter">
          <img
          class="filter-icon"
          src="../images/SVG/filters-2-svgrepo-com.svg"
          alt="filter-icon"
          width="30px"
        >
        </a>
          
        <a href="" @click="sort">
          <img
          class="sort-icon"
          src="../images/SVG/sort-vertical-svgrepo-com.svg"
          alt="sort-icon"
          width="30px"
        >
        </a>
        
        </div>
        
      </div>
            
      <div class="button-container">
        <button @click="notify">Join Room</button>

        <CreateRoom
          label="Host"
          @click="emit('open-room')"
        />

            
            
        <!-- <button @click="BtnCreateRoom">+ Create Room</button> -->
      </div>
    </div>
  </main>
</template>
<script>
    
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: Arial, Helvetica, sans-serif;
    }
    .search-bar{
        display: flex;
        justify-content: center;
        margin-top: 20px;


        
    }
    .search {
        --padding: 14px;

        width: max-content;
        display: flex;
        align-items: center;
        padding: var(--padding);
        border-radius: 12px;
        background: #f6f6f6;
        width: 75%;
    }
    .search-input {
        font-size: 16px;
        font-family: sans-serif;
        color: black;
        margin-left: var(--padding);
        margin-right: var(--padding);
        outline: none;
        border: none;
        background: transparent;
        flex: 1;
    }
    .search-icon, .sort-icon, .filter-icon {
        cursor: pointer;
    }
    .filter-sort{
      display: flex;
      justify-content: space-between;
      gap: 15px;
    }
    .button-container{
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        width: 20%;
        display: flex;
        
    }
    button{
        
        background-color: #2d8eff;
        color: white;
        border: none;
        border-radius: 12px;
        width: 123px;
        height: 50px;
        font-weight: bold;
    }

    button:first-child {
    margin-right: 0; 
}
    
</style>
