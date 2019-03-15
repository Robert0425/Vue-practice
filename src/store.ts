import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import games from './state';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // games: games,
    games: {},
    servertime: NaN,
    count: 0,
  },
  getters: {
    getGameCurrentInfo(state) {
      return (gameType: string) => {
        if (!state.games[gameType]) {
          return {}
        }
        return state.games[gameType].current;
      }
    },
  },
  mutations: {
    getlobby(state) {
      axios.defaults.withCredentials = true;
      axios
        .get('http://lt.vir999.net/pt/mem/ajax/bb500/lobby?data=%5B%22game_info%22%5D&timestamp=1552370214906')
        .then(response => {
          //ALL
          state.games = response.data.game.info;
          // 伺服器時間
          state.servertime = response.data.server_time;
        });
    },
    servertime(state) {
      state.servertime++;
    },
    increment(state) {
      state.count++;
    },
  },
  actions: {
    getlobby({commit}) {
      commit('getlobby');
      // setInterval(() => {commit('getlobby')}, 10000);
    },  
    servertime({commit}) {
      commit('servertime');
      // setInterval(() => {commit('servertime')}, 1000);
    },
    increment({commit}) {
      commit('increment');
    },
  },
});
