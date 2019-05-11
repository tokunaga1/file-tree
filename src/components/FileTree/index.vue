<template>
  <ul>
    <li v-for="(post, p) in posts" :key="post.id">
      <FontAwesomeIcon icon="file" />
      {{ post.title }}
    </li>
  </ul>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'

  import { library, config } from '@fortawesome/fontawesome-svg-core'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import { fas } from '@fortawesome/free-solid-svg-icons'

  config.autoAddCss = false
  library.add(fas)

  export default {
    components: { FontAwesomeIcon },
    computed: {
      ...mapState('posts', {
        posts: 'list'
      }),
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
  //@import '@fortawesome/fontawesome-svg-core/styles.css';
</style>
