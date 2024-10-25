<script setup>

import { defineEmits, ref, watch, defineProps } from 'vue';
import { useRoomStore } from '../stores/roomStore';

const emit = defineEmits(['close', 'filterChange']);

const searchQuery = ref('');
const sortBy = ref('createdAt');
const sortOrder = ref('desc');
const privacyFilter = ref('all');
const categoryFilter = ref('all');

const roomStore = useRoomStore();
const props = defineProps({
  availableCategories: {
    type: Array,
    default: () => [],
  },
});
const applyFilters = () => {
  emit('filterChange', {
    searchQuery: searchQuery.value,
    sortBy: sortBy.value,
    sortOrder: sortOrder.value,
    privacyFilter: privacyFilter.value,
    categoryFilter: categoryFilter.value,
  });
};
watch([searchQuery, sortBy, sortOrder, privacyFilter, categoryFilter], applyFilters);

const closeModal = () => {
    emit('close');
  };
</script>

<template>
  <div
    class="modal-overlay"
    @click.self="closeModal"
  >
    <div class="modal-content">
      <!-- Filters -->
      <div class="wrapper">
        <div class="filters">
          <div class="sortby-filter">
            <select
              v-model="sortBy"
              @change="applyFilters"
            >
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
          <div class="privacy-filter">
            <select
              v-model="privacyFilter"
              @change="applyFilters"
            >
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
            <select
              v-model="categoryFilter"
              @change="applyFilters"
            >
              <option value="all">
                All Categories
              </option>
              <option
                v-for="category in availableCategories"
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
    position: absolute;
    right: 24%;
    top: 14%;
    display: flex;
    flex-direction: column;
    background-color: #2e2e2e70;
    border-radius: 12px;
    border: solid 1px #ffffff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    width: 250px;
    padding: 20px;
    gap: 15px;
  }
  .filters {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  select {
    background-color: #f5f5f5;
    border: none;
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    color: #333;
    cursor: pointer;
    transition: background-color 0.3s, box-shadow 0.3s;
  }
  select:focus {
    background-color: #eaeaea;
    box-shadow: 0 0 0 2px #2d8eff;
    outline: none;
  }
  select:hover {
    background-color: #e0e0e0;
  }
  .sortby-filter, .privacy-filter, .category-filter {
    display: flex;
    flex-direction: column;
  }
  .wrapper {
    padding: 10px 0;
  }
  .option {
    padding: 8px;
  }
  @media (max-width: 1339px ) {
    .modal-content {
      right: 26%;
      top: 13%;
    }
  }
  @media(max-width: 663px){
    .modal-content {
      right: 32%;
      top: 13%;
    }
  }
  @media (max-width: 504px) {
    .modal-content {
      right: 27%;
      top: 11%;
    }
  }
  @media (max-width: 414px) {
    .modal-content {
      right: 22%;
      top: 14%;
    }
  }
  @media (max-width: 375px) {
    .modal-content {
      right: 17%;
      top: 19%;
    }
  }
  </style>
  


  