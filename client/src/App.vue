<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      height="80"
    >
      <div class="d-flex align-center">
        <h1 class="text-h3">oepfelbaum</h1>
      </div>
    </v-app-bar>
    <v-main>
      <Transition appear name="fade" mode="out-in">
        <keep-alive>
          <router-view />
        </keep-alive>
      </Transition>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
}
</script>
<style scoped>

.theme--light.v-application {
  background: #f7f7f7;
  color: rgba(0, 0, 0, 0.87);
}

.fade-enter-active, .fade-leave-active {
    transition: opacity .275s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
}

</style>
