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
                        <v-img src="https://www.natwest.com/content/dam/natwest_com/navigation/header/natwest-logo.png" contain />
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="2">
                        <span class="text-h5"> {{account.accountType}} </span> 
                        <br/>
                        <span class="text-subtitle-2"> {{account.accountSubType}} </span>
                    </v-col>
                    <v-col cols="5" class="text-end">
                        <div 
                            class="text-h4" 
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
                    <v-col class="text-caption grey--text text--darken-1 font-italic">
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
            return new Date(dateIsoString).toDateString();
        },

        formatBalance(balance) {
            return Number.parseFloat(balance).toFixed(2);
        },
    }
  }
</script>
