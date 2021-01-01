<template>
  <v-container>  
    <PlayerInput v-if="openPlayerSlot && !myPlayerId" :playerId="openPlayerSlot"/>
    <v-row>
      <v-col cols=12 sm=2 xs=2>
        <v-row>
          <v-col cols=12 sm=12 xs=12>
            <PlayerInfo v-bind:player="player2" :turn="turnPlayer == 2"/>
          </v-col>
          <v-col cols=12 sm=12 xs=12>
            <TurnButton/>
          </v-col>
          <v-col cols=12 sm=12 xs=12>
            <PlayerInfo v-bind:player="player1" :turn="turnPlayer == 1"/>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols=12 sm=8 xs=8>
        <Board/>
      </v-col>
      <v-col cols=12 sm=2 xs=2>
        <GladiatorInfo v-bind:gladiator="hoveredGladiator"/>
        <GladiatorShop v-bind:gladiators="shopGladiators"/>
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
      dialog: true
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
      return this.$store.state.controller.playerOne
    },
    player2() {
      return this.$store.state.controller.playerTwo
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
    }
  }
}
</script>