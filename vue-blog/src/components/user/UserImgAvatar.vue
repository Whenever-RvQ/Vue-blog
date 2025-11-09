<template>
  <div class=" blog-header--login">
    <keep-alive>
      <router-link tag="img" class="blog-avatar-img" :src="src" to="/user" fit="cover"></router-link>
    </keep-alive>
    <i v-if="$store.state.token" @click="handleLogout" class="el-icon-back logout-btn"></i>
  </div>
</template>

<script>
export default {
  name: 'UserImgAvatar',

  data() {
    return {

    };
  },
  mounted() {

  },

  computed: {
    src() {
      return this.$store.state.userInfo.avator
    }
  },
  methods: {
    handleLogout() {
      localStorage.removeItem('uid')
      localStorage.removeItem('ua_jot')
      localStorage.removeItem('ua_publicKay')
      localStorage.removeItem('welcome')
      location.reload()
    }
  },
};
</script>

<style lang="stylus">
.blog-header--login
  display flex
  justify-content: space-between
  position relative
.blog-avatar-img
  overflow hidden
  width 40px
  height 40px
  border-radius 50%
.logout-btn
  color: white
  display: block
  position: absolute
  right: 7vw
  scale: 1.5
</style>