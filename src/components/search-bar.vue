<template>
    <div class="search-bar">
        <div class="search">
            <img class="search-icon" src="../images\SVG\search-svgrepo-com.svg" alt="search-icon" width="30px">
            <input class="search-input" type="text" name="" id="" placeholder="Search here...">
            <img class="filter-icon" src="../images/SVG/filters-2-svgrepo-com.svg" alt="filter-icon" width="30px">
            <img class="sort-icon" src="../images/SVG/sort-vertical-svgrepo-com.svg" alt="sort-icon" width="30px">
        </div>
        
        <div class="button-container">
            <button id="join-room">Join Room</button>
            <button @click = 'emitCreateRoom'>Create Room</button>
        </div>
  </div>
</template>
<script>
    export default {
    methods: {
      emitCreateRoom() {
        this.$emit('add-room'); // Emit the event to the parent component
      },
    },
  };
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: Arial, Helvetica, sans-serif;
    }
    .search-bar{
        margin: 24px 0px 0px 12px;
        display: flex;
        padding-left: 60px;

        
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
    .sort-icon, .filter-icon {
        margin-left: 12px;
    }
    .button-container{
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        width: 20%;
        display: flex;
        margin-left: 12px;
        
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
