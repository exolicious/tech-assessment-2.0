<template>
    <div>
        <TotalBalance
            :total="total"
        >
            <template v-slot:bank-logo>
                <v-row class="py-8" justify="center">
                    <v-img max-width="200" src="https://www.natwest.com/content/dam/natwest_com/navigation/header/natwest-logo.png" contain />
                </v-row>
            </template>
        </TotalBalance>
        <v-row v-if="loadingTransactions" justify="center">
            <v-progress-circular
                indeterminate
                color="primary"
                size="100"
            >
            </v-progress-circular>
        </v-row>
        <TransitionGroup name="list">
            <TransactionCard 
                v-for="transaction in transactions" 
                :key="transaction.transactionId"
                :transaction = transaction
            />
        </TransitionGroup>
    </div>
</template>

<script>
import TransactionCard from '../components/TransactionCard';
import TotalBalance from '../components/TotalBalance';

export default {
    name: 'AccountsView',

    components: {
        TotalBalance,
        TransactionCard,
    },

    props: {
        accountId: {
            type: String,
            required: true,
        },
        total: {
            type: Number,
            required: true,
        }
    },
    
    data: () => ({
        transactions: [],
        loadingTransactions: false,
    }),

    mounted() {
        this.loadingTransactions = true;
        this.$http
        .post('api/transactions',  { accountId: this.accountId, token: localStorage.getItem("token") })
        .then(response => {
            this.transactions = response.data;
        })
        .catch(e => {
            console.log(e);
            //error page or something
        })
        .finally(() => {
            this.loadingTransactions = false;
        }) 
    },
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
