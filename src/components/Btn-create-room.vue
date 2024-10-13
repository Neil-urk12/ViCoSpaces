// <template>
//   <div>
//     <ChildComponent :someProp="parentData" @childEvent="handleChildEvent" />
//     <button @click="triggerInChild">Trigger in Child</button>
//   </div>
// </template>

// <script>
// import ChildComponent from './search-bar.vue';

// export default {
//   components: {
//     ChildComponent
//   },
//   data() {
//     return {
//       parentData: 'Data from Parent'
//     }
//   },
//   methods: {
//     triggerInChild() {
//       // Modify data or trigger something that the child listens to
//       alert("hello neil");
//       this.parentData = 'Updated data from parent';
//     },
//     handleChildEvent(eventData) {
//       console.log('Event from Child:', eventData);
//     }
//   }
// }
// </script>

