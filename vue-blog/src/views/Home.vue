<template>
  <div class="blog-page">
    <el-container class="blog-container" v-if="welcome">
      <el-header class="blog-header">
        <BaseHeader />
      </el-header>
      <el-container class="blog-middle">

        <el-row class="blog-middle--wrap" type="flex" justify="flex-wrap" align="center">
          <el-col :span="6" class="hidden-md-and-down">
            <BaseAside v-if="$store.state.userInfo" />
          </el-col>

          <el-col :span="18" :lg="{ span: 24 }">
            <el-main class="blog-main">
              <keep-alive include="ArticleList">
                <router-view v-if="isRouteLoading" :loading="loading"></router-view>
              </keep-alive>
            </el-main>
          </el-col>
          <el-col :span="1">
            <CircleMenu type='bottom' :number='3' :colors="['#ebc08e', '#ebc08e', '#ebc08e', '#ebc08e', '#ebc08e']"
              circle btn class="circle-menu" v-if="index">
              <router-link tag="i" slot="item_1" class="el-icon-edit" to="/editor"></router-link>
              <router-link tag="i" slot="item_2" class="el-icon-star-on" to="/like"></router-link>
              <i slot="item_3" class="el-icon-refresh-left" @click="refreshAll()"></i>

            </CircleMenu>
            <CircleMenu type='bottom' :number='3' :colors="['#ebc08e', '#ebc08e', '#ebc08e', '#ebc08e', '#ebc08e']"
              circle btn class="circle-menu" v-if="articletools">
              <router-link tag="i" slot="item_1" class="el-icon-edit" to="/editor"></router-link>
              <router-link tag="i" slot="item_2" class="el-icon-star-on" to="/like"></router-link>
              <router-link tag="i" slot="item_3" class="el-icon-download" to="/download"></router-link>
            </CircleMenu>
            <CircleMenu type='bottom' :number='2' :colors="['#ebc08e', '#ebc08e', '#ebc08e', '#ebc08e', '#ebc08e']"
              circle btn class="circle-menu" v-if="columntools">
              <i tag="i" slot="item_1" class="el-icon-circle-plus-outline" @click="addColumn"></i>
              <i tag="i" slot="item_2" class="el-icon-delete" @click="deleteColumn"></i>
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
      loading: false,
      isRouteLoading: true
    }
  },

  provide() {
    return {
      'closeLoadClock': this.closeLoadClock
    }
  },
  computed: {
    welcome() {
      return this.$store.state.welcome
    },
    index() {
      return this.$route.path === '/index'
    },
    articletools() {
      const basicPath = /^\/article\/.*/
      return basicPath.test(this.$route.path)
    },
    columntools() {
      return this.$route.path === '/column'
    },
    userInfo() {
      return this.$store.state.userInfo
    }
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.path === '/index') {
        vm.refreshData();
      }
    });
  },
  beforeRouteUpdate(to, from, next) {
    if (to.path === '/index') {
      this.reload()

    }
    if (this.$route.path === '/index') {
      this.reload()
    }
    next();
  },
  mounted() {
    // 页面挂载时也可以检查一次
    if (this.$route.path === '/index') {

      this.reload()
    }
  },
  watch: {
    userInfo: {
      deep: true,
    }
  },
  methods: {
    //重载route-view
    reload(){
      this.isRouteLoading = false
      this.$nextTick(() => {
        this.isRouteLoading = true
      });
    },
    closeLoadClock() {
      this.loading = false
    },
    addColumn(){
      this.refreshModal('postColumn')
    },
    deleteColumn(){
      this.refreshModal('deleteColumn')
    },
    refreshData() {
      if (this.$store.state.token) {
        this.$store.dispatch('getUserInfo');
      }
    },
    refreshAll() {
      console.log('refreshAll')
      location.reload()
    }
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
.circle-menu
  margin-top: 1vh
  width: 55%
  scale: 0.8
.circle-menu i
  color: white
  scale: 1.2
  transform: transition( all 0.3s ease )
.circle-menu i:hover
  scale: 1.5
  transform: transition( all 0.3s ease )

</style>
