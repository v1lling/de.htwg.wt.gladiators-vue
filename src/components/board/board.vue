<template>
    <div class="board">
        <template v-for="(tileRow, y) in boardTiles">
            <BoardTile v-for="(tile, x) in tileRow" v-bind:key="x+'-'+y" v-bind:tileType="tile.tileType"
                v-bind:playerId="tile.tileType==='Base' ? (y==0 ? 1 : 2) : null"
                v-bind:coordinates="{x, y}"/>
        </template>

        <BoardHighlight mode="Attack" v-for="(highlight, i) in highlightedAttackTiles" v-bind:key="i" :coordinates="highlight"/>
        <BoardHighlight mode="Move" v-for="(highlight, i) in highlightedMoveTiles" v-bind:key="i" :coordinates="highlight"/>

        <Gladiator v-for="glad in gladiatorsPlayerOne" v-bind:key="glad" v-bind:gladiator="glad" :playerId=1></Gladiator>
        <Gladiator v-for="glad in gladiatorsPlayerTwo" v-bind:key="glad" v-bind:gladiator="glad" :playerId=2></Gladiator>
    </div>
</template>       


<script>
    import Vue from 'vue';
    
    import BoardHighlight from './board-highlight.vue';
    import BoardTile from './board-tile.vue';
    import Gladiator from './gladiator.vue';

    export default Vue.component('board-tile', {
        components: {
            BoardHighlight,
            BoardTile,
            Gladiator
        },
        computed: {
            boardTiles() {
                return this.$store.getters.boardTiles
            },
            gladiatorsPlayerOne() {
                return this.$store.state.controller.playerOne ? this.$store.state.controller.playerOne.gladiators : []
            },
            gladiatorsPlayerTwo() {
                return this.$store.state.controller.playerTwo ? this.$store.state.controller.playerTwo.gladiators : []
            },
            highlightedAttackTiles() {
                return this.$store.state.myHighlightedTiles ? this.$store.state.myHighlightedTiles.tilesAttack : []
            },
            highlightedMoveTiles() {
                return this.$store.state.myHighlightedTiles ? this.$store.state.myHighlightedTiles.tilesMove : []
            },
        }
    });
</script>

<style scoped lang="scss">
    .board {
        min-height: 70vh;
        border: 2px solid black;
        position: relative;
        display: grid;
        position: relative;
        grid-gap: 0;
        grid-template-columns: repeat(15, auto);
        grid-template-rows: repeat(15, auto);
        grid-auto-flow: row;
        gap: 1px;
        height: 100%;
        width: 100%;
    }
</style>


