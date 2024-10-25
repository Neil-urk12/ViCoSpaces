import { defineStore } from 'pinia'                                                                        
import { ref as dbRef, onValue, set, off } from 'firebase/database'                                     
import { realTimeDb as db } from '@/firebase/firebaseconfig'                                                  
import { useAuthStore } from '@/stores/authStore'                                                         

export const useCursorStore = defineStore('cursor', {                                                          
  state: () => ({                                                                                              
    localCursor: { x: 0, y: 0, username: '', timestamp: Date.now() },                                                               
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
        let offsetX = 215;
        let offsetY = 8;

        const zoomFactor = window.devicePixelRatio;
        if (zoomFactor >= 2.5) {
          offsetX = 106;
          offsetY = -50;
        } else if (zoomFactor >= 2.0) {
          offsetX = 125;
          offsetY = -25;
        } else if (zoomFactor >= 1.75) { 
          offsetX = 140;
          offsetY = -20;
        } else if (zoomFactor >= 1.5) { 
          offsetX = 156;
          offsetY = -15;
        } else if (zoomFactor >= 1.25) { 
          offsetX = 180;
          offsetY = -6;
        } else if (zoomFactor >= 1.10) { 
          offsetX = 200;
          offsetY = 3;
        } else if (zoomFactor >= 1.0) { 
          offsetX = 215;
          offsetY = 8;
        } else if (zoomFactor >= 0.8) { 
          offsetX = 260;
          offsetY = 20;
        } else if (zoomFactor >= 0.75) { 
          offsetX = 285;
          offsetY = 35;
        } else if (zoomFactor >= 0.5) {
          offsetX = 310;
          offsetY = 45;
        }

        const x = event.clientX - rect.left + offsetX;                                                         
        const y = event.clientY - rect.top + offsetY;                                        

        this.localCursor = { x, y, username: this.currentUserName, timestamp: Date.now() };                                           
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
    removeInactiveCursors() {                                                                                    
      const now = Date.now();                                                                                    
      const twoMinutesAgo = now - 2 * 60 * 1000;                                                                 
                                                                                                                 
      Object.keys(this.otherCursors).forEach(userId => {                                                         
        const cursor = this.otherCursors[userId];                                                                
        if (cursor.timestamp < twoMinutesAgo) {                                                                  
          delete this.otherCursors[userId];                                                                      
          set(dbRef(db, `rooms/${this.roomId}/cursors/${userId}`), null);                                        
        }                                                                                                        
      });                                                                                                        
    },                                                                                                                                                                                                                
    startInactiveCursorCheck() {                                                                                 
      this.inactiveCursorCheckInterval = setInterval(() => {                                                     
        this.removeInactiveCursors();                                                                            
      }, 60 * 1000);                                                                      
    },                                                                                                           
                                                                                                                 
    stopInactiveCursorCheck() {                                                                                  
      clearInterval(this.inactiveCursorCheckInterval);                                                           
    },                                                                                                          
  },                                                                                                           
});
