<template>
  <el-aside width="100%">
    <el-card class="box-card blog-aside">
      <div class="blog-avatar">
        <img class="blog-avatar--pic"
             :src="src"
             alt="">
      </div>
      <div class="blog-info">
        <h3 class="blog-info--nicknam">{{userInfo.nikname}}</h3>
        <div class="blog-info--state">
          <div class="blog-state--item blog-line--col">
            <a href="#">
              <span class="blog-state--count">{{userInfo.articleCount}}</span>
              <span class="blog-state--name">文章</span>
            </a>
          </div>
          <div class="blog-state--item">
            <a href="#">
              <span class="blog-state--count">{{userInfo.columnCount}}</span>
              <span class="blog-state--name">分类</span>
            </a>
          </div>
        </div>
        <p class="blog-info--content">{{userInfo.signature}}</p>
      </div>
    </el-card>

  </el-aside>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'BaseAside',
  data () {
    return {

    };
  },
  computed: {
    ...mapGetters(['userInfo']),
    src(){
      return this.$store.state.userInfo.avator
    },

    articleCount(){
      return this.$store.state.userInfo.articleCount
    },
  },
  mounted () {

  },
  methods: {

  },
};
</script>

<style lang="stylus" >
@import '~assets/css/base.styl'
.blog-aside
  width 100%
  max-width 280px
  text-align center
.blog-slide-wrap
  padding 20px
  background-color line-modifier-color
  display flex
  flex-direction column
  align-items center
  text-align center
  border-radius radius-theme-size
.blog-avatar
  overflow hidden
  width 100px
  height 100px
  border-radius 50%
  margin 0 auto
.blog-avatar>img
  width: 100%
  height: 100%
.blog-info
  padding-top padding-space * 3
.blog-info--nicknam
  font-size 16px
  padding 0 0 padding-space
  margin 0
.blog-info--state
  display flex
  justify-content center
  padding padding-space padding-space * 2
.blog-state--item
  padding 0 padding-space * 1.5
  display: flex
  flex-direction column
  justify-content: center
.blog-state--item span
  display block
.blog-state--count
  color font-theme-color
  font-weight 700
.blog-state--name
  color font-modifier-color
.blog-info--content
  padding-top padding-space
  text-align left
  text-indent 2em
  font-size 12px
  color font-theme-color
/* slide end */
</style>