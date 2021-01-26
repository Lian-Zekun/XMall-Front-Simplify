<template>
 
</template>
<script>
export default {
  data () {
    this.$router.push({
      path: '/goods',
      query: {
        key: this.$route.query.key
      }
    })
    return {
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  
</style>
