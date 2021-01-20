<template>
    <div class="loginpage pt-8">
        <div>
            <h2>Login</h2>
            <v-form
                ref="form"
                >
                <div class="form-group">
                    <v-text-field
                        v-model="email"
                        label="E-Mail"
                        :rules="emailRules"
                        hide-details="auto"></v-text-field>
                </div>
                <div class="form-group">
                    <v-text-field
                        type="password"
                        v-model="password"
                        label="Password"
                        hide-details="auto"></v-text-field>
                </div>
                <div class="form-group buttons pt-8">
                    <v-btn @click=login>Login</v-btn>
                    <v-btn to="/register" class="ml-4">Register</v-btn>
                </div>
                <div class="form-group buttons pt-4">
                    <v-btn @click=googleLogin>
                        <v-icon class="pr-2" size="24px">
                            mdi-google
                        </v-icon>
                        Sign In
                    </v-btn>
                    <v-btn @click=facebookLogin class="ml-4">
                        <v-icon class="pr-2" size="24px">
                            mdi-facebook
                        </v-icon>
                        Sign In
                    </v-btn>
                </div>
            </v-form>
        </div>
    </div>
</template>

<script>

export default {
    data () {
        return {
            email: '',
            password: '',
            emailRules: [
                value => !!value || 'Required.',
                 v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
            ],
        }
    },
    methods: {
        login() {
            const bodyFormData = new FormData();
            bodyFormData.append('email', this.email);
            bodyFormData.append('password', this.password);
            bodyFormData.append('rememberMe', true);
            this.$store.dispatch("login", bodyFormData);
        },
        googleLogin() {
            this.$store.dispatch("googleLogin");
        },
        facebookLogin() {
            this.$store.dispatch("facebookLogin");
        }
    },
};
</script>
<style>
.loginpage {
  width:360px;
  margin:0 auto;
}
.form-group.buttons {
    width: 80%;
    margin: auto;
    display: flex;
    justify-content: space-around;
}
.v-btn {
    width: 40%;
}
</style>