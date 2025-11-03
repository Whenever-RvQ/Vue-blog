<template>
  <div class="blog-header--loginAndRes">
    <span @click="refreshModal('login')">登录</span>
    <i class="blog-header--split">|</i>
    <span @click="refreshModal('register')">注册</span>
  </div>
</template>

<script>
import MINXIN from '@/core/minxin'
export default {
  name: 'UserLoginHead',
  mixins: [MINXIN],
  data () {
    return {

    };
  },
  mounted () {

  },
  methods: {
  },
};
</script>
<style lang="stylus" >
.blog-header--loginAndRes
  display flex
  align-items center
  color white
.blog-header--loginAndRes span
  cursor pointer
.blog-header--split
  font-size 18px
  padding 0 4px
</style>
