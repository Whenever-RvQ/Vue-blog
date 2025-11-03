export default {
  data () {
    return {
      global: "我是minxin混入的属性"
    }
  },
  methods: {
    refreshModal (type) {
      this.$store.dispatch('modal/open', type)
    }
  }
}