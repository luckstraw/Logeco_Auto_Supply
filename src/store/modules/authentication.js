import { auth, db } from "@/firebaseConfig";
import router from "@/router";
import { serverTimestamp, doc, setDoc, getDoc } from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";

const state = {
  user: null,
};

const getters = {
  getUser: (state) => state.user,
};

const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
  CLEAR_USER(state) {
    state.user = null;
  },
};

const actions = {
  async fetchUser({ commit }, userUID) {
    const userDocRef = doc(db, "Users", userUID);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      commit("SET_USER", userDoc.data());
    }
  },

  async login({ commit, dispatch, getters }, { email, password }) {
    const { user } = await signInWithEmailAndPassword(auth, email, password);

    commit("SET_USER", user);
    await dispatch("fetchUser", user.uid);

    const { role } = getters.getUser;
    router.push(role === "admin" ? "/admin" : "/users");
  },

  async loginWithGoogle({ commit, dispatch, getters }) {
    const { user } = await signInWithPopup(auth, new GoogleAuthProvider());

    const userRef = doc(db, "Users", user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      await setDoc(userRef, {
        email: user.email,
        displayName: user.displayName || "",
        photoURL: user.photoURL || "",
        uid: user.uid,
        role: "user",
        createdAt: serverTimestamp(),
      });
    }

    commit("SET_USER", user);
    await dispatch("fetchUser", user.uid);

    const { role } = getters.getUser;
    router.push(role === "admin" ? "/admin" : "/users");
  },

  async signUp({ commit }, { email, password }) {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await setDoc(doc(db, "Users", user.uid), {
      email: user.email,
      displayName: user.displayName || "",
      photoURL: user.photoURL || "",
      uid: user.uid,
      role: "user",
      createdAt: serverTimestamp(),
    });

    commit("SET_USER", user);
    router.push("/users");
  },

  async signOut({ commit }) {
    await signOut(auth);
    commit("CLEAR_USER");
    router.push("/");
  },

  async forgotPassword(_, { email }) {
    await sendPasswordResetEmail(auth, email);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
