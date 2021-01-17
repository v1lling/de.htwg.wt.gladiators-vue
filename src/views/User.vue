<template>
    <div class="loginpage pt-8">
        <h2>User</h2>
        First name: {{user.firstName}}
        Last name: {{user.lastName}}
        E-mail: {{user.email}}
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