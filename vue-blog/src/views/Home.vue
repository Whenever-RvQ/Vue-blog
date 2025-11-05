<template>
  <div class="blog-page">
    <el-container class="blog-container" v-if="welcome">
      <el-header class="blog-header">
        <BaseHeader />
      </el-header>
      <el-container class="blog-middle">

        <el-row class="blog-middle--wrap" type="flex" justify="flex-wrap" align="center">
          <el-col :span="6" class="hidden-md-and-down">
            <BaseAside v-if="$store.state.token" />
          </el-col>

          <el-col :span="18" :lg="{ span: 24 }">
            <el-main class="blog-main">
              <keep-alive include="ArticleList">
                <router-view></router-view>

              </keep-alive>
            </el-main>
          </el-col>
          <el-col :span="2">
            <CircleMenu type='bottom' :number='2' :colors="[ '#ebc08e', '#e5b58d','#e19b60','#cc9b63','#cc9b63']" circle btn class="circle-menu">
              <router-link tag="i" slot="item_1" class="el-icon-edit" colors=[#f1f1f1,#f1f1f1,#f1f1f1,#f1f1f1,#f1f1f1] to="/editor"></router-link>
              <a slot="item_2" class="fa fa-weixin fa-lg" herf="#"></a>
              <a slot="item_3" class="fa fa-weibo fa-lg" herf="#"></a>
              <a slot="item_4" class="fa fa-github fa-lg" herf="#"></a>
            </CircleMenu>
          </el-col>
        </el-row>
      </el-container>
      <el-footer height="10vh" class="blog-footer">底部</el-footer>
    </el-container>
    <div v-else class="blog-welcome">
      <BaseWelcome />
    </div>
    <BaseModal />
  </div>

</template>

<script>
// @ is an alias to /src
import BaseModal from '@/components/base/BaseModal'
import BaseHeader from '@/components/base/BaseHeader'
import BaseAside from '@/components/base/BaseAside'
import BaseWelcome from '@/components/base/BaseWelcome'
import CircleMenu from 'vue-circle-menu'
import MINXIN from '@/core/minxin'
export default {
  name: 'Home',
  mixins: [MINXIN],
  components: {
    BaseModal, BaseHeader, BaseAside, BaseWelcome, CircleMenu

  },
  data() {
    return {
    }
  },
  computed: {
    welcome() {
      return this.$store.state.welcome
    }
  },
  methods: {

  }
}
</script>
<style lang="stylus">
.blog-container
  overflow hidden
.blog-middle
  padding 20px
  height calc(100vh - 60px - 10vh)
  background-color #f1f1f1
.el-main.blog-main
  padding 0 20px
  height 100%
.blog-middle--wrap
  min-width: 1220px
  width 100%
.blog-footer
  height 10vh
  background-color #2D2F33
.circle-menu i
  color: white
  scale: 1.2
.circle-menu i:hover
  scale: 1.5
</style>
