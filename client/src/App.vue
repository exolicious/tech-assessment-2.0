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
        <transition :name="$route.meta.transition" mode="out-in">
          <router-view :key="$route.params.accountId" v-slot="{ Component }">
            <component :is="Component" />
          </router-view>
        </transition>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
}

</script>

<style>

.theme--light.v-application {
  background: #f7f7f7;
  color: rgba(0, 0, 0, 0.87);
}

.fade-slide-left-enter-active, .fade-slide-left-leave-active, .fade-slide-right-leave-enter-active, .fade-slide-right-leave-active {
  transition: all .5s;
}

.fade-slide-left-enter, .fade-slide-right-leave-to {
  opacity: 0;
  transform: translateX(50%);
}

.fade-slide-left-leave-to, .fade-slide-right-enter {
  opacity: 0;
  transform: translateX(-50%);
}

.fade-enter-active, .fade-leave-active {
  transition: all .5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.mouse-pointer:hover {
  cursor: pointer;
}

</style>
