<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { realTimeDb as db } from '@/firebase/firebaseconfig';
import { ref as dbRef, push, onChildAdded, off, serverTimestamp } from 'firebase/database';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();
const router = useRouter();

const currentUserUid = computed(() => authStore.getUid);
const currentUserName = computed(() => authStore.getDisplayName);

watch(currentUserUid, (uid) => {
  if (!uid) {
    router.push('/login');
  }
}); 

interface Message {
  id: string;
  text: string;
  sender: string;
  senderId: string;
  timestamp: number;
}

const messages = ref<Message[]>([]);
const newMessage = ref('');
const isVisible = ref(true);
const selectedMessageId = ref<string | null>(null);

const sendMessage = () => {
  if (!currentUserUid.value) return console.error('Cannot send message: User is not authenticated');
  if (!newMessage.value.trim()) return;
  if (newMessage.value.trim()) {
    push(dbRef(db, 'messages'), {
      text: newMessage.value,
      sender: currentUserName.value || "Anonymous",
      senderId: currentUserUid.value,
      timestamp: serverTimestamp(),
    })
    .catch((error) => {
      console.error('Error sending message:', error);
    });
    newMessage.value = '';
    console.log(currentUserName.value)
  }
};

const toggleVisibility = () => {
  isVisible.value = !isVisible.value;
};

const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

const showTimestamp = (messageId: string) => {
  selectedMessageId.value = selectedMessageId.value === messageId ? null : messageId;
};

onMounted(() => {
  const messagesRef = dbRef(db, 'messages');
  onChildAdded(messagesRef, (snapshot) => {
    const message = snapshot.val();
    messages.value.push({
      id: snapshot.key as string,
      text: message.text,
      sender: message.sender,
      senderId: message.senderId,
      timestamp: message.timestamp,
    });
  });
});

onUnmounted(() => {
  const messagesRef = dbRef(db, 'messages');
  off(messagesRef);
});
</script>

<template>
  <div class="chatbox-container">
    <button @click="toggleVisibility" class="toggle-button">
      {{ isVisible ? 'Hide Chat' : 'Show Chat' }}
    </button>
    <div v-if="isVisible" class="chatbox">
      <div class="messages">
        <div v-for="message in messages" :key="message.id" 
             :class="['message', message.senderId === currentUserUid ? 'sent' : 'received']"
             :title="formatTimestamp(message.timestamp)"
             @click="showTimestamp(message.id)">
          <div class="sender">{{ message.senderId === currentUserUid ? 'You' : message.sender }}</div>
          <div class="text">{{ message.text }}</div>
          <div v-if="selectedMessageId === message.id" class="timestamp">
            {{ formatTimestamp(message.timestamp) }}
          </div>
        </div>
      </div>
      <div class="input-area">
        <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type a message..." />
        <button @click="sendMessage">Send</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chatbox-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 300px;
}

.toggle-button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;                  
}

.chatbox {
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
}

.messages {
  height: 300px;
  overflow-y: auto;
  padding: 10px;
  background-color: #f9f9f9;
  color: black
}

.message {
  margin-bottom: 10px;
  max-width: 80%;
  clear: both;
  cursor: pointer;
  color: black;
}

.message .sender {
  font-size: 0.8em;
  margin-bottom: 2px;
  font-weight: bold;
}

.message .text {
  padding: 8px;
  border-radius: 12px;
}

.message .timestamp {
  font-size: 0.7em;
  margin-top: 2px;
  color: #888;
}

.message.sent {
  float: right;
}

.message.sent .sender,
.message.sent .timestamp {
  text-align: right;
}

.message.sent .text {
  background-color: #DCF8C6;
}

.message.received {
  float: left;
}

.message.received .text {
  background-color: #E6E6E6;
}

.input-area {
  display: flex;
  padding: 10px;
  background-color: #fff;
}

input {
  flex-grow: 1;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>