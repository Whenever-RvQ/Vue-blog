<template>
  <el-card v-if="commentLength">
    <div class="blog-comment blog-comment--list">
      <h3>评论列表</h3>
      <ul>
        <CommentItem v-for="comment in comments"
                     :key="comment.id"
                     :uid="comment.uid"
                     :content="comment.content"
                     :date="comment.date" />
      </ul>
    </div>
  </el-card>
</template>

<script>
import CommentItem from '@/components/comment/CommentItem'
export default {
  name: 'CommentList',
  components: {
    CommentItem
  },
  props: {
    comments: {
      type: Array,
    }
  },
  data () {
    return {

    };
  },
  computed: {
    commentLength () {
      return this.comments?.length || 0
    },
    uid () {
      return this.comments
    }
  },
  mounted () {

  },
  methods: {

  },
};
</script>

<style lang="stylus" >
@import '~assets/css/base.styl'
.blog-comment
  font-size 16px
  background-color line-modifier-color
  border-radius radius-theme-size
  margin-top padding-space * 2
  & h3
    padding padding-space
.blog-comment--editor
  padding 20px
  display flex
  flex-direction column
  justify-content space-between
  text-align center
  height 240px
  &>textarea
    padding padding-space
    height 120px
    resize none
.blog-comment--list
  padding 20px 0
  background-color bg-theme-color
.blog-comment--item
  margin-bottom padding-space
  padding padding-space * 2
  background-color line-modifier-color
.blog-comment--user
  display flex
  align-items center
  padding padding-space 0
  font-size 14px
  line-height 24px
.blog-comment--avatar
  overflow hidden
  width 24px
  height 24px
  border-radius 50%
  &>img
    width 24px
    height auto
.blog-comment--name
  padding-top 6px
  padding-left padding-space
  color font-theme-color
.blog-comment-content
  overflow hidden
  padding 20px 0
  word-wrap break-word
  word-break break-word
  color #666
.blog-comment-date
  text-align right
</style>