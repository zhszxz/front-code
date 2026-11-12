export default {
  data () {
    return {
      title: '标题'
    }
  },
  methods: {
    loginConfirm () {
      // 判断 token 是否存在
      if (!this.$store.getters.token) {
        // 弹确认框
        this.$dialog.confirm({
          title: '温馨提示',
          message: '需要先登录才能继续操作哦',
          confirmButtonText: '去登陆',
          cancelButtonText: '再逛逛'
        })
          .then(() => {
            this.$router.replace({
              path: '/login',
              query: {
                redirect: this.$route.fullPath
              }
            })
          })
          .catch(() => {})
        return true
      }
      return false
    }
  }
}
