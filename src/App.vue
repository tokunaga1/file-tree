<template>
  <div id="app">
    <div class="buttons">
      <button type="button" @click="add_folder">
        Add Folder
      </button>
    </div>

    <FileTree
      v-model="posts"
      ref="tree"
    />
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import FileTree from './components/FileTree/index.vue'

  export default {
    name: 'app',
    components: {
      FileTree,
    },
    computed: {
      ...mapState('posts', {
        posts: 'list'
      }),
      tree () {
        return this.$refs.tree;
      }
    },
    created () {
      this.$store.dispatch('posts/get_list');
    },
    methods: {
      add_folder () {
        this.tree.append_folder();
      }
    }
  }
</script>

<style lang="scss">
  @import '~@fortawesome/fontawesome-svg-core/styles.css';

  html,
  body
  {
    height: 100vh;
  }
  body {
    margin: 0;
    display: flex;

    #app {
      width: 100vw;
      display: flex;
      flex-direction: column;

      .sl-vue-tree {
        flex-grow: 1;
      }
    }
  }
</style>
