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

  async postLogin({ commit, dispatch, getters }, user) {
    commit("SET_USER", user);
    await dispatch("fetchUser", user.uid);
    await dispatch("adminChat/createChat", getters.getUser, { root: true });
    const { role } = getters.getUser || {};
    router.push(role === "admin" ? "/admin" : "/users");
    dispatch("hideLoginSignUpForm");
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

  async login({ dispatch }, { email, password }) {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      await dispatch("postLogin", user);
    } catch (error) {
      dispatch("handleError", error);
    }
  },

  async loginWithGoogle({ dispatch }) {
    try {
      const { user } = await signInWithPopup(auth, new GoogleAuthProvider());
      const userRef = doc(db, "Users", user.uid);

      if (!(await getDoc(userRef)).exists()) {
        await setDoc(userRef, {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          uid: user.uid,
          role: "user",
          createdAt: serverTimestamp(),
        });
      }
      await dispatch("postLogin", user);
    } catch (error) {
      dispatch("handleError", error);
    }
  },

  async signUp({ dispatch }, { email, password }) {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const randomId = Math.floor(Math.random() * 100) + 1;
      await setDoc(doc(db, "Users", user.uid), {
        email: user.email,
        displayName: user.email.split("@")[0],
        photoURL: `https://avatar.iran.liara.run/public/${randomId}`,
        uid: user.uid,
        role: "user",
        createdAt: serverTimestamp(),
      });

      await dispatch("postLogin", user);
    } catch (error) {
      dispatch("handleError", error);
    }
  },

  async signOut({ commit, dispatch }) {
    dispatch(
      "infoDialog/showDialog",
      {
        message: "Are you sure you want to log out?",
        type: "warning",
        buttons: [
          {
            text: "No",
            action: () => {
              return;
            },
          },
          {
            text: "Yes",
            action: async () => {
              try {
                await signOut(auth);
                commit("CLEAR_USER");
                localStorage.clear();
                router.push("/");
              } catch (error) {
                dispatch("handleError", error);
              }
            },
          },
        ],
      },
      { root: true }
    );
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
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
