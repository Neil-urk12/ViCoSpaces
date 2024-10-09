<template>
  <div class="whiteboard-container">
    <div class="sidebar">
      <button @click="addRectangle" title="Add Rectangle">
        <i class="tool-icon">◻️</i>
      </button>
      <button @click="addCircle" title="Add Circle">
        <i class="tool-icon">⚫</i>
      </button>
      <button @click="addText" title="Add Text">
        <i class="tool-icon">T</i>
      </button>

      <div class="color-picker-wrapper">
        <input type="color" v-model="selectedColor" title="Choose Color" />
      </div>

      <button @click="toggleDrawMode" title="Enable/Disable Drawing">
        <i class="tool-icon">{{ isDrawingMode ? '✏️' : '🖊️' }}</i>
      </button>

      <button @click="clearCanvas" title="Clear Canvas">
        <i class="tool-icon">🗑️</i>
      </button>

      <button @click="undo" title="Undo">
        <i class="tool-icon">↩️</i>
      </button>
      <button @click="redo" title="Redo">
        <i class="tool-icon">↪️</i>
      </button>

      <button @click="triggerFileSelect" title="Insert Image">
        <i class="tool-icon">🖼️</i>
      </button>
      <input type="file" ref="imageInput" @change="insertImage" style="display: none" />

      <button @click="removeSelected" title="Remove Selected">
        <i class="tool-icon">❌</i>
      </button>
    </div>

    <div class="canvas-area">
      <canvas ref="canvasEl"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { FabricImage } from "fabric";
import * as fabric from 'fabric';

const canvasEl = ref(null);
let canvas = null;
const isDrawingMode = ref(false); 
const selectedColor = ref('#000000');
const history = ref([]);
const redoStack = ref([]); 

const imageInput = ref(null); 

// Initialize Fabric.js and set up canvas
onMounted(() => {
  canvas = new fabric.Canvas(canvasEl.value, {
    width: window.innerWidth * 0.8, 
    height: window.innerHeight * 0.85, 
    backgroundColor: '#fff', 
  });

  // Disable drawing mode initially
  canvas.isDrawingMode = false;
  canvas.renderAll();

  // Save initial state to history
  saveState();

  // Save the state after each free drawing path is completed
  canvas.on('path:created', () => {
    saveState(); 
  });
});

// Watch the selected color and update the brush color if drawing mode is enabled
watch(selectedColor, (newColor) => {
  if (isDrawingMode.value) {
    canvas.freeDrawingBrush.color = newColor; 
  }
});

// Function to add a rectangle with the selected color
const addRectangle = () => {
  const rect = new fabric.Rect({
    left: 100,
    top: 100,
    fill: selectedColor.value, 
    width: 100,
    height: 100,
  });
  canvas.add(rect);
  canvas.renderAll(); 
  saveState();
};

// Function to add a circle with the selected color
const addCircle = () => {
  const circle = new fabric.Circle({
    left: 200,
    top: 200,
    radius: 50,
    fill: selectedColor.value, 
  });
  canvas.add(circle);
  canvas.renderAll(); 
  saveState();
};

// Function to add text with the selected color
const addText = () => {
  const text = new fabric.Textbox('Text', {
    left: 300,
    top: 300,
    fontSize: 20,
    fill: selectedColor.value,
    fontFamily: 'Arial',
  });
  canvas.add(text);
  canvas.renderAll(); 
  saveState();
};

// Function to toggle the drawing mode and apply brush settings
const toggleDrawMode = () => {
  isDrawingMode.value = !isDrawingMode.value;
  canvas.isDrawingMode = isDrawingMode.value;

  // Apply brush settings when drawing mode is enabled
  if (isDrawingMode.value) {
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.color = selectedColor.value; 
    canvas.freeDrawingBrush.width = 5; 
  }
  canvas.renderAll(); 
};

// Function to remove the selected object
const removeSelected = () => {
  const activeObject = canvas.getActiveObject();
  if (activeObject) {
    canvas.remove(activeObject);
    canvas.renderAll(); 
    saveState();
  }
};

// Function to clear the entire canvas and reset it to its original state
const clearCanvas = () => {
  canvas.getObjects().forEach((obj) => {
    canvas.remove(obj);
  });
  canvas.backgroundColor = '#fff'; 
  canvas.renderAll();
  saveState(); 
};

// Function to trigger the file selection for image insertion
const triggerFileSelect = () => {
  imageInput.value.click(); 
};

// Function to insert an image into the canvas
const insertImage = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (f) => {
      const imgElement = new Image();
      imgElement.src = f.target.result;
      imgElement.onload = () => {
        const fabricImage = new FabricImage(imgElement, {
          left: 50,
          top: 50,
          angle: 0,
          opacity: 1,
        });
        canvas.add(fabricImage);
      };
    };
    reader.readAsDataURL(file);
  }
};

// Function to save the current canvas state to the history for undo/redo
const saveState = () => {
  history.value.push(JSON.stringify(canvas));
  redoStack.value = []; 
};


// Function to undo the last action
const undo = () => {
  if (history.value.length > 1) {
    redoStack.value.push(history.value.pop()); 
    const previousState = history.value[history.value.length - 1];
    canvas.loadFromJSON(previousState, () => {
      canvas.renderAll(); 
    });
  }
};

// Function to redo the last undone action
const redo = () => {
  if (redoStack.value.length > 0) {
    const nextState = redoStack.value.pop();
    history.value.push(nextState);
    canvas.loadFromJSON(nextState, () => {
      canvas.renderAll();
    });
  }
};

</script>

<style scoped>
.whiteboard-container {
  display: flex;
  height: 100vh;
  background-color: #e5e5e5;
  justify-content: center;
  align-items: center;
}

.sidebar {
  width: 70px;
  background-color: #3a86ff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; 
  border-radius: 10px; 
  padding: 10px;
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

.tool-icon {
  display: block;
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
}

canvas {
  border: 2px solid #ccc;
  background-color: white;
}
</style>
