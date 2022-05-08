<template>
    <div>
        <TotalBalance
            :total="total"
        />
        <v-row v-if="loadingTransactions" justify="center">
            <v-progress-circular
                indeterminate
                color="primary"
                size="100"
            >
            </v-progress-circular>
        </v-row>
        <TransactionCard 
            v-for="transaction in transactions" 
            :key="transaction.transactionId"
            :transaction = account
        />
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
        console.log(this.accountId);

        /*this.loadingTransactions = true;
        this.$http
        .get('api/transactions')
        .then(response => {
            this.transactions = response.data;
            this.loadingTransactions = false;
        })
        .catch(e => {
            console.log(e);
            //error page or something
        })*/
    },
}
</script>
