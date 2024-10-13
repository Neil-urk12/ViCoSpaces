<script setup>
import { ref, onMounted, watch } from 'vue';
import { FabricImage } from 'fabric';
import * as fabric from 'fabric';

const canvasEl = ref(null);
let canvas = null;
const isDrawingMode = ref(false);
const selectedColor = ref('#000000');
const gridSize = 20;

const imageInput = ref(null);
const showShapeLibrary = ref(false);

onMounted(() => {
  canvas = new fabric.Canvas(canvasEl.value, {
    width: window.innerWidth * 0.8,
    height: window.innerHeight * 0.85,
    backgroundColor: '#fff',
  });
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

function addGrid() {
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

const addTextToCanvas = () => {
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
    case 'pentagon':
      shape = createPolygon(5, 50, fillColor, strokeColor);
      break;
    case 'octagon':
      shape = createPolygon(8, 50, fillColor, strokeColor);
      break;
    case 'star':
      shape = createStar(5, 50, 25, fillColor, strokeColor);
      break;
    case 'diamond':
      shape = createDiamond(fillColor, strokeColor);
      break;
    case 'parallelogram':
      shape = createParallelogram(fillColor, strokeColor);
      break;
    case 'arrow-left':
      shape = createArrow('left', fillColor, strokeColor);
      break;
    case 'arrow-right':
      shape = createArrow('right', fillColor, strokeColor);
      break;
    case 'arrow-up':
      shape = createArrow('up', fillColor, strokeColor);
      break;
    case 'arrow-down':
      shape = createArrow('down', fillColor, strokeColor);
      break;
    default:
      console.log('Unknown shape');
      return;
  }
  canvas.add(shape);
  canvas.renderAll();
}

function createPolygon(sides, radius, fillColor, strokeColor) {
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

function createStar(points, outerRadius, innerRadius, fillColor, strokeColor) {
  const starPoints = Array.from({ length: points * 2 }, (_, i) => {
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = (i * Math.PI) / points;
    return {
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle),
    };
  });

  return new fabric.Polygon(starPoints, {
    left: 200,
    top: 200,
    fill: fillColor,
    stroke: strokeColor,
    strokeWidth: 2,
    selectable: true,
  });
}

function createDiamond(fillColor, strokeColor) {
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

function createParallelogram(fillColor, strokeColor) {
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

function createArrow(direction, fillColor, strokeColor) {
  let line, arrowHead;
  const lineLength = 80;
  const arrowSize = 20;

  switch (direction) {
    case 'left':
      line = new fabric.Line([lineLength, 0, 0, 0], { stroke: strokeColor, strokeWidth: 2 });
      arrowHead = new fabric.Triangle({
        left: 0,
        top: 0,
        width: arrowSize,
        height: arrowSize,
        angle: -90,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: 2,
        originX: 'center',
        originY: 'center',
      });
      break;
    case 'right':
      line = new fabric.Line([0, 0, lineLength, 0], { stroke: strokeColor, strokeWidth: 2 });
      arrowHead = new fabric.Triangle({
        left: lineLength,
        top: 0,
        width: arrowSize,
        height: arrowSize,
        angle: 90,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: 2,
        originX: 'center',
        originY: 'center',
      });
      break;
    case 'up':
      line = new fabric.Line([0, lineLength, 0, 0], { stroke: strokeColor, strokeWidth: 2 });
      arrowHead = new fabric.Triangle({
        left: 0,
        top: 0,
        width: arrowSize,
        height: arrowSize,
        angle: 0,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: 2,
        originX: 'center',
        originY: 'center',
      });
      break;
    case 'down':
      line = new fabric.Line([0, 0, 0, lineLength], { stroke: strokeColor, strokeWidth: 2 });
      arrowHead = new fabric.Triangle({
        left: 0,
        top: lineLength,
        width: arrowSize,
        height: arrowSize,
        angle: 180,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: 2,
        originX: 'center',
        originY: 'center',
      });
      break;
    default:
      return;
  }

  return new fabric.Group([line, arrowHead], { left: 200, top: 200, selectable: true });
}

watch(selectedColor, (newColor) => {
  if (isDrawingMode.value) {
    canvas.freeDrawingBrush.color = newColor;
  }
});

const toggleDrawMode = () => {
  isDrawingMode.value = !isDrawingMode.value;
  canvas.isDrawingMode = isDrawingMode.value;

  if (isDrawingMode.value) {
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.color = selectedColor.value;
    canvas.freeDrawingBrush.width = 5;
  }
  canvas.renderAll();
};

const removeSelected = () => {
  const activeObject = canvas.getActiveObject();
  if (activeObject) {
    canvas.remove(activeObject);
    canvas.renderAll();
  }
};

const clearCanvas = () => {
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

const insertImage = (event) => {
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
        canvas.add(fabricImage);
        canvas.renderAll();
      };
    };
    reader.readAsDataURL(file);
  }
};
</script>

<template>
  <div class="whiteboard-container">
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
        <div class="shape-option" @click="addShapeToCanvas('pentagon', true)" title="Filled Pentagon">
          <svg width="50" height="50" viewBox="0 0 100 100">
            <polygon points="50,15 90,35 75,85 25,85 10,35" fill="black" />
          </svg>
        </div>
        <div class="shape-option" @click="addShapeToCanvas('pentagon', false)" title="Outlined Pentagon">
          <svg width="50" height="50" viewBox="0 0 100 100">
            <polygon points="50,15 90,35 75,85 25,85 10,35" fill="transparent" stroke="black" stroke-width="2" />
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
        <div class="shape-option" @click="addShapeToCanvas('star', true)" title="Filled Star">
          <svg width="50" height="50" viewBox="0 0 100 100">
            <polygon points="50,10 61.8,38.2 90,38.2 67.4,58.2 76.6,86.6 50,70 23.4,86.6 32.6,58.2 10,38.2 38.2,38.2" fill="black" />
          </svg>
        </div>
        <div class="shape-option" @click="addShapeToCanvas('star', false)" title="Outlined Star">
          <svg width="50" height="50" viewBox="0 0 100 100">
            <polygon points="50,10 61.8,38.2 90,38.2 67.4,58.2 76.6,86.6 50,70 23.4,86.6 32.6,58.2 10,38.2 38.2,38.2" fill="transparent" stroke="black" stroke-width="2" />
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
        <div class="shape-option" @click="addShapeToCanvas('arrow-left', true)" title="Filled Left Arrow">
          <svg width="50" height="50" viewBox="0 0 100 100">
            <line x1="60" y1="50" x2="20" y2="50" stroke="black" stroke-width="2" />
            <polygon points="20,40 20,60 10,50" fill="black" />
          </svg>
        </div>
        <div class="shape-option" @click="addShapeToCanvas('arrow-right', true)" title="Filled Right Arrow">
          <svg width="50" height="50" viewBox="0 0 100 100">
            <line x1="20" y1="50" x2="60" y2="50" stroke="black" stroke-width="2" />
            <polygon points="60,40 60,60 70,50" fill="black" />
          </svg>
        </div>
        <div class="shape-option" @click="addShapeToCanvas('arrow-up', true)" title="Filled Up Arrow">
          <svg width="50" height="50" viewBox="0 0 100 100">
            <line x1="50" y1="60" x2="50" y2="20" stroke="black" stroke-width="2" />
            <polygon points="40,20 60,20 50,10" fill="black" />
          </svg>
        </div>
        <div class="shape-option" @click="addShapeToCanvas('arrow-down', true)" title="Filled Down Arrow">
          <svg width="50" height="50" viewBox="0 0 100 100">
            <line x1="50" y1="20" x2="50" y2="60" stroke="black" stroke-width="2" />
            <polygon points="40,60 60,60 50,70" fill="black" />
          </svg>
        </div>
      </div>
      <div class="color-picker-wrapper">
        <input type="color" v-model="selectedColor" title="Choose Color" />
      </div>
      <button @click="toggleDrawMode" title="Enable/Disable Drawing">{{ isDrawingMode ? '✏️' : '🖊️' }}</button>
      <button @click="clearCanvas" title="Clear Canvas">🗑️</button>
      <button @click="triggerFileSelect" title="Insert Image">🖼️</button>
      <input type="file" ref="imageInput" @change="insertImage" style="display: none" />
      <button @click="removeSelected" title="Remove Selected">❌</button>
    </div>
    <div class="canvas-area">
      <canvas ref="canvasEl"></canvas>
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
  z-index: 20; 
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
}

canvas {
  border: 2px solid #ccc;
  background-color: white;
}
</style>