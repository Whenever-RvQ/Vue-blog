<template>
  <el-card>
    <div class="blog-comment blog-comment--editor">
      <textarea ref="textarea" class="blog-comment--input" v-model="commentVal" name="comment" autofocus></textarea>
      <el-button type="primary" @click="submitComment">提交</el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'CommentTextArea',
  inject: ['getArticleById'],
  props: {
    aid: {
      type: String
    }
  },
  data() {
    return {
      commentVal: ''
    };
  },
  mounted() {

  },
  methods: {
    focusTextarea() {
      this.$refs.textarea.focus();
    },
    async submitComment() {
      if (this.commentVal.trim().length === 0) {
        this.$notify.info({
          title: '请填写评论内容',
        })
        this.focusTextarea()
        return
      }
      try {
        await this.$api({ type: 'postComment', data: { aid: this.aid, content: this.commentVal } })
        this.$notify.success({
          title: '评论成功',
        })
        //inject 调用父组件的 getArticleById方法
        this.getArticleById()
      } catch (err) {
        this.$notify.error({
          title: '评论失败',
          message: err.message
        })
      }
      this.commentVal = ''
    }
  },
};
</script>

<style lang="scss" scoped></style>