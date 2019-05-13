<template>
  <div id="app">
    <FileTree
      v-model="json"
      ref="tree"
    />
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import HelloWorld from './components/HelloWorld.vue'
  import FileTree from './components/FileTree/index.vue'

  export default {
    name: 'app',
    components: {
      HelloWorld,
      FileTree,
    },
    computed: {
      ...mapGetters('posts', [
        'json'
      ]),
    },
    created () {
      this.$store.dispatch('posts/get_list');
    }
  }
</script>

<style lang="scss">
  @import '~@fortawesome/fontawesome-svg-core/styles.css';

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
