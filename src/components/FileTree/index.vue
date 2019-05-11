<template>
  <SlVueTree
    v-model="nodes"
    ref="slVueTree"
    :allow-multiselect="true"
    @select="selected"
  >
    <template v-slot:title="{ node }">
      <span class="item-icon">
        <FontAwesomeIcon v-if="node.isLeaf" icon="file" />
      </span>

      <NodeTitle :node="node" @input="update" />
    </template>

    <template v-slot:toggle="{ node }">
      <span v-if="!node.isLeaf">
        <FontAwesomeIcon v-show="node.isExpanded" icon="chevron-down" />
        <FontAwesomeIcon v-show="!node.isExpanded" icon="chevron-right" />
      </span>
    </template>

    <template v-slot:sidebar="{ node }">
      <span class="visible-icon" @click="remove($event, node)">
        <FontAwesomeIcon icon="times" />
      </span>
    </template>

    <template v-slot:draginfo>
      <div v-html="selected_node_titles" />
    </template>

  </SlVueTree>
</template>

<script>
  import SlVueTree from 'sl-vue-tree'
  import NodeTitle from './NodeTitle.vue'

  import { library, config } from '@fortawesome/fontawesome-svg-core'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import { fas } from '@fortawesome/free-solid-svg-icons'

  config.autoAddCss = false
  library.add(fas)

  export default {
    components: { SlVueTree, NodeTitle, FontAwesomeIcon },
    props: {
      value: {
        type: String,
        default: '[]',
      },
    },
    data: () => ({
      nodes: [],
      selected_node_titles: '',
    }),
    watch: {
      value: {
        immediate: true,
        handler (json) {
          if (json) {
            this.nodes = JSON.parse(json);
          }
        }
      }
    },
    mounted () {
      window.addEventListener('keyup', this.remove_selected);
    },
    beforeDestroy () {
      window.removeEventListener('keyup', this.remove_selected);
    },
    methods: {
      remove (e, node) {
        e.stopPropagation();
        const svt = this.$refs.slVueTree;
        let paths = [];

        if (! node.isLeaf && confirm('Delete folder(s) with nodes?')) {
          node.children.forEach(node => {
            this.collect_paths(node, paths);
          });
        }
        paths.push(node.path);

        svt.remove(paths);
      },

      collect_paths (node, paths) {
        if (! node.isLeaf) {
          node.children.forEach(node2 => {
            this.collect_paths(node2, paths);
          });
        }
        paths.push([node.path]);
      },

      remove_selected (e) {
        if (e.keyCode !== 46 /*DELETE*/ &&
            e.keyCode !== 8 /*BACKSPACE*/)
        {
          return
        }
        const svt = this.$refs.slVueTree;
        const paths = svt.getSelected().map(node => {
          return node.path;
        });

        svt.remove(paths);
      },

      append_folder () {
        const svt = this.$refs.slVueTree;
        const last_node = _.last(svt.getSelected()) || svt.getLastNode();
        if (! last_node) {
          return;
        }

        svt.setCursorPosition({
          node: last_node,
          placement: 'after',
        });
        svt.insert(svt.cursorPosition, {
          title: 'New folder',
          isLeaf: false,
        });
        svt.setCursorPosition(null)
      },

      selected(nodes, e) {
        this.selected_node_titles = nodes.map(node => node.title).join('<br>');
      },

      update ({ node, title }) {
        node.title = title;
        console.log('>> node', node);
        console.log('>> nodes', this.nodes);
      },

      get_json () {
        return JSON.stringify(this.nodes);
      },
    }
  }
</script>

<style lang="scss">
  @import '~@fortawesome/fontawesome-svg-core/styles.css';
  @import '~sl-vue-tree/dist/sl-vue-tree-dark.css';
  @import '../../assets/styles/sl-vue-tree/main.scss';
  @import '../../assets/styles/sl-vue-tree/light.scss';
</style>
