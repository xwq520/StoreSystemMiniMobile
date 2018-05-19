<template>
        <div class="details"
             :style="pageBg">
          <header class="header" :style="pageBg">
              <header class="bar bar-nav" @click="hide">
                  <div class="pull-left">
                      <span class="iconfont icon-left"></span>
                  </div>
                  <div class="title">支付收银</div>
              </header>
          </header>
           <div style="padding-top: 80px;text-align: center;">
             <div style="font-size: 20px;font-weight: bold;">本次消费</div>
             <div style="width: 100%;padding-top: 15px;">
               <span style="padding-right:10px;">
                  <span style="font-size: 12px;color: red">￥</span>
                  <span style="color: #fc5967;font-weight: bold;padding-top: 10px;font-size: 20px">
                     222.90
                  </span> 元</span>
            </div>
          </div>
          <div style="padding-left: 20px;padding-top: 20px;">
            <div style="font-weight: bold;">微信支付</div>
            <div style="text-align: -webkit-center;"><img src="../../assets/wechat-play.jpg" width="50%"/></div>
            <div style="font-weight: bold;">支付宝</div>
            <div style="text-align: -webkit-center;margin-bottom: 20px"><img src="../../assets/zhifubao-play.png" width="50%"/></div>
          </div>
          </div>
</template>
<script>
    export default {
        name: 'v-orderplay',
        props: {
        },
        data() {
            return {
              money: 19.89,
              pageBg: {
                backgroundImage: 'url(' + require('../../assets/play-bg.png') + ')',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%'
              }
            };
        },
        created() {
        },
        methods: {
          hide() {
            this.$router.go(-1);
          },
          checkInput(data) {
            console.log(data.target.value);
            this.money = Math.round((data.target.value * 11.2223) * 100) / 100;
          }
        },
        components: {
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import 'orderplay.styl';
</style>
