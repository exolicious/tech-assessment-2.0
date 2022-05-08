<template>
    <div>
        <TotalBalance
            v-if="!loadingAccounts"
            :total="total"
        />
        <v-row class="pt-12" v-if="loadingAccounts" justify="center">
            <v-progress-circular
                indeterminate
                color="primary"
                size="100"
            >
            </v-progress-circular>
        </v-row>
        <TransitionGroup name="list">
            <AccountCard 
                v-for="account in accounts" 
                :key="account.accountId"
                :account = account
            />
        </TransitionGroup>
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

    created() {
        this.loadingAccounts = true;
        this.$http
        .post('api/accounts', {token: localStorage.getItem("token")})
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
<style scoped>

.list-enter-active, .list-leave-active {
  transition: all 0.5s;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

</style>

