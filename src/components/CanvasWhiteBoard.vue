<script setup>                                                                                                 
import { ref, onMounted, onUnmounted, computed } from 'vue'                                          
import { useCursorStore } from '@/stores/cursorStore'                                                    
import { useWhiteboardStore } from '@/stores/whiteboardStore' 
import { onValue, ref as dbRef, get } from 'firebase/database'  
import { realTimeDb as db } from '@/firebase/firebaseconfig'                                         
import { useAuthStore } from '@/stores/authStore'                                                           
import { useRoute } from 'vue-router'                                                               
import { useChatStore } from '@/stores/chatStore'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faT, faShapes, faPencil, faTrash, faDeleteLeft, faFileImport, faPen, faPenNib } from '@fortawesome/free-solid-svg-icons';
import { faImage } from '@fortawesome/free-regular-svg-icons';

library.add(faT, faShapes, faPencil, faTrash, faImage, faDeleteLeft, faFileImport, faPen, faPenNib);
                                                                                                               
const authStore = useAuthStore()                                                                        
const cursorStore = useCursorStore()                                                                      
const whiteboardStore = useWhiteboardStore()  
const chatStore = useChatStore()                                                              
const route = useRoute()                                                                                 
                                                                                                               
const userId = computed(() => authStore.getUid)                                                            
const username = computed(() => authStore.getDisplayName)                                                     
                                                                                                               
const canvasEl = ref(null)   
const showShapeLibrary = ref(false)                                                                                    
                                                                                                               
onMounted(async () => {                                                                                        
  cursorStore.setUserId(userId.value)                                                                         
  cursorStore.setRoomId(route.params.id)                                                
                                                                                                               
  const userCursorRef = dbRef(db, `rooms/${route.params.id}/cursors/${userId.value}`)                         
  const userCursorSnapshot = await get(userCursorRef);                                                         
  if (userCursorSnapshot.exists()) cursorStore.localCursor = userCursorSnapshot.val()
  else cursorStore.localCursor = { x: 0, y: 0, username: username.value };                                                                                                                                               
                                                                                                               
  onValue(dbRef(db, `rooms/${route.params.id}/cursors`), (snapshot) => {                                       
    const data = snapshot.val() || {};                                                                         
    cursorStore.otherCursors = Object.entries(data).reduce((acc, [key, value]) => {                            
      if (key !== userId.value)                                                                               
        acc[key] = value;                                                                                                                                                                             
      return acc;                                                                                              
    }, {})                                                                                                    
  })                                                                                                          
                                                                                                               
  whiteboardStore.initializeCanvas(canvasEl.value)                                                           
})                                                                                                            
                                                                                                               
onUnmounted(() => {                                                                                            
  cursorStore.unsubscribeCursors()  
  chatStore.unsubscribeMessages()                                                                         
});                                                                                                                                                                                                                       
const updateCursorPosition = (event) => cursorStore.updateCursorPosition(event)                                                                                                            
const addTextToCanvas = () => whiteboardStore.addTextToCanvas()                                                                                                            
const addShapeToCanvas = (shapeType, isFilled) => whiteboardStore.addShapeToCanvas(shapeType, isFilled)                                                                                                            
const toggleDrawMode = () => whiteboardStore.toggleDrawMode()                                                                                                            
const removeSelected = () => whiteboardStore.removeSelected()                                                                                                            
const clearCanvas = () => whiteboardStore.clearCanvas()                                                                                                          
const triggerFileSelect = () => whiteboardStore.triggerFileSelect()                                                                                                             
const insertImage = (event) => whiteboardStore.insertImage(event)                                                                                                            
const downloadCanvasAsImage = () => whiteboardStore.downloadCanvasAsImage()                                                                                                   
</script>    

<template>
  <div
    class="whiteboard-container"
    @mousemove="updateCursorPosition"
  >
    <div class="toolbar">
      <div class="tool-group">
        <button
          class="tool-btn"
          title="Drawing Mode"
          @click="toggleDrawMode"
        >
          <font-awesome-icon 
            v-if="whiteboardStore.isDrawingMode" 
            :icon="['fas', 'pen-nib']" 
          />
          <font-awesome-icon 
            v-else 
            :icon="['fas', 'pen']"  
          />
        </button>
        <div
          v-if="whiteboardStore.showBrushOptions"
          class="brush-options-popup"
        >                                
          <div class="brush-option">                                                                             
            <label for="brush-type">Brush Type:</label>                                                          
            <select
              id="brush-type"
              v-model="whiteboardStore.selectedBrush"
            >                                     
              <option value="pencil">
                Pencil
              </option>                                                             
              <option value="circle">
                Circle
              </option>                                                             
            </select>                                                                                            
          </div>                                                                                                 
          <div class="brush-option">                                                                             
            <label for="brush-color">Brush Color:</label>                                                        
            <input
              id="brush-color"
              v-model="whiteboardStore.selectedColor"
              type="color"
            >                      
          </div>                                                                                                 
          <div class="brush-option">                                                                             
            <label for="brush-thickness">Thickness:</label>                                                      
            <input
              id="brush-thickness"
              v-model="whiteboardStore.brushThickness"
              type="range"
              min="1"
              max="30" 
            >                                                                                                 
          </div>                                                                                                   
          <button
            title="Clear Canvas"
            @click="clearCanvas"
          >
            <font-awesome-icon :icon="['fas', 'trash']" />
          </button>                                            
          <button
            title="Insert Image"
            @click="triggerFileSelect"
          >
            <font-awesome-icon :icon="['far', 'image']" />
          </button>                                      
          <input
            ref="imageInput"
            type="file"
            style="display: none"
            @change="insertImage"
          >                       
          <button
            title="Remove Selected"
            @click="removeSelected"
          >
            <font-awesome-icon :icon="['fas', 'delete-left']" />
          </button>                                      
          <button
            title="Download Image"
            @click="downloadCanvasAsImage"
          >
            <font-awesome-icon :icon="['fas', 'file-import']" />
          </button>                                
        </div>
        <button
          class="tool-btn"
          title="Add Text"
          @click="addTextToCanvas"
        >
          <font-awesome-icon :icon="['fas', 't']" />
        </button>
        <button
          class="tool-btn"
          title="Shape Library"
          @click="showShapeLibrary = !showShapeLibrary"
        >
          <font-awesome-icon :icon="['fas', 'shapes']" />
        </button>
      </div>
  
      <div class="tool-group">
        <input
          v-model="whiteboardStore.selectedColor"
          type="color"
          class="color-picker"
          title="Choose Color"
        >
        <button
          class="tool-btn"
          title="Clear Canvas"
          @click="clearCanvas"
        >
          <font-awesome-icon :icon="['fas', 'trash']" />
        </button>
        <button
          class="tool-btn"
          title="Remove Selected"
          @click="removeSelected"
        >
          <font-awesome-icon :icon="['fas', 'delete-left']" />
        </button>
      </div>
  
      <div class="tool-group">
        <button
          class="tool-btn"
          title="Insert Image"
          @click="triggerFileSelect"
        >
          <font-awesome-icon :icon="['far', 'image']" />
        </button>
        <button
          class="tool-btn"
          title="Download Image"
          @click="downloadCanvasAsImage"
        >
          <font-awesome-icon :icon="['fas', 'file-import']" />
        </button>
        <input
          ref="imageInput"
          type="file"
          style="display: none"
          @change="insertImage"
        >
      </div>
    </div>
  
    <div class="canvas-area">
      <canvas ref="canvasEl" />
      <div
        v-for="(cursor, userId) in cursorStore.otherCursors"
        :key="userId"
        class="cursor"
        :style="{ left: `${cursor.x}px`, top: `${cursor.y}px` }"
      >
        <div class="cursor-pointer">
          <svg
            id="Layer_1"
            height="20px"
            width="20px"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" 
            viewBox="0 0 280.291 280.291"
            xml:space="preserve"
          >
            <g>
              <path
                style="fill:#EFC75E;"
                d="M84.373,195.442c13.083,13.03,17.02,34.461,3.947,47.5c-13.083,13.03-52.514,27.548-65.596,14.518
		c-13.074-13.03,1.505-52.321,14.579-65.351C50.384,179.078,71.299,182.403,84.373,195.442z"
              />
              <path
                style="fill:#E2574C;"
                d="M205.178,166.468c19.698,40.84-28.37,135.901-50.597,109.001
		c-9.013-10.904-8.418-28.3-31.949-50.702c-0.035,0.14,8.567,1.523,18.639-7.596C164.513,199.266,205.178,166.617,205.178,166.468z"
              />
              <path
                style="fill:#E2574C;"
                d="M122.404,75.004C78.256,54.999-23.998,102.753,5.143,125.216
		c11.814,9.11,30.558,8.611,54.842,32.369c-0.149,0.035-1.68-8.611,8.103-18.683C87.243,115.643,122.238,75.004,122.404,75.004z"
              />
              <path
                style="fill:#CF5349;"
                d="M102.96,70.471l-1.908-0.096c-9.687,11.831-33.358,40.998-47.788,59.453
		c-5.916,6.423-7.517,12.26-7.858,15.708c2.827,1.943,5.741,4.183,8.751,6.756c0.735-3.483,2.669-8.34,7.508-13.599
		c18.421-23.575,52.05-64.791,52.208-64.783C110.573,72.335,106.862,71.259,102.96,70.471z"
              />
              <path
                style="fill:#CF5349;"
                d="M205.45,167.115c-5.758,4.848-42.249,34.767-63.934,51.84c-7.167,6.633-13.529,7.876-16.705,7.998
		c3.115,3.133,5.811,6.169,8.103,9.101c2.853,0.044,9.722-0.858,17.475-8.025c18.149-14.299,46.572-37.497,58.762-47.57
		C208.495,175.63,207.287,171.123,205.45,167.115z"
              />
              <path
                style="fill:#D7B354;"
                d="M53.412,184.232c1.82,8.156,7.412,17.878,16.119,26.568c8.663,8.646,18.351,14.211,26.498,16.067
		c1.383-10.956-3.15-22.953-11.656-31.424C75.911,187.006,64.185,182.736,53.412,184.232z"
              />
              <path
                style="fill:#EBEBEB;"
                d="M278.528,1.532c6.581,6.222-3.107,98.596-66.244,161.313c-39.09,38.836-65.019,53.87-71.223,59.252
		c-17.16,7.78-28.545,11.962-62.551-21.833c-33.927-33.708-27.399-43.054-19.873-59.2c5.583-6.266,21.046-32.299,60.145-71.144
		C181.892,7.211,271.641-4.576,278.528,1.532z"
              />
              <path
                style="fill:#324D5B;"
                d="M199.604,80.316c13.608,13.634,13.608,35.738,0,49.381c-13.616,13.634-35.677,13.634-49.294,0
		c-13.608-13.643-13.608-35.747,0-49.381C163.927,66.673,185.988,66.673,199.604,80.316z"
              />
              <path
                style="fill:#CCD0D2;"
                d="M187.397,92.689c6.861,6.817,6.861,17.869,0,24.686c-6.852,6.817-17.983,6.817-24.852,0
		c-6.852-6.817-6.852-17.869,0-24.686C169.422,85.872,180.545,85.872,187.397,92.689z"
              />
            </g>
          </svg>
        </div>
        <div class="cursor-label">
          {{ cursor.username }}
        </div>
      </div>
  
      <div
        class="cursor"
        :style="{ left: `${cursorStore.localCursor.x}px`, top: `${cursorStore.localCursor.y}px` }"
      >
        <div class="cursor-pointer">
          <svg
            id="Layer_1"
            height="60px"
            width="60px"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" 
            viewBox="0 0 280.291 280.291"
            xml:space="preserve"
          >
            <g>
              <path
                style="fill:#EFC75E;"
                d="M84.373,195.442c13.083,13.03,17.02,34.461,3.947,47.5c-13.083,13.03-52.514,27.548-65.596,14.518
		c-13.074-13.03,1.505-52.321,14.579-65.351C50.384,179.078,71.299,182.403,84.373,195.442z"
              />
              <path
                style="fill:#E2574C;"
                d="M205.178,166.468c19.698,40.84-28.37,135.901-50.597,109.001
		c-9.013-10.904-8.418-28.3-31.949-50.702c-0.035,0.14,8.567,1.523,18.639-7.596C164.513,199.266,205.178,166.617,205.178,166.468z"
              />
              <path
                style="fill:#E2574C;"
                d="M122.404,75.004C78.256,54.999-23.998,102.753,5.143,125.216
		c11.814,9.11,30.558,8.611,54.842,32.369c-0.149,0.035-1.68-8.611,8.103-18.683C87.243,115.643,122.238,75.004,122.404,75.004z"
              />
              <path
                style="fill:#CF5349;"
                d="M102.96,70.471l-1.908-0.096c-9.687,11.831-33.358,40.998-47.788,59.453
		c-5.916,6.423-7.517,12.26-7.858,15.708c2.827,1.943,5.741,4.183,8.751,6.756c0.735-3.483,2.669-8.34,7.508-13.599
		c18.421-23.575,52.05-64.791,52.208-64.783C110.573,72.335,106.862,71.259,102.96,70.471z"
              />
              <path
                style="fill:#CF5349;"
                d="M205.45,167.115c-5.758,4.848-42.249,34.767-63.934,51.84c-7.167,6.633-13.529,7.876-16.705,7.998
		c3.115,3.133,5.811,6.169,8.103,9.101c2.853,0.044,9.722-0.858,17.475-8.025c18.149-14.299,46.572-37.497,58.762-47.57
		C208.495,175.63,207.287,171.123,205.45,167.115z"
              />
              <path
                style="fill:#D7B354;"
                d="M53.412,184.232c1.82,8.156,7.412,17.878,16.119,26.568c8.663,8.646,18.351,14.211,26.498,16.067
		c1.383-10.956-3.15-22.953-11.656-31.424C75.911,187.006,64.185,182.736,53.412,184.232z"
              />
              <path
                style="fill:#EBEBEB;"
                d="M278.528,1.532c6.581,6.222-3.107,98.596-66.244,161.313c-39.09,38.836-65.019,53.87-71.223,59.252
		c-17.16,7.78-28.545,11.962-62.551-21.833c-33.927-33.708-27.399-43.054-19.873-59.2c5.583-6.266,21.046-32.299,60.145-71.144
		C181.892,7.211,271.641-4.576,278.528,1.532z"
              />
              <path
                style="fill:#324D5B;"
                d="M199.604,80.316c13.608,13.634,13.608,35.738,0,49.381c-13.616,13.634-35.677,13.634-49.294,0
		c-13.608-13.643-13.608-35.747,0-49.381C163.927,66.673,185.988,66.673,199.604,80.316z"
              />
              <path
                style="fill:#CCD0D2;"
                d="M187.397,92.689c6.861,6.817,6.861,17.869,0,24.686c-6.852,6.817-17.983,6.817-24.852,0
		c-6.852-6.817-6.852-17.869,0-24.686C169.422,85.872,180.545,85.872,187.397,92.689z"
              />
            </g>
          </svg>
        </div>
        <div class="cursor-label">
          {{ cursorStore.localCursor.username }}
        </div>
      </div>
    </div>
  
    <div
      v-if="showShapeLibrary"
      class="shape-library"
    >
      <div
        class="shape-option"
        title="Filled Rectangle"
        @click="addShapeToCanvas('rectangle', true)"
      >       
        <svg
          width="50"
          height="50"
          viewBox="0 0 100 100"
        >                                                   
          <rect
            width="80"
            height="80"
            x="10"
            y="10"
            fill="black"
          />                                         
        </svg>                                                                                               
      </div>                                                                                                 
      <div
        class="shape-option"
        title="Outlined Rectangle"
        @click="addShapeToCanvas('rectangle', false)"
      >    
        <svg
          width="50"
          height="50"
          viewBox="0 0 100 100"
        >                                                   
          <rect
            width="80"
            height="80"
            x="10"
            y="10"
            fill="transparent"
            stroke="black"
            stroke-width="2"
          />   
        </svg>                                                                                               
      </div>                                                                                                 
      <!-- Add other shape options here --> 
      <div
        class="shape-option"
        title="Filled Circle"
        @click="addShapeToCanvas('circle', true)"
      >
        <svg
          width="50"
          height="50"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="black"
          />
        </svg>
      </div>
      <div
        class="shape-option"
        title="Outlined Circle"
        @click="addShapeToCanvas('circle', false)"
      >
        <svg
          width="50"
          height="50"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            stroke="black"
            stroke-width="2"
          />
        </svg>
      </div>
      <div
        class="shape-option"
        title="Filled Triangle"
        @click="addShapeToCanvas('triangle', true)"
      >
        <svg
          width="50"
          height="50"
          viewBox="0 0 100 100"
        >
          <polygon
            points="50,15 90,85 10,85"
            fill="black"
          />
        </svg>
      </div>
      <div
        class="shape-option"
        title="Outlined Triangle"
        @click="addShapeToCanvas('triangle', false)"
      >
        <svg
          width="50"
          height="50"
          viewBox="0 0 100 100"
        >
          <polygon
            points="50,15 90,85 10,85"
            fill="transparent"
            stroke="black"
            stroke-width="2"
          />
        </svg>
      </div>
      <div
        class="shape-option"
        title="Filled Ellipse"
        @click="addShapeToCanvas('ellipse', true)"
      >
        <svg
          width="50"
          height="50"
          viewBox="0 0 100 100"
        >
          <ellipse
            cx="50"
            cy="50"
            rx="40"
            ry="25"
            fill="black"
          />
        </svg>
      </div>
      <div
        class="shape-option"
        title="Outlined Ellipse"
        @click="addShapeToCanvas('ellipse', false)"
      >
        <svg
          width="50"
          height="50"
          viewBox="0 0 100 100"
        >
          <ellipse
            cx="50"
            cy="50"
            rx="40"
            ry="25"
            fill="transparent"
            stroke="black"
            stroke-width="2"
          />
        </svg>
      </div>
      <div
        class="shape-option"
        title="Filled Hexagon"
        @click="addShapeToCanvas('hexagon', true)"
      >
        <svg
          width="50"
          height="50"
          viewBox="0 0 100 100"
        >
          <polygon
            points="50,10 86.6,30 86.6,70 50,90 13.4,70 13.4,30"
            fill="black"
          />
        </svg>
      </div>
      <div
        class="shape-option"
        title="Outlined Hexagon"
        @click="addShapeToCanvas('hexagon', false)"
      >
        <svg
          width="50"
          height="50"
          viewBox="0 0 100 100"
        >
          <polygon
            points="50,10 86.6,30 86.6,70 50,90 13.4,70 13.4,30"
            fill="transparent"
            stroke="black"
            stroke-width="2"
          />
        </svg>
      </div>
      <div
        class="shape-option"
        title="Filled Octagon"
        @click="addShapeToCanvas('octagon', true)"
      >
        <svg
          width="50"
          height="50"
          viewBox="0 0 100 100"
        >
          <polygon
            points="30,10 70,10 90,30 90,70 70,90 30,90 10,70 10,30"
            fill="black"
          />
        </svg>
      </div>
      <div
        class="shape-option"
        title="Outlined Octagon"
        @click="addShapeToCanvas('octagon', false)"
      >
        <svg
          width="50"
          height="50"
          viewBox="0 0 100 100"
        >
          <polygon
            points="30,10 70,10 90,30 90,70 70,90 30,90 10,70 10,30"
            fill="transparent"
            stroke="black"
            stroke-width="2"
          />
        </svg>
      </div>
      <div
        class="shape-option"
        title="Filled Diamond"
        @click="addShapeToCanvas('diamond', true)"
      >
        <svg
          width="50"
          height="50"
          viewBox="0 0 100 100"
        >
          <polygon
            points="50,10 80,50 50,90 20,50"
            fill="black"
          />
        </svg>
      </div>
      <div
        class="shape-option"
        title="Outlined Diamond"
        @click="addShapeToCanvas('diamond', false)"
      >
        <svg
          width="50"
          height="50"
          viewBox="0 0 100 100"
        >
          <polygon
            points="50,10 80,50 50,90 20,50"
            fill="transparent"
            stroke="black"
            stroke-width="2"
          />
        </svg>
      </div>
      <div
        class="shape-option"
        title="Filled Parallelogram"
        @click="addShapeToCanvas('parallelogram', true)"
      >
        <svg
          width="50"
          height="50"
          viewBox="0 0 100 100"
        >
          <polygon
            points="20,20 80,20 60,80 0,80"
            fill="black"
          />
        </svg>
      </div>
      <div
        class="shape-option"
        title="Outlined Parallelogram"
        @click="addShapeToCanvas('parallelogram', false)"
      >
        <svg
          width="50"
          height="50"
          viewBox="0 0 100 100"
        >
          <polygon
            points="20,20 80,20 60,80 0,80"
            fill="transparent"
            stroke="black"
            stroke-width="2"
          />
        </svg>
      </div>
    </div>
  </div>
</template>
  
  <style scoped>
  .whiteboard-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: #f8fafc;
    position: relative;
    flex: 1;
  }
  
  .toolbar {
    background-color: #fff;
    padding: 0.5rem;
    display: flex;
    gap: 1rem;
    justify-content: center;
    border-bottom: 1px solid #e2e8f0;
    flex-wrap: wrap;
  }
  
  .tool-group {
    display: flex;
    gap: 0.5rem;
    padding: 0.25rem;
    background-color: #f1f5f9;
    border-radius: 0.5rem;
  }
  
  .tool-btn {
    background-color: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    padding: 0.5rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .tool-btn:hover {
    background-color: #f8fafc;
    transform: translateY(-1px);
  }
  
  .color-picker {
    width: 2.5rem;
    height: 2.5rem;
    padding: 0;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
  }
  
  .canvas-area {
    flex: 1;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
  }
  
  canvas {
    background-color: #fff;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  
  .cursor {
    position: absolute;
    transform: translate(-50%, -50%);
    pointer-events: none;
    z-index: 1000;
  }
  
  .cursor-pointer {
    font-size: 1.5rem;
    line-height: 1;
    transform: rotate(-85deg);
  }
  
  .cursor-label {
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    white-space: nowrap;
    position: absolute;
    left: 100%;
    margin-left: 0.5rem;
  }
  
  .shape-library {
    position: absolute;
    top: 4rem;
    left: 50%;
    transform: translateX(-50%);
    background-color: #fff;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
    z-index: 1000;
  }
  .brush-options-popup {                                                                                         
    position: absolute;                                                                                                                                                                                          
    top: 50px;                                                                                                   
    background-color: white;                                                                                     
    border: 1px solid #ccc;                                                                                      
    padding: 10px;                                                                                               
    border-radius: 5px;                                                                                          
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);                                                                  
    display: flex;                                                                                               
    flex-direction: column;                                                                                      
    width: 180px; 
    z-index: 100;                                                                                               
  }                                                                                                              
                                                                                                                 
  .brush-option {                                                                                                
    margin-bottom: 10px;                                                                                         
  } 

  
  @media (max-width: 768px) {
    .toolbar {
      padding: 0.25rem;
      gap: 0.5rem;
    }
  
    .tool-group {
      padding: 0.125rem;
    }
  
    .tool-btn {
      padding: 0.375rem;
    }
  
    .shape-library {
    grid-template-columns: repeat(4, 1fr); /* 2 columns for devices ≤ 768px */
    gap: 0.5rem; /* Add space between shapes */
    width: 40%;
  }

  .shape-option {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .shape-option svg {
    max-width: 80%; /* Scale down SVG for better fit */
    height: auto;
  }
}

@media (max-width: 480px) {
  .shape-library {
    grid-template-columns: repeat(3, 1fr); /* 1 column for devices ≤ 480px */
  }

  .shape-option svg {
    max-width: 70%; /* Further scale down SVG for smaller screens */
  }
}
  </style>