<template>
  <div
    class="modal-overlay"
    @click.self="closeModal"
  >
    <div class="modal-content">
      <div class="modal-wrapper">
        <div class="search-sort">
          <select class="sb" v-model="sortBy">
            <option value="capacity">
              Capacity
            </option>
            <option value="createdAt">
              Latest
            </option>
            <option value="createdAtOldest">
              Oldest
            </option>
          </select>
        </div>
          
        <div class="filters">
          <div class="privacy-filter">
            <select class="pf" v-model="privacyFilter">
              <option value="all">
                All Privacy
              </option>
              <option value="public">
                Public
              </option>
              <option value="private">
                Private
              </option>
            </select>
          </div>
          <div class="category-filter">
            <select class="cf" v-model="categoryFilter">
              <option value="all">
                All Categories
              </option>
              <option
                v-for="category in uniqueCategories"
                :key="category"
                :value="category"
              >
                {{ category }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
  import { defineEmits } from 'vue';
  
  const emit = defineEmits(['close']);
  
  const closeModal = () => {
    emit('close');
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
  }
  
  .modal-content {
    display: flex;
    flex-direction: column;
    background-color: rgb(203, 14, 255);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 300px;
    height: 180px;
  }
 
  .modal-wrapper{
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .sb, .pf, .cf{
    --padding: 14px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: var(--padding);
    border-radius: 12px;
    background: #f6f6f6;
    width: 75vw;
    max-width: 100%;
  }

  </style>
  