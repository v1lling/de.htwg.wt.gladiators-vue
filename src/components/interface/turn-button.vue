<template>
    <v-btn 
        :class="{'disable-events': buttonDisabled}"
        :color="colorButton"
        type="button"
        class="btn btn-rounded turnbutton"
        @click="endTurn()"> 
        {{ buttonText }}
    </v-btn>
</template>

<script>
    import Vue from 'vue';
    export default Vue.component('turn-button', {
        computed: {
            buttonText() {
                if (this.$store.state.controller.playerOne 
                    && this.$store.state.controller.playerTwo) {

                    if (this.$store.state.myPlayerId) {
                        if(this.$store.state.controller.currentPlayer 
                            && this.$store.state.controller.currentPlayer.id == this.$store.state.myPlayerId ) {
                            return "End Turn";
                        } else {
                            return "Wait";
                        }
                    } else {
                        return "Spectating";
                    }
                } else {
                    return "Lobby";
                }
            },
            colorButton() {
                if (this.$store.state.myPlayerId
                    && this.$store.state.controller.currentPlayer
                    && this.$store.state.controller.currentPlayer.id == this.$store.state.myPlayerId ) {
                    return 'green';
                } else {
                    return '';
                }
            },
            buttonDisabled() {
                if (this.$store.state.myPlayerId
                    && this.$store.state.controller.currentPlayer
                    && this.$store.state.controller.currentPlayer.id == this.$store.state.myPlayerId ) {
                    return false;
                } else {
                    return true;
                }
            }
        },
        methods: {
            endTurn() {
                this.$store.dispatch("endTurn");
            }
        }
    });
</script>

<style scoped lang="scss">
    @keyframes animatedBackground {
        0% { background-position: 0 0;}
        100% { background-position: 1000% 1000%;}
    }
    .turnbutton.btn {
        border: 1px solid black;
        background-position: center;
        background-size: auto;
        background-image: url("/frontend/img/shield_transparent.png");
        background-repeat: unset;
        animation: animatedBackground 30s linear infinite;
        &:disabled {
            opacity: 1;
            cursor: default;
        }
        &.disable-events {
            pointer-events: none
        }
    }
</style>
