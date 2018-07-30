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
           <div style="padding-top: 70px;text-align: center;">
             <div style="font-size: 20px;font-weight: bold;">本次消费</div>
             <div style="width: 100%;padding-top: 15px;">
               <span style="padding-right:10px;">
                  <span style="font-size: 12px;color: red">￥</span>
                  <span style="color: #fc5967;font-weight: bold;padding-top: 10px;font-size: 20px">
                     {{orderMoney}}
                  </span> 元</span>
            </div>
          </div>
          <div style="margin-top: 10px;text-align: -webkit-center;font-size: 14px;">长按收款码可进行便捷支付</div>
          <div style="padding-left: 20px;padding-top: 20px;">
            <div v-show="userInfo.play1" style="font-weight: bold;">微信支付</div>
            <div style="text-align: -webkit-center;"><img :src="userInfo.play1" width="50%"/>
            </div>
            <div v-show="userInfo.play2" style="font-weight: bold;">支付宝</div>
            <div style="text-align: -webkit-center;margin-bottom: 20px"><img :src="userInfo.play2" width="50%"/></div>
            <div style="font-size: 14px;text-align: -webkit-center;margin-bottom: 20px;"> 商家确认后，会尽快给您发货 </div>
          </div>
          </div>
</template>
<script>
    import {com} from '../../common/Contants';
    export default {
        name: 'v-orderplay',
        props: {
        },
        data() {
            return {
              orderMoney: 0,
              userInfo: {},
              pageBg: {
                backgroundImage: 'url(' + require('../../assets/play-bg.png') + ')',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%'
              }
            };
        },
        created() {
          this.orderMoney = this.$route.params.orderMoney;
          this.userInfo = window.JSON.parse(window.localStorage.getItem(com.x_userinfo));
        },
        methods: {
          hide() {
            this.$router.go(-1);
          }
        },
        components: {
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import 'orderplay.styl';
</style>
