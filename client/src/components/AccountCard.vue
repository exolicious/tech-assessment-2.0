<template>
    <v-row no-gutters class="pb-6" justify="center">
        <v-col 
            @click="openTransactions(account.accountId, account.balance)" 
            class="mouse-pointer" 
            cols="12" 
            md="6"
        >
            <v-sheet 
                elevation="1"
                rounded
                color="grey lighten-3"
            >
                <v-row 
                    no-gutters 
                    justify="end"
                >
                    <v-btn
                        icon
                        color="primary"
                    >
                        <v-icon>mdi-chart-line</v-icon>
                    </v-btn>
                    <v-btn
                        icon
                        color="primary">
                        <v-icon>mdi-star</v-icon>
                    </v-btn>
                </v-row>  
                <v-row 
                    class="pa-8" 
                    align="center" 
                    justify="space-between"
                    no-gutters
                >
                    <v-col cols="2">
                        <v-img src="https://www.natwest.com/content/dam/natwest_com/navigation/header/natwest-logo.png" contain />
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col class="text-center" cols="4">
                        <span class="text-h6"> {{account.accountType}} </span> 
                        <br/>
                        <span class="text-subtitle-2"> {{account.accountSubType}} </span>
                    </v-col>
                    <v-col cols="4" class="text-end">
                        <div 
                            class="text-h5" 
                            :class="account.sign === '-' ? 'red--text': ''"
                        > 
                            {{account.sign}} {{formatBalance(account.balance)}} {{account.currency}} 
                        </div>
                    </v-col>
                </v-row>
                <v-row 
                    no-gutters
                    class="py-2"
                    justify="end"
                >
                    <v-col class="text-center text-caption grey--text text--darken-1 font-italic">
                        Valuta: {{formatDate(account.valuta)}}
                    </v-col>
                </v-row>
            </v-sheet>
        </v-col>
    </v-row>
</template>

<script>
  export default {
    name: 'AccountCard',

    props: {
        account: {
            required: true
        }
    },

    data: () => ({
      
    }),

    methods: {
        formatDate(dateIsoString) {
            return new Date(dateIsoString).toLocaleString('de-DE');
        },

        formatBalance(balance) {
            return Number.parseFloat(balance).toFixed(2);
        },
        
        openTransactions(accountId, accountBalance) {
            this.$router.push({ name: 'TransactionsView', params: { accountId: accountId, total: accountBalance }})
        }
    }
  }
</script>
