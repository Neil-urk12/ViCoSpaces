import { defineStore } from 'pinia'                                                                        
import { ref as dbRef, onValue, set, off } from 'firebase/database'                                     
import { realTimeDb as db } from '@/firebase/firebaseconfig'                                                  
import { useAuthStore } from '@/stores/authStore'                                                         

export const useCursorStore = defineStore('cursor', {                                                          
  state: () => ({                                                                                              
    localCursor: { x: 0, y: 0, username: '' },                                                                 
    otherCursors: {},                                                                                          
    userId: null,                                                                                              
    roomId: null,                                                                   
  }),                                                                                                          
  getters: {                                                                                                   
    currentUserUid: (state) => useAuthStore().getUid,                                                          
    currentUserName: (state) => useAuthStore().getDisplayName,                                                 
  },                                                                                                           
  actions: {                                                                                                   
    setUserId(userId) {                                                                                        
      this.userId = userId;                                                                                    
    },                                                                                                         
    setRoomId(roomId) {                                                                                        
      this.roomId = roomId;                                                                                    
    },                                                                                                         
    updateCursorPosition(event) {                                                                              
      const canvasEl = document.querySelector('.canvas-area canvas');                                          
      if (canvasEl) {                                                                                          
        const rect = canvasEl.getBoundingClientRect();                                                         

        // Base 100% zoom
        let offsetX = 180;
        let offsetY = 35;

        const zoomFactor = window.devicePixelRatio;
        if (zoomFactor >= 2.5) {
          offsetX = 106;
          offsetY = -40;
        } else if (zoomFactor >= 2.0) {
          offsetX = 125;
          offsetY = -16;
        } else if (zoomFactor >= 1.75) { 
          offsetX = 135;
          offsetY = -10;
        } else if (zoomFactor >= 1.5) { 
          offsetX = 156;
          offsetY = -5;
        } else if (zoomFactor >= 1.25) { 
          offsetX = 180;
          offsetY = 5;
        } else if (zoomFactor >= 1.10) { 
          offsetX = 200;
          offsetY = 10;
        } else if (zoomFactor >= 1.0) { 
          offsetX = 215;
          offsetY = 20;
        } else if (zoomFactor >= 0.8) { 
          offsetX = 270;
          offsetY = 40;
        } else if (zoomFactor >= 0.75) { 
          offsetX = 285;
          offsetY = 45;
        } else if (zoomFactor >= 0.5) {
          offsetX = 310;
          offsetY = 55;
        }

        const x = event.clientX - rect.left + offsetX;                                                         
        const y = event.clientY - rect.top + offsetY;                                         

        this.localCursor = { x, y, username: this.currentUserName };                                           
        this.updateFirebaseCursor(x, y);                                                                       
      }                                                                                                       
    },                                                                                                         
    updateFirebaseCursor(x, y) {                                                                               
      set(dbRef(db, `rooms/${this.roomId}/cursors/${this.userId}`), {                                          
        x,                                                                                                     
        y,                                                                                                     
        username: this.currentUserName,                                                                        
      });                                                                                                      
    },                                                                                                         
    fetchCursors() {                                                                                           
      const cursorsRef = dbRef(db, `rooms/${this.roomId}/cursors`);                                            
      onValue(cursorsRef, (snapshot) => {                                                                      
        const data = snapshot.val() || {};                                                                     
        this.otherCursors = Object.entries(data).reduce((acc, [key, value]) => {                               
          if (key !== this.userId) {                                                                           
            acc[key] = value;                                                                                  
          }                                                                                                    
          return acc;                                                                                          
        }, {});                                                                                                
      });                                                                                                      
    },                                                                                                         
    unsubscribeCursors() {                                                                                     
      const cursorsRef = dbRef(db, `rooms/${this.roomId}/cursors`);                                            
      off(cursorsRef);                                                                                         
      set(dbRef(db, `rooms/${this.roomId}/cursors/${this.userId}`), null);                                     
    },                                                                                                         
  },                                                                                                           
});
