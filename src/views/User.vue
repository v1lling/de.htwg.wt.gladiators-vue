<template>
    <div class="userpage pt-8">
        <h1>User</h1>
        <div class="infos">
        <div class="infos-line"><span>First name:</span> <span>{{user.firstName}}</span></div>
        <div class="infos-line"><span>Last name:</span> <span>{{user.lastName}}</span></div>
        <div class="infos-line"><span>E-mail:</span> <span>{{user.email}}</span></div>
        </div>
        <v-btn color="orange" raised  class="mt-8" @click=logout>Logout</v-btn>
    </div>
</template>

<script>

export default {
    computed: {
        user() {
            return this.$store.state.user
        }
    },
    methods: {
        logout: function() {
            this.$store.dispatch("logout");
        }
    }
};
</script>
<style>
.userpage {
  width:300px;
  margin:0 auto;
}
.infos {
    display: flex;
    flex-direction: column;
}
.infos-line {
    display: flex;
    justify-content: space-between;
}
</style>