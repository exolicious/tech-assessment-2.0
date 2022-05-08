<template>
  <div>
    <v-row fluid justify="center" class="pt-12 pb-4">
      <v-col cols="6" class="text-center">
        <div class="text-h3" :class="total < 0 ? 'red--text': ''"> 
          {{formatBalance(total)}} GBP 
        </div>
        <div class="text-h6 grey--text text--darken-2">
          Total <br/>
        </div>
      </v-col>
    </v-row>
    <v-row justify="center" class="pb-4 mt-0">
      <v-col cols="6" class="text-end">
          <v-btn
          icon
          large
          color="primary"
        >
          <v-icon>mdi-filter-menu</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </div>
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
