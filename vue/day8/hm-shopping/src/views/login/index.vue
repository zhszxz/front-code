<template>
  <div class="login">
    <van-nav-bar title="会员登录" left-arrow @click-left="$router.go(-1)" />
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input v-model="mobile" class="inp" maxlength="11" placeholder="请输入手机号码" type="text">
        </div>
        <div class="form-item">
          <input v-model="picCode" class="inp" maxlength="5" placeholder="请输入图形验证码" type="text">
          <img v-if="picCodeBase64" @click="handleRefreshPicCode" :src="picCodeBase64" alt="">
        </div>
        <div class="form-item">
          <input v-model="smsCode" class="inp" maxlength="6" placeholder="请输入短信验证码" type="text">
          <button @click="handleSendSms">{{ totalSecond === second?'获取验证码':`${second}秒后重新发送` }}</button>
        </div>
      </div>

      <div class="login-btn" @click="handleLogin">登录</div>
    </div>
  </div>
</template>

<script>
import { setUserInfo } from '@/utils/storge'
import { getPicCode, sendSmsCode, login } from '@/api/login'
import { validateMobile, validatePicCode, validateSmsCode } from '@/utils/validate'

export default {
  name: 'LoginPage',
  data () {
    return {
      // 图形验证码key
      picKey: '',
      // 输入的图形验证码
      picCode: '',
      // 图形验证码base64
      picCodeBase64: '',
      totalSecond: 60,
      second: 60,
      timer: null,
      // 手机号
      mobile: '',
      // 短信验证码
      smsCode: ''
    }
  },
  methods: {
    async handleRefreshPicCode () {
      const { data: { key, base64 } } = await getPicCode()
      this.picKey = key
      this.picCodeBase64 = base64
    },
    async handleSendSms () {
      if (!validateMobile(this.mobile)) {
        return this.$toast('请输入正确的手机号码')
      }
      if (!validatePicCode(this.picCode)) {
        return this.$toast('请输入正确的图形验证码')
      }
      if (this.timer) {
        return
      }
      const res = await sendSmsCode(this.mobile, this.picKey, this.picCode)
      if (res.status === 200) {
        this.$toast('短信验证码发送成功')
      }
      this.timer = setInterval(() => {
        this.second--
        if (this.second < 1) {
          clearInterval(this.timer)
          this.second = this.totalSecond
          this.timer = null
        }
      }, 1000)
    },
    async handleLogin () {
      if (!validateMobile(this.mobile)) {
        return this.$toast('请输入正确的手机号码')
      }
      if (!validateSmsCode(this.smsCode)) {
        return this.$toast('请输入正确的短信验证码')
      }
      const res = await login(this.mobile, this.smsCode)
      if (res.status === 200) {
        this.$store.commit('user/setUserInfo', res.data)
        setUserInfo(res.data)
        this.$toast('登录成功')

        const target = this.$route.query.redirect || '/'
        this.$router.replace(target)
      }
    }
  },
  created () {
    this.handleRefreshPicCode()
  },

  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
