/**
 * 目标：网站-更换背景
 *  1. 选择图片上传，设置body背景
 *  2. 上传成功时，"保存"图片url网址
 *  3. 网页运行后，"获取"url网址使用
 * */
const bgUrl = localStorage.getItem('bg_url')
if (bgUrl) {
  document.querySelector('body').style.backgroundImage = `url(${bgUrl})`
}

document.querySelector('#bg').addEventListener('change', e => {
  console.log(e.target.files[0])
  const file = e.target.files[0]
  const formData = new FormData()
  formData.append('img', file)
  axios({
    url: 'https://hmajax.itheima.net/api/uploadimg',
    method: 'POST',
    data: formData
  }).then(result => {
    console.log(result.data.data.url)
    const imgUrl = result.data.data.url
    console.log(imgUrl)
    localStorage.setItem('bg_url', imgUrl)
    document.querySelector('body').style.backgroundImage = `url(${imgUrl})`
  })
})