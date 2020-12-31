<template>
    <div>
        lol
    </div>
</template>

<script>
    import Vue from 'vue';
    export default Vue.component('player-input', {
        data: function(){
            return {
                name: '',
            } 
        },
        props: {
            playerId: Number,
        },
        methods: {

        }
    });
</script>

<style scoped lang="scss">
    .modal {
        .form-control {
            font-family: 'Arial';
        }
        .modal-header {
            justify-content: center;
        }
        .modal-dialog {
            top: 30%;
        }
        .avatar {
            height: 5rem;
            width: 5rem;
            border-radius: 10px;
            background-repeat: no-repeat;
            background-position: center;
        }
        &.player-one .avatar {
            background-image: url("/assets/images/board/temple.png");
        }
        &.player-two .avatar {
            background-image: url("/assets/images/board/colloseum.png");
        }
    }
    #idModalHeader {
        font-size: 3rem;
    }
</style>
