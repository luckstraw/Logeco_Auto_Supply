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
  categories: {},
  items: {},
};

const getters = {
  getCategories: (state) =>
    Object.values(state.categories).sort((a, b) =>
      a.name.localeCompare(b.name)
    ),

  getCategoryById: (state) => (id) => state.categories[id],

  getItemsByCategory: (state) => (categoryId) =>
    (state.items[categoryId] || []).sort((a, b) =>
      a.name.localeCompare(b.name)
    ),

  getAllItems: (state) =>
    Object.values(state.items)
      .flat()
      .sort((a, b) => a.name.localeCompare(b.name)),
};

const mutations = {
  SET_CATEGORIES(state, categories) {
    state.categories = categories;
  },
  ADD_CATEGORY(state, category) {
    state.categories[category.id] = category;
  },
  DELETE_CATEGORY(state, categoryId) {
    delete state.categories[categoryId];
    delete state.items[categoryId];
  },
  SET_ITEMS(state, { categoryId, items }) {
    state.items[categoryId] = items;
  },
  ADD_ITEM(state, { categoryId, item }) {
    if (!state.items[categoryId]) {
      state.items[categoryId] = [];
    }
    state.items[categoryId].push(item);
  },
  DELETE_ITEM(state, { categoryId, itemId }) {
    if (state.items[categoryId]) {
      state.items[categoryId] = state.items[categoryId].filter(
        (item) => item.id !== itemId
      );
    }
  },
};

const actions = {
  handleError({ dispatch }, error) {
    dispatch("infoDialog/handleError", error, { root: true });
  },

  async fetchProductsData({ commit, dispatch }) {
    try {
      const categorySnapshot = await getDocs(
        query(collection(db, "Products"), orderBy("createdAt"))
      );

      const categories = {};
      const items = {};

      await Promise.all(
        categorySnapshot.docs.map(async (categoryDoc) => {
          const categoryId = categoryDoc.id;

          categories[categoryId] = {
            id: categoryId,
            ...categoryDoc.data(),
          };

          const itemsSnapshot = await getDocs(
            query(
              collection(db, "Products", categoryId, "items"),
              orderBy("createdAt")
            )
          );

          items[categoryId] = itemsSnapshot.docs.map((itemDoc) => ({
            id: itemDoc.id,
            categoryId,
            ...itemDoc.data(),
          }));
        })
      );

      commit("SET_CATEGORIES", categories);

      Object.entries(items).forEach(([categoryId, categoryItems]) => {
        commit("SET_ITEMS", { categoryId, items: categoryItems });
      });
    } catch (error) {
      dispatch("handleError", error);
    }
  },

  async addCategory({ commit, dispatch }, categoryData) {
    try {
      if (!categoryData.name || categoryData.name.trim() === "") {
        throw new Error("Name is required");
      }

      const docRef = await addDoc(collection(db, "Products"), {
        name: categoryData.name,
        description: categoryData.description,
        altURL: categoryData.altURL,
        image: categoryData.image || categoryData.altURL,
        createdAt: serverTimestamp(),
      });

      const newCategory = {
        id: docRef.id,
        ...categoryData,
        createdAt: new Date(),
      };

      commit("ADD_CATEGORY", newCategory);
      return true;
    } catch (error) {
      dispatch("handleError", error);
    }
  },

  async deleteCategory({ commit, dispatch }, category) {
    const showDialog = {
      message: `Are you sure you want to delete the "${category.name}" category? All items in this category will also be deleted.`,
      type: "warning",
      buttons: [
        {
          text: "Cancel",
          action: () => false,
        },
        {
          text: "Delete",
          action: async () => {
            try {
              const categoryRef = doc(db, "Products", category.id);
              const itemsCollectionRef = collection(categoryRef, "items");
              const itemsSnapshot = await getDocs(itemsCollectionRef);
              await Promise.all(
                itemsSnapshot.docs.map((doc) => deleteDoc(doc.ref))
              );
              await deleteDoc(categoryRef);
              commit("DELETE_CATEGORY", category.id);
            } catch (error) {
              dispatch("handleError", error);
            }
          },
        },
      ],
    };
    dispatch("infoDialog/showDialog", showDialog, { root: true });
  },

  async addItem({ commit, dispatch }, { categoryId, itemData }) {
    try {
      if (!itemData.name || itemData.name.trim() === "") {
        throw new Error("Name is required");
      }

      const itemRef = await addDoc(
        collection(db, "Products", categoryId, "items"),
        {
          name: itemData.name,
          priceRange: itemData.priceRange,
          description: itemData.description,
          altURL: itemData.altURL,
          image: itemData.image || itemData.altURL,
          createdAt: serverTimestamp(),
        }
      );

      const newItem = {
        id: itemRef.id,
        ...itemData,
        createdAt: new Date(),
      };

      commit("ADD_ITEM", { categoryId, item: newItem });
      return true;
    } catch (error) {
      dispatch("handleError", error);
    }
  },

  async deleteItem({ commit, dispatch }, { categoryId, itemId }) {
    try {
      await deleteDoc(doc(db, "Products", categoryId, "items", itemId));
      commit("DELETE_ITEM", { categoryId, itemId });
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
