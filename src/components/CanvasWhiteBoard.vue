<script setup>
import { ref, onMounted } from 'vue';
import * as fabric from 'fabric';

const canvasEl = ref(null);
let canvas = null;
const isDrawingMode = ref(false);

onMounted(() => {
  canvas = new fabric.Canvas(canvasEl.value, {
    width: 800,
    height: 600,
    backgroundColor: '#f3f3f3',
  });

  canvas.isDrawingMode = false;
  canvas.renderAll();
});

const addRectangle = () => {
  const rect = new fabric.Rect({
    left: 100,
    top: 100,
    fill: 'blue',
    width: 100,
    height: 100,
  });
  canvas.add(rect);
};

// Function to add a circle
const addCircle = () => {
  const circle = new fabric.Circle({
    left: 200,
    top: 200,
    radius: 50,
    fill: 'green',
  });
  canvas.add(circle);
};

// Function to add text
const addText = () => {
  const text = new fabric.Textbox('Text', {
    left: 300,
    top: 300,
    fontSize: 20,
    fill: 'black',
    fontFamily: 'Arial',
  });
  canvas.add(text);
};

// Function to remove the selected object
const removeSelected = () => {
  const activeObject = canvas.getActiveObject();
  if (activeObject) {
    canvas.remove(activeObject);
  }
};

// Function to toggle the drawing mode
const toggleDrawMode = () => {
  isDrawingMode.value = !isDrawingMode.value;
  canvas.isDrawingMode = isDrawingMode.value;

  if (isDrawingMode.value) {
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.color = "black";
    canvas.freeDrawingBrush.width = 5; 
  }
  canvas.renderAll();
};

</script>

<template>
  <div>
    <div class="controls">
      <button @click="addRectangle">Add Rectangle</button>
      <button @click="addCircle">Add Circle</button>
      <button @click="addText">Add Text</button>
      <button @click="removeSelected">Remove Selected</button>
      <button @click="toggleDrawMode">{{ isDrawingMode ? 'Disable Draw' : 'Enable Draw' }}</button>
    </div>
    <canvas ref="canvasEl"></canvas>
  </div>
</template>


<style scoped>
canvas {
  border: 2px solid #ccc;
  margin-top: 10px;
}
.controls {
  margin-bottom: 10px;
}
button {
  margin-right: 10px;
}
</style>
