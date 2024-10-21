import { defineStore } from 'pinia'
import {realTimeDb as db } from '../firebase/firebaseconfig'
import { ref, set, get, push, child, update, onValue, remove } from 'firebase/database'

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
          if (room.privacyType === 'private' && room.password !== password) {
            throw new Error('Incorrect password')
          }
          if (room.currentUsers >= room.capacity) {
            throw new Error('Room is full')
          }
          const updates = {
            [`rooms/${roomId}/users/${userId}`]: { name: userEmail },
            [`rooms/${roomId}/currentUsers`]: room.currentUsers + 1
          }
          await update(ref(db), updates)
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
        const roomRef = ref(db, `rooms/${roomId}`)
        const snapshot = await get(roomRef)
        if (snapshot.exists()) {
          const room = snapshot.val()
          const updates = {
            [`rooms/${roomId}/currentUsers`]: Math.max(0, room.currentUsers - 1),
            [`rooms/${roomId}/users/${userId}`]: null
          }
          await update(ref(db), updates)
        }
      } catch (error) {
        console.error('Error leaving room:', error)
        throw error
      }
    }
  }
})


// import { defineStore } from 'pinia'
// import { ref } from 'vue'
// import { realTimeDb as db } from '../firebase/firebaseconfig'
// import { ref as dbRef, push, set, get, update, onValue } from 'firebase/database'

// export const useRoomStore = defineStore('room', () => {
//   const rooms = ref([])

//   const createRoom = async (roomData) => {
//     try {
//       const newRoomRef = push(dbRef(db, 'rooms'))
//       const roomWithUsers = {
//         ...roomData,
//         currentUsers: 0
//       }
//       await set(newRoomRef, roomWithUsers)
//       return newRoomRef.key
//     } catch (error) {
//       console.error('Error creating room:', error)
//       throw error
//     }
//   }

//   const fetchRooms = async () => {
//     try {
//       const roomsRef = dbRef(db, 'rooms')
//       onValue(roomsRef, (snapshot) => {
//         if (snapshot.exists()) {
//           rooms.value = Object.entries(snapshot.val()).map(([id, data]) => ({ id, ...data }))
//         } else {
//           rooms.value = []
//         }
//       })
//     } catch (error) {
//       console.error('Error fetching rooms:', error)
//       throw error
//     }
//   }

//   const joinRoom = async (roomId, password) => {
//     try {
//       const roomRef = dbRef(db, `rooms/${roomId}`)
//       const snapshot = await get(roomRef)
//       if (snapshot.exists()) {
//         const roomData = snapshot.val()
//         if (roomData.privacy === 'private' && roomData.password !== password) {
//           throw new Error('Incorrect password')
//         }
//         if (roomData.currentUsers >= roomData.maxCapacity) {
//           throw new Error('Room is full')
//         }
//         await update(roomRef, {
//           currentUsers: roomData.currentUsers + 1
//         })
//         return roomData
//       } else {
//         throw new Error('Room not found')
//       }
//     } catch (error) {
//       console.error('Error joining room:', error)
//       throw error
//     }
//   }

//   const leaveRoom = async (roomId) => {
//     try {
//       const roomRef = dbRef(db, `rooms/${roomId}`)
//       const snapshot = await get(roomRef)
//       if (snapshot.exists()) {
//         const roomData = snapshot.val()
//         await update(roomRef, {
//           currentUsers: Math.max(0, roomData.currentUsers - 1)
//         })
//       }
//     } catch (error) {
//       console.error('Error leaving room:', error)
//       throw error
//     }
//   }

//   return { rooms, createRoom, fetchRooms, joinRoom, leaveRoom }
// })