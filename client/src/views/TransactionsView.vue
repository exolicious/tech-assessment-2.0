<template>
    <v-container>
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
        <v-row justify="center" no-gutters>
            <v-col 
                cols="12" 
                md="6"
            >
                <v-btn
                    @click="$router.back()"
                    icon
                    color="primary"
                    width="60"
                    height="60"
                >
                    <v-icon class="text-h3">mdi-arrow-left</v-icon>
                </v-btn>
            </v-col>
        </v-row>
        <v-row 
            no-gutters 
            justify="center" 
            class="pb-2"
        >
            <v-col 
                class="text-end"
                cols="12" 
                md="6"
            >
                <v-tooltip open-delay="375" top>
                    <template v-slot:activator="{ on }">
                        <v-btn
                            @click="sortTransactionsByDateDesc"
                            icon
                            large
                            :color="sortedByDate === 'asc' ? 'grey' : 'primary'"
                            v-on="on"
                        >
                            <v-icon>mdi-sort-clock-ascending</v-icon>
                        </v-btn>
                    </template>
                    <span>
                        Neuste Transaktionen Zuerst
                    </span>
                </v-tooltip>
                <v-tooltip open-delay="375" top>
                    <template v-slot:activator="{ on }">
                        <v-btn
                            @click="sortTransactionsByDateAsc"
                            icon
                            large
                            :color="sortedByDate === 'desc' ? 'grey' : 'primary'"
                            v-on="on"
                        >
                            <v-icon>mdi-sort-clock-descending</v-icon>
                        </v-btn>
                    </template>
                    <span>
                        Älteste Transaktionen Zuerst
                    </span>
                </v-tooltip>
            </v-col>
        </v-row>
        <TransitionGroup name="list">
            <TransactionCard 
                class="list-item"
                v-for="transaction in transactions" 
                :key="transaction.transactionId"
                :transaction = transaction
            />
        </TransitionGroup>
    </v-container>
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
        sortedByDate: "",
    }),

    mounted() {
        this.loadingTransactions = true;
        this.$http
        .post('api/transactions',  { accountId: this.accountId, token: localStorage.getItem("token") })
        .then(response => {
            this.transactions = response.data;
            this.sortTransactionsByDateDesc();
        })
        .catch(e => {
            console.log(e);
            //error page or something
        })
        .finally(() => {
            this.loadingTransactions = false;
        }) 
    },

    methods: {
        sortTransactionsByDateDesc() {
            this.transactions.sort(function(a,b){return new Date(b.date).getTime() - new Date(a.date).getTime()});
            this.sortedByDate = "desc";
        },
        sortTransactionsByDateAsc() {
            this.transactions.sort(function(a,b){return new Date(a.date).getTime() - new Date(b.date).getTime()});
            this.sortedByDate = "asc";
        }
    }
}
</script>
<style scoped>
.list-item {
  transition: all 0.5s;
}
.list-enter, .list-leave-to
/* .list-complete-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(-30px);
}
.list-leave-active {
  position: absolute;
}
</style>
