<template>
  <FontAwesomeIcon icon="cat" />
</template>

<script>
  import { library, config } from '@fortawesome/fontawesome-svg-core'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import { fas } from '@fortawesome/free-solid-svg-icons'

  config.autoAddCss = false
  library.add(fas)

  export default {
    components: { FontAwesomeIcon },
  }
</script>

<style lang="scss">
  //@import '@fortawesome/fontawesome-svg-core/styles.css';
</style>
