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
        const offsetX = 140;                                                                                   
        const offsetY = 10;                                                                                    
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