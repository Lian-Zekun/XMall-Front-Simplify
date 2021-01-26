<template>
  <div class="footer">
    <div class="container">
      <div class="siteinfo">
        <div class="title">鲜  花</div>
        <div class="title">商  城</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .footer {
    // padding: 50px 0 20px;
    // border-top: 1px solid #e6e6e6;
    background: #fafafa;
    margin-top: 60px;
    height: 180px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .container {
    width: 1220px;
  }
  .siteinfo {
    margin-top: 40px;
    padding: 30px 0 30px;
    position: relative;
    text-align: center;
  }
  .title {
    font-size: 20px;
    line-height: 1;
    color: #646464;
    top: -2px;
    position: relative;
  }
</style>
