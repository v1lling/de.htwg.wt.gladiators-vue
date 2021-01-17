<template>
    <div class="loginpage pt-8">
        <div>
            <h2>Register</h2>
            <v-form
                ref="form"
                >
                <div class="form-group">
                    <v-text-field
                        v-model="firstname"
                        label="First name"
                        :rules="nameRules"
                        hide-details="auto"></v-text-field>
                </div>
                <div class="form-group">
                    <v-text-field
                        v-model="lastname"
                        label="Last name"
                        :rules="nameRules"
                        hide-details="auto"></v-text-field>
                </div>
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
                <div class="form-group pt-4">
                    <v-btn @click=register>Sign Up</v-btn>
                </div>
            </v-form>
        </div>
    </div>
</template>

<script>

export default {
    data () {
        return {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            emailRules: [
                value => !!value || 'Required.',
                 v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
            ],
            nameRules: [
                value => !!value || 'Required.'
            ]
        }
    },
    methods: {
        register() {
            const bodyFormData = new FormData();
            bodyFormData.append('firstName', this.firstname);
            bodyFormData.append('lastName', this.lastname);
            bodyFormData.append('email', this.email);
            bodyFormData.append('password', this.password);
            this.$store.dispatch("register", bodyFormData);
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