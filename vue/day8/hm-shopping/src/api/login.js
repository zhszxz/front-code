import request from '@/utils/request'

// 获取图形验证码
export async function getPicCode () {
  const res = await request.get('/captcha/image')
  return res
}

// 发送短信验证码
export async function sendSmsCode (mobile, captchaKey, captchaCode) {
  const res = await request.post('/captcha/sendSmsCaptcha', {
    form: {
      mobile,
      captchaKey,
      captchaCode
    }
  })
  return res
}

// 登录
export async function login (mobile, smsCode) {
  const res = await request.post('/passport/login', {
    form: {
      isParty: false,
      mobile,
      partyData: {},
      smsCode
    }
  })
  return res
}
