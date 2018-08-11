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

          <div style="margin-top: 60px">
              <!--居住地址三级联动选项-->
              <div  style="padding-left: 15px;" @click="!showChose?showChose=true:showChose=false">
                所在地 ： {{ Province!=false?Province:'请选择所在地' }}
                 {{ City!=false?City:'' }}
                {{ District!=false?District:'' }}</div>
              <section class="showChose" v-show="showChose">
                <section class="address">
                  <section class="title" style="text-align: -webkit-center;height: 30px;padding-top: 10px;">
                    <h4>所在地</h4>
                    <span @click="closeAdd()">×</span>
                  </section>
                  <section class="title" style="height: 20px;font-size: 14px;">
                    <p class="area" @click="provinceSelected()">{{Province?Province:(info[province-1].name)}}</p>
                    <p class="area" @click="citySelected()" :class="City?'':'active'">{{City?City:'请选择'}}</p>
                    <p class="area" @click="districtSelected()" :class="District?'':'active'" v-show="City">{{District?District:'请选择'}}</p>
                  </section>
                  <ul>
                    <li class="addList" v-for="(v,k) in info" @click="getProvinceId(v.id, v.name, k)" v-show="showProvince" :class="v.selected ? 'active' : ''">{{v.name}}</li>
                    <li class="addList" v-for="(v,k) in showCityList" @click="getCityId(v.id, v.name, k)" v-show="showCity" :class="v.selected ? 'active' : ''">{{v.name}}</li>
                    <li class="addList" v-for="(v,k) in showDistrictList" @click="getDistrictId(v.id, v.name, k)" v-show="showDistrict" :class="v.selected ? 'active' : ''">{{v.name}}</li>
                  </ul>
                </section>
              </section>
          <!--  <div style="font-size: 16px; color: #212023;margin-bottom: 5px;padding: 5px;padding-left: 10px;">
              填写收货地址
            </div>-->
              <textarea placeholder="输入详细收货地址" style="border: 0px;margin: 15px; width: 90%; height: 80px;font-size: 14px;" v-model="details.address"></textarea>
            <div style="font-size: 16px; color: #212023;margin-bottom: 15px; padding: 5px;padding-left: 10px;margin-top: 15px;">
              确认商品信息
            </div>
            <div  style="display: table;margin-left: 20px;padding-right: 25px;">
              <div style="display: table-cell">
                 <img :src="details.previewImg" style="width: 100px;height: 100px;"/>
              </div>
              <div style="display: table-cell;float: left;">
                <div style="word-wrap:break-word;font-size: 14px;color: #212023;padding-left: 20px; margin-bottom: 10px;">
                   {{details.headline}}
                </div>
                <div style="font-size: 12px;color: #7b868c;padding-left: 20px;margin-bottom: 13px;">
                    {{details.subtitle}}
                </div>
                <div style="padding-left: 20px;margin-bottom: 13px;">
                  <span style="font-size: 12px;color: red">￥</span>
                  <span style="color: #fc5967;padding-top: 10px;font-size: 18px">{{details.sellingPrice}}</span>
                </div>
              </div>
            </div>
            <div style="display: table;padding-left: 20px;">
                <div style="display: table-cell;width: 20%;">购买数量</div>
                <div style="display: table-cell;float:right;margin-right: -20px;">
                  <span style="font-size: 20px;
    padding-left: 10px;
    padding-right: 10px;" @click="numberClick(true)"> - </span>
                  <input type="number" name="points" min="1" max="10"
                         v-model="value"
                         @input="checkInput" value="1" disabled="disabled"
                         onKeyUp="this.value=this.value.replace(/[^\.\d]/g,'');this.value=this.value.replace('.','');"
                         style="width: 50px;background-color: rgb(247, 247, 247);height: 30px;text-align: -webkit-center;"/>
                  <span style="font-size: 20px;
    padding-left: 10px;
    padding-right: 10px;" @click="numberClick(false)"> +  </span>
                </div>
            </div>
              <!--购买模块-->
              <div style="height:50px;width: 100%;border-top: 1px solid rgba(249, 249, 249, 0.86);
                          position: fixed;bottom: 0;right: 0;left: 0;z-index: 3000;width: 100%;display: table">
                <div style="background-color: white;display: table-cell;padding-top: 15px;padding-left:20px;width: 70%;">
                  合计：
                  <span style="font-size: 12px;color: red">￥</span>
                  <span style="color: #fc5967;padding-top: 10px;font-size: 22px">
                    {{money}}
                  </span>
                  </div>
                <div style="display: table-cell;color:white;padding-top: 15px;text-align: center;background-color: #fc5967;"
                     @click="goPlay">
                确认下单</div>
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
    import axios from 'axios';

    export default {
        name: 'v-ordereditor',
        props: {
        },
        data() {
            return {
              money: 0,
              orderCount: 1,
              value: 1,
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
              },
              // city
              showChose: false,
              showProvince: true,
              showCity: false,
              showDistrict: false,
              showCityList: false,
              showDistrictList: false,
              province: 1,
              city: 3,
              district: 57,
              GetProvinceId: 2,
              District: false,
              Province: false,
              City: false,
              // v-for循环判断是否为当前
              selected: false,
              info: []
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
          let self = this;
          axios.get('static/CityDatas.json', {
          }).then(function (response) {
            self.info = response.data.info;
          }).catch(function (response) {});
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
          numberClick(type) {
            if (type) {
              this.value = (this.value <= 1 ? 2 : this.value) - 1;
            } else {
              this.value = this.value + 1;
            }
            let commoney = this.details.sellingPrice.replace(new RegExp(',', 'gm'), '');
            this.money = Math.round((this.value * commoney) * 100) / 100;
            this.orderCount = this.value;
            // console.log(this.value);
          },
          checkInput(data) {},
          goPlay() {
            if (!this.Province || !this.details.address) {
              window.alert('请填写收货地址');
              return;
            }
            let Province = !this.Province ? this.Province : '';
            let City = !this.City ? this.City : '';
            let District = !this.District ? this.District : '';
            let proAddress = Province + City + District;
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
                  address: proAddress + this.details.address,
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
          },
          // city
          choseAdd: function() {
            this.showChose = true;
          },
          closeAdd: function() {
            this.showChose = false;
          },
          _filter(add, name, code) {
            let result = [];
            for (let i = 0; i < add.length; i++) {
              if (code === add[i].id) {
                result = add[i][name];
              }
            }
            return result;
          },
          getProvinceId: function(code, input, index) {
            this.province = code;
            this.Province = input;
            this.showProvince = false;
            this.showCity = true;
            this.showDistrict = false;
            this.showCityList = this._filter(this.info, 'city', this.province);
            // 点击选择当前
            this.info.map(function (item, index, array) {
              item.selected = false;
            });
            this.info[index].selected = true;
          },
          provinceSelected: function() {
            // 清除市级和区级列表
            this.showCityList = false;
            this.showDistrictList = false;
            // 清除市级和区级选项
            this.City = false;
            this.District = false;
            // 选项页面的切换
            this.showProvince = true;
            this.showCity = false;
            this.showDistrict = false;
          },
          getCityId: function(code, input, index) {
            this.city = code;
            this.City = input;
            this.showProvince = false;
            this.showCity = false;
            this.showDistrict = true;
            this.showDistrictList = this._filter(this.showCityList, 'district', this.city);
            // 选择当前添加active
            this.showCityList.map(function (item, index, array) {
              item.selected = false;
            });
            this.showCityList[index].selected = true;
          },
          citySelected: function() {
            this.showProvince = false;
            this.showCity = true;
            this.showDistrict = false;
          },
          getDistrictId: function(code, input, index) {
            this.district = code;
            this.District = input;
            // 选择当前添加active
            this.showDistrictList.map(function (item, index, array) {
              item.selected = false;
            });
            this.showDistrictList[index].selected = true;
            // 选取市区选项之后关闭弹层
            this.showChose = false;
          },
          districtSelected: function() {
            this.showProvince = false;
            this.showCity = false;
            this.showDistrict = true;
          }
        },
        components: {
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import 'ordereditor.styl';
</style>
