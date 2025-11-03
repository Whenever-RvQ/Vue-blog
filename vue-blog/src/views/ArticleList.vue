<template>

  <div class="article-wrap"
       v-if="articles">
    <Scroll @handle-scroll="handleScroll">
      <el-card class="blog-content--item"
               v-for="item in articles"
               :key="item.id">
        <CardArticleItem :article="item" />
      </el-card>
    </Scroll>
  </div>

</template>

<script>
import CardArticleItem from '@/components/card/CardArticleItem'
const TH = 200;
export default {
  name: 'ArticleList',
  components: {
    CardArticleItem
  },
  data () {
    return {
      articles: [],
      loading: false

    };
  },
  created () {
    this.$api({ type: 'articles' }).then(result => {
      this.articles = result.list
      // console.log(this.articles)
    }).catch(err => {
      this.$notify.success({
        title: '获取失败',
        message: err.message
      })
    })
  },
  mounted () {

  },
  methods: {
    handleScroll (vertical, horizontal, nativeEvent) {
      if (!this.loading) {
        let st = vertical.scrollTop
        let sh = nativeEvent.srcElement.scrollHeight - nativeEvent.srcElement.clientHeight
        if (st + TH > sh) {
          console.log('加载更多')
          this.loading = true
          this.getArticles()
        }
      }
    },
    getArticles () {
      this.$api({ type: 'articles' }).then(result => {
        this.articles.push(...result.list)
        this.loading = false
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

<style lang="stylus" >
.article-wrap
  overflow hidden
  height 100%
</style>