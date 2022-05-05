<template>
  <v-container>
        <v-row class="text-center" justify="center">
            <v-col cols="12" md="6">
                <v-sheet 
                    elevation="2"
                    rounded
                >
                    <v-row 
                        class="px-4" 
                        align="center" 
                        justify="space-between"
                    >
                        <v-col cols="2">
                            <v-img 
                                src="http://placehold.jp/150x150.png" 
                                contain
                            />
                        </v-col>
                        <v-col cols="6">
                            <div class="text-h6"> Sparkonto </div>
                        </v-col>
                        <v-col cols="2">
                            <div class="text-h6"> 123123 CHF </div>
                        </v-col>
                    </v-row>
                    <v-row class="mt-0" justify="center">
                        <v-col cols="6" >
                            <v-btn
                                large
                                icon
                                color="primary"
                            >
                                <v-icon>mdi-chevron-down</v-icon>
                            </v-btn>
                            <v-btn
                                large
                                icon
                                color="primary"
                            >
                                <v-icon>mdi-chart-line</v-icon>
                            </v-btn>
                            <v-btn
                                large
                                icon
                                color="primary">
                                <v-icon>mdi-star</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-sheet 
                        width="6" 
                        height="100%"
                        color="green" 
                    />      
                </v-sheet>
            </v-col>
        </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'AccountCard',

    data: () => ({
      
    }),
  }
</script>
