<script setup>
import Navbar from './components/Navbar.vue';
import Searchbar from './components/Searchbar.vue';

</script>

<template>
  <header>
    <Navbar/>
  </header>

  <main>
    <Searchbar/>
  </main>
</template>

<style >
  * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
