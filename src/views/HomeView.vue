<script setup>
import navBar from '@/components/nav-bar.vue';
import searchBar from '@/components/search-bar.vue';
import filterBar from '@/components/filter-bar.vue';
</script>

<template>
  <header>
    <navBar />
    <searchBar />
    <filterBar />
  </header>
  <section class="room-view-container">
    <div class="room">
      <div class="image-content">
        
      </div>
      <div class="text-content"></div>
    </div>
  </section>
</template>


<style scoped>
  .room-view-container {
    background-color: black;
    width: 96%;
    height: 71.8vh;
    margin: auto;
}


  .room {
    background: white;
    height: 40%;
    width: 33%;
  }

  .image-box {

  }

</style>