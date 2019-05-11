<template>
  <div id="app">
    <FileTree />
  </div>
</template>

<script>
  import HelloWorld from './components/HelloWorld.vue'
  import FileTree from './components/FileTree/index.vue'

  export default {
    name: 'app',
    components: {
      HelloWorld,
      FileTree,
    }
  }
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
