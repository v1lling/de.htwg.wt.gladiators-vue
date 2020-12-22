<template>
    <div class="gladiator-shop" >
        <ShopItem v-for="(gladiator, index) in gladiators" v-bind:key=index v-bind:gladiator="gladiator" :shopIndex="index + 1"/>
    </div>
</template>

<script>
    import Vue from 'vue';
    import ShopItem from './shop-item.vue';
    export default Vue.component('shop', {
        components: {
            ShopItem
        },
        props: {
            gladiators: Array,
        }
    });
</script>

<style scoped lang="scss">
    .gladiator-shop {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>