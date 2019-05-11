<template>
  <span class="item-title">
    <span v-if="node.isLeaf" class="file">
      {{ node.title }}
    </span>

    <span v-if="!node.isLeaf" class="folder" @dblclick="edit">
      {{ title }}
    </span>
  </span>
</template>

<script>
  export default {
    props: {
      node: {
        type: Object,
        required: true,
      }
    },
    computed: {
      title: {
        get () {
          return this.node.title;
        },
        set (title) {
          this.$parent.updateNode(this.node.path, { title });
        }
      }
    },
    methods: {
      edit () {
        const title = (prompt('Edit title', this.node.title) || '').trim();
        if (title) {
          this.title = title;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
