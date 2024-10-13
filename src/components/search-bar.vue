<script setup>
import CreateRoom from './create-room-button.vue';

//**const props = defineProps({
   // placeholder: String,
    //modelValue: {
      //  type: String,
    //    required: true,
  //  }
 //})
const host = () => {
    alert("Hosted a Room");
}  
const filter = () => {
  alert("fitered");
}
const sort = () => {
  alert("sorted search");
}
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
        <!-- <input class="search-input" type="text" name="" id="" placeholder="Search here..."> -->
        <input
          id=""
          type="text"
          class="search-input"
          name="search-input"
          placeholder="Search here..."
        >
        <!-- <input type="text" v-model="search" @input="$emit('update:modelValue', $event.targe)" placeholder="Search here..." /> -->

        <div class="filter-sort">
          <a
            href=""
            @click="filter"
          >
            <img
              class="filter-icon"
              src="../images/SVG/filters-2-svgrepo-com.svg"
              alt="filter-icon"
              width="30px"
            >
          </a>
          
          <a
            href=""
            @click="sort"
          >
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
        <button>Join Room</button>
        <CreateRoom
          label="Host"
          @click="host"
        />    
        <!-- <button @click="BtnCreateRoom">+ Create Room</button> -->
      </div>
    </div>
  </main>
</template>

<style scoped>
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
