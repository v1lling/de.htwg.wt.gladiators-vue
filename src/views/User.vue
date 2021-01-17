<template>
    <div class="loginpage pt-8">
        <h1>User</h1>
        <h2>First name: {{user.firstName}}</h2>
        <h2>Last name: {{user.lastName}}</h2>
        <h2>E-mail: {{user.email}}</h2>
        <div class="form-group pt-4">
            <v-btn @click=logout>Logout</v-btn>
        </div>
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
<style scoped>
.loginpage {
  width:400px;
  margin:0 auto;
}
</style>