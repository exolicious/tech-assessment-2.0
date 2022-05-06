<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      height="80"
    >
      <div class="d-flex align-center">
        <h1 class="text-h3">oepfelbaum</h1>
      </div>
    </v-app-bar>
    <v-main>
      <TotalBalance/>
      <AccountCard 
        v-for="account in accounts" :key="account.AccountId"
        :account = account>
      </AccountCard>
    </v-main>
  </v-app>
</template>

<script>
import AccountCard from './components/AccountCard';
import TotalBalance from './components/TotalBalance';


export default {
  name: 'App',

  components: {
    TotalBalance,
    AccountCard,
  },

  data: () => ({
    accounts: [],
  }),

  created() {
    this.$http
      .get('api/accounts')
      .then(response => {
        this.accounts = response.data;
      });
  },

  methods: {

  }
};
</script>
