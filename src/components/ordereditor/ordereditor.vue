<template>
<!--    <transition name="fade">-->
        <div class="details" >
                <header class="header">
                    <header class="bar bar-nav" @click="hide">
                        <div class="pull-left">
                            <span class="iconfont icon-left"></span>
                        </div>
                        <div class="title">填写订单</div>
                    </header>
                </header>
          <div style="margin-top: 60px;height: 120%;">
            <div style="font-size: 16px;font-weight: bold;color: #212023;margin-bottom: 5px;padding: 5px;padding-left: 10px;">
              确认收货地址
            </div>
              <textarea placeholder="输入详细收货地址" style="border: 0px;margin: 15px; width: 90%; height: 100px;font-size: 16px;"></textarea>
            <div style="font-size: 16px;font-weight: bold;color: #212023;margin-bottom: 15px; padding: 5px;padding-left: 10px;margin-top: 15px;">
              确认商品信息
            </div>
            <div  style="display: table;margin-left: 20px;padding-right: 25px;">
              <div style="display: table-cell">
                 <img :src="detailsData.url" style="width: 100px;height: 100px;"/>
              </div>
              <div style="display: table-cell;float: left;">
                <div style="word-wrap:break-word;font-size: 16px;color: #212023;padding-left: 20px; margin-bottom: 10px;">
                  标题信息大 啊大
                </div>
                <div style="font-size: 13px;color: #7b868c;padding-left: 20px;margin-bottom: 13px;">
                    {{detailsData.desc}}
                </div>
                <div style="padding-left: 20px;margin-bottom: 13px;">
                  <span style="font-size: 12px;color: red">￥</span>
                  <span style="color: #fc5967;font-weight: bold;padding-top: 10px;font-size: 18px">300.40</span>
                </div>
              </div>
            </div>
            <div style="display: table;padding-left: 20px;">
                <div style="display: table-cell;width: 20%;font-weight: bold;">购买数量</div>
                <div style="display: table-cell;width: 80%;">
                  <input type="number" name="points" min="1" max="10"
                         @input="checkInput" value="1"
                         onKeyUp="this.value=this.value.replace(/[^\.\d]/g,'');this.value=this.value.replace('.','');"
                         style="margin-right: -10px;font-weight: bold;width: 100px;float:right;background-color: rgb(247, 247, 247);height: 30px;text-align: -webkit-center;"/>
                </div>
            </div>
              <!--购买模块-->
              <div style="height:50px;width: 100%;border-top: 1px solid rgba(249, 249, 249, 0.86);
                          position: fixed;bottom: 0;right: 0;left: 0;z-index: 3000;width: 100%;display: table">
                <div style="background-color: white;display: table-cell;padding-top: 15px;padding-left:20px;width: 70%;">
                  合计：
                  <span style="font-size: 12px;color: red">￥</span>
                  <span style="color: #fc5967;font-weight: bold;padding-top: 10px;font-size: 22px">
                    {{money}}
                  </span>
                  </div>
                <div style="display: table-cell;color:white;padding-top: 15px;text-align: center;background-color: #fc5967;"
                     @click="goPlay">
                提交订单</div>
              </div>
          </div>
          </div>
  <!--  </transition>-->
</template>
<script>
    import { mapState } from 'vuex';

    export default {
        name: 'v-ordereditor',
        props: {
        },
        data() {
            return {
              money: 19.89
            };
        },
        created() {
        },
        computed: {
          ...mapState([
            'detailsData'
          ])
        },
        methods: {
          hide() {
            this.$router.go(-1);
          },
          checkInput(data) {
            console.log(data.target.value);
            this.money = Math.round((data.target.value * 11.2223) * 100) / 100;
          },
          goPlay() {
            this.$router.push('orderplay');
          }
        },
        components: {
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import 'ordereditor.styl';
</style>
