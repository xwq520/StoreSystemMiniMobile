<template>
  <div class="welfare-wrapper" v-infinite-scroll="loadMore"
       infinite-scroll-disabled="busy" infinite-scroll-distance="10"
       style="padding-top: 5px">
    <v-header></v-header>
    <!--左边展示图片-->
    <div class="welfare-center" style="margin-left: 10px">
      <figure v-show="leftData.length > 0" v-for="data in leftData" @click="selectDetails(data)">
        <v-img :imgUrl="data.previewImg" > </v-img>
        <div>
        <div class="welfare-div-title"  >
          {{data.headline.substring(0,15)}}</div>
        <div class="welfare-div-subtitle" >
          {{data.subtitle}}</div>
        <div class="welfare-div-money">
          <span style="color: red;">￥{{data.sellingPrice}}</span>
          <span class="welfare-div-oldmoney">￥{{data.originalPrice}}</span></div>
        </div>
      </figure>
    </div>
    <!--右边展示图片-->
    <div class="welfare-center">
      <figure v-show="rightData.length > 0" v-for="data in rightData" @click="selectDetails(data)">
        <v-img :imgUrl="data.previewImg"></v-img>
        <div>
          <div class="welfare-div-title"  >
            {{data.headline.substring(0,15)}}</div>
          <div class="welfare-div-subtitle" >
            {{data.subtitle}}</div>
          <div class="welfare-div-money">
            <span style="color: red;">￥{{data.sellingPrice}}</span>
            <span class="welfare-div-oldmoney">￥{{data.originalPrice}}</span></div>
        </div>
      </figure>
    </div>

    <!--<v-details ref="details" :time="time" :detailsData="detailsData"></v-details>-->
  </div>
</template>

<script>
  import vImg from '../lazyloadimg/lazyimg.vue';
  import {savaToLocal} from '../../common/js/store.js';
  import vHeader from '../header/header.vue';
  import {post} from '../../common/HttpUtils';
  import {api} from '../../common/HttpConfig';

  export default {
    data() {
      return {
        leftData: [],
        rightData: [],
        busy: false,
        page: 1,
        detailsData: {},
        time: '',
        dataResuts: []
      };
    },
    components: {
      vImg,
    //  vDetails,
      vHeader
    },
    created() {
      // this.loadDatas();
    },
    methods: {
      loadTop() {
        this.$store.commit('UPDATE_LOADING', true);
        // this.page = 4;
     //   this.$http.get(`https://gank.io/api/data/福利/10/${this.page}`).then((response) => {
         // let response = {'body': this.dataResuts};
          let left = this.dataResuts.filter((data, i) => {
            return (i + 1) % 2 === 1;
          });
          let right = this.dataResuts.filter((data, i) => {
            return (i + 1) % 2 !== 1;
          });
          this.leftData = this.leftData.concat(left);
          this.rightData = this.rightData.concat(right);
          this.busy = false;

        // $nextTick() 在dom 重新渲染完后执行
          this.$nextTick(() => {
            this.$store.commit('UPDATE_LOADING', false);
          });
        this.page++;
      },
      loadMore() {
        this.busy = true;
        this.loadDatas();
      },
      loadDatas() {
        post({
            url: api.api_home_page_list,
            curPage: this.page,
            data: { },
            success: (res) => {
              if (res && res.code > 0) {
                // this.page = 1;
                this.dataResuts = res.commodityHomeList;
                this.loadTop();
              }
            },
            error: (e) => {
              console.log(e);
            }
          }
        );
      },
      selectDetails(data) {
       // this.time = data;
       this.$store.commit('UPDATE_DETAILS', data);
       this.$store.commit('UPDATE_LOADING', true);
       this.$router.push({
          name: 'details',
          query: {
            'id': data.id,
            'commodityDetails': data.commodityDetails,
            'headline': data.headline,
            'subtitle': data.subtitle,
            'comNo': data.comNo,
            'originalPrice': data.originalPrice,
            'sellingPrice': data.sellingPrice,
            'inventory': data.inventory,
            'salesVolume': data.salesVolume
          }
        });
        savaToLocal('previewImg', 'previewImg', data.previewImg);
       // savaToLocal('commodityDetails', 'commodityDetails', data.commodityDetails);
        this.$nextTick(() => {
          this.$store.commit('UPDATE_LOADING', false);
        });
       // });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "welfare.styl";
</style>
