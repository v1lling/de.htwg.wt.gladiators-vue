<template>
    <div>
        <h2>Login</h2>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" v-model="username" name="username" class="form-control" :class="{ 'is-invalid': !username }" />
                <div v-show="!username" class="invalid-feedback">Username is required</div>
            </div>
            <div class="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" v-model="password" name="password" class="form-control" :class="{ 'is-invalid': !password }" />
                <div v-show="!password" class="invalid-feedback">Password is required</div>
            </div>
            <div class="form-group">
                <button class="btn btn-primary">Login</button>
                <!--<router-link to="/register" class="btn btn-link">Register</router-link>-->
            </div>
        </form>
    </div>
</template>

<script>

export default {
    data () {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        handleSubmit () {
            const bodyFormData = new FormData();
            bodyFormData.append('email', this.username);
            bodyFormData.append('password', this.password);
            bodyFormData.append('rememberMe', true);
            //bodyFormData.append('csrfToken', "2a9a12b11c6e8f8f7ffdf8a38e66c7ea03fca648-1610624109198-ece04ef5b32eb6228c7979c2");
            this.$store.dispatch("login", bodyFormData);
        }
    }
};
</script>