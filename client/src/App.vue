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
      <TotalBalance
        :total="total"
      />
      <v-row v-if="loadingAccounts" justify="center">
        <v-progress-circular
          indeterminate
          color="primary"
          size="100"
        >
        </v-progress-circular>
      </v-row>
      <AccountCard 
        v-for="account in accounts" 
        :key="account.AccountId"
        :account = account 
      />
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
    loadingAccounts: false,
  }),

  mounted() {
    this.loadingAccounts = true;
    this.$http
      .get('api/accounts')
      .then(response => {
        this.accounts = response.data;
        this.loadingAccounts = false;
      })
      .catch(e => {
        console.log(e);
        //error page or something
      })
  },

  computed: {
    total: function() {
      return this.accounts.reduce((accu, account) => {
        if(account.sign === "") 
          return accu + parseFloat(account.balance);
        else
          return accu - parseFloat(account.balance);
        }, 0);
    },
  }
};
</script>
<style scoped>
.theme--light.v-application {
  background: #f7f7f7;
  color: rgba(0, 0, 0, 0.87);
}
</style>