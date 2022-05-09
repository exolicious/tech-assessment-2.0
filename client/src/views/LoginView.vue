<template>
    <v-container fill-height>
        <v-row justify="center">
            <span class="text-h3">Login</span>
        </v-row>
        <v-row class="ma-0" justify="center">
            <v-col cols="6">
                <v-sheet  
                    class="pa-4"
                    elevation="1"
                    rounded
                    color="grey lighten-3"
                >
                    <v-form class="text-end">
                        <v-text-field
                            v-model="email"
                            label="E-mail"
                        >
                        </v-text-field>
                        <v-text-field
                            v-model="password"
                            label="Password"
                        >
                        </v-text-field>
                        <v-btn 
                            @click="login" 
                            color="primary"
                            :loading="loadingAuth"
                        >
                            login
                        </v-btn>
                    </v-form>
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

export default {
    name: 'LoginView',
    
    data: () => ({
        email: "",
        password: "",
        loadingAuth: false,
    }),

    methods: {
        login() {
            this.loadingAuth = true;
            this.$http
                .get('/api/auth')
                .then(response => {
                    console.log(response.data.token);
                    this.loadingAuth = false;
                    localStorage.setItem("token", response.data.token);
                    this.$router.push({ name: 'AccountsView' })
                })
                .catch(e => {
                    console.log(e);
                })
        }
    }
}
</script>

<style scoped>

.accounts-enter-active, .accounts-leave-active {
  transition: all 0.5s;
}
.accounts-enter, .accounts-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

</style>

