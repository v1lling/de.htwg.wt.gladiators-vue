<template>
    <v-btn class="shop-item" 
        :class="'glad' + gladiator.gladiatorType"
        @mouseenter="updateHoveredGladiator()"
        @mouseleave="resetHoveredGladiator()"
        @click="updateSelectedGladiator">
        <span>
            ${{ gladiator && gladiator.cost || "-" }}
        </span>
        <div class="layer"/>
    </v-btn>
</template>

<script>
    import Vue from 'vue';
    import { selectedGladiatorMixin } from '@/mixins/selectedGladiatorMixin'
    export default Vue.component('shop-item', {
        mixins: [selectedGladiatorMixin],
        props: {
            gladiator: Object,
            shopIndex: Number
        },
        methods: {
            updateSelectedGladiator() {
                const sGlad = {
                    gladiator: this.gladiator,
                    source: "Shop",
                    shopIndex: this.shopIndex
                }
                this.$store.commit('SET_SELECTEDGLADIATOR', sGlad);
            }
        }
    });
</script>

<style scoped lang="scss">
    .shop-item {
        width: 100%;
        margin-top: 1rem;
        align-items: stretch;
        justify-content: flex-start;
        border: 1px solid black;
        &.gladKnight .layer{
            background-image: url("/img/gladiators/sword.png");
        }
        &.gladArcher .layer {
            background-image: url("/img/gladiators/bow.png"); 
        }
        &.gladTank .layer {
            background-image: url("/img/gladiators/shield.png"); 
        }
        &:hover {
            background-color: #8c6413;
            .layer {
                -webkit-filter: grayscale(1) invert(.8);
                filter: grayscale(1) invert(.8);
            }
        }
        .layer {
            background-position: center;
            background-repeat: no-repeat;
            background-size: contain;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    }
</style>