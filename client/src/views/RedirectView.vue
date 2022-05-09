<template>
    <v-container>
        <v-row class="pt-12 pb-10" justify="center">
            <span class="text-h3 font-weight-bold">Redirecting...</span>
        </v-row>
    </v-container>
</template>

<script>

export default {
    name: 'RedirectView',

    mounted() {
        let code = this.$route.fullPath.split('code=')[1].split('&')[0]; //why is that a '#' instead of a '?'
        this.$http
            .post('/api/auth/code', {code: code})
            .then(response => {
                localStorage.setItem("token", response.data.token);
                this.$router.push({ name: 'AccountsView' });
            })
    }
}

</script>

<style scoped>

</style>

