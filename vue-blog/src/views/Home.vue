<template>
  <div class="blog-page">
    <el-container class="blog-container">
      <el-header class="blog-header">
        <BaseHeader />
      </el-header>
      <el-container class="blog-middle">

        <el-row class="blog-middle--wrap"
                type="flex"
                justify="flex-wrap"
                align="center">
          <el-col :span="6"
                  class="hidden-xs-only">
            <BaseAside v-if="$store.state.token" />
          </el-col>
          <el-col :span="18">
            <el-main class="blog-main">
              <keep-alive include="ArticleList">
              <router-view></router-view>

              </keep-alive>
            </el-main>
          </el-col>
        </el-row>
      </el-container>
      <el-footer height="10vh"
                 class="blog-footer">底部</el-footer>
    </el-container>

    <BaseModal />
  </div>
</template>

<script>
// @ is an alias to /src
import BaseModal from '@/components/base/BaseModal'
import BaseHeader from '@/components/base/BaseHeader'
import BaseAside from '@/components/base/BaseAside'
export default {
  name: 'Home',
  components: {
    BaseModal, BaseHeader, BaseAside

  },
  data () {
    return {
    }
  },
  methods: {

  }
}
</script>
<style lang="stylus" >
.blog-container
  overflow hidden
  height 100%
.blog-middle
  padding 20px
  height calc(100vh - 60px - 10vh)
  background-color #f1f1f1
.el-main.blog-main
  padding 0 20px
  height 100%
.blog-middle--wrap
  width 100%
.blog-footer
  height 10vh
  background-color #2D2F33
</style>
