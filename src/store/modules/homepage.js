const state = {
  slides: [
    {
      title: "Genuine Parts",
      description:
        "Our genuine Mitsubishi parts are made to fit just right, giving you reliable performance and lasting quality. Each part is designed to keep your vehicle running smoothly, just like it should.",
      image: "/img/background/CarouselProducts.jpg",
      path: "/products",
      buttonName: "Shop Collection",
    },
    {
      title: "Services",
      description:
        "Our expert team is here to help you find the right Mitsubishi parts, answer any questions, and ensure you get exactly what you need. Count on us for friendly, knowledgeable service every step of the way.",
      image: "/img/background/CarouselServices.jpg",
      path: "/services",
      buttonName: "Connect with Us",
    },
  ],

  location: {
    title: "Our Location",
    description:
      "Our shop is located here in GMA, Cavite. Stop by to check out our products and get the help you need. Our friendly staff is here to answer any questions and help you find the right parts for your vehicle.",
    googleMapLink:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d241.63554051490178!2d121.01101066109747!3d14.30163187433078!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d642046c4d27%3A0xbbbc14706ebb44d7!2sLogeco%20Auto%20Supply!5e0!3m2!1sen!2sph!4v1731774980364!5m2!1sen!2sph",
  },
};

const getters = {
  getSlides: (state) => state.slides,
  getLocation: (state) => state.location,
};

const mutations = {};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
