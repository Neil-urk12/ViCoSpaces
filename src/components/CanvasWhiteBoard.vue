<script setup>                                                                                                 
import { ref, onMounted, onUnmounted, computed } from 'vue';                                            
import { useCursorStore } from '@/stores/cursorStore';                                                         
import { useWhiteboardStore } from '@/stores/whiteboardStore';   
import { onValue, ref as dbRef, get } from 'firebase/database';   
import { realTimeDb as db } from '@/firebase/firebaseconfig';                                           
import { useAuthStore } from '@/stores/authStore';                                                             
import { useRoute } from 'vue-router';                                                                         
                                                                                                               
const authStore = useAuthStore();                                                                              
const cursorStore = useCursorStore();                                                                          
const whiteboardStore = useWhiteboardStore();                                                                  
const route = useRoute();                                                                                      
                                                                                                               
const userId = computed(() => authStore.getUid);                                                               
const username = computed(() => authStore.getDisplayName);                                                     
                                                                                                               
const canvasEl = ref(null);                                                                                    
                                                                                                               
onMounted(async () => {                                                                                        
  cursorStore.setUserId(userId.value);                                                                         
  cursorStore.setRoomId(route.params.id); // Set the roomId                                                    
                                                                                                               
  const userCursorRef = dbRef(db, `rooms/${route.params.id}/cursors/${userId.value}`);                         
  const userCursorSnapshot = await get(userCursorRef);                                                         
  if (userCursorSnapshot.exists()) cursorStore.localCursor = userCursorSnapshot.val()
  else cursorStore.localCursor = { x: 0, y: 0, username: username.value };                                                                                                                                               
                                                                                                               
  onValue(dbRef(db, `rooms/${route.params.id}/cursors`), (snapshot) => {                                       
    const data = snapshot.val() || {};                                                                         
    cursorStore.otherCursors = Object.entries(data).reduce((acc, [key, value]) => {                            
      if (key !== userId.value)                                                                               
        acc[key] = value;                                                                                                                                                                             
      return acc;                                                                                              
    }, {});                                                                                                    
  });                                                                                                          
                                                                                                               
  whiteboardStore.initializeCanvas(canvasEl.value);                                                            
});                                                                                                            
                                                                                                               
onUnmounted(() => {                                                                                            
  cursorStore.unsubscribeCursors();                                                                            
});                                                                                                                                                                                                                       
const updateCursorPosition = (event) => cursorStore.updateCursorPosition(event)                                                                                                            
const addTextToCanvas = () => whiteboardStore.addTextToCanvas()                                                                                                            
const addShapeToCanvas = (shapeType, isFilled) => whiteboardStore.addShapeToCanvas(shapeType, isFilled)                                                                                                            
const toggleDrawMode = () => whiteboardStore.toggleDrawMode()                                                                                                            
const removeSelected = () => whiteboardStore.removeSelected()                                                                                                            
const clearCanvas = () => whiteboardStore.clearCanvas()                                                                                                          
const triggerFileSelect = () => whiteboardStore.triggerFileSelect()                                                                                                             
const insertImage = (event) => whiteboardStore.insertImage(event)                                                                                                            
const downloadCanvasAsImage = () => whiteboardStore.downloadCanvasAsImage();                                                                                                   
</script>                                                                                                      
                                                                                                               
<template>                                                                                                     
  <div
    class="whiteboard-container"
    @mousemove="updateCursorPosition"
  >                                         
    <div class="sidebar">                                                                                      
      <button
        title="Add Text"
        @click="addTextToCanvas"
      >
        📝
      </button>                                            
      <button
        title="Shape Library"
        @click="showShapeLibrary = !showShapeLibrary"
      >
        🧩
      </button>                  
      <div
        v-if="showShapeLibrary"
        class="shape-library-popup"
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
      </div>                                                                                                   
      <div class="color-picker-wrapper">                                                                       
        <input
          v-model="whiteboardStore.selectedColor"
          type="color"
          title="Choose Color"
        >                    
      </div>                                                                                                   
      <button
        title="Enable/Disable Drawing"
        @click="toggleDrawMode"
      >                                          
        {{ whiteboardStore.isDrawingMode ? '✏️' : '🖊️' }}                                                      
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
          🗑️
        </button>                                            
        <button
          title="Insert Image"
          @click="triggerFileSelect"
        >
          🖼️
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
          ❌
        </button>                                      
        <button
          title="Download Image"
          @click="downloadCanvasAsImage"
        >
          ⬇️
        </button>                                
      </div>                                                                                                     
      <div class="canvas-area">                                                                                  
        <canvas ref="canvasEl" />                                                                                
        <div
          class="cursor"
          :style="{ left: `${cursorStore.localCursor.x}px`, top:                               
            `${cursorStore.localCursor.y}px` }"
        >                                                                           
          <div class="spaceship">
            👆
          </div>                                                                        
          <div class="username-label">
            {{ cursorStore.localCursor.username }}
          </div>                               
        </div>                                                                                                   
        <div
          v-for="(cursor, userId) in cursorStore.otherCursors"
          :key="userId"
          class="cursor"
          :style="{ left:   
            `${cursor.x}px`, top: `${cursor.y}px` }"
        >                                                                      
          <div class="spaceship" />                                                                              
          <div class="username-label">
            {{ cursor.username }}
          </div>                                                
        </div>                                                                                                   
      </div>                                                                                                     
    </div>                                                                                                       
  </div>
</template>                                                                                                    
                                                                                                               
<style scoped>                                                                                                 
* {                                                                                                            
  cursor: none;                                                                                                
}                                                                                                              
.whiteboard-container {                                                                                        
  display: flex;                                                                                               
  height: 100vh;                                                                                               
  background-color: #e5e5e5;                                                                                   
  justify-content: center;                                                                                     
  align-items: center;                                                                                         
  position: relative;                                                                                          
}                                                                                                              
                                                                                                               
.sidebar {                                                                                                     
  width: 70px;                                                                                                 
  background-color: #3a86ff;                                                                                   
  display: flex;                                                                                               
  flex-direction: column;                                                                                      
  align-items: center;                                                                                         
  justify-content: center;                                                                                     
  border-top-right-radius: 10px;                                                                               
  border-bottom-right-radius: 10px;                                                                            
  padding: 10px;                                                                                               
  position: relative;                                                                                          
  z-index: 10;                                                                                                 
}                                                                                                              
                                                                                                               
.shape-library-popup {                                                                                         
  position: absolute;                                                                                          
  left: 80px;                                                                                                  
  top: -10px;                                                                                                  
  max-height: 90vh;                                                                                            
  overflow-y: auto;                                                                                            
  background-color: white;                                                                                     
  border: 1px solid #ccc;                                                                                      
  padding: 10px;                                                                                               
  border-radius: 5px;                                                                                          
  display: grid;                                                                                               
  grid-template-columns: repeat(3, 50px);                                                                      
  gap: 10px;                                                                                                   
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);                                                                  
  z-index: 10;                                                                                                 
}                                                                                                              
                                                                                                               
.brush-options-popup {                                                                                         
  position: absolute;                                                                                          
  left: 80px;                                                                                                  
  top: 50px;                                                                                                   
  background-color: white;                                                                                     
  border: 1px solid #ccc;                                                                                      
  padding: 10px;                                                                                               
  border-radius: 5px;                                                                                          
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);                                                                  
  display: flex;                                                                                               
  flex-direction: column;                                                                                      
  width: 180px;                                                                                                
}                                                                                                              
                                                                                                               
.brush-option {                                                                                                
  margin-bottom: 10px;                                                                                         
}                                                                                                              
                                                                                                               
.shape-option {                                                                                                
  width: 50px;                                                                                                 
  height: 50px;                                                                                                
  cursor: pointer;                                                                                             
}                                                                                                              
                                                                                                               
.shape-option:hover {                                                                                          
  opacity: 0.8;                                                                                                
}                                                                                                              
                                                                                                               
.sidebar button {                                                                                              
  background-color: transparent;                                                                               
  border: none;                                                                                                
  color: white;                                                                                                
  font-size: 24px;                                                                                             
  cursor: pointer;                                                                                             
  margin: 10px 0;                                                                                              
}                                                                                                              
                                                                                                               
.sidebar button:hover {                                                                                        
  opacity: 0.8;                                                                                                
}                                                                                                              
                                                                                                               
.color-picker-wrapper {                                                                                        
  margin: 10px 0;                                                                                              
}                                                                                                              
                                                                                                               
.color-picker-wrapper input[type="color"] {                                                                    
  width: 40px;                                                                                                 
  height: 40px;                                                                                                
  border: none;                                                                                                
  border-radius: 50%;                                                                                          
  cursor: pointer;                                                                                             
  background-color: transparent;                                                                               
  padding: 0;                                                                                                  
}                                                                                                              
                                                                                                               
.canvas-area {                                                                                                 
  flex-grow: 1;                                                                                                
  display: flex;                                                                                               
  justify-content: center;                                                                                     
  align-items: center;                                                                                         
  padding: 10px;                                                                                               
  position: relative;                                                                                          
  cursor: none;                                                                                                
}                                                                                                              
                                                                                                               
canvas {                                                                                                       
  border: 2px solid #ccc;                                                                                      
  background-color: white;                                                                                     
  cursor: none;                                                                                                
}                                                                                                              
                                                                                                               
.cursor {                                                                                                      
  position: absolute;                                                                                          
  transform: translate(-50%, -50%);                                                                            
  pointer-events: none;                                                                                        
  transition: all 0.1s ease;                                                                                   
  display: flex;                                                                                               
  flex-direction: column;                                                                                      
  z-index: 1000;                                                                                               
}                                                                                                              
                                                                                                               
.spaceship {                                                                                                   
  width: 30px;                                                                                                 
  height: 30px;                                                                                                
  background-color: #ff9900;                                                                                   
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);                                                              
  transform: rotate(-45deg);                                                                                   
}                                                                                                              
                                                                                                               
.username-label {                                                                                              
  font-size: 12px;                                                                                             
  background-color: rgba(255, 255, 255, 0.8);                                                                  
  color: #0f0f3f;                                                                                              
  padding: 2px 4px;                                                                                            
  border-radius: 4px;                                                                                          
  white-space: nowrap;                                                                                         
  position: absolute;                                                                                          
  top: 41%;                                                                                                    
  left: 229%;                                                                                                  
  transform: translateX(-50%);                                                                                 
  margin-top: 5px;                                                                                             
}                                                                                                              
</style> 