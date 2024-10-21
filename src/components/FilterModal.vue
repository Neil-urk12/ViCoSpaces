<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { ref as dbRef, onValue, off, push } from 'firebase/database';
import { realTimeDb as database } from '@/firebase/firebaseconfig';

const router = useRouter();
const authStore = useAuthStore();
const roomStore = useRoomStore();

// Filters and Sorting
const searchQuery = ref('');
const sortBy = ref('createdAt');
const sortOrder = ref('desc');
const privacyFilter = ref('all');
const categoryFilter = ref('all');

// Computed: Unique categories for the dropdown
const uniqueCategories = computed(() => {
  const categories = new Set(
    roomStore.rooms.map((room) => room.category).filter(Boolean)
  );
  return Array.from(categories);
});

// Computed: Filtered and Sorted Rooms
const filteredAndSortedRooms = computed(() => {
  let filteredRooms = roomStore.rooms.filter(
    (room) => room && typeof room === 'object'
  );

  // Search query filter
  if (searchQuery.value) {
    filteredRooms = filteredRooms.filter((room) =>
      room.id.includes(searchQuery.value)
    );
  }

  // Privacy filter
  if (privacyFilter.value !== 'all') {
    filteredRooms = filteredRooms.filter(
      (room) => room.privacyType === privacyFilter.value
    );
  }

  // Category filter
  if (categoryFilter.value !== 'all') {
    filteredRooms = filteredRooms.filter(
      (room) => room.category === categoryFilter.value
    );
  }

  // Sorting logic
  return filteredRooms.sort((a, b) => {
    let comparison = 0;
    if (sortBy.value === 'createdAtOldest') {
      comparison = (a.createdAt || 0) - (b.createdAt || 0);
    } else if (sortBy.value === 'createdAt') {
      comparison = (b.createdAt || 0) - (a.createdAt || 0);
    } else {
      const aValue = a[sortBy.value] || 0;
      const bValue = b[sortBy.value] || 0;
      if (aValue < bValue) comparison = -1;
      if (aValue > bValue) comparison = 1;
    }
    return sortOrder.value === 'desc' ? comparison * -1 : comparison;
  });
});
</script>

<template>
  <!-- Search and Sorting -->
  <div class="search-sort">
    <input v-model="searchQuery" placeholder="Search by ID" />

    <select v-model="sortBy">
      <option value="capacity">Capacity</option>
      <option value="createdAt">Latest</option>
      <option value="createdAtOldest">Oldest</option>
    </select>

    <select v-model="sortOrder">
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
    </select>
  </div>

  <!-- Filters -->
  <div class="filters">
    <select v-model="privacyFilter">
      <option value="all">All Privacy</option>
      <option value="public">Public</option>
      <option value="private">Private</option>
    </select>

    <select v-model="categoryFilter">
      <option value="all">All Categories</option>
      <option v-for="category in uniqueCategories" :key="category" :value="category">
        {{ category }}
      </option>
    </select>
  </div>

  <!-- Display Filtered and Sorted Rooms -->
  <div class="rooms-list">
    <div v-for="room in filteredAndSortedRooms" :key="room.id" class="room">
      <p>{{ room.name }} - {{ room.category }} - {{ room.privacyType }}</p>
    </div>
  </div>
</template>
