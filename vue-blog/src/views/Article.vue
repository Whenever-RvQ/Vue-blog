<template>
  <div>
    <ArticleContent :article="this.article" />
    <CommentTextArea :aid="article._id" />
    <CommentList :comments="article.comments" />
  </div>
</template>

<script>
// import { get } from 'store';
import ArticleContent from '@/components/article/ArticleContent'
import CommentTextArea from '@/components/comment/CommentTextArea'
import CommentList from '@/components/comment/CommentList'
export default {
  name: 'Article',
  components: {
    ArticleContent, CommentTextArea, CommentList
  },
  data() {
    return {
      id: '',
      article: {}
    };
  },
    provide () {
    return {
      getArticleById: this.getArticleById
    }
  },
  created() {
    this.id = this.$route.params.id
  },

  mounted() {
    this.getArticleById()
  },
  methods: {
    getArticleById() {
      this.$api({ type: 'getArticleById', data: { id: this.id } }).then(result => {
        this.article = result
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
.blog-main--card
  width 100%
</style>