/**
 * 目标1：信息渲染
 *  1.1 获取用户的数据
 *  1.2 回显数据到标签上
 * */

const creator = '播仔'

// 1.1 获取用户的数据
axios({
  url: 'https://hmajax.itheima.net/api/settings',
  method: 'GET',
  params: {
    creator
  }
}).then(result => {
  console.log(result.data)
  console.log(result.data.data)
  const userInfo = result.data.data
  Object.keys(userInfo).forEach(key => {
    //  头像 性别 特殊处理
    if (key === 'avatar') {
      document.querySelector(`.prew`).src = userInfo[key]
    } else if (key === 'gender') {
      document.querySelector(`.gender[value="${userInfo[key]}"]`).checked = true
    } else {
      document.querySelector(`.${key}`).value = userInfo[key]
    }
  })
})

/**
 * 目标2：修改头像
 *  2.1 获取头像文件
 *  2.2 提交服务器并更新头像
 * */
// 文件选择元素->change事件
document.querySelector('.upload').addEventListener('change', e => {
  // 2.1 获取头像文件
  console.log(e.target.files[0])
  const fd = new FormData()
  fd.append('avatar', e.target.files[0])
  fd.append('creator', creator)
  // 2.2 提交服务器并更新头像
  axios({
    url: 'https://hmajax.itheima.net/api/avatar',
    method: 'PUT',
    data: fd
  }).then(result => {
    console.log(result.data)
    const imgUrl = result.data.data.avatar
    // 把新的头像回显到页面上
    document.querySelector('.prew').src = imgUrl
  })
})

/**
 * 目标3：提交表单
 *  3.1 收集表单信息
 *  3.2 提交到服务器保存
 */
/**
 * 目标4：结果提示
 *  4.1 创建toast对象
 *  4.2 调用show方法->显示提示框
 */
// 保存修改->点击
document.querySelector('.submit').addEventListener('click', () => {
  // 3.1 收集表单信息
  const userForm = document.querySelector('.user-form')
  const userObj = serialize(userForm, { hash: true, empty: true })
  userObj.creator = creator
  // 性别数字字符串，转成数字类型
  userObj.gender = Number(userObj.gender)
  console.log(userObj)
  // 3.2 提交到服务器保存
  axios({
    url: 'https://hmajax.itheima.net/api/settings',
    method: 'PUT',
    data: userObj
  }).then(result => {
    // 4.1 创建toast对象
    const toastDom = document.querySelector('.my-toast')
    const toast = new bootstrap.Toast(toastDom)

    // 4.2 调用show方法->显示提示框
    toast.show()
  })
})