<template>
  <v-container>  
   <!--     <player-input :playerId="openPlayerSlot"></player-input>-->
        <v-row>
            <v-col cols=12 lg=2>

 
                 <PlayerInfo v-bind:player="player2" :turn="turnPlayer == 2"/>
                  <TurnButton/>
                  <PlayerInfo v-bind:player="player1" :turn="turnPlayer == 1"/>
  
             
            </v-col>
            <v-col cols=12 lg=8>
              <Board/>
            </v-col>
            <v-col cols=12 lg=2>
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