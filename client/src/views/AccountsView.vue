<template>
    <div>
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
    </div>
</template>

<script>
import AccountCard from '../components/AccountCard';
import TotalBalance from '../components/TotalBalance';

export default {
    name: 'AccountsView',

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
}
</script>
