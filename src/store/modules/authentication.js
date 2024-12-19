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
  handleError({ dispatch }, error) {
    dispatch("infoDialog/handleError", error, { root: true });
  },

  hideLoginSignUpForm({ dispatch }) {
    dispatch("loginAndSignUp/hideLoginSignUpForm", null, { root: true });
  },

  async fetchUser({ commit, dispatch }, userUID) {
    try {
      const userDoc = await getDoc(doc(db, "Users", userUID));
      if (userDoc.exists()) {
        commit("SET_USER", userDoc.data());
      }
    } catch (error) {
      dispatch("handleError", error);
    }
  },

  async login({ commit, dispatch }, { email, password }) {
    await actions.handleAuthFlow(
      async () => {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        return user;
      },
      { commit, dispatch }
    );
  },

  async loginWithGoogle({ commit, dispatch }) {
    await actions.handleAuthFlow(
      async () => {
        const { user } = await signInWithPopup(auth, new GoogleAuthProvider());
        const userRef = doc(db, "Users", user.uid);

        if (!(await getDoc(userRef)).exists()) {
          await setDoc(userRef, {
            email: user.email,
            displayName: user.displayName || "",
            photoURL: user.photoURL || "",
            uid: user.uid,
            role: "user",
            createdAt: serverTimestamp(),
          });
        }

        return user;
      },
      { commit, dispatch }
    );
  },

  async signUp({ commit, dispatch }, { email, password }) {
    await actions.handleAuthFlow(
      async () => {
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

        return user;
      },
      { commit, dispatch }
    );
  },

  async signOut({ commit, dispatch }) {
    try {
      await signOut(auth);
      commit("CLEAR_USER");
      router.push("/");
    } catch (error) {
      dispatch("handleError", error);
    }
  },

  async forgotPassword({ dispatch }, { email }) {
    if (!email.trim()) {
      dispatch(
        "infoDialog/showDialog",
        {
          title: "Missing email",
          message:
            "Please enter your email address in the login form. We will use that to send the reset password.",
          type: "warning",
        },
        { root: true }
      );
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      dispatch(
        "infoDialog/showDialog",
        {
          title: "Email sent successfully",
          message: `If an account with ${email} exists, you will receive a password reset email shortly. Please check your inbox.`,
          type: "success",
        },
        { root: true }
      );
    } catch (error) {
      dispatch("handleError", error);
    }
  },

  async handleAuthFlow(authCallback, { commit, dispatch }) {
    try {
      const user = await authCallback();
      commit("SET_USER", user);
      await dispatch("fetchUser", user.uid);

      const role = user.role || "user"; // Default role
      router.push(role === "admin" ? "/admin" : "/users");

      dispatch("hideLoginSignUpForm");
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
