const state = {
  contactInfo: {
    phone: "+63 998 741 4569",
    email: "logecoautosupply@gmail.com",
  },
  socialMedia: [
    {
      name: "Facebook",
      icon: "fa-brands fa-facebook-f fa-sm",
      url: "https://www.facebook.com/logecoautosupply/",
    },
  ],
  location: {
    address: "Blk 2 Lot 10, Poblacion 4",
    city: "General Mariano Alvarez, Cavite 4117",
  },
  operatingHours: [
    "Mon - Fri: 8:00 AM - 6:00 PM",
    "Sat: 9:00 AM - 5:00 PM",
    "Closed on Sundays",
  ],
  disclaimer: "For in-store purchases only. No online transactions available.",
};

const getters = {
  getContactInfo: (state) => state.contactInfo,
  getSocialMedia: (state) => state.socialMedia,
  getLocation: (state) => state.location,
  getOperatingHours: (state) => state.operatingHours,
  getDisclaimer: (state) => state.disclaimer,
};

export default {
  namespaced: true,
  state,
  getters,
};
