import { defineStore } from 'pinia'
// import {realTimeDb as db } from '../firebase/firebaseconfig'
import { realTimeDb as db } from '../firebase/firebaseconfig'
import { ref, set, get, push, child, onValue, remove, runTransaction as firebaseRunTransaction, DatabaseReference } from 'firebase/database'

export interface Room {
  id: string;
  host: { id: string; name: string };
  users: { [key: string]: { name: string; isHost: boolean } };
  currentUsers: number;
  createdAt: number;
  privacyType?: 'public' | 'private';
  password?: string;
  capacity?: number;
}

export type TransactionUpdate = (currentData: any) => any

export const useRoomStore = defineStore('rooms', {
  state: () => ({
    rooms: [] as Room[]
  }),
  actions: {
    async fetchRooms() {
      const roomsRef = ref(db, 'rooms')
      onValue(roomsRef, (snapshot) => {
        const data = snapshot.val()
        this.rooms = data ? Object.entries(data).map(([id, room]) => {
          const roomObj = room as { [key: string]: any }
          return { id, ...roomObj } as Room
        }) : []
      })
    },

    async createRoom(roomData: any, userId: string, userEmail: string) {
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

    async joinRoom(roomId: string, userId: string, userEmail: string, password = null) {
      try {
        const roomRef = ref(db, `rooms/${roomId}`)
        const snapshot = await get(roomRef)
        if (snapshot.exists()) {
          const room = snapshot.val()
          if (room.privacyType === 'private' && room.password !== password) 
            throw new Error('Incorrect password')

          await runTransaction(roomRef, (room: Room) => {                                                                
            if (room) {                             
              if (!room.capacity) return
              if (room.currentUsers >= room.capacity) throw new Error('Room is full');                                                                   
              if (!room.users) room.users = {};
              room.currentUsers += 1;                                                                              
              room.users[userId] = { name: userEmail, isHost: false };
            }                                                                                                      
            return room;                                                                                           
          })  
        } else {
          throw new Error('Room not found')
        }
      } catch (error) {
        console.error('Error joining room:', error)
        throw error
      }
    },

    async deleteRoom(roomId: string) {
      try {
        const roomRef = ref(db, `rooms/${roomId}`)
        await remove(roomRef)
      } catch (error) {
        console.error('Error deleting room:', error)
        throw error
      }
    },
    async leaveRoom(roomId: string, userId: string) {                                                                              
      try {                                                                                                        
        const roomRef = ref(db, `rooms/${roomId}`);                                                                
        const snapshot = await get(roomRef);                                                                       
        if (snapshot.exists()) {                                                                                                                                 
          await runTransaction(roomRef, (room: Room) => {                                                                
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
  }
})
async function runTransaction(ref: DatabaseReference, transactionUpdate: TransactionUpdate) {                                                        
  return firebaseRunTransaction(ref, (currentData) => {                                                        
    if (currentData === null) {                                                                                
      return currentData                                       
    }                                                                                                          
    return transactionUpdate(currentData);                                                                     
  })                                                                                           
} 