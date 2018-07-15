<template>
  <div class="card">
    <img  v-lazy="data.previewImg" class="img" lazy="loading">
    <div class="card-content">
      <div class="desc">{{data.headline}}</div>
      <div class="card-content-bottom">
        <div class="who">{{data.subtitle}}</div>
      <!--  <div class="time">2017-12-33</div>-->
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'v-card',
    props: {
      data: {
        type: Object
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "card.styl";
</style>
