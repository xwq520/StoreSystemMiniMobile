<template>
  <div class="list" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="100">
      <div v-for="data in dataResuts" @click="selectDetails(data)">
         <v-card :data="data" ></v-card>
      </div>
   <!--   <v-details ref="details" :detailsData="detailsData"></v-details>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import vCard from '../card/card.vue';
  import vDetails from '../details/details.vue';
  import {savaToLocal} from '../../common/js/store.js';
  import {post} from '../../common/HttpUtils';
  import {api} from '../../common/HttpConfig';
  export default
  {
    name: 'v-list',
    props: {
      type: {
        type: String
      }
    },
    components: {
      vCard,
      vDetails
    },
    data() {
      return {
        page: 1,
        busy: false,
        title: '',
        detailsData: {},
        dataResuts: []
      };
    },
    methods: {
      loadTop() {
        this.$store.commit('UPDATE_LOADING', true);
        // this.$http.get(`http://gank.io/api/data/${this.type}/10/${this.page}`).then((response) => {
      //  let response = {'body': this.dataTest};
       // this.datas = this.datas.concat(response.body.results);
        this.busy = false;
        this.$nextTick(() => {
         this.$store.commit('UPDATE_LOADING', false);
        });
        this.page++;
      },
      loadMore() {
        this.busy = true;
       // this.loadTop();
        this.loadDatas();
      },
      selectDetails(data) {
       // this.$store.commit('UPDATE_DETAILS', detailsData);
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

        this.$nextTick(() => {
          this.$store.commit('UPDATE_LOADING', false);
        });
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
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .list {
    padding: 15px;
  }
</style>
