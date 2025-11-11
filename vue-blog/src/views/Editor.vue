<template>
  <el-card class="blog-editor">
    <h3 class="blog-editor-title">标题</h3>
    <el-input ref="title" v-model="title" class="blog-editor-input" size="medium" placeholder="文章标题"></el-input>
    <h3 class="blog-editor-title">内容</h3>
    <div id="blog-editor-textarea">

    </div>
    <h3 class="blog-editor-title">分类</h3>
    <div class="blog-editor-columns">
      <div v-for="tag in columns" :key="tag.id" class="blog-editor-tag" :class="{ 'selected': column === tag.id }"
        @click="selectColumn(tag.id)">{{ tag.name }}</div>
    </div>
    <div class="blog-editor-button">
      <el-button type="primary" @click="submitEditor" class="btn-feature">提交</el-button>
      <el-button type="primary" @click="cancelEditor" class="btn-feature">重置</el-button>
    </div>

  </el-card>
</template>

<script>
import wangEditor from 'wangeditor'
const COLUMN_ID = '5fe756e7dcda945a1cbf6ff6'
export default {
  name: 'Editor',
  data() {
    return {
      editor: null,
      title: '',
      content: '',
      columns: [],
      column: ''
    };
  },

  created() {
    this.getColumns()
  },
  mounted() {

    const editor = new wangEditor(`#blog-editor-textarea`)
    const URL = 'http://127.0.0.1:3000/upload/article'
    editor.config.onchange = (newHtml) => {
      this.content = newHtml
    }
    this.editor = editor
    this.editor.config.uploadImgServer = URL
    this.editor.config.uploadImgMaxSize = 100 * 1024 * 1024 // 5M
    this.editor.config.uploadImgAccept = ['jpg', 'jpeg', 'png', 'gif', 'bmp']
    this.editor.config.uploadImgMaxLength = 5
    this.editor.config.uploadFileName = 'file'
    this.editor.config.uploadImgHeaders = {
      'Authorization': `Bearer ${this.$store.state.token}`,
    }
    editor.create()
  },
  methods: {
    async getColumns() {
      try {
        let columns = await this.$api({ type: 'columns' })
        this.columns = columns.list.map(item => {
          return {
            id: item._id,
            name: item.name
          }
        })
        console.log(this.columns)
      } catch (err) {
        console.log(err)
      }
    },

    selectColumn(id) {
      this.column = this.column === id ? '' : id
    },
    submitEditor() {
      // 通过代码获取编辑器内容
      // let content = this.editor.txt.html()
      if (!this.validateEditor()) {
        return
      }
      this.postEditorData()

    },
    cancelEditor() {
      this.editor.txt.clear()
    },
    getCover() {
      let coverSrc = this.content.match(/src="([^"']*?)"/)?.[1] || undefined
      return coverSrc
    },
    validateEditor() {
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
    async postEditorData() {
      console.log('提交数据')
      let postData = {
        title: this.title,
        body: this.content,
        cover: this.getCover(),
        column: this.column || COLUMN_ID
      }
      console.log(postData)
      try {
        this.$api({
          type: 'postArticle', data: JSON.parse(JSON.stringify(postData))
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
  beforeDestroy() {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy()
    this.editor = null
  }
};
</script>

<style lang="stylus">
.blog-editor-title
  padding 12px 0
  font-size 16px
.el-input--medium.blog-editor-input
  font-size 18px
  line-height 38px
  height 38px
.blog-editor-columns
  display flex
  flex-wrap wrap
  gap 10px
  margin-bottom 20px
.blog-editor-tag
  position: relative;
  padding: 6px 8px;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--primary);
  background: transparent;
  border: 1px solid;
  border-image: linear-gradient(135deg, var(--primary), var(--accent)) 1;
  cursor: pointer;
  transition: var(--transition);
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  z-index: 1;
  &.selected
    color: white;
    background: linear-gradient(135deg, var(--primary), var(--accent));
    box-shadow: 0 12px 25px rgba(45, 127, 249, 0.35);
    transform: scale(1.03);
    border-image: none;
  &::before
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--primary), var(--accent));
    opacity: 0;
    filter: blur(20px);
    z-index: -1;
    transition: var(--transition);
    transform: scale(0.8);  
  &::after
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: var(--transition);
  &:hover
    color: white;
    background: linear-gradient(135deg, var(--primary), var(--accent));
    box-shadow: 0 12px 25px rgba(45, 127, 249, 0.35);
    transform: scale(1.03);
    border-image: none; /* 填充背景后隐藏描边 */
    &::before
      opacity: 0.5;
      transform: scale(1.2);
    &::after
      left: 150%; 
  &:active
    transform: translateY(-2px) scale(0.98);
    box-shadow: 0 4px 15px rgba(45, 127, 249, 0.2);
.blog-editor-button
  padding-top 20px
  display flex
  justify-content space-around
  & button
    width: 100%
    font-size: 1.1rem;
    font-weight: 600;
    color: white;
    background: linear-gradient(135deg, var(--primary), var(--accent));
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: var(--transition);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    box-shadow: 0 6px 20px rgba(45, 127, 249, 0.25);
    text-decoration: none;
    &::before
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, var(--primary), var(--accent));
      opacity: 0.3;
      filter: blur(20px);
      z-index: -1;
      transition: var(--transition);
      transform: scale(0.8);
    &::after
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 50%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: var(--transition);
    &:hover
      transform: scale(1.03);
      box-shadow: 0 12px 25px rgba(45, 127, 249, 0.35);
      &::before
        transform: scale(1.2);
        opacity: 0.5;
      &::after
        left: 150%
    &:active
      transform: translateY(-2px) scale(0.98);
      box-shadow: 0 4px 15px rgba(45, 127, 249, 0.2);
</style>