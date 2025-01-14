/* eslint-disable */
import { db } from "@/firebaseConfig";
import {
  doc,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";

const state = {
  services: {},
};

const getters = {
  getServices: (state) => Object.values(state.services),
  getServiceById: (state) => (id) => state.services[id],
};

const mutations = {
  SET_SERVICES(state, services) {
    state.services = services;
  },
  ADD_SERVICE(state, service) {
    state.services[service.id] = service;
  },
  DELETE_SERVICE(state, serviceId) {
    delete state.services[serviceId];
  },
};

const actions = {
  handleError({ dispatch }, error) {
    dispatch("infoDialog/handleError", error, { root: true });
  },

  async fetchServicesData({ commit, dispatch }) {
    try {
      const servicesSnapshot = await getDocs(
        query(collection(db, "Services"), orderBy("createdAt"))
      );

      const services = {};
      servicesSnapshot.docs.forEach((doc) => {
        services[doc.id] = {
          id: doc.id,
          ...doc.data(),
        };
      });

      commit("SET_SERVICES", services);
    } catch (error) {
      dispatch("handleError", error);
    }
  },

  async addService({ commit, dispatch }, serviceData) {
    try {
      if (!serviceData.name || serviceData.name.trim() === "") {
        throw new Error("Name is required");
      }

      const docRef = await addDoc(collection(db, "Services"), {
        name: serviceData.name,
        priceRange: serviceData.priceRange,
        description: serviceData.description,
        altURL: serviceData.altURL,
        image: serviceData.image || serviceData.altURL,
        createdAt: serverTimestamp(),
      });

      const newService = {
        id: docRef.id,
        ...serviceData,
        createdAt: new Date(),
      };

      commit("ADD_SERVICE", newService);
      return true;
    } catch (error) {
      dispatch("handleError", error);
    }
  },

  async deleteService({ commit, dispatch }, service) {
    try {
      await deleteDoc(doc(db, "Services", service.id));
      commit("DELETE_SERVICE", service.id);
      return true;
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
