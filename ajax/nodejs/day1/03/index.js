/**
 * 目标：在 Node.js 环境的代码中，应使用绝对路径
 * 原因：nodejs中使用相对路径，会以命令执行目录为基准，而不是js文件所在目录
 *  容易造成目标文件找不到的错误
 */
const fs = require('fs')
// 1. 引入 path 模块对象
const path = require('path')
// 2. __dirname 表示当前js文件所在目录的绝对路径
console.log(__dirname)
fs.readFile(path.join(__dirname, '../test.txt'), (err, data) => {
  if (err) console.log(err)
  else console.log(data.toString())
})
