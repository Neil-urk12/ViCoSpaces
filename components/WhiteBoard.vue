<script setup>
import { ref, onMounted } from 'vue'

let canvas = null
let context = null

const drawColor = ref('#000000')
const drawWidth = ref(2)
const isDrawing = ref(false)

const restoreArray = ref([])
let redoArray = []
let index = ref(-1)

const colors = ['#ff0000', '#0000ff', '#ffff00', '#800080']

onMounted(() => {
  canvas = document.getElementById('whiteBoard')

  canvas.width = window.innerWidth * 0.8
  canvas.height = window.innerHeight * 0.6
  context = canvas.getContext('2d')

  context.fillStyle = '#ffffff'
  context.fillRect(0, 0, canvas.width, canvas.height)

  canvas.addEventListener('mousedown', startDrawing)
  canvas.addEventListener('mousemove', draw)
  canvas.addEventListener('mouseup', stopDrawing)
  canvas.addEventListener('mouseout', stopDrawing)

  canvas.addEventListener('touchstart', startDrawing)
  canvas.addEventListener('touchmove', draw)
  canvas.addEventListener('touchend', stopDrawing)
})

function startDrawing(event) {
  isDrawing.value = true
  context.beginPath()
  const { offsetX, offsetY } = getEventCoordinates(event)
  context.moveTo(offsetX, offsetY)
  event.preventDefault()
}

function draw(event) {
  if (!isDrawing.value) return

  const { offsetX, offsetY } = getEventCoordinates(event)
  context.lineTo(offsetX, offsetY)
  context.strokeStyle = drawColor.value
  context.lineWidth = drawWidth.value
  context.lineCap = 'round'
  context.lineJoin = 'round'
  context.stroke()
  event.preventDefault()
}

function stopDrawing(event) {
  if (!isDrawing.value) return

  isDrawing.value = false
  context.stroke()
  context.closePath()

  restoreArray.value.push(context.getImageData(0, 0, canvas.width, canvas.height))
  index.value += 1
  redoArray = []

  event.preventDefault()
}

function getEventCoordinates(event) {
  if (event.touches && event.touches.length > 0) {
    return {
      offsetX: event.touches[0].clientX - canvas.offsetLeft,
      offsetY: event.touches[0].clientY - canvas.offsetTop
    }
  }
  return {
    offsetX: event.clientX - canvas.offsetLeft,
    offsetY: event.clientY - canvas.offsetTop
  }
}

function changeColor(color) {
  drawColor.value = color
}

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.fillStyle = '#ffffff'
  context.fillRect(0, 0, canvas.width, canvas.height)

  restoreArray.value = []
  redoArray = []
  index.value = -1
}

function undoLast() {
  if (index.value <= 0) {
    clearCanvas()
  } else {
    redoArray.push(restoreArray.value[index.value])
    index.value -= 1
    restoreArray.value.pop()
    context.putImageData(restoreArray.value[index.value], 0, 0)
  }
}

function redoLast() {
  if (redoArray.length > 0) {
    const redoState = redoArray.pop()
    restoreArray.value.push(redoState)
    index.value += 1
    context.putImageData(redoState, 0, 0)
  }
}
</script>

<template>
  <div class="field">
    <canvas id="whiteBoard" />
    <div class="tools">
      <button type="button" class="button" @click="undoLast">Undo</button>
      <button type="button" class="button" @click="redoLast">Redo</button>
      <button type="button" class="button" @click="clearCanvas">Clear</button>

      <div
        v-for="color in colors"
        :key="color"
        :style="{ background: color }"
        class="color-field"
        @click="changeColor(color)"
      />

      <input v-model="drawColor" type="color" class="color-picker" />
      <input v-model="drawWidth" type="range" min="1" max="100" class="pen-range" />
    </div>
  </div>
</template>

<style scoped>
.field {
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

canvas {
  box-shadow: -3px 2px 9px 6px black;
  cursor: pointer;
  margin-bottom: 20px;
}

.tools {
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin-top: 15px;
}

.tools .color-field {
  height: 40px;
  width: 40px;
  cursor: pointer;
  display: inline-block;
  border-radius: 50%;
  border: 2px solid white;
  margin: 0 15px;
}

.button {
  width: 100px;
  height: 40px;
  border: 2px solid white;
  cursor: pointer;
  color: white;
  background: #222;
  font-weight: bold;
  margin: 0 10px;
}

.color-picker,
.pen-range {
  margin: 0 10px;
  height: 50px;
}
</style>
