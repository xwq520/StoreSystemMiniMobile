<template>
  <div class="welfare-wrapper" v-infinite-scroll="loadMore"
       infinite-scroll-disabled="busy" infinite-scroll-distance="10"
       style="padding-top: 5px">
    <v-header></v-header>
    <!--左边展示图片-->
    <div class="welfare-center" style="margin-left: 10px">
      <figure v-show="leftData.length > 0" v-for="data in leftData" @click="selectDetails(data)">
        <v-img :imgUrl="data.url"> </v-img>
        <div>
        <div class="welfare-div-title">日本原本进口香兰</div>
        <div class="welfare-div-subtitle">规格：12盒/12月 花</div>
        <div class="welfare-div-money">
          <span style="color: red;">￥233.00</span>
          <span class="welfare-div-oldmoney">￥400.20</span></div>
        </div>
      </figure>
    </div>
    <!--右边展示图片-->
    <div class="welfare-center">
      <figure v-show="rightData.length > 0" v-for="data in rightData" @click="selectDetails(data)">
        <v-img :imgUrl="data.url"></v-img>
        <div>
          <div class="welfare-div-title">日本原本进口香兰</div>
          <div class="welfare-div-subtitle">规格：12盒/12月 花</div>
          <div class="welfare-div-money">
            <span style="color: red;">￥2,393.30</span>
            <span class="welfare-div-oldmoney">￥400.20</span></div>
        </div>
      </figure>
    </div>
    <!--<v-details ref="details" :time="time" :detailsData="detailsData"></v-details>-->
  </div>
</template>

<script>
  import vImg from '../lazyloadimg/lazyimg.vue';
  import vDetails from '../details/details.vue';
  import vHeader from '../header/header.vue';
  export default {
    data() {
      return {
        leftData: [],
        rightData: [],
        busy: false,
        page: 1,
        detailsData: {},
        time: '',
        dataTest: {
        'error': false,
        'results': [
        {
          '_id': '5aa5cc6a421aa9103ed33c7c',
          'createdAt': '2018-03-12T08:40:10.360Z',
          'desc': '3-12',
          'publishedAt': '2018-03-12T08:44:50.326Z',
          'source': 'chrome',
          'type': '\u798f\u5229',
          'url': 'https://img.alicdn.com/bao/uploaded/i3/1103226398/TB2DXh6oQ9WBuNjSspeXXaz5VXa_!!1103226398-0-item_pic.jpg_b.jpg',
          'used': true,
          'who': 'daimajia'
        },
        {
          '_id': '5a8e0c41421aa9133298a259',
          'createdAt': '2018-02-22T08:18:09.547Z',
          'desc': '2-22',
          'publishedAt': '2018-02-22T08:24:35.209Z',
          'source': 'chrome',
          'type': '\u798f\u5229',
          'url': 'https://img.alicdn.com/bao/uploaded/i1/2114492176/TB2iqE4ohWYBuNjy1zkXXXGGpXa_!!2114492176-0-item_pic.jpg_b.jpg',
          'used': true,
          'who': '\u4ee3\u7801\u5bb6'
        },
        {
          '_id': '5a7b93d2421aa90d2cd3d7f8',
          'createdAt': '2018-02-08T08:03:30.905Z',
          'desc': '2-8',
          'publishedAt': '2018-02-08T08:13:24.479Z',
          'source': 'chrome',
          'type': '\u798f\u5229',
          'url': 'https://img.alicdn.com/bao/uploaded/i1/1700389626/TB1ZqqToQCWBuNjy0FaXXXUlXXa_!!0-item_pic.jpg_b.jpg',
          'used': true,
          'who': 'daimajia'
        },
        {
          '_id': '5a6e5f88421aa9115696004f',
          'createdAt': '2018-01-29T07:40:56.269Z',
          'desc': '1-29',
          'publishedAt': '2018-01-29T07:53:57.676Z',
          'source': 'chrome',
          'type': '\u798f\u5229',
          'url': 'https://img.alicdn.com/bao/uploaded/i1/2114492176/TB2iqE4ohWYBuNjy1zkXXXGGpXa_!!2114492176-0-item_pic.jpg_b.jpg',
          'used': true,
          'who': 'daimajia'
        },
        {
          '_id': '5a65381a421aa91156960022',
          'createdAt': '2018-01-22T09:02:18.715Z',
          'desc': '1-22',
          'publishedAt': '2018-01-23T08:46:45.132Z',
          'source': 'chrome',
          'type': '\u798f\u5229',
          'url': 'https://img.alicdn.com/bao/uploaded/i3/1103226398/TB2DXh6oQ9WBuNjSspeXXaz5VXa_!!1103226398-0-item_pic.jpg_b.jpg',
          'used': true,
          'who': 'daimajia'
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
          'desc': '1-9',
          'publishedAt': '2018-01-10T07:57:19.486Z',
          'source': 'chrome',
          'type': '\u798f\u5229',
          'url': 'https://img.alicdn.com/bao/uploaded/i3/1103226398/TB2DXh6oQ9WBuNjSspeXXaz5VXa_!!1103226398-0-item_pic.jpg_b.jpg',
          'used': true,
          'who': 'daimajia'
        },
        {
          '_id': '5a443fcb421aa90fe72536ed',
          'createdAt': '2017-12-28T08:50:19.747Z',
          'desc': '12-28',
          'publishedAt': '2018-01-04T13:45:57.211Z',
          'source': 'chrome',
          'type': '\u798f\u5229',
          'url': 'https://img.alicdn.com/bao/uploaded/i1/2114492176/TB2iqE4ohWYBuNjy1zkXXXGGpXa_!!2114492176-0-item_pic.jpg_b.jpg',
          'used': true,
          'who': '\u4ee3\u7801\u5bb6'
        },
        {
          '_id': '5a4ad432421aa90fe2f02d1a',
          'createdAt': '2018-01-02T08:37:06.235Z',
          'desc': '1-2',
          'publishedAt': '2018-01-02T08:43:32.216Z',
          'source': 'chrome',
          'type': '\u798f\u5229',
          'url': 'https://img.alicdn.com/bao/uploaded/i3/1103226398/TB2DXh6oQ9WBuNjSspeXXaz5VXa_!!1103226398-0-item_pic.jpg_b.jpg',
          'used': true,
          'who': 'daimajia'
        },
        {
          '_id': '5a431acd421aa90fe50c02a8',
          'createdAt': '2017-12-27T12:00:13.664Z',
          'desc': '12-27',
          'publishedAt': '2017-12-27T12:13:22.418Z',
          'source': 'chrome',
          'type': '\u798f\u5229',
          'url': 'https://img.alicdn.com/bao/uploaded/i1/1700389626/TB1ZqqToQCWBuNjy0FaXXXUlXXa_!!0-item_pic.jpg_b.jpg',
          'used': true,
          'who': 'daimajia'
        },
         {
            '_id': '5a4ad432421aa90fe2f02d1a',
            'createdAt': '2018-01-02T08:37:06.235Z',
            'desc': '1-2',
            'publishedAt': '2018-01-02T08:43:32.216Z',
            'source': 'chrome',
            'type': '\u798f\u5229',
            'url': 'https://img.alicdn.com/bao/uploaded/i3/1103226398/TB2DXh6oQ9WBuNjSspeXXaz5VXa_!!1103226398-0-item_pic.jpg_b.jpg',
            'used': true,
            'who': 'daimajia'
          },
          {
            '_id': '5a431acd421aa90fe50c02a8',
            'createdAt': '2017-12-27T12:00:13.664Z',
            'desc': '12-27',
            'publishedAt': '2017-12-27T12:13:22.418Z',
            'source': 'chrome',
            'type': '\u798f\u5229',
            'url': 'https://img.alicdn.com/bao/uploaded/i1/1700389626/TB1ZqqToQCWBuNjy0FaXXXUlXXa_!!0-item_pic.jpg_b.jpg',
            'used': true,
            'who': 'daimajia'
          }
      ]
        }
      };
    },
    components: {
      vImg,
      vDetails,
      vHeader
    },
    created() {
    },
    methods: {
      loadTop() {
        this.$store.commit('UPDATE_LOADING', true);
         this.page = 4;
     //   this.$http.get(`https://gank.io/api/data/福利/10/${this.page}`).then((response) => {
          let response = {'body': this.dataTest};
          let left = response.body.results.filter((data, i) => {
            return (i + 1) % 2 === 1;
          });
          let right = response.body.results.filter((data, i) => {
            return (i + 1) % 2 !== 1;
          });
          this.leftData = this.leftData.concat(left);
          this.rightData = this.rightData.concat(right);
          this.busy = false;
        // $nextTick() 在dom 重新渲染完后执行
          this.$nextTick(() => {
            this.$store.commit('UPDATE_LOADING', false);
          });
      },
      loadMore() {
        this.busy = true;
        this.loadTop();
        this.page++;
      },
      selectDetails(data) {
       // this.time = data;
       this.$store.commit('UPDATE_DETAILS', data);
       this.$store.commit('UPDATE_LOADING', true);
       // let object = objectDate(this.time);
       // this.detailsData = data;
        this.$router.push('details');
      //  this.$http.get(`http://gank.io/api/history/content/day/${object.Y}/${object.M}/${object.D}`).then((response) => {
         // let data = response.body.results;
         // this.detailsData = data[0];
         // this.$refs.details.show();
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
