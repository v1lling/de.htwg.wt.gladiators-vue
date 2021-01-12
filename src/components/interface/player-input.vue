<template>
    <modal adaptive name="my-first-modal">
        <div class="ma-12">
            Play as Player {{playerId}}
            <v-text-field
                v-model="name"
                label="Name"
                :rules="rules"
                hide-details="auto"></v-text-field>
            <v-btn
                class="mt-8"
                x-large
                color="teal"
                dark
                @click="submitModal()">
                Play
            </v-btn>
        </div>
    </modal>
</template>

<script>
    import Vue from 'vue';
    export default Vue.component('player-input', {
        data: () => ({
            name: "",
            rules: [
                value => !!value || 'Required.',
                value => (value && value.length <= 6) || 'Max 6 characters',
            ],
        }),
        props: {
            playerId: Number
        },
        methods: {
            show() {
                this.$modal.show('my-first-modal');
            },
            hide() {
                this.$modal.hide('my-first-modal');
            },
            submitModal() {
                const props = { name: this.name, id: this.playerId }
                this.$store.dispatch("connectPlayer", props);
            }
        },
        mounted () {
            this.show()
        }
    });
</script>

<style scoped lang="scss">
</style>
