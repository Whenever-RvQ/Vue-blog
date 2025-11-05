<template>

  <div class="article-wrap" v-if="articles">
    <Scroll @handle-scroll="loadMore" ref="scrollView">
      <el-card class="blog-content--item" 
                v-for="item in articles" 
                :key="item.id">
        <router-link :to="{name:'article', params: { id: item._id }}">
          <ArticleItem :article="item" />
        </router-link>
      </el-card>
    </Scroll>
  </div>

</template>

<script>
import ArticleItem from '@/components/article/ArticleItem'
import _ from 'loadsh'
const TH = 200;
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  data() {
    return {
      articles: [],
      loading: false,
      page: 1,
      size: 200,
      scrollTop: 0
    };
  },

  activated() {
    if (this.scrollTop) {
      this.$refs['scrollView'].scrollTo({
        y: this.scrollTop
      }, 300)
    }
  },

  created() {
    this.getArticles()

  },
  mounted() {

  },
  methods: {
    routeArticle(id) {
      this.$router.push({ name: 'article', params: { id: id } })
    },

    loadMore: _.throttle(function (vertical, horizontal, nativeEvent) {
      this.scrollTop = vertical.scrollTop

      if (this.loading) {
        return
      }
      let st = vertical.scrollTop
      let sh = nativeEvent.srcElement.scrollHeight - nativeEvent.srcElement.clientHeight

      if (st + TH > sh) {
        console.log('加载更多')
        this.loading = true
        this.getArticles()
      }
    }, 500, false),
    getArticles() {
      this.$api({ type: 'articles', data: { size: this.size, page: this.page } }).then(result => {
        if (this.articles.length >= result.total) {
          //没有更多了
          console.log('没有更多了')
          return
        }
        this.articles.push(...result.list)
        this.loading = false
        this.page++
      }).catch(err => {
        this.$notify.success({
          title: '获取失败',
          message: err.message
        })
      })
    }
  },
};
</script>

<style lang="stylus">
.article-wrap
  overflow hidden
  height 100%
</style>