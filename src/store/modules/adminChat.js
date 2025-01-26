import { db } from "@/firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
  orderBy,
  limit,
  serverTimestamp,
  updateDoc,
  startAfter,
  getDocs,
} from "firebase/firestore";

const state = {
  chatList: [],
  selectedChat: null,
  messages: {},
  lastVisibleMessage: {},
  selectedUser: {},
};

const getters = {
  chatList: (state) => state.chatList,
  selectedChat: (state) => state.selectedChat,
  messages: (state) => (chatId) => state.messages[chatId] || [],
  getSelectedUser: (state) => state.selectedUser,
};

const mutations = {
  SET_CHAT_LIST(state, chatList) {
    state.chatList = chatList;
  },
  SET_SELECTED_CHAT(state, chat) {
    state.selectedChat = chat;
  },
  SET_MESSAGES(state, { chatId, messages }) {
    state.messages[chatId] = messages;
  },
  ADD_MESSAGES(state, { chatId, messages }) {
    state.messages[chatId] = [
      ...messages.filter(
        (msg) => !(state.messages[chatId] || []).some((m) => m.id === msg.id)
      ),
      ...(state.messages[chatId] || []),
    ];
  },
  SET_LAST_VISIBLE_MESSAGE(state, { chatId, message }) {
    state.lastVisibleMessage[chatId] = message;
  },
  SET_SELECTED_USER(state, user) {
    state.selectedUser = user;
  },
};

const actions = {
  handleError({ dispatch }, error) {
    dispatch("infoDialog/handleError", error, { root: true });
  },
  selectChat({ commit, dispatch }, chat) {
    commit("SET_SELECTED_CHAT", chat);
    dispatch("updateChatResolved", chat.id);
  },

  async createChat({ dispatch }, user) {
    try {
      const chatRef = doc(db, "Chats", user.uid);
      const chatDoc = await getDoc(chatRef);

      if (!chatDoc.exists()) {
        const defaultMessage = {
          text: "Hello, How can I help you?",
          timestamp: serverTimestamp(),
          senderId: "admin",
        };

        const chatData = {
          name: user.displayName || user.email,
          avatar: user.photoURL,
          lastMessage: defaultMessage,
          resolved: false,
        };

        await setDoc(chatRef, chatData);
        await addDoc(collection(chatRef, "messages"), defaultMessage);
      }
    } catch (error) {
      dispatch("handleError", error);
    }
  },

  async updateChatResolved({ dispatch }, chatId) {
    try {
      await updateDoc(doc(db, "Chats", chatId), { resolved: true });
    } catch (error) {
      dispatch("handleError", error);
    }
  },

  async fetchSelectedUserInfo({ commit, dispatch }, chatId) {
    try {
      const userDoc = await getDoc(doc(db, "Users", chatId));
      if (userDoc.exists()) {
        commit("SET_SELECTED_USER", userDoc.data());
      }
    } catch (error) {
      dispatch("handleError", error);
    }
  },

  async fetchChatList({ commit, dispatch, state }) {
    try {
      return onSnapshot(
        query(
          collection(db, "Chats"),
          orderBy("lastMessage.timestamp", "desc"),
          limit(15)
        ),
        (snapshot) => {
          const chatList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          commit("SET_CHAT_LIST", chatList);
          if (chatList.length > 0 && !state.selectedChat) {
            commit("SET_SELECTED_CHAT", chatList[0]);
          }
        }
      );
    } catch (error) {
      dispatch("handleError", error);
    }
  },

  async fetchMessages({ commit, dispatch }, chatId) {
    try {
      return onSnapshot(
        query(
          collection(db, "Chats", chatId, "messages"),
          orderBy("timestamp", "desc"),
          limit(20)
        ),
        (snapshot) => {
          const messages = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          commit("SET_MESSAGES", { chatId, messages: messages.reverse() });
          commit("SET_LAST_VISIBLE_MESSAGE", {
            chatId,
            message: snapshot.docs.at(-1),
          });
        }
      );
    } catch (error) {
      dispatch("handleError", error);
    }
  },

  async loadMoreMessages({ commit, dispatch, state }, chatId) {
    try {
      const lastMessage = state.lastVisibleMessage[chatId];
      if (!lastMessage) return;

      const snapshot = await getDocs(
        query(
          collection(db, "Chats", chatId, "messages"),
          orderBy("timestamp", "desc"),
          startAfter(lastMessage),
          limit(20)
        )
      );

      if (!snapshot.empty) {
        const messages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        commit("ADD_MESSAGES", { chatId, messages: messages.reverse() });
        commit("SET_LAST_VISIBLE_MESSAGE", {
          chatId,
          message: snapshot.docs.at(-1),
        });
      }
    } catch (error) {
      dispatch("handleError", error);
    }
  },

  async sendMessage({ dispatch }, { chatId, messageText, senderId }) {
    try {
      const message = {
        text: messageText.trim(),
        timestamp: serverTimestamp(),
        senderId: senderId,
      };
      await addDoc(collection(db, "Chats", chatId, "messages"), message);
      await updateDoc(doc(db, "Chats", chatId), {
        lastMessage: message,
      });
      dispatch("updateChatResolved", chatId);
    } catch (error) {
      dispatch("handleError", error);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
