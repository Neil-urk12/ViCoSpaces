<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import { FabricImage } from 'fabric'
import * as fabric from 'fabric'
import { ref as dbRef, onValue, set, off, get } from 'firebase/database'
import { realTimeDb as db } from '@/firebase/firebaseconfig'
import { useAuthStore } from '@/stores/authStore'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faT, faShapes, faPencil, faTrash, faDeleteLeft, faFileImport } from '@fortawesome/free-solid-svg-icons';
import { faImage } from '@fortawesome/free-regular-svg-icons';

library.add(faT, faShapes, faPencil, faTrash, faImage, faDeleteLeft, faFileImport);

const authStore = useAuthStore()
const localCursor = ref({ x: 0, y: 0, username: '' })
const otherCursors = ref({})
const userId = computed(() => authStore.getUid)
const username = computed(() => authStore.getDisplayName)

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
    username: authStore.getDisplayName,
  });
}, 50);

const updateCursorPosition = (event) => {
  if (canvasEl.value) {
    const rect = canvasEl.value.getBoundingClientRect();
    const offsetX = 10;
    const offsetY = 10;
    const x = event.clientX - rect.left + offsetX;
    const y = event.clientY - rect.top + offsetY;
    localCursor.value = { x, y, username: username.value };
    updateFirebaseCursor(x, y);
  }
}

onMounted(async () => {
  const userCursorRef = dbRef(db, `cursors/${userId.value}`);
  const userCursorSnapshot = await get(userCursorRef);
  if (userCursorSnapshot.exists()) {
    localCursor.value = userCursorSnapshot.val();
  } else {
    localCursor.value = { x: 0, y: 0, username: username.value };
  }

  onValue(cursorsRef, (snapshot) => {
    const data = snapshot.val() || {};
    otherCursors.value = Object.entries(data).reduce((acc, [key, value]) => {
      if (key !== userId.value) {
        acc[key] = value;
      }
      return acc;
    }, {});
  });
});

onUnmounted(() => {
  off(cursorsRef);
  set(dbRef(db, `cursors/${userId.value}`), null);
  window.removeEventListener('resize', resizeCanvas);
})

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

onMounted(() => { 
  canvas = new fabric.Canvas(canvasEl.value);
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  canvas.on('object:added', function(e) {
    if (e.target) {
      addCustomBorder(e.target);
    }
  });

  canvas.on('selection:created', function(e) {
    if (e.selected && e.selected.length > 0) {
      if (e.selected.length > 1) {
        e.selected.forEach(addCustomBorder);
      } else {
        addCustomBorder(e.selected[0]);
      }
    }
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
  canvas.renderAll();
};

function addGrid() {//Adding Snapping Grid into the Canvas
  canvas.getObjects().forEach((obj) => {
    if (obj.isGrid) {
      canvas.remove(obj);
    }
  });

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
  canvas.renderAll();
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
  
  addCustomBorder(text);
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
  <div
    class="whiteboard-container"
    @mousemove="updateCursorPosition"
  >
    <div class="sidebar">
      <button
        title="Add Text"
        @click="addTextToCanvas"
      >
        <font-awesome-icon :icon="['fas', 't']" />
      </button>
      <button
        title="Shape Library"
        @click="showShapeLibrary = !showShapeLibrary"
      >
        <font-awesome-icon :icon="['fas', 'shapes']" />
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
      <div class="color-picker-wrapper">
        <input
          v-model="selectedColor"
          type="color"
          title="Choose Color"
        >
      </div>
      <button
        title="Enable/Disable Drawing"
        @click="toggleDrawMode"
      >
        <font-awesome-icon :icon="['fas', 'pencil']" />
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
            max="20"
          >
        </div>
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
    <div class="canvas-container">
      <canvas ref="canvasEl" />
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
.whiteboard-container {
  display: flex;
  height: 100vh;
  background-color: #e5e5e5;
  justify-content: center;
  align-items: center;
  position: relative;
}

.sidebar {
  width: 3%;
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
  overflow: hidden;
  width: 2em;
  height: 2em;
  border-radius: 50%;
  border: solid 1px white;
  margin: 1em;

}

.color-picker-wrapper input[type="color"] {
  padding: 0;
  width: 150%;
  height: 150%;
  margin: -25%;
}

.canvas-container {
  width: 80vw;
  height: 85vh;
  position: relative;
  overflow: hidden;
  margin: auto;
  cursor: none;
}

canvas {
  border: 2px solid #ccc;
  background-color: white;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: none;
}

.cursor {
  position: absolute;
  pointer-events: none;
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

@media (max-width: 768px) {
  .sidebar {
    width: 5%;
  }

  .shape-library-popup,
  .brush-options-popup {
    left: 60px;
    max-height: 70vh;
    padding: 8px;
  }

  .brush-options-popup {
    width: 150px;
  }

  .sidebar button {
    font-size: 20px;
  }
}

@media (max-width: 480px) {
  .sidebar {
    width: 6%;
  }

  .shape-library-popup,
  .brush-options-popup {
    left: 50px;
    top: 0;
    max-height: 60vh;
    padding: 5px;
  }

  .brush-options-popup {
    width: 130px;
  }

  .sidebar button {
    font-size: 18px;
  }

  .shape-option {
    width: 40px;
    height: 40px;
  }
}

@media (max-height: 500px) {
  .shape-library-popup,
  .brush-options-popup {
    max-height: 50vh;
  }
}

</style>