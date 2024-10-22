import { defineStore } from 'pinia';                                                                           
 import { FabricImage } from 'fabric';                                                                          
 import * as fabric from 'fabric';                                                                              
 import { ref as dbRef, onValue, set, off, get } from 'firebase/database';                                      
 import { realTimeDb as db } from '@/firebase/firebaseconfig';                                                  
                                                                                                                
 export const useWhiteboardStore = defineStore('whiteboard', {                                                  
   state: () => ({                                                                                              
     canvas: null,                                                                                              
     isDrawingMode: false,                                                                                      
     selectedColor: '#000000',                                                                                  
     brushThickness: 5,                                                                                         
     selectedBrush: 'pencil',                                                                                   
     showBrushOptions: false,                                                                                   
     gridSize: 20,                                                                                              
   }),                                                                                                          
   actions: {                                                                                                   
     initializeCanvas(canvasEl) {                                                                               
       this.canvas = new fabric.Canvas(canvasEl, {                                                              
         width: window.innerWidth * 0.8,                                                                        
         height: window.innerHeight * 0.85,                                                                     
         backgroundColor: '#fff',                                                                               
       });                                                                                                      
       this.canvas.defaultCursor = 'none';                                                                      
       this.canvas.hoverCursor = 'none';                                                                        
       this.canvas.moveCursor = 'none';                                                                         
       this.canvas.isDrawingMode = false;                                                                       
       this.canvas.renderAll();                                                                                 
                                                                                                                
       this.addGrid();                                                                                          
                                                                                                                
       this.canvas.on('object:moving', (options) => {                                                           
         const obj = options.target;                                                                            
         obj.set({                                                                                              
           originX: 'left',                                                                                     
           originY: 'top',                                                                                      
         });                                                                                                    
         const snappedLeft = Math.round(obj.left / this.gridSize) * this.gridSize;                              
         const snappedTop = Math.round(obj.top / this.gridSize) * this.gridSize;                                
         obj.set({                                                                                              
           left: snappedLeft,                                                                                   
           top: snappedTop,                                                                                     
         });                                                                                                    
         obj.setCoords();                                                                                       
       });                                                                                                      
     },                                                                                                         
     addGrid() {                                                                                                
       for (let i = 0; i < (this.canvas.width / this.gridSize); i++) {                                          
         const lineX = new fabric.Line([i * this.gridSize, 0, i * this.gridSize, this.canvas.height], {         
           stroke: '#ccc',                                                                                      
           selectable: false,                                                                                   
           excludeFromExport: true,                                                                             
           isGrid: true,                                                                                        
         });                                                                                                    
         this.canvas.add(lineX);                                                                                
       }                                                                                                        
       for (let j = 0; j < (this.canvas.height / this.gridSize); j++) {                                         
         const lineY = new fabric.Line([0, j * this.gridSize, this.canvas.width, j * this.gridSize], {          
           stroke: '#ccc',                                                                                      
           selectable: false,                                                                                   
           excludeFromExport: true,                                                                             
           isGrid: true,                                                                                        
         });                                                                                                    
         this.canvas.add(lineY);                                                                                
       }                                                                                                        
     },                                                                                                         
     addTextToCanvas() {                                                                                        
       const text = new fabric.Textbox('Enter Text', {                                                          
         left: 100,                                                                                             
         top: 100,                                                                                              
         fill: this.selectedColor,                                                                              
         fontSize: 20,                                                                                          
         fontFamily: 'Arial',                                                                                   
         editable: true,                                                                                        
       });                                                                                                      
       this.canvas.add(text);                                                                                   
       this.canvas.setActiveObject(text);                                                                       
       this.canvas.renderAll();                                                                                 
     },                                                                                                         
     addShapeToCanvas(shapeType, isFilled) {                                                                    
       let shape;                                                                                               
       const fillColor = isFilled ? this.selectedColor : 'transparent';                                         
       const strokeColor = isFilled ? 'transparent' : this.selectedColor;                                       
                                                                                                                
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
           shape = this.createPolygon(6, 50, fillColor, strokeColor);                                           
           break;                                                                                               
         case 'octagon':                                                                                        
           shape = this.createPolygon(8, 50, fillColor, strokeColor);                                           
           break;                                                                                               
         case 'diamond':                                                                                        
           shape = this.createDiamond(fillColor, strokeColor);                                                  
           break;                                                                                               
         case 'parallelogram':                                                                                  
           shape = this.createParallelogram(fillColor, strokeColor);                                            
           break;                                                                                               
         default:                                                                                               
           console.log('Unknown shape');                                                                        
           return;                                                                                              
       }                                                                                                        
       this.canvas.add(shape);                                                                                  
       this.canvas.renderAll();                                                                                 
     },                                                                                                         
     createPolygon(sides, radius, fillColor, strokeColor) {                                                     
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
     },                                                                                                         
     createDiamond(fillColor, strokeColor) {                                                                    
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
     },                                                                                                         
     createParallelogram(fillColor, strokeColor) {                                                              
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
     },                                                                                                         
     applyBrushSettings() {                                                                                     
       switch (this.selectedBrush) {                                                                            
         case 'pencil':                                                                                         
           this.canvas.freeDrawingBrush = new fabric.PencilBrush(this.canvas);                                  
           break;                                                                                               
         case 'circle':                                                                                         
           this.canvas.freeDrawingBrush = new fabric.CircleBrush(this.canvas);                                  
           break;                                                                                               
         default:                                                                                               
           this.canvas.freeDrawingBrush = new fabric.PencilBrush(this.canvas);                                  
       }                                                                                                        
       this.canvas.freeDrawingBrush.color = this.selectedColor;                                                 
       this.canvas.freeDrawingBrush.width = this.brushThickness;                                                
       this.canvas.renderAll();                                                                                 
     },                                                                                                         
     toggleDrawMode() {                                                                                         
       this.isDrawingMode = !this.isDrawingMode;                                                                
       this.canvas.isDrawingMode = this.isDrawingMode;                                                          
       this.showBrushOptions = this.isDrawingMode;                                                              
       if (this.isDrawingMode) {                                                                                
         this.applyBrushSettings();                                                                             
       }                                                                                                        
     },                                                                                                         
     removeSelected() {                                                                                         
       const activeObject = this.canvas.getActiveObject();                                                      
       if (activeObject) {                                                                                      
         this.canvas.remove(activeObject);                                                                      
         this.canvas.renderAll();                                                                               
       }                                                                                                        
     },                                                                                                         
     clearCanvas() {                                                                                            
       this.canvas.getObjects().forEach((obj) => {                                                              
         if (!obj.isGrid) {                                                                                     
           this.canvas.remove(obj);                                                                             
         }                                                                                                      
       });                                                                                                      
       this.canvas.renderAll();                                                                                 
     },                                                                                                         
     triggerFileSelect() {                                                                                      
       const imageInput = document.querySelector('input[type="file"]');                                         
       imageInput.click();                                                                                      
     },                                                                                                         
     insertImage(event) {                                                                                       
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
             const canvasWidth = this.canvas.getWidth();                                                        
             const canvasHeight = this.canvas.getHeight();                                                      
             const imageOriginalWidth = img.width;                                                              
             const imageOriginalHeight = img.height;                                                            
             const scaleX = canvasWidth / imageOriginalWidth;                                                   
             const scaleY = canvasHeight / imageOriginalHeight;                                                 
             let scaleFactor = Math.min(scaleX, scaleY) * 0.8;                                                  
             fabricImage.scale(scaleFactor);                                                                    
             this.canvas.add(fabricImage);                                                                      
             this.canvas.renderAll();                                                                           
           };                                                                                                   
         };                                                                                                     
         reader.readAsDataURL(file);                                                                            
       }                                                                                                        
     },                                                                                                         
     downloadCanvasAsImage() {                                                                                  
       const dataURL = this.canvas.toDataURL({ format: 'png' });                                                
       const link = document.createElement('a');                                                                
       link.href = dataURL;                                                                                     
       link.download = 'canvas-image.png';                                                                      
       link.click();                                                                                            
     },                                                                                                         
   },                                                                                                           
 });