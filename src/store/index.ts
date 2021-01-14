import Vuex, { mapGetters } from 'vuex'
import Vue from 'vue'
import axios from 'axios'

Vue.use(Vuex);

const initialState = {
  controller: {
    board: {
      tiles: []
    },
    shop: {
      stock: []
    }
  },
  event: "",
  alert: {
    show: false,
    message: ""
  },
  myPlayerId: null,
  myHoveredGladiator: {},
  mySelectedGladiator: {
    source: "",
    gladiator: {
      position: {
        x: 0,
        y: 0
      }
    },
    shopIndex: 0
  },
  myHighlightedTiles: {},
  token: localStorage.getItem('token') || '',
  user: {},
  status: '',
  cookie: document.cookie
};

const websocket = new WebSocket("ws://localhost:9000/websocket");
const axiosConfig = {
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:8080'
  },
  crossdomain: true
};
const store = new Vuex.Store({
  state: initialState,
  actions: {
    getJson({commit}) {
        axios.get('http://localhost:9000/json', axiosConfig)
        .then((resp) => {
          commit('SET_CONTROLLER', resp.data[0])
        })
        .catch(err => {
          console.log("Something went wrong")
        })
    },
    endTurn() {
      websocket.send(JSON.stringify({"commandType": "EndTurn"}));
    },
    connectPlayer(commit, params) {
      const oPayload = {
        "commandType" : params.id == 1 ? "NamePlayerOne": "NamePlayerTwo",
        "name": params.name
      };
      websocket.send(JSON.stringify(oPayload));
    },
    buyGladiator(commit, coordinates) {
      const payload = {
        "commandType" : "BuyUnit",
        "number": this.state.mySelectedGladiator.shopIndex,
        "position": {"x" : coordinates.x, "y": coordinates.y}
      };
      websocket.send(JSON.stringify(payload));
    },
    moveGladiator(commit, coordinates) {
      const oPayload = {
        "commandType" : "Move",
        "from": {
          "x": this.state.mySelectedGladiator.gladiator.position.x,
          "y": this.state.mySelectedGladiator.gladiator.position.y
        },
        "to": {
          "x" : coordinates.x,
          "y": coordinates.y
        }
      };
      websocket.send(JSON.stringify(oPayload));
    },
    hightlightTiles({commit}, coordinates)  {
      axios.post('http://localhost:9000/gladiators/api/gladiatorSelect', {"x": coordinates.x, "y": coordinates.y})
      .then((resp) => {
        commit('SET_HIGHLIGHTEDTILES', resp.data[1])
      })
      .catch(err => {
        console.log("Something went wrong")
      })
    },
    login({commit}, user) {
      axios(
        jQuery.extend(axiosConfig, {
        method: 'post',
        url: 'http://localhost:9000/signIn',
        data: user,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }))
      .then(function (response) {
        commit('SET_COOKIE', document.cookie)
        if (store.getters.isLoggedIn) {
          window.location.replace("/");
        }
      })
      .catch(function (response) {
        console.log("Something went wrong");
      });
    },
    logout({commit}) {
      axios.get('http://localhost:9000/signOut', axiosConfig)
      .then((resp) => {
        if (!store.getters.isLoggedIn) {
          window.location.replace("/");
        }
        commit('SET_COOKIE', document.cookie)
      })
      .catch(err => {
        console.log("Something went wrong");
      })
    },
    googleLogin({commit}) {
      axios(
        jQuery.extend(axiosConfig, {
        method: 'get',
        mode: 'navigate',
        url: 'http://localhost:9000/authenticate/google',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }))
      .then(function (response) {
        commit('SET_COOKIE', document.cookie)
        if (store.getters.isLoggedIn) {
          window.location.replace("/");
        }
      })
      .catch(function (response) {
        console.log("Something went wrong");
      });
    }
  },
  mutations: {
    SET_CONTROLLER(state, controller) {
      state.controller = controller
    },
    SET_EVENT(state, event) {
      state.event = event
    },
    SET_PLAYERID(state, playerId) {
      state.myPlayerId = playerId
    },
    SET_HOVEREDGLADIATOR(state, gladiator) {
      state.myHoveredGladiator = gladiator;
    },
    SET_SELECTEDGLADIATOR(state, selectedGladiator) {
      state.mySelectedGladiator = selectedGladiator
    },
    SET_HIGHLIGHTEDTILES(state, highlightesTiles) {
      state.myHighlightedTiles = highlightesTiles
    },
    SET_ALERT(state, alert) {
      state.alert = alert
    },
    SET_COOKIE(state, cookie) {
      state.cookie = cookie
    }
  },
  getters: {
    boardTiles: state => {
      return state.controller.board ? state.controller.board.tiles : [];
    },
    selectedGladiator: state => {
      return state.mySelectedGladiator
    },
    shopGladiators: state => {
      return state.controller.shop ? state.controller.shop.stock : []
    },
    isLoggedIn: state => {
      const nameEQ = "authenticator=";
      const ca = state.cookie.split(';');
      for(let i=0;i < ca.length;i++) {
          let c = ca[i];
          while (c.charAt(0)==' ') c = c.substring(1,c.length);
          if (c.indexOf(nameEQ) == 0) return true;
      }
      return false;
    }
  }
});

websocket.onopen = function() {
  console.log("Trying to connect to Server");
}
websocket.onclose = function () {
  console.log('Connection Closed!');
};
websocket.onerror = function (error) {
  console.log('Error Occured: ' + error);
  
};
websocket.onmessage = function (e) {
  const response = JSON.parse(e.data),
      gameController = response[0],
      gameEvent = response[1];
  store.commit('SET_CONTROLLER', gameController);
  store.commit('SET_EVENT', gameEvent);
  store.commit('SET_HIGHLIGHTEDTILES', {});
  store.commit('SET_SELECTEDGLADIATOR', {});
  switch(gameEvent.eventType) {
    case "Connected":
      store.commit('SET_PLAYERID', gameEvent.player);
      console.log("Connected to the game");
      break;
    case "ErrorMessage":
      store.commit('SET_ALERT', {show: true, message: gameEvent.message});
      setTimeout(() => {
        store.commit('SET_ALERT', {show: false, message: gameEvent.message});
      }, 5000);
  }
}

export default store;