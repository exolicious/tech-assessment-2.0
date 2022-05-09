<template>
    <v-row 
      fluid 
      justify="center" 
      class="pt-12 pb-4"
    >
    <slot name="bank-logo">
    </slot>
    <v-col cols="12" class="text-center">
      <div class="text-h3" :class="total < 0 ? 'red--text': ''"> 
        {{formatBalance(total)}} GBP 
      </div>
      <span class="text-h6 grey--text text--darken-2">
        Total <br/>
      </span>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    name: 'TotalBalance',
    props: {
      total: {
        type: Number,
        required: false
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
