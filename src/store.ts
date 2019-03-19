import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
// import games from './state';

Vue.use(Vuex);

enum games {
  
}

export default new Vuex.Store({
  state: {
    games: {},
    servertime: NaN,
    count: 0,
    ret: {},
  },
  getters: {
    getColor(timeleft: any) {
      if (timeleft > 10)
      {
        return 'green';
      }
      else if (timeleft <= 10 && timeleft > 0)
      {
        return 'red';
      }
      else
      {
        return 'gray';
      }
    },
    getGameCurrentInfo(state) {
      return (gameTypes: string) => {
        if (!state.games[gameTypes]) {
          return {}
        }
        return state.games[gameTypes].current;
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
    getOdds(state) {
      axios
        .get('http://lt.vir999.net/pt/provider/mem/source/filter.json?game_type=LDRS&data=%5B%22odds%22%2C%22disable_odds%22%5D&timestamp=1552642864127')
        .then(response => {
          //Ret
          state.ret = response.data.ret;
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
    getOdds({commit}) {
      commit('getOdds');
    },
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
