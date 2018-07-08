<template>
<!--    <transition name="fade">-->
        <div class="details" style="position: absolute; overflow-y: hidden;">
                <header class="header">
                    <header class="bar bar-nav" @click="hide">
                        <div class="pull-left">
                            <span class="iconfont icon-left"></span>
                        </div>
                        <div class="title">填写订单</div>
                    </header>
                </header>
          <div style="margin-top: 60px;">
            <div style="font-size: 16px;font-weight: bold;color: #212023;margin-bottom: 5px;padding: 5px;padding-left: 10px;">
              填写收货地址
            </div>
              <textarea placeholder="输入详细收货地址" style="border: 0px;margin: 15px; width: 90%; height: 80px;font-size: 16px;" v-model="details.address"></textarea>
            <div style="font-size: 16px;font-weight: bold;color: #212023;margin-bottom: 15px; padding: 5px;padding-left: 10px;margin-top: 15px;">
              确认商品信息
            </div>
            <div  style="display: table;margin-left: 20px;padding-right: 25px;">
              <div style="display: table-cell">
                 <img :src="details.previewImg" style="width: 100px;height: 100px;"/>
              </div>
              <div style="display: table-cell;float: left;">
                <div style="word-wrap:break-word;font-size: 16px;color: #212023;padding-left: 20px; margin-bottom: 10px;">
                   {{details.headline}}
                </div>
                <div style="font-size: 13px;color: #7b868c;padding-left: 20px;margin-bottom: 13px;">
                    {{details.subtitle}}
                </div>
                <div style="padding-left: 20px;margin-bottom: 13px;">
                  <span style="font-size: 12px;color: red">￥</span>
                  <span style="color: #fc5967;font-weight: bold;padding-top: 10px;font-size: 18px">{{details.sellingPrice}}</span>
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
                确定下单</div>
              </div>
          </div>
          </div>
  <!--  </transition>-->
</template>
<script>
    import { mapState } from 'vuex';
    import {loadFromlLocal, savaToLocal} from '../../common/js/store.js';
    import {post} from '../../common/HttpUtils';
    import {api} from '../../common/HttpConfig';

    export default {
        name: 'v-ordereditor',
        props: {
        },
        data() {
            return {
              money: 0,
              orderCount: 1,
              orderIng: true,
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
                'salesVolume': '',
                'address': ''
              }
            };
        },
        created() {
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
          this.money = this.details.sellingPrice.replace(new RegExp(',', 'gm'), '');
          this.details.address = loadFromlLocal('address', 'address', '');
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
            let commoney = this.details.sellingPrice.replace(new RegExp(',', 'gm'), '');
            this.money = Math.round((data.target.value * commoney) * 100) / 100;
            this.orderCount = data.target.value;
          },
          goPlay() {
            if (!this.details.address) {
              window.alert('请填写收货地址');
              return;
            }
            if (!this.orderIng) {
               return;
            }
            this.orderIng = false;
             post({
                url: api.api_home_place_order,
                // curPage: this.page,
                data: {
                  commodityId: this.details.id,
                  commodityNo: this.details.comNo,
                  purchaseQuantity: this.orderCount,
                  address: this.details.address,
                  orderMoney: this.money
                },
                success: (res) => {
                  if (res && res.code > 0) {
                    // 下订单
                    this.$router.replace({
                      name: 'orderplay',
                      params: {
                        orderMoney: this.money
                      }
                    });
                    this.orderIng = true;
                  }
                },
                error: (e) => {
                  this.orderIng = true;
                }
              }
            );
            if (this.details.address) {
              savaToLocal('address', 'address', this.details.address);
            } else {
              savaToLocal('address', 'address', '');
            }
          }
        },
        components: {
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import 'ordereditor.styl';
</style>
