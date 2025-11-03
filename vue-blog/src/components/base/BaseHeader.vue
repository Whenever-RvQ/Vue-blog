<template>
  <el-row class="blog-header--wrap" type="flex" justify="flex-wrap" align="center">
    <el-col :span="2" :offset="1" :xs="{ span: 24 }" class="blog-logo--wrap">
      <div class="blog-head--logo">
        <el-image :src="require('@/assets/img/logo.jpg')" fit="cover"></el-image>
      </div>
    </el-col>
    <el-col class="hidden-xs-only" :span="16" :offset="2">
      <el-menu class="blog-head--menu" mode="horizontal" background-color="#2d2f33" text-color="#fff"
        active-text-color="#fff" default-active="/index" router>
        <el-menu-item index="/index">首页</el-menu-item>
        <el-menu-item index="/column">分类</el-menu-item>
        <el-menu-item index="/album">相册</el-menu-item>
        <el-menu-item index="/case">案例</el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="4" class="hidden-xs-only">
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

    }
  },
  created() {
    let isLogin = this.$store.state.token
    let nikname = this.userInfo?.nikname
    if (isLogin && !nikname) {
      this.$store.dispatch('getUserInfo')
    }
  },
  computed: {
    loginCompantent() {
      return this.$store.state.token ? 'UserImgAvatar' : 'UserLoginHead'
    },
    ...mapGetters(['userInfo'])
  },
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

</style>