import { defineStore } from 'pinia';                                                                           
import { ref as dbRef, push, onChildAdded, off, serverTimestamp } from 'firebase/database';                    
import { realTimeDb as db } from '@/firebase/firebaseconfig';                                                  
import { useAuthStore } from '@/stores/authStore';                                                             
                                                                                                               
export const useChatStore = defineStore('chat', {                                                              
  state: () => ({                                                                                              
    messages: [],                                                                                              
    newMessage: '',                                                                                            
    isVisible: true,                                                                                           
    selectedMessageId: null,                                                                                   
    roomId: null, // Add roomId to the state                                                                   
  }),                                                                                                          
  getters: {                                                                                                   
    currentUserUid: (state) => useAuthStore().getUid,                                                          
    currentUserName: (state) => useAuthStore().getDisplayName,                                                 
  },                                                                                                           
  actions: {                                                                                                   
    setRoomId(roomId) {                                                                                        
      this.roomId = roomId;                                                                                    
    },                                                                                                         
    sendMessage() {                                                                                            
      if (!this.currentUserUid) return console.error('Cannot send message: User is not authenticated');        
      if (!this.newMessage.trim()) return;                                                                     
      if (this.newMessage.trim()) {                                                                            
        push(dbRef(db, `rooms/${this.roomId}/messages`), {                                                     
          text: this.newMessage,                                                                               
          sender: this.currentUserName || "Anonymous",                                                         
          senderId: this.currentUserUid,                                                                       
          timestamp: serverTimestamp(),                                                                        
        })                                                                                                     
        .catch((error) => {                                                                                    
          console.error('Error sending message:', error);                                                      
        });                                                                                                    
        this.newMessage = '';                                                                                  
      }                                                                                                        
    },                                                                                                         
    toggleVisibility() {                                                                                       
      this.isVisible = !this.isVisible;                                                                        
    },                                                                                                         
    formatTimestamp(timestamp) {                                                                               
      const date = new Date(timestamp);                                                                        
      return date.toLocaleString();                                                                            
    },                                                                                                         
    showTimestamp(messageId) {                                                                                 
      this.selectedMessageId = this.selectedMessageId === messageId ? null : messageId;                        
    },                                                                                                         
    fetchMessages() {                                                                                          
      if (!this.roomId) return;                                                                                
      const messagesRef = dbRef(db, `rooms/${this.roomId}/messages`);                                          
      onChildAdded(messagesRef, (snapshot) => {                                                                
        const message = snapshot.val();                                                                        
        this.messages.push({                                                                                   
          id: snapshot.key,                                                                                    
          text: message.text,                                                                                  
          sender: message.sender,                                                                              
          senderId: message.senderId,                                                                          
          timestamp: message.timestamp,                                                                        
        });                                                                                                    
      });                                                                                                      
    },                                                                                                         
    unsubscribeMessages() {                                                                                    
      if (!this.roomId) return;                                                                                
      const messagesRef = dbRef(db, `rooms/${this.roomId}/messages`);                                          
      off(messagesRef);                                                                                        
    },                                                                                                         
  },                                                                                                           
});