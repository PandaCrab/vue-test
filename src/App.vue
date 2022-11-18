<template>
  <LeftMenu />
  <img alt="Vue logo" src="./assets/logo.png">
  <router-view />
</template>

<script>
import LeftMenu from './components/leftMenu.vue';

export default {
  name: 'App',
  components: {
    LeftMenu,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
