<template>
  <el-row class="blog-header--wrap" type="flex" justify="flex-wrap" align="center">
    <el-col :span="2" :offset="1" :xs="{ span: 24 }" class="blog-logo--wrap">
      <div class="blog-head--logo">
        <el-image :src="require('@/assets/img/logo.jpg')" fit="cover"></el-image>
      </div>
    </el-col>
    <el-col class="hidden-xs-only" :span="12" :offset="1">
      <el-menu class="blog-head--menu" mode="horizontal" background-color="#2d2f33" text-color="#fff"
        active-text-color="#fff" :default-active=activeIndex router>
        <el-menu-item index="/index">首页</el-menu-item>
        <el-menu-item index="/column">分类</el-menu-item>
        <el-menu-item index="/album">相册</el-menu-item>
        <el-menu-item index="/socket">聊天</el-menu-item>
        <el-menu-item index="/case">案例</el-menu-item>
      </el-menu>
    </el-col>
    <el-col class="blog-search" :span="8" :offset="3">
      <el-input placeholder="请输入内容" v-model="searchVal" @keydown.native.enter="activeSearch">
        <i slot="suffix" class="el-input_icon el-icon-search" v-show="searchVal"></i>
      </el-input>
    </el-col>
    <el-col :span="4" :offset="4" class="hidden-xs-only">
      <component :is="loginCompantent"></component>
    </el-col>
  </el-row>
</template>

<script>
import UserImgAvatar from '@/components/user/UserImgAvatar'
import UserLoginHead from '@/components/user/UserLoginHead'
import { mapGetters } from 'vuex'
export default {
  name: 'BaseHeader',
  components: {
    UserImgAvatar, UserLoginHead
  },
  data() {
    return {
      activeIndex: '/index', // 初始化激活索引
      searchVal: ''
    }
  },
  created() {
    let isLogin = this.$store.state.token
    let nikname = this.userInfo?.nikname
    if (isLogin && !nikname) {
      this.$store.dispatch('getUserInfo')
    }
    this.updateActiveIndex();
  },
  computed: {
    loginCompantent() {
      return this.$store.state.token ? 'UserImgAvatar' : 'UserLoginHead'
    },
    ...mapGetters(['userInfo'])
  },
   watch: {
    // 监听路由变化
    $route() {
      this.updateActiveIndex();
    }
  },
  methods: {
    updateActiveIndex() {
      // 根据当前路由设置激活菜单项
      const path = this.$route.path;
      // 处理根路径
      if (path === '/') {
        this.activeIndex = '/index';
      } else {
        // 匹配菜单项
        const menuRoutes = [
        { pattern: /^\/index$/, index: '/index' },
        { pattern: /^\/column(?:\/.*)?$/, index: '/column' },
        { pattern: /^\/album(?:\/.*)?$/, index: '/album' },
        { pattern: /^\/case(?:\/.*)?$/, index: '/case' },
        { pattern: /^\/socket$/, index: '/socket' },
      ];
        const matchedRoute = menuRoutes.find(route => route.pattern.test(path));
        this.activeIndex = matchedRoute ? matchedRoute.index : '/index';
        console.log(this.activeIndex)
      }
    },
    activeSearch() {
      if (this.searchVal) {
        this.$EventBus.$emit('activeSearch', this.searchVal)
        this.searchVal=''
      }
    }
  }
};
</script>

<style lang="stylus">
@import '~assets/css/base.styl'
.blog-header
  background-color bg-reverse-color
.blog-header--wrap
  display flex
  align-items center
  height 60px
.blog-head--logo
  width 40px
  height 40px

.blog-head--logo
  overflow hidden
  border-radius 50%
  text-align center
  & img
    display block
    width auto
    height 40px
.el-menu.el-menu--horizontal.blog-head--menu
  height 60px
  border-bottom-color bg-reverse-color
.blog-header--login
  display flex
  align-items center
  color line-reverse-color

.blog-search
  width 300px !important
  position absolute !important
  left: 60% !important
  transform: translateX(-50%) !important
  margin: 0 auto !important
  text-align: center !important;
  display: flex !important
  align-items: center !important
.el-input__suffix
  right: 10px !important
  scale: 1.4
  font-weight 400
  color: black !important
  display: flex !important
  align-items: center !important
</style>