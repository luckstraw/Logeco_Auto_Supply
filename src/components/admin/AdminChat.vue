<template>
  <v-row class="ma-0 fill-height justify-space-around">
    <v-col cols="7" class="ma-0 pa-0">
      <v-card class="d-flex flex-column fill-height rounded-xl">
        <v-card-title class="text-center font-weight-bold">
          Admin Chat List
        </v-card-title>
        <v-list lines="two" class="chat-list pa-2 pl-4">
          <v-list-item
            v-for="chat in chatList"
            :key="chat.id"
            :active="selectedChat?.id === chat.id"
            @click="selectChat(chat)"
            :title="chat.name"
            rounded="xl"
            class="my-2"
          >
            <template v-slot:prepend>
              <v-avatar :image="chat.avatar" />
            </template>
            <template v-slot:subtitle>
              <div class="subtitle-container">
                <span
                  :style="{ color: getTextColor(chat) }"
                  class="subtitle-text"
                >
                  {{
                    chat.lastMessage.senderId === "admin"
                      ? `You: ${chat.lastMessage.text}`
                      : chat.lastMessage.text
                  }}
                </span>
                <span
                  :style="{ color: getTextColor(chat) }"
                  class="subtitle-time"
                >
                  {{
                    chat.lastMessage.timestamp
                      ? new Date(
                          chat.lastMessage.timestamp.seconds * 1000
                        ).toLocaleString()
                      : " "
                  }}
                </span>
              </div>
            </template>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
    <v-col cols="3" class="d-flex flex-column pa-0">
      <v-card class="rounded-xl mb-3" style="flex: 3">
        <h1>Current User Info here</h1>
      </v-card>
      <v-card class="rounded-xl d-flex flex-column pa-2" style="flex: 7">
        <v-card-title class="text-center font-weight-bold">
          Chat with {{ selectedChat?.name?.split(" ")[0] || "User" }}
        </v-card-title>
        <v-card-text class="chat-box" @scroll="handleScroll" ref="chatBox">
          <div
            v-for="message in messages"
            :key="message.timestamp"
            class="d-flex mb-3"
            :class="{ 'justify-end': message.senderId === 'admin' }"
          >
            <v-card
              :color="
                message.senderId === 'admin' ? color.secondary : 'grey-darken-3'
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
            class="custom-icon cursor-pointer mx-2"
            :style="{ color: color.secondary }"
            @click="sendMessage"
          >
            fa-solid fa-paper-plane
          </v-icon>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, ref, watch } from "vue";

const store = useStore();
const color = computed(() => store.getters["colors/getColor"]);

const newMessage = ref("");
const chatBox = ref(null);

const chatList = computed(() => store.getters["adminChat/chatList"]);
const selectedChat = computed(() => store.getters["adminChat/selectedChat"]);
const messages = computed(() =>
  selectedChat.value
    ? store.getters["adminChat/messages"](selectedChat.value.id)
    : []
);

const selectChat = (chat) => store.dispatch("adminChat/selectChat", chat);

const getTextColor = (chat) => {
  if (!chat.resolved) {
    return color.value.info;
  }
};

const scrollToBottom = () => {
  if (chatBox.value)
    chatBox.value.$el.scrollTop = chatBox.value.$el.scrollHeight;
};

const sendMessage = async () => {
  if (!newMessage.value.trim()) return;
  await store.dispatch("adminChat/sendMessage", {
    chatId: selectedChat.value.id,
    messageText: newMessage.value,
    senderId: "admin",
  });
  newMessage.value = "";
  setTimeout(scrollToBottom, 100);
};

const handleEnter = (event) => {
  if (event.shiftKey) return;
  event.preventDefault();
  sendMessage();
};

const handleScroll = async () => {
  if (chatBox.value.$el.scrollTop === 0) {
    const previousScrollHeight = chatBox.value.$el.scrollHeight;
    await store.dispatch("adminChat/loadMoreMessages", selectedChat.value.id);
    chatBox.value.$el.scrollTop =
      chatBox.value.$el.scrollHeight - previousScrollHeight;
  }
};

watch(selectedChat, async (newChat) => {
  if (newChat) {
    await store.dispatch("adminChat/fetchMessages", newChat.id);
    setTimeout(scrollToBottom, 100);
  }
});
</script>

<style scoped>
.chat-list {
  max-height: 78vh;
  overflow-y: auto;
}
.subtitle-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.subtitle-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex-grow: 1;
}
.subtitle-time {
  font-size: 0.8em;
  margin-left: 10px;
  flex-shrink: 0;
}
.custom-icon {
  transition: transform 0.2s ease-in-out;
}
.custom-icon:hover {
  transform: scale(1.1) rotate(15deg);
}
.chat-box {
  max-height: 60vh;
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
