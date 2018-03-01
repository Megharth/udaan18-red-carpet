import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import data from '../data.json';

export const store = new Vuex.Store({
  state: {
    user: {
      name: null,
      password: null,
      token: null
    },
    index: 0,
    votes: data.categories.map(function (c) {
      return {
        title: c.title,
        nominees: c.nominees instanceof Array ? null : {
          male: null,
          female: null
        }
      }
    }),
    categories: data.categories
  },
  mutations: {
    storeName: (state, payload) => {
      state.user.name = payload;
    },
    storePass: (state, payload) => {
      state.user.password = payload;
    },
    storeToken: (state, payload) => {
      state.user.token = payload;
    },
    incrementIndex: (state) => {
      state.index++;
    },
    decrementIndex: (state) => {
      state.index--;
    },
    addFinalist: (state, payload) => {
      if(payload.gender === "male")
        state.votes[state.index].nominees.male = payload.name;
      else if(payload.gender === "female")
        state.votes[state.index].nominees.female = payload.name;
      else
        state.votes[state.index].nominees = payload.name;
    }
  }
});
