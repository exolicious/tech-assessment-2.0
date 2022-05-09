<template>
    <v-container>
        <v-row class="pt-12 pb-10" justify="center">
            <span class="text-h3 font-weight-bold">Login</span>
        </v-row>
        <v-row class="ma-0" justify="center">
            <v-col cols="12" sm="6" md="6">
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
                            type="password"
                        >
                        </v-text-field>
                        <v-checkbox
                            color="primary"
                            label="Simulate Production Customer Consent"
                            v-model="simulateProduction"
                        >
                        </v-checkbox>
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
        email: "123456789012@471959b1-3a9f-4a88-8376-b5c93bc75e59.example.org",
        password: "12345678",
        loadingAuth: false,
        simulateProduction: false
    }),

    methods: {
        login() {
            this.loadingAuth = true;
            this.$http
                .post('/api/auth', { simulateProduction: this.simulateProduction })
                .then(response => {
                    console.log(response.data);
                    if(this.simulateProduction)
                        window.location.href = response.data;
                    else {
                        this.loadingAuth = false;
                        localStorage.setItem("token", response.data.token);
                        this.$router.push({ name: 'AccountsView' });
                    }
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

