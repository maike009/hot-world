<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'AppView',
  data () {
    return {
      ws: null
    }
  },
  created () {

  }
}
</script>
<style lang="less">

</style>
