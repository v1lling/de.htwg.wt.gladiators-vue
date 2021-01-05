<template>
  <v-container>  
    <PlayerInput v-if="openPlayerSlot && !myPlayerId" :playerId="openPlayerSlot"/>
    <v-alert :value="alert.show"
      color="red"
      dismissible
      dense
      dark
      type="error"
      border="top"
      transition="fade">
      {{ alert.message }}
    </v-alert>
    <v-row>
      <v-col cols=12 sm=2 xs=2>
        <v-card height="100%"
              class="d-flex flex-column justify-space-between"
              flat color="rgb(255, 0, 0, 0)">
          <PlayerInfo v-bind:player="player2" :turn="turnPlayer == 2"/>
          <TurnButton/>
          <PlayerInfo v-bind:player="player1" :turn="turnPlayer == 1"/>
        </v-card>
      </v-col>
      <v-col cols=12 sm=8 xs=8>
        <Board/>
      </v-col>
      <v-col cols=12 sm=2 xs=2>
           <v-card height="100%"
              class="d-flex flex-column justify-space-between"
              flat color="rgb(255, 0, 0, 0)">

              <GladiatorInfo v-bind:gladiator="hoveredGladiator"/>
              <GladiatorShop v-bind:gladiators="shopGladiators"/>
           </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Board from '@/components/board/board.vue';
import GladiatorInfo from '@/components/interface/gladiator-info.vue';
import GladiatorShop from '@/components/interface/shop/shop.vue';
import PlayerInfo from '@/components/interface/player-info.vue';
import TurnButton from '@/components/interface/turn-button.vue';
import PlayerInput from '@/components/interface/player-input.vue';

export default {
  name: 'Game',
  data: function() {
    return {
      
    }
  },
  components: {
    Board,
    GladiatorInfo,
    GladiatorShop,
    PlayerInfo,
    PlayerInput,
    TurnButton
  },
  mounted() {
    this.$store.dispatch("getJson");
  },
  computed: {
    player1() {
      if (this.$store.state.controller.playerOne) {
        return this.$store.state.controller.playerOne
      } else {
        return {
          name: "-",
          credits: 100,
          health: 100
        }
      }
    },
    player2() {
      if (this.$store.state.controller.playerTwo) {
        return this.$store.state.controller.playerTwo
      } else {
        return {
          name: "-",
          credits: 100,
          health: 100
        }
      }
    },
    hoveredGladiator() {
      return this.$store.state.myHoveredGladiator
    },
    shopGladiators() {
      return this.$store.getters.shopGladiators
    },
    turnPlayer() {
      return this.$store.state.controller.currentPlayer ? this.$store.state.controller.currentPlayer.id : null;
    },
    openPlayerSlot() {
      if (this.$store.state.controller.gameState == "NamingPlayerOne") {
          return 1;
      } else if (this.$store.state.controller.gameState == "NamingPlayerTwo") {
          return 2;
      } else {    
          return null;
      }
    },
    myPlayerId() {
      return this.$store.state.myPlayerId
    },
    alert() {
      return this.$store.state.alert
    }
  }
}
</script>

<style scoped>
.v-alert {
  position:absolute;
  z-index: 99;
  top: 12px;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%)
}
.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .2s;
}
.fade-enter, .fade-leave-active {
  transition-duration: 2s;
  opacity: 0
}
</style>