<template>
    <v-row class="pb-8 text-center" justify="center">
        <v-col cols="12" md="6">
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
                    class="px-4 py-8" 
                    align="center" 
                    justify="space-between"
                    no-gutters
                >
                    <v-col cols="2">
                        <span class="text-h5"> {{formatDate(transaction.date)}} </span>
                    </v-col>

                    <v-col class="text-center" cols="8">
                        <span class="text-h4"> {{transaction.information}} </span>
                    </v-col>
                    <v-col cols="2" class="text-end">
                        <div 
                            class="text-h5" 
                            :class="transaction.sign === '-' ? 'red--text': ''"
                        > 
                            {{transaction.sign}} {{transaction.amount}} {{transaction.currency}}
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
            return new Date(dateIsoString).toDateString();
        },

        formatBalance(balance) {
            return Number.parseFloat(balance).toFixed(2);
        },
    }
  }
</script>
