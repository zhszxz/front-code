// 验证手机号码
export function validateMobile (mobile) {
  return /^1[3-9]\d{9}$/.test(mobile)
}

// 验证验证码(四位单词字符)
export function validatePicCode (picCode) {
  return /^[a-zA-Z0-9]{4}$/.test(picCode)
}

// 验证短信验证码(六位数字)
export function validateSmsCode (smsCode) {
  return /^\d{6}$/.test(smsCode)
}
