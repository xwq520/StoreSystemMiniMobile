<template>
  <div class="list" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="100">
      <div v-for="data in datas" @click="selectDetails(data)">
         <v-card :data="data" ></v-card>
      </div>
   <!--   <v-details ref="details" :detailsData="detailsData"></v-details>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import vCard from '../card/card.vue';
  import vDetails from '../details/details.vue';
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
        datas: [],
        page: 1,
        busy: false,
        title: '',
        detailsData: {},
        dataTest: {
          'error': false,
          'results': [
            {
              '_id': '5aa5cc6a421aa9103ed33c7c',
              'createdAt': '2018-03-12T08:40:10.360Z',
              'desc': 'HANAJIRUSHI/花印 薏苡仁化妆水 补水保湿',
              'publishedAt': '2018-03-12T08:44:50.326Z',
              'source': 'chrome',
              'type': '\u798f\u5229',
              'url': 'https://img.alicdn.com/bao/uploaded/i3/1103226398/TB2DXh6oQ9WBuNjSspeXXaz5VXa_!!1103226398-0-item_pic.jpg_b.jpg',
              'used': true,
              'who': '化妆水爽肤水护肤品'
            },
            {
              '_id': '5a8e0c41421aa9133298a259',
              'createdAt': '2018-02-22T08:18:09.547Z',
              'desc': 'Yamada Bee Farm/山田养蜂场 美白化妆水 日本医药部外品 提亮肤色',
              'publishedAt': '2018-02-22T08:24:35.209Z',
              'source': 'chrome',
              'type': '\u798f\u5229',
              'url': 'https://img.alicdn.com/bao/uploaded/i1/2114492176/TB2iqE4ohWYBuNjy1zkXXXGGpXa_!!2114492176-0-item_pic.jpg_b.jpg',
              'used': true,
              'who': '爽肤水化妆水护肤品套装'
            },
            {
              '_id': '5a7b93d2421aa90d2cd3d7f8',
              'createdAt': '2018-02-08T08:03:30.905Z',
              'desc': 'HANAJIRUSHI/花印 薏苡仁化妆水 补水保湿',
              'publishedAt': '2018-02-08T08:13:24.479Z',
              'source': 'chrome',
              'type': '\u798f\u5229',
              'url': 'https://img.alicdn.com/bao/uploaded/i1/1700389626/TB1ZqqToQCWBuNjy0FaXXXUlXXa_!!0-item_pic.jpg_b.jpg',
              'used': true,
              'who': '薏苡仁化妆水 补水保湿'
            },
            {
              '_id': '5a6e5f88421aa9115696004f',
              'createdAt': '2018-01-29T07:40:56.269Z',
              'desc': 'HANAJIRUSHI/花印 薏苡仁化妆水 补水保湿',
              'publishedAt': '2018-01-29T07:53:57.676Z',
              'source': 'chrome',
              'type': '\u798f\u5229',
              'url': 'https://img.alicdn.com/bao/uploaded/i1/2114492176/TB2iqE4ohWYBuNjy1zkXXXGGpXa_!!2114492176-0-item_pic.jpg_b.jpg',
              'used': true,
              'who': '花印 薏苡仁化妆水 补水保湿'
            },
            {
              '_id': '5a65381a421aa91156960022',
              'createdAt': '2018-01-22T09:02:18.715Z',
              'desc': '日本植物超保湿乳液+爽肤水化妆水护肤品套装',
              'publishedAt': '2018-01-23T08:46:45.132Z',
              'source': 'chrome',
              'type': '\u798f\u5229',
              'url': 'https://img.alicdn.com/bao/uploaded/i3/1103226398/TB2DXh6oQ9WBuNjSspeXXaz5VXa_!!1103226398-0-item_pic.jpg_b.jpg',
              'used': true,
              'who': '爽肤水化妆水护肤品套装'
            },
            {
              '_id': '5a5bfc29421aa9115489927b',
              'createdAt': '2018-01-15T08:56:09.429Z',
              'desc': '1-15',
              'publishedAt': '2018-01-16T08:40:08.101Z',
              'source': 'chrome',
              'type': '\u798f\u5229',
              'url': 'https://img.alicdn.com/bao/uploaded/i1/TB1uYopSXXXXXbeXVXXXXXXXXXX_!!0-item_pic.jpg_b.jpg',
              'used': true,
              'who': 'daimajia'
            },
            {
              '_id': '5a5411fb421aa90fef2035f3',
              'createdAt': '2018-01-09T08:51:07.91Z',
              'desc': '日本植物超保湿乳液+爽肤水化妆水护肤品套装',
              'publishedAt': '2018-01-10T07:57:19.486Z',
              'source': 'chrome',
              'type': '\u798f\u5229',
              'url': 'https://img.alicdn.com/bao/uploaded/i3/1103226398/TB2DXh6oQ9WBuNjSspeXXaz5VXa_!!1103226398-0-item_pic.jpg_b.jpg',
              'used': true,
              'who': '爽肤水化妆水护肤品套装'
            },
            {
              '_id': '5a443fcb421aa90fe72536ed',
              'createdAt': '2017-12-28T08:50:19.747Z',
              'desc': 'Yamada Bee Farm/山田养蜂场 美白化妆水 日本医药部外品 提亮肤色',
              'publishedAt': '2018-01-04T13:45:57.211Z',
              'source': 'chrome',
              'type': '\u798f\u5229',
              'url': 'https://img.alicdn.com/bao/uploaded/i1/2114492176/TB2iqE4ohWYBuNjy1zkXXXGGpXa_!!2114492176-0-item_pic.jpg_b.jpg',
              'used': true,
              'who': '日本植物超保湿乳液'
            },
            {
              '_id': '5a4ad432421aa90fe2f02d1a',
              'createdAt': '2018-01-02T08:37:06.235Z',
              'desc': '日本植物超保湿乳液+爽肤水化妆水护肤品套装',
              'publishedAt': '2018-01-02T08:43:32.216Z',
              'source': 'chrome',
              'type': '\u798f\u5229',
              'url': 'https://img.alicdn.com/bao/uploaded/i3/1103226398/TB2DXh6oQ9WBuNjSspeXXaz5VXa_!!1103226398-0-item_pic.jpg_b.jpg',
              'used': true,
              'who': '日本植物超保湿乳液'
            },
            {
              '_id': '5a431acd421aa90fe50c02a8',
              'createdAt': '2017-12-27T12:00:13.664Z',
              'desc': 'Yamada Bee Farm/山田养蜂场 美白化妆水 日本医药部外品 提亮肤色',
              'publishedAt': '2017-12-27T12:13:22.418Z',
              'source': 'chrome',
              'type': '\u798f\u5229',
              'url': 'https://img.alicdn.com/bao/uploaded/i1/1700389626/TB1ZqqToQCWBuNjy0FaXXXUlXXa_!!0-item_pic.jpg_b.jpg',
              'used': true,
              'who': '日本植物超保湿乳液'
            },
            {
              '_id': '5a4ad432421aa90fe2f02d1a',
              'createdAt': '2018-01-02T08:37:06.235Z',
              'desc': 'HANAJIRUSHI/花印 薏苡仁化妆水 补水保湿',
              'publishedAt': '2018-01-02T08:43:32.216Z',
              'source': 'chrome',
              'type': '\u798f\u5229',
              'url': 'https://img.alicdn.com/bao/uploaded/i3/1103226398/TB2DXh6oQ9WBuNjSspeXXaz5VXa_!!1103226398-0-item_pic.jpg_b.jpg',
              'used': true,
              'who': '爽肤水化妆水护肤品套装'
            },
            {
              '_id': '5a431acd421aa90fe50c02a8',
              'createdAt': '2017-12-27T12:00:13.664Z',
              'desc': '日本植物超保湿乳液',
              'publishedAt': '2017-12-27T12:13:22.418Z',
              'source': 'chrome',
              'type': '\u798f\u5229',
              'url': 'https://img.alicdn.com/bao/uploaded/i1/1700389626/TB1ZqqToQCWBuNjy0FaXXXUlXXa_!!0-item_pic.jpg_b.jpg',
              'used': true,
              'who': '日本植物超保湿乳液+爽肤水化妆水护肤品套装'
            }
          ]
        }
      };
    },
    methods: {
      loadTop() {
        this.$store.commit('UPDATE_LOADING', true);
        // this.$http.get(`http://gank.io/api/data/${this.type}/10/${this.page}`).then((response) => {
          let response = {'body': this.dataTest};
          this.datas = this.datas.concat(response.body.results);
          this.busy = false;
          this.$nextTick(() => {
          this.$store.commit('UPDATE_LOADING', false);
        });
      },
      loadMore() {
        this.busy = true;
        this.loadTop();
        this.page++;
      },
      selectDetails(detailsData) {
        this.$store.commit('UPDATE_DETAILS', detailsData);
        this.$store.commit('UPDATE_LOADING', true);
        this.detailsData = detailsData;
        this.$router.push('details');
        // this.$refs.details.show();
        this.$nextTick(() => {
          this.$store.commit('UPDATE_LOADING', false);
        });
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .list {
    padding: 15px;
  }
</style>
