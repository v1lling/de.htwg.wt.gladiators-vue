<template>
  <v-container>  
   <!--     <player-input :playerId="openPlayerSlot"></player-input>-->
    <v-row>
      <v-col cols=2>
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
      <v-col cols=8>
        <Board/>
      </v-col>
      <v-col cols=2>
        <v-row>
          <v-col cols=12 sm=6 xs=6>
            <GladiatorInfo v-bind:gladiator="hoveredGladiator"/>
          </v-col>
          <v-col cols=12 sm=6 xs=6>
            <GladiatorShop v-bind:gladiator="hoveredGladiator"/>
          </v-col>
        </v-row>
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

export default {
  name: 'Game',
  components: {
    Board,
    GladiatorInfo,
    GladiatorShop,
    PlayerInfo,
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
    }
  }
}
</script>