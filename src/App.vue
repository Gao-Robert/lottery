<template>
  <div id="app">
    <!-- <HelloWorld/> -->
    <HelloWorld></HelloWorld>
    <!-- <lottery/> -->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import lottery from './components/lottery/lottery'
export default {
  name: 'App',
  components: {
    HelloWorld,
    lottery
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
