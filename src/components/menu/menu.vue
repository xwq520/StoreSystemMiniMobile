<template>
  <div class="menu">
    <div class="menu-list"  :class="{'show': show}">
      <div class="menu-header">
        <img class="menu-avatar" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2474005481,3977274516&fm=27&gp=0.jpg"
          alt="">
        <div class="menu-title">xiangwq && fhonghu</div>
      </div>
      <div class="menu-ul">
        <div v-for='menu in menus' @click="updateHeader(MENU_CONVERT[menu], menu)">
          <router-link class="icon-quanbu iconfont item border-1px" :to="menu">
            <div class="menu-icon">
              <i class="iconfont " :class="'icon-'+ menu"></i>
            </div>
            <span class="menu-text">{{MENU_CONVERT[menu]}}</span>
            <div class="menu-new" v-show="menu ==='ios' && news>0">
              <span>5</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="menu-other">
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  // const MENU_CONVERT = { 'welfare': '我的宝贝', 'day': '新品上架', 'ios': '热销榜', android: 'Android', web: '折扣' };
  const MENU_CONVERT = { 'welfare': '宝贝们', 'day': '热销榜', 'ios': '新品哟', 'web': '折扣品' };
  export default
    {
      name: 'v-menu',
      props: {
        show: {
          type: Boolean
        }
      },
      data() {
        return {
          MENU_CONVERT: MENU_CONVERT
        };
      },
      computed: {
      ...mapState([
        'menus', 'news'
      ])
      },
      methods: {
        updateHeader(title, menu) {
          this.$store.commit('UPDATE_TITLE', title);
           this.$store.commit('UPDATE_MENUSHOW');
           if (menu === 'day') {
              this.$store.commit('UPDATE_NEWS');
           }
        }
      }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import 'menu.styl';

</style>
