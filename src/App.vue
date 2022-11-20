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

<style lang="scss">
html, body {
  margin: 0;
  padding: 0;
}

#app {
  margin: 0;
  padding: 0;
  width: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
