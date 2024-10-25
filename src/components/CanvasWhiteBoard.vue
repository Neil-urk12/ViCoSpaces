<script setup>        
import * as fabric from 'fabric';        
import { FabricImage } from 'fabric';                                                                                 
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'                                          
import { useCursorStore } from '@/stores/cursorStore'                                                    
import { onValue, ref as dbRef, get, set } from 'firebase/database'  
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
const chatStore = useChatStore()                                                              
const route = useRoute()                                                                                 

const userId = computed(() => authStore.getUid)                                                            
const username = computed(() => authStore.getDisplayName)    
let debounceTimeout;

function handleSingleReload() {
  if (!sessionStorage.getItem('roomReloadFlag')) {
    sessionStorage.setItem('roomReloadFlag', 'true');
    location.reload();
  } else {
    sessionStorage.removeItem('roomReloadFlag');
  }
}

 const saveCanvasToDatabase = async (canvas, roomId) => {   
  if (!canvas) {
    console.error('Canvas or roomId is missing');
    return;
  }                                                    
   clearTimeout(debounceTimeout);                                                                               
                                                                                                                
   debounceTimeout = setTimeout(async () => {                                                                   
     try {                                                                                                      
       const currentCanvasObjects = canvas.getObjects().map((obj) => {                                          
         return {                                                                                               
          type: obj.type,                                                                                      
          left: obj.left,                                                                                      
          top: obj.top,                                                                                        
          fill: obj.fill,                                                                                      
          stroke: obj.stroke,                                                                                  
          strokeWidth: obj.strokeWidth,                                                                        
          scaleX: obj.scaleX,                                                                                  
          scaleY: obj.scaleY,                                                                                  
          angle: obj.angle,                                                                                    
          width: obj.width,                                                                                    
          height: obj.height, 
          flipX: obj.flipX,
          flipY: obj.flipY,
         }                                                                                                      
       })    
                                                                                                                                                                                                                
       const canvasRef = dbRef(db, `rooms/${roomId}/canvas`);                                                   
       const canvasSnapshot = await get(canvasRef);                                                             
       const previousCanvasObjects = canvasSnapshot.exists() ? canvasSnapshot.val() : [];                       
                                                                                                                
       const diff = currentCanvasObjects.filter((obj, index) => {                                               
         return JSON.stringify(obj) !== JSON.stringify(previousCanvasObjects[index]);                           
       });                                                                                                      
                                               
       const filteredObjects = currentCanvasObjects.filter(obj => !obj.isGrid);
       await set(dbRef(db, `rooms/${roomId}/canvas`), {
        objects: filteredObjects,
        timestamp: Date.now(),
      });

       if (diff.length > 0) {                                                                                   
         await set(canvasRef, diff);                                                                            
         console.log('Canvas elements saved to the database successfully');                                     
       }                                                                                                        
     } catch (error) {                                                                                          
       console.error('Error saving canvas elements to the database:', error);                                   
       alert('Failed to save canvas elements. Please try again.');                                              
     }                                                                                                          
   }, 500)                                                        
 }                         
                                                                                                                                        
 window.addEventListener('beforeunload', () => saveCanvasToDatabase(canvas, route.params.id));   
                                                                                                               
// Throttle utility function
function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function(...args) {
    const context = this;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

const renderCanvasFromDatabase = async (canvas, roomId) => {
  if (!canvas || !roomId) {
    console.error('Canvas or roomId is missing');
    return;
  }

  let isUpdating = false;
  let lastUpdateTimestamp = 0;

  try {
    const canvasRef = dbRef(db, `rooms/${roomId}/canvas`);

    // Fetch initial data to render shapes on load
    const snapshot = await get(dbRef(db, `rooms/${roomId}/canvas`));
    if (snapshot.exists()) {
      const data = snapshot.val();
      if (data.objects && Array.isArray(data.objects)) {
        loadObjectsToCanvas(canvas, data.objects);
      }
    }

    // Throttle the update process to limit redraws
    const throttledUpdate = throttle(async (snapshot) => {
      if (!snapshot.exists()) return;

      const data = snapshot.val();
      if (!data.objects || !Array.isArray(data.objects)) return;

      // Check for new updates
      if (data.timestamp <= lastUpdateTimestamp) return;
      lastUpdateTimestamp = data.timestamp;

      // Prevent multiple simultaneous updates
      if (isUpdating) return;
      isUpdating = true;

      // Get the currently selected object
      const activeObject = canvas.getActiveObject();
      const activeObjectId = activeObject ? activeObject.id : null;

      // Clear existing objects except the grid
      const existingObjects = canvas.getObjects().filter(obj => !obj.isGrid);
      existingObjects.forEach(obj => canvas.remove(obj));

      // Add objects from the database
      loadObjectsToCanvas(canvas, data.objects, activeObjectId);

      canvas.renderAll();
      isUpdating = false;

    }, 100)

    // Bind throttled function to the database value changes
    onValue(canvasRef, throttledUpdate);

    // Add canvas event listeners
    addCanvasEventListeners(canvas, roomId);

  } catch (error) {
    console.error('Error loading canvas from database:', error);
    isUpdating = false;
  }
};

// Load objects onto the canvas
function loadObjectsToCanvas(canvas, objects, activeObjectId = null) {
  for (const objData of objects) {
    createFabricObject(objData).then(fabricObj => {
      if (fabricObj) {
        canvas.add(fabricObj);

        // Restore active selection if it matches
        if (activeObjectId && fabricObj.id === activeObjectId) {
          canvas.setActiveObject(fabricObj);
        }
      }
    });
  }
  canvas.renderAll();
}

// Function to create fabric objects
async function createFabricObject(objData) {
  const commonProps = {
    id: objData.id || Math.random().toString(36).substr(2, 9),
    left: objData.left || 0,
    top: objData.top || 0,
    fill: objData.fill,
    stroke: objData.stroke,
    strokeWidth: objData.strokeWidth,
    scaleX: objData.scaleX || 1,
    scaleY: objData.scaleY || 1,
    angle: objData.angle || 0,
    width: objData.width,
    height: objData.height,
    flipX: objData.flipX || false,
    flipY: objData.flipY || false,
    selectable: true,
    hasControls: true,
    hasBorders: true,
    objectCaching: false
  };

  switch (objData.type) {
    case 'rect':
      return new fabric.Rect(commonProps);
    case 'circle':
      return new fabric.Circle({ ...commonProps, radius: objData.radius || (objData.width ? objData.width / 2 : 50) });
    case 'triangle':
      return new fabric.Triangle(commonProps);
    case 'ellipse':
      return new fabric.Ellipse({ ...commonProps, rx: objData.rx || 50, ry: objData.ry || 30 });
    case 'polygon':
      return objData.points ? new fabric.Polygon(objData.points, commonProps) : null;
    case 'textbox':
      return new fabric.Textbox(objData.text || 'Text', { ...commonProps, fontSize: objData.fontSize || 20 });
    case 'path':
      return objData.path ? new fabric.Path(objData.path, commonProps) : null;
    case 'image':
      if (objData.src) {
        return await new Promise((resolve) => {
          fabric.Image.fromURL(objData.src, (img) => {
            img.set(commonProps);
            resolve(img);
          }, { crossOrigin: 'anonymous', objectCaching: false });
        });
      }
      return null;
    default:
      return null;
  }
}

// Add event listeners for object modifications
function addCanvasEventListeners(canvas, roomId) {
  const saveToDatabase = debounce(() => saveCanvasToDatabase(canvas, roomId), 300);

  canvas.on('object:modified', saveToDatabase);
  canvas.on('object:moving', saveToDatabase);
}

// Utility debounce function
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}


const initializeCanvas = async () => {
  canvas = new fabric.Canvas(canvasEl.value);
  resizeCanvas();
  await renderCanvasFromDatabase(canvas, route.params.id);
  window.addEventListener('resize', resizeCanvas); 
  canvas.on('object:added', function(e) {
    if (e.target) addCustomBorder(e.target);
  });
  canvas.on('selection:created', async function(e) {
    if (e.selected && e.selected.length > 0) {
      if (e.selected.length > 1) {
        e.selected.forEach(addCustomBorder);
      } else {
        addCustomBorder(e.selected[0]);
      }
    }
  })
  canvas.defaultCursor = 'default';
  canvas.hoverCursor = 'default';
  canvas.moveCursor = 'default';
  canvas.isDrawingMode = false;
  canvas.renderAll();
  canvas.on('object:moving', (options) => {
    const obj = options.target;
    obj.set({
      originX: 'left',
      originY: 'top',
    });
    const snappedLeft = Math.round(obj.left / gridSize) * gridSize;
    const snappedTop = Math.round(obj.top / gridSize) * gridSize;
    obj.set({
      left: snappedLeft,
      top: snappedTop
    });
    obj.setCoords();
  });
};
 
onMounted(async () => {                                                                                   
  cursorStore.setUserId(userId.value)                                                                         
  cursorStore.setRoomId(route.params.id) 
  window.addEventListener('resize', resizeCanvas);                                               
                                                                                                               
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
  handleSingleReload();
  await initializeCanvas()
  canvas.on('object:modified', () => saveCanvasToDatabase(canvas, route.params.id));                             
  canvas.on('object:added', () => saveCanvasToDatabase(canvas, route.params.id));                                
  canvas.on('object:removed', () => saveCanvasToDatabase(canvas, route.params.id));                                                                                                                                                                                                                                                                      
})        

onUnmounted(() => {                                                                                            
  cursorStore.unsubscribeCursors()  
  chatStore.unsubscribeMessages()    
  saveCanvasToDatabase(canvas, route.params.id);                                                                     
})  

const canvasEl = ref(null);
let canvas = null;
const isDrawingMode = ref(false);
const selectedColor = ref('#000000');
const brushThickness = ref(5);
const selectedBrush = ref('pencil'); onMounted( async() => { 
  
})
const showBrushOptions = ref(false);
const gridSize = 20;

const imageInput = ref(null);
const showShapeLibrary = ref(false);

function addCustomBorder(obj) {
  obj.set({
    borderColor: 'red',
    cornerColor: 'green',
    cornerSize: 6,
    transparentCorners: false
  });
}

const resizeCanvas = () => {
  const width = window.innerWidth * 0.8;
  const height = window.innerHeight * 0.85;

  canvas.setWidth(width);
  canvas.setHeight(height);
  canvas.setZoom(1);
  canvas.calcOffset();
  canvas.requestRenderAll();
}

const addTextToCanvas = () => { 
  const text = new fabric.Textbox('Enter Text', {
    left: 100,
    top: 100,
    fill: selectedColor.value, 
    fontSize: 20,
    fontFamily: 'Arial',
    editable: true, 
  })
  
  addCustomBorder(text);
  canvas.add(text);
  canvas.setActiveObject(text);
  canvas.requestRenderAll();
}

function addShapeToCanvas(shapeType, isFilled) { 
  let shape;
  const fillColor = isFilled ? selectedColor.value : 'transparent';
  const strokeColor = isFilled ? 'transparent' : selectedColor.value;

  switch (shapeType) {
    case 'rectangle':
      shape = new fabric.Rect({
        left: 100,
        top: 100,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: 2,
        width: 100,
        height: 100,
      });
      break;
    case 'circle':
      shape = new fabric.Circle({
        left: 200,
        top: 200,
        radius: 50,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: 2,
      });
      break;
    case 'triangle':
      shape = new fabric.Triangle({
        left: 300,
        top: 300,
        width: 100,
        height: 100,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: 2,
      });
      break;
    case 'ellipse':
      shape = new fabric.Ellipse({
        left: 150,
        top: 150,
        rx: 75,
        ry: 50,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: 2,
      });
      break;
    case 'hexagon':
      shape = createPolygon(6, 50, fillColor, strokeColor);
      break;
    case 'octagon':
      shape = createPolygon(8, 50, fillColor, strokeColor);
      break;
    case 'diamond':
      shape = createDiamond(fillColor, strokeColor);
      break;
    case 'parallelogram':
      shape = createParallelogram(fillColor, strokeColor);
      break;
    default:
      console.log('Unknown shape');
      return;
  }

  shape.set({
    selectable: true,
    evented: true,
    hasControls: true,
    hasBorders: true,
    perPixelTargetFind: false
  });

  addCustomBorder(shape);
  canvas.add(shape);
  canvas.setActiveObject(shape);
  canvas.requestRenderAll();

}

function createPolygon(sides, radius, fillColor, strokeColor) {//Used for creating Polygon Shapes
  const points = Array.from({ length: sides }, (_, i) => {
    const angle = (i * 2 * Math.PI) / sides;
    return {
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle),
    };
  });

  return new fabric.Polygon(points, {
    left: 200,
    top: 200,
    fill: fillColor,
    stroke: strokeColor,
    strokeWidth: 2,
    selectable: true,
  });
}

function createDiamond(fillColor, strokeColor) {//Used for creating Diamond Shape
  return new fabric.Polygon([
    { x: 0, y: -50 },
    { x: 50, y: 0 },
    { x: 0, y: 50 },
    { x: -50, y: 0 },
  ], {
    left: 200,
    top: 200,
    fill: fillColor,
    stroke: strokeColor,
    strokeWidth: 2,
    selectable: true,
  });
}

function createParallelogram(fillColor, strokeColor) {//Used for creating Parallelogram Shape
  return new fabric.Polygon([
    { x: -50, y: -25 },
    { x: 50, y: -25 },
    { x: 75, y: 25 },
    { x: -25, y: 25 },
  ], {
    left: 200,
    top: 200,
    fill: fillColor,
    stroke: strokeColor,
    strokeWidth: 2,
    selectable: true,
  });
}

const applyBrushSettings = () => {//Drawing Feature
  switch (selectedBrush.value) {
    case 'pencil':
      canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
      break;
    case 'circle':
      canvas.freeDrawingBrush = new fabric.CircleBrush(canvas);
      break;
    default:
      canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
  }

  canvas.freeDrawingBrush.color = selectedColor.value;
  canvas.freeDrawingBrush.width = brushThickness.value;
  canvas.requestRenderAll();
};

watch([selectedBrush, selectedColor, brushThickness], applyBrushSettings);

const toggleDrawMode = () => {
  isDrawingMode.value = !isDrawingMode.value;
  canvas.isDrawingMode = isDrawingMode.value;
  showBrushOptions.value = isDrawingMode.value;

  if (isDrawingMode.value) {
    applyBrushSettings();
  }
};

const removeSelected = () => {//Removing Selected Object Feature
  const activeObject = canvas.getActiveObject();
  if (activeObject) {
    canvas.remove(activeObject);
    canvas.requestRenderAll();
    saveCanvasToDatabase(canvas, route.params.id);
  }
};

const clearCanvas = () => {//Clearing the entire board feature
  canvas.getObjects().forEach((obj) => {
    if (!obj.isGrid) {
      canvas.remove(obj);
    }
  });
  canvas.requestRenderAll();
  saveCanvasToDatabase(canvas, route.params.id);
};

const triggerFileSelect = () => {
  imageInput.value.click();
};

const insertImage = (event) => { //Image Insertion Feature
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (f) => {
      const img = new Image();
      img.src = f.target.result;
      img.onload = () => {
        const fabricImage = new FabricImage(img, {
          left: 50,
          top: 50,
          angle: 0,
          opacity: 1,
        });

        const canvasWidth = canvas.getWidth();
        const canvasHeight = canvas.getHeight();

        const imageOriginalWidth = img.width;
        const imageOriginalHeight = img.height;

        const scaleX = canvasWidth / imageOriginalWidth;
        const scaleY = canvasHeight / imageOriginalHeight;
        let scaleFactor = Math.min(scaleX, scaleY) * 0.8;

        fabricImage.scale(scaleFactor);

        canvas.add(fabricImage);
        canvas.requestRenderAll();
      };
    };
    reader.readAsDataURL(file);
  }
};

const downloadCanvasAsImage = () => {
  const dataURL = canvas.toDataURL({ format: 'png' })
  const link = document.createElement('a')
  link.href = dataURL
  link.download = 'canvas-image.png'
  link.click()
}                                                                                                                                                                                                                                                                                                                    
</script>    

<template>
  <div
    class="whiteboard-container"
    @mousemove="cursorStore.updateCursorPosition"
  >
    <div class="toolbar">
      <div class="tool-group">
        <button
          class="tool-btn"
          title="Drawing Mode"
          @click="toggleDrawMode"
        >
          <font-awesome-icon 
            v-if="isDrawingMode" 
            :icon="['fas', 'pen-nib']" 
          />
          <font-awesome-icon 
            v-else 
            :icon="['fas', 'pen']"  
          />
        </button>
        <div
          v-if="showBrushOptions"
          class="brush-options-popup"
        >                                
          <div class="brush-option">                                                                             
            <label for="brush-type">Brush Type:</label>                                                          
            <select
              id="brush-type"
              v-model="selectedBrush"
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
              v-model="selectedColor"
              type="color"
            >                      
          </div>                                                                                                 
          <div class="brush-option">                                                                             
            <label for="brush-thickness">Thickness:</label>                                                      
            <input
              id="brush-thickness"
              v-model="brushThickness"
              type="range"
              min="1"
              max="30" 
            >                                                                                                 
          </div>                                                                                                                    
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
          v-model="selectedColor"
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
    background: rgba(13, 13, 48, 0.95);
    padding: 0.5rem;
    display: flex;
    gap: 1rem;
    justify-content: center;
    border-bottom: 1px solid #e2e8f0;
    flex-wrap: wrap;
    z-index: 1;
    backdrop-filter: blur(10px);
  }
  
  .tool-group {
    display: flex;
    gap: 0.5rem;
    padding: 0.25rem;
    background: rgba(26, 26, 58, 0.5);
    border-radius: 0.5rem;
    border: 1px solid #2d2d6e;
  }
  
  .tool-btn {
    background: linear-gradient(145deg, #1a1a4a, #0d0d2a);
    border: 1px solid #2d2d6e;
    border-radius: 0.375rem;
    padding: 0.5rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .tool-btn:hover {
    background: linear-gradient(145deg, #2d2d6e, #1a1a4a);
    transform: translateY(-1px);
    box-shadow: 0 0 15px rgba(82, 82, 255, 0.4);
  }
  
  .color-picker {
    width: 2.5rem;
    height: 2.5rem;
    padding: 0;
    border: none;
    border-radius: 0.375rem;
    border: 2px solid #2d2d6e;
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
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 0.5rem;
    box-shadow: 0 0 30px rgba(82, 82, 255, 0.2);
    border: 1px solid #2d2d6e;
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
    filter: drop-shadow(0 0 5px rgba(82, 82, 255, 0.5));
  }
  
  .cursor-label {
    background: rgba(13, 13, 48, 0.95);
    color: #fff;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    white-space: nowrap;
    position: absolute;
    left: 100%;
    margin-left: 0.5rem;
    border: 1px solid #2d2d6e;
    box-shadow: 0 0 10px rgba(82, 82, 255, 0.2);
  }
  
  .shape-library {
    position: absolute;
    top: 4rem;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(13, 13, 48, 0.95);
    border-radius: 0.5rem;
    box-shadow: 0 0 30px rgba(82, 82, 255, 0.3);
    padding: 1rem;
    display: grid;
    border: 1px solid #2d2d6e;
    backdrop-filter: blur(10px);
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
    z-index: 1000;
  }
  .brush-options-popup {                                                                                         
    position: absolute; 
    backdrop-filter: blur(10px);
    color: #fff;  
    left: 30%;                                                                                                                                                                                  
    top: 10px;                                                                                                   
    background: rgba(13, 13, 48, 0.95);
    border: 1px solid #2d2d6e;                                                                                     
    padding: 10px;                                                                                               
    border-radius: 5px;                                                                                          
    box-shadow: 0 0 20px rgba(82, 82, 255, 0.3);                                                               
    display: flex;                                                                                               
    flex-direction: column;                                                                                      
    width: 180px; 
    z-index: 100;                                                                                               
  }                                                                                                              
  .brush-option {                                                                                                
    margin-bottom: 10px;                                                                                         
  } 
  .brush-option select,
  .brush-option input[type="range"] {
    background: #1a1a4a;
    border: 1px solid #2d2d6e;
    border-radius: 4px;
    color: #fff;
    width: 100%;
  }
  @media (max-width: 768px) {
    .room-header {
      padding: 1rem;
      flex-direction: column;
      gap: 1rem;
      text-align: center;
    }
    
    .room-actions {
      width: 100%;
      justify-content: center;
    }
    
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
      grid-template-columns: repeat(4, 1fr);
      gap: 0.5rem;
      width: 40%;
    }
    
    .shape-option {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .shape-option svg {
      max-width: 80%;
      height: auto;
    }
  }
  
  @media (max-width: 480px) {
    .shape-library {
      grid-template-columns: repeat(3, 1fr);
    }
    
    .shape-option svg {
      max-width: 70%;
    }
  }
</style>