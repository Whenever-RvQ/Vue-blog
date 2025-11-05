<template>
  <el-card class="blog-editor">
    <h3 class="blog-editor-title">标题</h3>
    <el-input ref="title"
              v-model="title"
              class="blog-editor-input"
              size="medium"
              placeholder="文章标题"></el-input>
    <h3 class="blog-editor-title">内容</h3>
    <div id="blog-editor-textarea">

    </div>
    <div class="blog-editor-button">
      <el-button type="primary"
                 @click="submitEditor">提交</el-button>
      <el-button type="primary"
                 @click="cancelEditor">重置</el-button>
    </div>

  </el-card>
</template>

<script>
import wangEditor from 'wangeditor'
const COLUMN_ID = '5fe756e7dcda945a1cbf6ff6'
export default {
  name: 'Editor',
  data () {
    return {
      editor: null,
      title: '',
      content: ''
    };
  },
  mounted () {
    const editor = new wangEditor(`#blog-editor-textarea`)
    editor.config.onchange = (newHtml) => {
      this.content = newHtml
    }
    editor.create()
    this.editor = editor
    this.editor.config.uploadImgServer = URL
    this.editor.config.uploadImgMaxSize = 5 * 1024 * 1024 // 5M
    this.editor.config.uploadImgAccept = ['jpg', 'jpeg', 'png', 'gif', 'bmp']
    this.editor.config.uploadImgMaxLength = 5
    this.editor.config.uploadFileName = 'file'
    this.editor.config.uploadImgHeaders = {
      'Authorization': `Bearer ${this.$store.state.token}`,
    }
  },
  methods: {
    submitEditor () {
      // 通过代码获取编辑器内容
      // let content = this.editor.txt.html()
      if (!this.validateEditor()) {
        return
      }
      this.postEditorData()

    },
    cancelEditor () {
      this.editor.txt.clear()
    },
    validateEditor () {
      if (this.title.trim().length === 0) {
        this.$notify.error({
          title: '错误',
          message: '请填写标题'
        })
        this.$refs.title.focus()
        return false
      }
      if (this.content.trim().length === 0) {
        this.$notify.error({
          title: '错误',
          message: '内容不能为空'
        })
        return false
      }
      return true
    },
    async postEditorData () {
      console.log('提交数据')
      try {
        this.$api({
          type: 'postArticle', data: {
            title: this.title,
            body: this.content,
            //TODO 封装column
            column: COLUMN_ID
          }
        })
        this.$notify.success({
          title: '成功',
          message: '文章提交成功'
        })
        this.$router.push('/index')
      } catch (err) {
        this.$notify.error({
          title: '错误',
          message: '提交失败'
        })
      }

    }
  },
  beforeDestroy () {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy()
    this.editor = null
  }
};
</script>

<style lang="stylus" >
.blog-editor-title
  padding 12px 0
  font-size 16px
.el-input--medium.blog-editor-input
  font-size 18px
  line-height 38px
  height 38px
.blog-editor-button
  padding-top 20px
  display flex
  justify-content space-around
  & button
    flex 1
    line-height 22px
    font-size 18px
</style>