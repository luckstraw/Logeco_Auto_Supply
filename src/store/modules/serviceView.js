/* eslint-disable */
const state = {
  firstRowCards: [
    {
      title: 'SUITYAN WA??',
      content: 'KYOUMO KAWAIIIII',
      backgroundImage: 'url(https://picsum.photos/5/6?image)',
      show: false,
    },
    {
      title: 'random bs',
      content: 'Crazy stuff.',
      backgroundImage: 'url(https://picsum.photos/9/6?image)',
      show: false,
    },
  ],
  secondRowCards: [
    {
      title: 'buff me up',
      content: 'magiging muscle man si cj.',
      backgroundImage: 'url(https://picsum.photos/8/6?image)',
      show: false,
    },
    {
      title: 'hesoyam',
      content: 'puno hp mo dito tska armor.',
      backgroundImage: 'url(https://picsum.photos/12/6?image)',
      show: false,
    },
    {
      title: 'aezakmi',
      content: 'di ko na alam di ka na ata mag kaka kaso dito.',
      backgroundImage: 'url(https://picsum.photos/10/4?image)',
      show: false,
    },
  ],
  thirdRowCards: [
    {
      title: 'ice cream yummy',
      content: 'ice cream good.',
      backgroundImage: 'url(https://picsum.photos/500/300?image)',
      show: false,
    },
    {
      title: 'super yaky',
      content: 'super iww wow.',
      backgroundImage: 'url(https://picsum.photos/10/6?image)',
      show: false,
    },
  ],
};

const mutations = {
  TOGGLE_SHOW(state, { row, index }) {
    state[row][index].show = !state[row][index].show;
  },
};

const actions = {
  toggleShow({ commit }, payload) {
    commit('TOGGLE_SHOW', payload);
  },
};

const getters = {
  getRowCards: (state) => (row) => state[row],
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
