<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
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
  const { clientX, clientY } = event
  localCursor.value = { x: clientX, y: clientY, username: username.value }
  updateFirebaseCursor(clientX, clientY)
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
  isDrawingMode.value = !isDrawingMode.value
  canvas.isDrawingMode = isDrawingMode.value

  if (isDrawingMode.value) {
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas)
    canvas.freeDrawingBrush.color = "black"
    canvas.freeDrawingBrush.width = 5
  }
  canvas.renderAll()
}
</script>

<template>
  <div
    class="room-container"
    @mousemove="updateCursorPosition"
  >
    <div class="controls">
      <button @click="addRectangle">
        Add Rectangle
      </button>
      <button @click="addCircle">
        Add Circle
      </button>
      <button @click="addText">
        Add Text
      </button>
      <button @click="removeSelected">
        Remove Selected
      </button>
      <button @click="toggleDrawMode">
        {{ isDrawingMode ? 'Disable Draw' : 'Enable Draw' }}
      </button>
    </div>
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
</template>


<style scoped>
.room-container, .upper-canvas, .lower-canvas{
  cursor: none;
}
canvas {
  border: 2px solid #ccc;
  margin-top: 10px;
  cursor: none;
}
.controls {
  margin-bottom: 10px;
}
button {
  margin-right: 10px;
}
.cursor {
  position: absolute;
  transform: translate(-50%, -50%);
  pointer-events: none;
  transition: all 0.1s ease;
  display: flex;
  flex-direction: column;
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
