import { db } from "@/firebaseConfig";
import {
  onSnapshot,
  updateDoc,
  doc,
  query,
  collection,
  orderBy,
  limit,
  startAfter,
  getDocs,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";

const state = {
  messages: [],
  lastVisibleMessage: null,
};

const getters = {
  messages: (state) => state.messages,
};

const mutations = {
  SET_MESSAGES(state, messages) {
    state.messages = messages;
  },
  ADD_MESSAGES(state, messages) {
    const newMessages = messages.filter(
      (msg) => !state.messages.some((m) => m.id === msg.id)
    );
    state.messages = [...newMessages, ...state.messages];
  },
  SET_LAST_VISIBLE_MESSAGE(state, message) {
    state.lastVisibleMessage = message;
  },
};

const actions = {
  handleError({ dispatch }, error) {
    dispatch("infoDialog/handleError", error, { root: true });
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
          commit("SET_MESSAGES", messages.reverse());
          commit(
            "SET_LAST_VISIBLE_MESSAGE",
            snapshot.docs[snapshot.docs.length - 1]
          );
        }
      );
    } catch (error) {
      dispatch("handleError", error);
    }
  },

  async loadMoreMessages({ commit, dispatch, state }, chatId) {
    try {
      const lastMessage = state.lastVisibleMessage;
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
        commit("ADD_MESSAGES", messages.reverse());
        commit(
          "SET_LAST_VISIBLE_MESSAGE",
          snapshot.docs[snapshot.docs.length - 1]
        );
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
        resolved: false,
      });
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
