<template>
  <div>
    <el-form :model="form"
             ref="elForm"
             >
      <el-form-item v-for="(item) in formData"
                    :key="item['query']"
                    :label="item.label"
                    label-width="100px"
                    :rules="validates[item['query']]"
                    :prop="item['query']"
                     class="auth-tab">
        <el-input v-model="form[item['query']]"
                  :type="item.type"
                  :name="item['query']"
                  :placeholder="item.placeholder"
                  autocomplete="off"></el-input>
        
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import FORM_DATA from '@/config/form.config'
import VALIDATE_DATE from '@/config/validate.config'

export default {
  name: 'BaseForm',
  props: {
    type: {
      type: String
    }
  },
  data () {
    return {
      form: {

      }
    };
  },
  computed: {
    formData () {
      return FORM_DATA[this.type]
    },
    validates () {
      return VALIDATE_DATE
    }
  },
  watch: {
    type () {
      this.initForm()
    }
  },
  methods: {
    initForm () {
      //重置表单字段 以及校验状态
      this.form = {}
      this.resetForm()
    },
    resetForm () {
      this.$refs['elForm'].resetFields()
    }
  },
};
</script>

<style lang="stylus" scoped>
::v-deep .el-dialog
  border-radius: 20px
</style>