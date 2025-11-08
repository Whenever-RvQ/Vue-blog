<template>
  <div class="blog-column-words">
    <WordCloud :data="columnWords" nameKey="name" :fontSize="[15, 60]" valueKey="value"
      :color="['#1f77b4', '#629fc9', '#94bedb', '#c9e0ef']" :showTooltip="true" :tooltipFormatter="tooltipFormatter"
      :wordClick="wordClickHandler" class="hi">

    </WordCloud>


  </div>

</template>

<script>
import WordCloud from 'vue-wordcloud'

export default {
  name: 'Column',
  components: { WordCloud },
  data() {
    return {
      columns: []
    };
  },
  created() {
    this.getColumns()
  },
  mounted() {
    this.$EventBus.$on('updateView', () => {
      this.getColumns()
    })
  },
  computed: {
    columnWords() {
      return this.columns.map(item => {

        return {
          name: item.name,
          value: item.aids.length || 0,
          id: item._id
        }
      })
    },
  },

  methods: {
    async wordClickHandler(name) {
      this.hideTooltip()

      let columnId = this.columns.find(item => {
        return item.name === name
      })?._id
      console.log(this.$store.state.userInfo)
      if (!this.$store.state.userInfo) {
        try {
          await this.$store.dispatch('getUserInfo')
          // 再次检查是否获取到用户信息
          if (!this.$store.state.userInfo) {
            this.$notify.warning({
              title: '提示',
              message: '请先登录以获取完整功能'
            })
            // 可以选择是否继续跳转
          }
        } catch (err) {
          this.$notify.error({
            title: '错误',
            message: '获取用户信息失败，请稍后重试'
          })
          return // 获取失败则不继续
        }
      }
      console.log(columnId)

      this.$router.push({ name: 'index', query: { columnId: columnId } })
    },
    hideTooltip() {
      // 移除页面中所有的 tooltip 元素
      const tooltips = document.querySelectorAll('.tooltip');
      tooltips.forEach(tooltip => {
        tooltip.style.display = 'none';
        tooltip.remove();
      });
    },

    async getColumns() {
      try {
        let columns = await this.$api({ type: 'columns' })
        this.columns = columns.list
      } catch (err) {
        console.log(err)
      }
    }
  },
};
</script>

<style lang="stylus">
.blog-column-words svg
  user-select none
  & text
    cursor pointer
    display: block
    font-weight 400
:root
  --wechat-green: #07c160;
  --text-dark: #1d2129;
  --text-light: #666;
  --bg-white: #ffffff;
  --shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  --transition: all 0.2s ease;
// 自定义提示框样式（如果组件支持）
div.tooltip
  // position absolute !important
  // top: 30px !important /* 提示框在目标元素上方 */
  // left: 50% !important
  height: auto !important
  display: flex !important
  transform: translateX(-50%) translateY(-60%) !important
  padding: 12px 16px !important
  background: var(--bg-white) !important
  border-radius: 8px /* 微信对话框圆角 */ !important
  box-shadow: var(--shadow) !important
  min-width: 180px !important
  text-align: center !important
  justify-content: center !important
  transition: var(--transition) !important
  z-index: 999 !important
  color: black !important
  &::after
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid var(--bg-white); /* 与提示框背景色一致 */
</style>
