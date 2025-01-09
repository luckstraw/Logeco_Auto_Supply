<template>
  <v-card class="rounded-xl d-flex flex-column pa-2" style="flex: 7">
    <v-card-title class="text-center font-weight-bold"
      >Chat with Admin</v-card-title
    >
    <v-card-text class="chat-box" @scroll="handleScroll" ref="chatBox">
      <div
        v-for="message in messages"
        :key="message.timestamp"
        class="d-flex mb-3"
        :class="{ 'justify-end': message.senderId !== 'admin' }"
      >
        <v-card
          :color="
            message.senderId === 'admin' ? 'grey-darken-3' : color.secondary
          "
          class="message-card"
        >
          <v-card-text
            class="text-left pa-2 px-3"
            style="white-space: pre-wrap"
          >
            {{ message.text }}
          </v-card-text>
        </v-card>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-card
        class="w-100 rounded-xl"
        :style="{ borderColor: color.secondary, borderWidth: '1px' }"
        flat
      >
        <v-textarea
          placeholder="Message"
          v-model="newMessage"
          variant="solo-filled"
          rows="1"
          max-rows="3"
          auto-grow
          hide-details
          density="compact"
          @keydown.enter="handleEnter"
        />
      </v-card>
      <v-icon
        class="custom-icon cursor-pointer mr-2"
        :style="{ color: color.secondary }"
        @click="sendMessage"
      >
        fa-solid fa-paper-plane
      </v-icon>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, onMounted, ref, watch } from "vue";

const store = useStore();
const user = computed(() => store.getters["authentication/getUser"]);
const color = computed(() => store.getters["colors/getColor"]);
const messages = computed(() => store.getters["userChat/messages"]);
const chatBox = ref(null);
const newMessage = ref("");
const isLoadingMore = ref(false);

const scrollToBottom = () => {
  if (chatBox.value?.$el)
    chatBox.value.$el.scrollTop = chatBox.value.$el.scrollHeight;
};

const sendMessage = async () => {
  if (!newMessage.value.trim()) return;
  await store.dispatch("userChat/sendMessage", {
    chatId: user.value.uid,
    messageText: newMessage.value,
    senderId: "user",
  });
  newMessage.value = "";
  scrollToBottom();
};

const handleEnter = (event) => {
  if (event.shiftKey) return;
  event.preventDefault();
  sendMessage();
};

const handleScroll = async () => {
  if (chatBox.value.$el.scrollTop === 0) {
    const previousScrollHeight = chatBox.value.$el.scrollHeight;
    isLoadingMore.value = true;
    await store.dispatch("userChat/loadMoreMessages", user.value.uid);
    chatBox.value.$el.scrollTop =
      chatBox.value.$el.scrollHeight - previousScrollHeight;
    isLoadingMore.value = false;
  }
};

onMounted(() => {
  store.dispatch("userChat/fetchMessages", user.value.uid);
  setTimeout(scrollToBottom, 100);
});

watch(messages, () => {
  if (!isLoadingMore.value) {
    setTimeout(scrollToBottom, 100);
  }
});
</script>

<style scoped>
.custom-icon {
  transition: transform 0.2s ease-in-out;
}
.custom-icon:hover {
  transform: scale(1.1) rotate(15deg);
}
.chat-box {
  max-height: 45vh;
  height: 100%;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
}
.message-card {
  max-width: 70%;
  word-wrap: break-word;
  overflow-wrap: break-word;
  border-radius: 16px;
}
</style>
