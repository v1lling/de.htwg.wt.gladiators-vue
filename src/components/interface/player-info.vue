<template>
    <div>
        Player {{ player && player.id}}
        <div class="playerinfo" :class="getClass">
            <div class="playerinfo-row">
                <div>Name:</div>
                <div>
                    {{ player && player.name || "-" }}
                </div>
            </div>
            <div class="playerinfo-row">
                <div>Base:</div>
                <div>
                    <animated-number
                        :value=player.health
                        :duration="300"
                        :round="1"/>
                </div>
            </div>
            <div class="playerinfo-row">
                <div>Credits:</div>
                <div>
                    <animated-number
                        :value=player.credits
                        :duration="300"
                        :round="1"/>
                </div>
            </div> 
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import AnimatedNumber from "animated-number-vue";

    export default Vue.component('player-info', {
        components: {
            AnimatedNumber
        },
        props: {
            player: Object,
            turn: Boolean
        },
        computed: {
            getClass() {
                if (this.turn) {
                    return 'playerTurn player' + this.player.id;
                } else {
                    return '';
                }
            }
        }
    });
</script>

<style scoped lang="scss">
    @keyframes pulse {
        0% {transform: scale(1, 1);} 
        50% {transform: scale(1.05, 1.05);}
        100% {transform: scale(1, 1);}
    }
    .playerinfo {
        border: 1px solid black;
        border-radius: 5px;
        overflow: hidden;
        width: 100%;
        background-color: ivory;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
        position: relative;
        display: flex;
        flex-direction: column;
        padding: 1rem;
        .playerinfo-row {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }
        &.playerTurn {
            animation: pulse 1s linear infinite;
            &.player1 {
                -webkit-box-shadow:inset 0px 0px 0px 5px#006b7b;
                -moz-box-shadow:inset 0px 0px 0px 5px #006b7b;
                box-shadow:inset 0px 0px 0px 5px #006b7b;
            }
            &.player2 {
                -webkit-box-shadow:inset 0px 0px 0px 5px #be5701;
                -moz-box-shadow:inset 0px 0px 0px 5px#be5701;
                box-shadow:inset 0px 0px 0px 5px #be5701;
            }
        }
        &:not(:last-child) {
            margin-bottom: 1rem;
        }
    }
</style>
