<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { FabricImage } from 'fabric';
import * as fabric from 'fabric';
import { ref as dbRef, onValue, set, off } from 'firebase/database'
import { realTimeDb as db } from '@/firebase/firebaseconfig';

const localCursor = ref({ x: 0, y: 0, username: '' })
const otherCursors = ref({})
const userId = ref(generateUserId())
const username = ref(`User_${userId.value.slice(0, 5)}`)

const cursorsRef = dbRef(db, 'cursors')
const throttle = (func, limit) => {
  let inThrottle
  return function() {
    const args = arguments
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

const updateFirebaseCursor = throttle((x, y) => {
  set(dbRef(db, `cursors/${userId.value}`), {
    x,
    y,
    username: username.value
  })
}, 50) // Throttle to 50ms

const updateCursorPosition = (event) => {
  if (canvasEl.value) {
    const rect = canvasEl.value.getBoundingClientRect();
    const offsetX = 140;
    const offsetY = 10;
    const x = event.clientX - rect.left + offsetX;
    const y = event.clientY - rect.top + offsetY;
    localCursor.value = { x, y, username: username.value };
    updateFirebaseCursor(x, y);
  }
}

onMounted(() => {
  localCursor.value.username = username.value
  onValue(cursorsRef, (snapshot) => {
    const data = snapshot.val() || {}
    otherCursors.value = Object.entries(data).reduce((acc, [key, value]) => {
      if (key !== userId.value) {
        acc[key] = value
      }
      return acc
    }, {})
  })
})

onUnmounted(() => {
  off(cursorsRef)
  set(dbRef(db, `cursors/${userId.value}`), null)
})

function generateUserId() {
  return Math.random().toString(36).substr(2, 9)
}

const canvasEl = ref(null);
let canvas = null;
const isDrawingMode = ref(false);
const selectedColor = ref('#000000');
const brushThickness = ref(5);
const selectedBrush = ref('pencil'); 
const showBrushOptions = ref(false);
const gridSize = 20;

const imageInput = ref(null);
const showShapeLibrary = ref(false);

onMounted(() => { //Initializing the Whiteboard with Snapping Grid
  canvas = new fabric.Canvas(canvasEl.value, {
    width: window.innerWidth * 0.8,
    height: window.innerHeight * 0.85,
    backgroundColor: '#fff',
  });
  canvas.defaultCursor = 'none';
  canvas.hoverCursor = 'none';
  canvas.moveCursor = 'none';
  canvas.isDrawingMode = false;
  canvas.renderAll();
  
  addGrid();

  canvas?.on('object:moving', (options) => {
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
});

function addGrid() { //Snapping Grid Feature
  for (let i = 0; i < (canvas.width / gridSize); i++) {
    const lineX = new fabric.Line([i * gridSize, 0, i * gridSize, canvas.height], {
      stroke: '#ccc',
      selectable: false,
      excludeFromExport: true,
      isGrid: true,
    });
    canvas.add(lineX);
  }
  for (let j = 0; j < (canvas.height / gridSize); j++) {
    const lineY = new fabric.Line([0, j * gridSize, canvas.width, j * gridSize], {
      stroke: '#ccc',
      selectable: false,
      excludeFromExport: true,
      isGrid: true, 
    });
    canvas.add(lineY);
  }
}

const addTextToCanvas = () => { //Adding text Feature
  const text = new fabric.Textbox('Enter Text', {
    left: 100,
    top: 100,
    fill: selectedColor.value, 
    fontSize: 20,
    fontFamily: 'Arial',
    editable: true, 
  });
  
  canvas.add(text);
  canvas.setActiveObject(text);
  canvas.renderAll();
};

function addShapeToCanvas(shapeType, isFilled) { //Adding Shapes Feature
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
  canvas.add(shape);
  canvas.renderAll();
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
  canvas.renderAll();
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
    canvas.renderAll();
  }
};

const clearCanvas = () => {//Clearing the entire board feature
  canvas.getObjects().forEach((obj) => {
    if (!obj.isGrid) {
      canvas.remove(obj);
    }
  });
  canvas.renderAll();
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
        canvas.renderAll();
      };
    };
    reader.readAsDataURL(file);
  }
};

const downloadCanvasAsImage = () => {//Exporting Canvas into IMG Feature
  const dataURL = canvas.toDataURL({ format: 'png' });
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = 'canvas-image.png';
  link.click();
};

</script>

<template>
  <div class="whiteboard-container" @mousemove="updateCursorPosition">
    <div class="sidebar">
      <button @click="addTextToCanvas" title="Add Text">📝</button>
      <button @click="showShapeLibrary = !showShapeLibrary" title="Shape Library">🧩</button>
      <div v-if="showShapeLibrary" class="shape-library-popup">
        <div class="shape-option" @click="addShapeToCanvas('rectangle', true)" title="Filled Rectangle">
          <svg width="50" height="50" viewBox="0 0 100 100">
            <rect width="80" height="80" x="10" y="10" fill="black" />
          </svg>
        </div>
        <div class="shape-option" @click="addShapeToCanvas('rectangle', false)" title="Outlined Rectangle">
          <svg width="50" height="50" viewBox="0 0 100 100">
            <rect width="80" height="80" x="10" y="10" fill="transparent" stroke="black" stroke-width="2" />
          </svg>
        </div>
        <div class="shape-option" @click="addShapeToCanvas('circle', true)" title="Filled Circle">
          <svg width="50" height="50" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="black" />
          </svg>
        </div>
        <div class="shape-option" @click="addShapeToCanvas('circle', false)" title="Outlined Circle">
          <svg width="50" height="50" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="transparent" stroke="black" stroke-width="2" />
          </svg>
        </div>
        <div class="shape-option" @click="addShapeToCanvas('triangle', true)" title="Filled Triangle">
          <svg width="50" height="50" viewBox="0 0 100 100">
            <polygon points="50,15 90,85 10,85" fill="black" />
          </svg>
        </div>
        <div class="shape-option" @click="addShapeToCanvas('triangle', false)" title="Outlined Triangle">
          <svg width="50" height="50" viewBox="0 0 100 100">
            <polygon points="50,15 90,85 10,85" fill="transparent" stroke="black" stroke-width="2" />
          </svg>
        </div>
        <div class="shape-option" @click="addShapeToCanvas('ellipse', true)" title="Filled Ellipse">
          <svg width="50" height="50" viewBox="0 0 100 100">
            <ellipse cx="50" cy="50" rx="40" ry="25" fill="black" />
          </svg>
        </div>
        <div class="shape-option" @click="addShapeToCanvas('ellipse', false)" title="Outlined Ellipse">
          <svg width="50" height="50" viewBox="0 0 100 100">
            <ellipse cx="50" cy="50" rx="40" ry="25" fill="transparent" stroke="black" stroke-width="2" />
          </svg>
        </div>
        <div class="shape-option" @click="addShapeToCanvas('hexagon', true)" title="Filled Hexagon">
          <svg width="50" height="50" viewBox="0 0 100 100">
            <polygon points="50,10 86.6,30 86.6,70 50,90 13.4,70 13.4,30" fill="black" />
          </svg>
        </div>
        <div class="shape-option" @click="addShapeToCanvas('hexagon', false)" title="Outlined Hexagon">
          <svg width="50" height="50" viewBox="0 0 100 100">
            <polygon points="50,10 86.6,30 86.6,70 50,90 13.4,70 13.4,30" fill="transparent" stroke="black" stroke-width="2" />
          </svg>
        </div>
        <div class="shape-option" @click="addShapeToCanvas('octagon', true)" title="Filled Octagon">
          <svg width="50" height="50" viewBox="0 0 100 100">
            <polygon points="30,10 70,10 90,30 90,70 70,90 30,90 10,70 10,30" fill="black" />
          </svg>
        </div>
        <div class="shape-option" @click="addShapeToCanvas('octagon', false)" title="Outlined Octagon">
          <svg width="50" height="50" viewBox="0 0 100 100">
            <polygon points="30,10 70,10 90,30 90,70 70,90 30,90 10,70 10,30" fill="transparent" stroke="black" stroke-width="2" />
          </svg>
        </div>
        <div class="shape-option" @click="addShapeToCanvas('diamond', true)" title="Filled Diamond">
          <svg width="50" height="50" viewBox="0 0 100 100">
            <polygon points="50,10 80,50 50,90 20,50" fill="black" />
          </svg>
        </div>
        <div class="shape-option" @click="addShapeToCanvas('diamond', false)" title="Outlined Diamond">
          <svg width="50" height="50" viewBox="0 0 100 100">
            <polygon points="50,10 80,50 50,90 20,50" fill="transparent" stroke="black" stroke-width="2" />
          </svg>
        </div>
        <div class="shape-option" @click="addShapeToCanvas('parallelogram', true)" title="Filled Parallelogram">
          <svg width="50" height="50" viewBox="0 0 100 100">
            <polygon points="20,20 80,20 60,80 0,80" fill="black" />
          </svg>
        </div>
        <div class="shape-option" @click="addShapeToCanvas('parallelogram', false)" title="Outlined Parallelogram">
          <svg width="50" height="50" viewBox="0 0 100 100">
            <polygon points="20,20 80,20 60,80 0,80" fill="transparent" stroke="black" stroke-width="2" />
          </svg>
        </div>
      </div>
      <div class="color-picker-wrapper">
        <input type="color" v-model="selectedColor" title="Choose Color" />
      </div>
      <button @click="toggleDrawMode" title="Enable/Disable Drawing">{{ isDrawingMode ? '✏️' : '🖊️' }}</button>
      <div v-if="showBrushOptions" class="brush-options-popup">
        <div class="brush-option">
          <label for="brush-type">Brush Type:</label>
          <select v-model="selectedBrush" id="brush-type">
            <option value="pencil">Pencil</option>
            <option value="circle">Circle</option>
          </select>
        </div>
        <div class="brush-option">
          <label for="brush-color">Brush Color:</label>
          <input type="color" v-model="selectedColor" id="brush-color" />
        </div>
        <div class="brush-option">
          <label for="brush-thickness">Thickness:</label>
          <input type="range" v-model="brushThickness" id="brush-thickness" min="1" max="30" />
        </div>
      </div>
      <button @click="clearCanvas" title="Clear Canvas">🗑️</button>
      <button @click="triggerFileSelect" title="Insert Image">🖼️</button>
      <input type="file" ref="imageInput" @change="insertImage" style="display: none" />
      <button @click="removeSelected" title="Remove Selected">❌</button>
      <button @click="downloadCanvasAsImage" title="Download Image">⬇️</button>
    </div>
    <div class="canvas-area">
      <canvas ref="canvasEl"></canvas>
      <div
        class="cursor"
        :style="{ left: `${localCursor.x}px`, top: `${localCursor.y}px` }"
      >
        <div class="spaceship">
          👆
        </div>
        <div class="username-label">
          {{ localCursor.username }}
        </div>
      </div>
      <div
        v-for="(cursor, userId) in otherCursors"
        :key="userId"
        class="cursor"
        :style="{ left: `${cursor.x}px`, top: `${cursor.y}px` }"
      >
        <div class="spaceship" />
        <div class="username-label">
          {{ cursor.username }}
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