import { defineStore } from 'pinia'
import {realTimeDb as db } from '../firebase/firebaseconfig'
import { ref, set, get, push, child, onValue, remove, runTransaction as firebaseRunTransaction } from 'firebase/database'

export const useRoomStore = defineStore('rooms', {
  state: () => ({
    rooms: []
  }),
  actions: {
    async fetchRooms() {
      const roomsRef = ref(db, 'rooms')
      onValue(roomsRef, (snapshot) => {
        const data = snapshot.val()
        this.rooms = data ? Object.entries(data).map(([id, room]) => ({ id, ...room })) : []
      })
    },

    async createRoom(roomData, userId, userEmail) {
      try {
        const newRoomRef = push(child(ref(db), 'rooms'))
        const roomId = newRoomRef.key
        const createdAt = Date.now()
        const room = {
          ...roomData,
          id: roomId,
          host: { id: userId, name: userEmail },
          users: { [userId]: { name: userEmail, isHost: true } },
          currentUsers: 1,
          createdAt
        }
        await set(newRoomRef, room)
        return roomId
      } catch (error) {
        console.error('Error creating room:', error)
        throw error
      }
    },

    async joinRoom(roomId, userId, userEmail, password = null) {
      try {
        const roomRef = ref(db, `rooms/${roomId}`)
        const snapshot = await get(roomRef)
        if (snapshot.exists()) {
          const room = snapshot.val()
          if (room.privacyType === 'private' && room.password !== password) 
            throw new Error('Incorrect password')

          await runTransaction(roomRef, (room) => {                                                                
            if (room) {                                                                                            
              if (room.currentUsers >= room.capacity) throw new Error('Room is full');                                                                   
              if (!room.users)  room.users = {}                                                                                                                          
              room.currentUsers += 1;                                                                              
              room.users[userId] = { name: userEmail };                                                            
            }                                                                                                      
            return room;                                                                                           
          })  
          // const updates = {
          //   [`rooms/${roomId}/users/${userId}`]: { name: userEmail },
          //   [`rooms/${roomId}/currentUsers`]: room.currentUsers + 1
          // }
          // await update(ref(db), updates)
        } else {
          throw new Error('Room not found')
        }
      } catch (error) {
        console.error('Error joining room:', error)
        throw error
      }
    },

    async deleteRoom(roomId) {
      try {
        const roomRef = ref(db, `rooms/${roomId}`)
        await remove(roomRef)
      } catch (error) {
        console.error('Error deleting room:', error)
        throw error
      }
    },
    async leaveRoom(roomId, userId) {                                                                              
      try {                                                                                                        
        const roomRef = ref(db, `rooms/${roomId}`);                                                                
        const snapshot = await get(roomRef);                                                                       
        if (snapshot.exists()) {                                                                                                                                                         
                                                                                                                                                       
          await runTransaction(roomRef, (room) => {                                                                
            if (room) {                                                                                            
              room.currentUsers = Math.max(0, room.currentUsers - 1);                                              
              delete room.users[userId];                                                                           
            }                                                                                                      
            return room;                                                                                           
          });                                                                                                      
        }                                                                                                          
      } catch (error) {                                                                                            
        console.error('Error leaving room:', error);                                                               
        throw error;                                                                                               
      }                                                                                                            
    }
    // async leaveRoom(roomId, userId) {
    //   try {
    //     const roomRef = ref(db, `rooms/${roomId}`)
    //     const snapshot = await get(roomRef)
    //     if (snapshot.exists()) {
    //       const room = snapshot.val()
    //       const updates = {
    //         [`rooms/${roomId}/currentUsers`]: Math.max(0, room.currentUsers - 1),
    //         [`rooms/${roomId}/users/${userId}`]: null
    //       }
    //       await update(ref(db), updates)
    //     }
    //   } catch (error) {
    //     console.error('Error leaving room:', error)
    //     throw error
    //   }
    // }
  }
})
async function runTransaction(ref, transactionUpdate) {                                                        
  // let currentData;                                                                                             
  // let newData;                                                                                                 
                                                                                                               
  // do {                                                                                                         
  //   const snapshot = await get(ref);                                                                           
  //   currentData = snapshot.exists() ? snapshot.val() : null;                                                   
  //   newData = transactionUpdate(currentData);                                                                  
  // } while (!await set(ref, newData));                                                                          
                                                                                                               
  // return newData;   
  return firebaseRunTransaction(ref, (currentData) => {                                                        
    if (currentData === null) {                                                                                
      return currentData                                       
    }                                                                                                          
    return transactionUpdate(currentData);                                                                     
  })                                                                                           
} 