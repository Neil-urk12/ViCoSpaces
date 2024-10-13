<template>
  <div>
    <ChildComponent
      :some-prop="parentData"
      @child-event="handleChildEvent"
    />
    <button @click="triggerInChild">
      Trigger in Child
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ChildComponent from './search-bar.vue';

const parentData = ref('Data from Parent');

function triggerInChild() {
  // Modify data or trigger something that the child listens to
  alert("hello neil");
  parentData.value = 'Updated data from parent';
}
function handleChildEvent(eventData) {
  console.log('Event from Child:', eventData);
}
</script>