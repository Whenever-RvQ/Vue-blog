<template>
  <div>
    <el-dialog :title="title" :visible.sync="isShow" :width="width" :before-close="close" class="auth-container">
      <BaseForm v-if="hasForm" :type="type" ref="form" />
      <div slot="footer" class="dialog-footer">
        <el-button v-for="btn in btns" :key="btn.targetName" @click="handlerBtn(btn.targetName, btn.isSubmit)">{{
          btn.name }}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import MODAL_DATA from '@/config/modal.config'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('modal')

import BaseForm from './BaseForm'
export default {
  name: 'BaseModal',
  components: {
    BaseForm
  },
  data() {
    return {

    }
  },

  computed: {
    ...mapState(['isShow', 'type']),
    title() {
      return MODAL_DATA[this.type]?.title ?? '默认modal'
    },
    width() {
      return MODAL_DATA[this.type]?.width ?? '60%'
    },
    hasForm() {
      return MODAL_DATA[this.type]?.formType
    },
    btns() {
      return MODAL_DATA[this.type]?.btns ?? [{
        targetName: 'close',
        name: '取消'
      },
      {
        targetName: 'confirm',
        name: '提交',
      }]
    }
  },
  mounted() {

  },
  methods: {
    handlerBtn(action, isSubmit) {
      //事件代理 close confirm
      if (isSubmit) {
        this.submitForm()
        return
      }
      this[action] && this[action]()
    },
    async submitForm() {
      let refForm = this.$refs['form']
      refForm.$refs['elForm'].validate(async (valid) => {
        if (valid) {
          const loadingNotify = this.$notify.info({
            title: '提交中',
            message: '正在处理您的请求...',
            duration: 0 // 不自动关闭
          })
          try {
            await this.$api({ type: this.type, data: refForm.form })
            if(refForm.form.username)this.$store.commit('SET_USERNAME', refForm.form.username)
            await this.$store.dispatch('getUserInfo')
            // 关闭加载通知
            loadingNotify.close()

            // 显示成功通知
            this.$notify.success({
              title: '操作成功',
              message: '数据提交成功！'
            })
            this.close()
            this.$EventBus.$emit('updateView')
          } catch (err) {
            // 关闭加载通知
            loadingNotify.close()

            // 显示错误通知
            this.$notify.error({
              title: '操作失败',
              message: err.message || '提交数据时发生错误'
            })

            refForm.$refs['elForm'].resetFields()
            refForm.$refs['elForm'].resetFields()
          }
        } else {

          return false;
        }
      });
    },

    ...mapActions(['close', 'open', 'confirm'])
  },
};
</script>

<style lang="stylus" scoped>
.auth-container 
  width: 100%;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  ::v-deep .el-dialog
    border-radius: 10px;
</style>
