<template>
    <div class="gladiator" 
        @click="clickGladiator()"
        @mouseenter="updateHoveredGladiator()"
        @mouseleave="resetHoveredGladiator()"
        :style="getGladiatorPosition">
        <div class="gladiator-image" :class="'glad' + gladiator.gladiatorType + ' gladPlayer' + playerId"/>
        <div class="healthbar-container">
            <div class="healthbar" :style="getHealthbarWidth"/>
        </div>
    </div>
</template>       


<script>
    import Vue from 'vue';
    import { selectedGladiatorMixin } from '@/mixins/selectedGladiatorMixin';
    import { perc2color } from '@/assets/libs/perc2color.js';
    export default Vue.component('gladiator', {
        mixins: [selectedGladiatorMixin],
        props: {
            gladiator: Object,
            playerId: Number
        },
        computed: {
            getGladiatorPosition: function() {
                console.log("getting glad pos");
                const leftPx = this.gladiator.position.x * (100 / 15),
                    topPx = this.gladiator.position.y * (100 / 15);
                return 'top: ' + topPx + '%; left: ' + leftPx + '%;';
            },
            getHealthbarWidth: function() {
                const perc = this.gladiator.healthPoints / this.gladiator.initialHealthPoints * 100;
                return 'width: ' + perc+'%; ' + 'background: ' + perc2color(perc);
            }
        },
        methods: {
            clickGladiator() {
                if (this.$store.getters.selectedGladiator.source == "Board") {
                    this.$store.dispatch("moveGladiator", this.gladiator.position);
                } else {
                    const sGlad = {
                        gladiator: this.gladiator,
                        source: "Board"
                    }
                    this.$store.commit('SET_SELECTEDGLADIATOR', sGlad);
                    this.$store.dispatch("hightlightTiles", this.gladiator.position);
                }
            }
        }
    });
</script>

<style scoped lang="scss">
.gladiator {
    transition: 1s;
    position: absolute;
    height: calc(100% / 15);
    width: calc(100% / 15);
    cursor: pointer;
    display: flex;
    flex-direction: column;
}
.gladiator-image {
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    height: 78%;
    &.gladTank {
        background-image: url("~@/assets/images/gladiators/shield.png"); 
    }
    &.gladKnight {
        background-image: url("~@/assets/images/gladiators/sword.png");
    }
    &.gladArcher {
        background-image: url("~@/assets/images/gladiators/bow.png"); 
    }
    &.gladPlayer1 {
        filter: invert(29%) sepia(94%) saturate(418%) hue-rotate(142deg) brightness(94%) contrast(88%);
    }
    &.gladPlayer2 {
        filter: invert(17%) sepia(92%) saturate(2638%) hue-rotate(12deg) brightness(98%) contrast(97%);
    }
    &.active {  
        animation: perspect 1s infinite linear 
    }
    &.attacked {
        animation: attacked 0.2s infinite ease-out;
    }
    &.shake {
        animation: shake 1s cubic-bezier(.36,.07,.19,.97) both;
    }
}
.healthbar-container {
    height: 18%;
    border-radius: 5px;
    border: 1px solid darkslategray;
    display: flex;
    width: 90%;
    align-self: center;
}
.healthbar {
    border-radius: 5px;
    background: green;
    height: 100%;
    transition: 1s ease-out;
    filter: brightness(0.7);    
}
</style>

