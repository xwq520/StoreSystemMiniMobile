<template>
   <!-- <transition name="fade">-->
        <div v-show="showFlag" class="details">
          <div>
                <header class="header">
                    <header class="bar bar-nav" @click="hide">
                        <div class="pull-left">
                            <span class="iconfont icon-left"></span>
                        </div>
                        <div class="title">{{details.headline}}</div>
                    </header>
                </header>
               <!-- <v-day :  data="detailsData" ref="day"></v-day> -->
          </div>
          <!--咨询方式-->
          <div style="background-color: rgba(39, 25, 25, 0.45);height: 100%;width: 100%;position: fixed;z-index: 1000;" v-show="isShow">
              <div style="width: 90%; height: 15%;background-color: #ffffff;padding-top: 10%;position: relative;margin-top: 60%; margin-left: 5%; border-radius: 5px;">
                <div style="padding-left: 30px;" v-show="userInfo.phone">电话咨询：<a :href="'tel:'+userInfo.phone">{{userInfo.phone}}</a> </div>
                <div style="margin-top: 10px;padding-left: 30px;" v-show="userInfo.other">其他方式：{{userInfo.other}} </div>
              </div>
          </div>
              <div style="height: 300px;width: 100%;padding-top: 50px">
                  <img :src="details.previewImg" width="100%" height="100%"/>
              </div>
            <!--价格显示-->
              <div style="height: 27px; width: 100%; padding: 5px; padding-top: 13px;">
                <span style="font-size: 12px;color: red">￥</span>
                <span style="color: #fc5967;font-weight: bold;padding-top: 10px;font-size: 18px">{{details.sellingPrice}}</span>
                <span style="color: black;text-decoration:line-through;font-size: 10px">{{details.originalPrice}}</span>
                <span style="float: right;color:black;font-size: 13px;padding-right: 20px;padding-top: 5px;">剩余库存：{{details.inventory}}件</span>
              </div>
              <!--标题-->
              <div style="font-size: 16px;color: #212023;margin-bottom: 5px;padding: 5px;padding-left: 10px;">
                {{details.headline}}
              </div>
              <div style="font-size: 13px;color: #7b868c;margin-bottom: 13px;padding-left: 10px;">
                {{details.subtitle}}
              </div>
              <!--商品详情-->
              <div style="padding: 10px;margin-bottom: 70px;color: rgb(94, 100, 103);font-size: 12px;" class="div-details">
                <span v-html="details.commodityDetails"></span>
               <!-- <img :src="detailsData.url" width="100%" height="100%"/>
                <img :src="detailsData.url" width="100%" height="100%"/>
                <img :src="detailsData.url" width="100%" height="100%"/>-->
              </div>

              <!--购买模块-->
              <div style="height:50px;width: 100%;border-top: 1px solid rgba(249, 249, 249, 0.86);
                          position: fixed;bottom: 0;right: 0;left: 0;z-index: 3000;width: 100%;display: table">
                <div style="background-color: white;display: table-cell;padding-top: 15px;text-align: center;width: 20%;">
                  <div @click="isShow?isShow=false:isShow=true">咨询</div>
                </div>
                <div style="display: table-cell;color:white;padding-top: 15px;text-align: center;background-color: #fc5967;"
                     @click="order(details)">
                立即购买</div>
              </div>

          </div>
<!--    </transition>-->
</template>
<script>
    import BScroll from 'better-scroll';
    import vDay from '../day/day.vue';
    import { mapState } from 'vuex';
    import {loadFromlLocal} from '../../common/js/store.js';
    import {com} from '../../common/Contants';
    export default {
        name: 'v-details',
        props: {
        },
        data() {
            return {
              showFlag: true,
              isShow: false,
              details: {
                'id': '',
                'commodityDetails': '',
                'headline': '',
                'subtitle': '',
                'previewImg': '',
                'comNo': '',
                'originalPrice': '',
                'sellingPrice': '',
                'inventory': '',
                'salesVolume': ''
              },
              userInfo: {}
            };
        },
        created() {
          //  console.log(loadFromlLocal('previewImg', 'previewImg', ''));
          this.details.commodityDetails = this.$route.query.commodityDetails;
          this.details.id = this.$route.query.id;
          this.details.headline = this.$route.query.headline;
          this.details.subtitle = this.$route.query.subtitle;
          this.details.previewImg = loadFromlLocal('previewImg', 'previewImg', '');
          this.details.comNo = this.$route.query.comNo;
          this.details.originalPrice = this.$route.query.originalPrice;
          this.details.sellingPrice = this.$route.query.sellingPrice;
          this.details.inventory = this.$route.query.inventory;
          this.details.salesVolume = this.$route.query.salesVolume;
          this.userInfo = window.JSON.parse(window.localStorage.getItem(com.x_userinfo));
        },
        computed: {
          ...mapState([
            'detailsData'
          ])
        },
        methods: {
            show() {
                this.showFlag = true;
                this.$nextTick(() => {
                    if (!this.scroll) {
                        this.scroll = new BScroll(this.$el, {
                            click: true
                        });
                    } else {
                        this.scroll.refresh();
                    }
                //    this.$refs.day.clearStyle();
                });
            },
            hide() {
               // this.showFlag = false;
              this.$router.go(-1);
            },
            order(data) {
              this.$store.commit('UPDATE_DETAILS', data);
              this.$store.commit('UPDATE_LOADING', true);
              this.$router.replace({
                name: 'ordereditor',
                query: {
                   id: this.details.id,
                   headline: this.details.headline,
                   subtitle: this.details.subtitle,
                   comNo: this.details.comNo,
                   originalPrice: this.details.originalPrice,
                   sellingPrice: this.details.sellingPrice,
                   inventory: this.details.inventory,
                   salesVolume: this.details.salesVolume
                }
              });
              this.$nextTick(() => {
                this.$store.commit('UPDATE_LOADING', false);
              });
            },
          onshow() {
               console.log(99999);
          }
        },
        components: {
            vDay
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import './details.styl';
    .div-details img{
      width 100%
      height 100%
    }
</style>
