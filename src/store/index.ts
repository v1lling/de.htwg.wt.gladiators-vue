import Vuex, { mapGetters } from 'vuex'
import Vue from 'vue'
import axios from 'axios'
import router from '../router'
import $ from 'jquery'
Vue.use(Vuex);

const USE_LOCAL_BACKEND = false;
const PROTOCOL = "https";

const SERVER_DOMAIN = "gladiators-game.herokuapp.com";
const SERVER = USE_LOCAL_BACKEND ? PROTOCOL + "://localhost:9000" : PROTOCOL + "://" + SERVER_DOMAIN; 

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
    type: "success",
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
  isLoggedIn: false
};

const websocket = new WebSocket("wss://"+ SERVER_DOMAIN + (USE_LOCAL_BACKEND? + ":9000" : "") + "/websocket");
const axiosConfig = {
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  crossdomain: true
};
const store = new Vuex.Store({
  state: initialState,
  actions: {
    showAlert(commit, alert) {
      store.commit('SET_ALERT', {show: true, type: alert.type, message: alert.message});
      setTimeout(() => {
        store.commit('SET_ALERT', {show: false, type: alert.type, message: alert.message});
      }, 5000);
    },
    getJson({commit}) {
        axios.get(SERVER + "/json", axiosConfig)
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
      axios.post(SERVER + "/gladiators/api/gladiatorSelect", {"x": coordinates.x, "y": coordinates.y})
      .then((resp) => {
        commit('SET_HIGHLIGHTEDTILES', resp.data[1])
      })
      .catch(err => {
        console.log("Something went wrong")
      })
    },
    signedIn({commit}, silent) {
      axios.get(SERVER + "/signedIn", axiosConfig)
      .then((resp) => {
        if (resp.data.includes("Good job bro")) {
          commit('SET_LOGGEDIN', true);
          if (!silent) {
            store.dispatch("showAlert", {type: "success", message: "Login Successful"});
            router.push("/Game");
          }
        } else {
          commit('SET_LOGGEDIN', false)
          if (!silent) {
            store.dispatch("showAlert", {type: "error", message: "Login Failed"});
          }
        }
      })
      .catch(err => {
        console.log("Something went wrong")
      })
    },
    login({commit}, user) {
      axios.post(SERVER + "/signIn", user, $.extend(axiosConfig, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }))
      .then(function (response) {
        store.dispatch("signedIn");
      })
      .catch(function (response) {
        console.log("Something went wrong");
      });
    },
    logout({commit}) {
      axios.get(SERVER + "/signOut", axiosConfig)
      .then((resp) => {
        store.dispatch("signedIn", true);
        router.push("/Login");
      })
      .catch(err => {
        console.log("Something went wrong");
      })
    },
    register({commit}, user) {
      axios.post(SERVER + "/signUp", user, $.extend(axiosConfig, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      ))
      .then(function () {
        router.push("/login");
        store.dispatch("showAlert", {type: "success", message: "Register Successful"});
      }.bind(this))
      .catch(function (response) {
        console.log("Something went wrong");
      });
    },
    googleLogin({commit}) {
      axios.get(SERVER + "/authenticate/google",
        $.extend(axiosConfig, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }))
      .then(function (response) {
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
    SET_LOGGEDIN(state, loggedIn) {
      state.isLoggedIn = loggedIn
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
      return state.isLoggedIn
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
      store.dispatch("showAlert", {type: "error", message: gameEvent.message});
  }
}

export default store;