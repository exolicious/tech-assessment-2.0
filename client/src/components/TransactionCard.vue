<template>
    <v-row no-gutters class="pb-6" justify="center">
        <v-col cols="12" md="6">
            <v-sheet 
                elevation="1"
                rounded
                color="grey lighten-3"
            >
                <v-row 
                    class="pa-8" 
                    align="center" 
                    justify="space-between"
                    no-gutters
                >
                    <v-col class="text-start" cols="8">
                        <span class="text-body-1 font-weight-bold text--secondary"> {{formatDate(transaction.date)}} </span>
                        <br/>
                        <br/>
                        <span class="text-h5"> {{transaction.information}} </span>
                    </v-col>
                    <v-col cols="4" class="text-end">
                        <span class="text--secondary" :class="transaction.status === 'Due'? 'orange--text text--darken-2': ''">{{transaction.status}} </span>
                        <br/>
                        <br/>
                        <div 
                            class="text-h5" 
                            :class="transaction.sign === '-' ? 'red--text': 'green--text'"
                        > 
                            {{transaction.sign}} {{formatBalance(transaction.amount)}} {{transaction.currency}}
                        </div>
                    </v-col>
                </v-row>
            </v-sheet>
        </v-col>
    </v-row>
</template>

<script>
  export default {
    name: 'TransactionCard',

    props: {
        transaction: {
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
    }
  }
</script>
