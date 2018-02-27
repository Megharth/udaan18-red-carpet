import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    finalists: []
  },
  mutations: {
    addFinalist: (state, payload) => {
      state.finalists.push(
        {
          category: payload.category,
          maleFinalist: payload.maleFinalist,
          femaleFinalist: payload.femaleFinalist
        }
      );
    },
    changeFinalist: (state, payload) => {
      state.finalists[payload.i] = {
        category: payload.category,
        maleFinalist: payload.maleFinalist,
        femaleFinalist: payload.femaleFinalist
      }
    }
  }
});
