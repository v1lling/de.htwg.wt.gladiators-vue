<template>
  <div class="v-container">
        
   <!--     <player-input :playerId="openPlayerSlot"></player-input>
        -->
        <div class="v-row row">

            <div class="v-col-xs-12 v-col-sm-12 v-col-lg-2">
              <PlayerInfo v-bind:player="player2" :turn="turnPlayer == 2"/>
              <TurnButton/>
              <PlayerInfo v-bind:player="player1" :turn="turnPlayer == 1"/>
            </div>

            <div class="v-col v-col-xs-12 v-col-sm-12 v-col-lg-8">
              <Board/>
            </div>

            <div class="v-col v-col-xs-12 v-col-sm-12 v-col-lg-2">
              <GladiatorInfo v-bind:gladiator="hoveredGladiator"/>
              <GladiatorShop v-bind:gladiators="shopGladiators"/>
            </div>
        </div>
    </div>
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
    hoveredGladiator() {
      return this.$store.state.myHoveredGladiator
    },
    shopGladiators() {
      return this.$store.getters.shopGladiators
    }
  }
}
</script>