/**
 * 目标1：渲染图书列表
 *  1.1 获取数据
 *  1.2 渲染数据
 */
// const creator = '老张'
const creator = '453026b5c8'
function getBooksList() {
  axios({
    url: 'https://hmajax.itheima.net/api/books',
    params: {
      creator
    }
  }).then(result => {
    console.log(result)
    console.log(result.data.data)
    const booksList = result.data.data
    const htmlStr = booksList.map((item, index) => {
      console.log(item)
      return `<tr>
      <td>${index + 1}</td>
      <td>${item.bookname}</td>
      <td>${item.author}</td>
      <td>${item.publisher}</td>
      <td data-id=${item.id}>
        <span class="del">删除</span>
        <span class="edit">编辑</span>
      </td>
    </tr>`
    }).join('')
    document.querySelector('.list').innerHTML = htmlStr
  })
}

// 网页加载运行，获取并渲染列表一次
getBooksList()

/**
 * 目标2：新增图书
 *  2.1 新增弹框->显示和隐藏
 *  2.2 收集表单数据，并提交到服务器保存
 *  2.3 刷新图书列表
 */
// 2.1 创建弹框对象
const addDom = document.querySelector('.add-modal')
const addModal = new bootstrap.Modal(addDom)
// 点击保存按钮隐藏弹框
document.querySelector('.add-btn').addEventListener('click', () => {
  const addForm = document.querySelector('.add-form')
  const bookObj = serialize(addForm, { hash: true, empty: true })
  console.log(bookObj)
  axios({
    url: 'https://hmajax.itheima.net/api/books',
    method: 'POST',
    data: {
      ...bookObj,
      creator
    }
  }).then(result => {
    getBooksList()
    addForm.reset()
    addModal.hide()
  })
})

/**
 * 目标3：删除图书
 *  3.1 删除元素绑定点击事件->获取图书id
 *  3.2 调用删除接口
 *  3.3 刷新图书列表
 */
// 3.1 删除元素->点击（事件委托）
document.querySelector('.list').addEventListener('click', (e) => {
  if (!e.target.classList.contains('del')) {
    return
  }
  // 获取图书id
  const bookId = e.target.parentNode.dataset.id
  console.log(bookId)
  // 调用删除接口
  axios({
    url: `https://hmajax.itheima.net/api/books/${bookId}`,
    method: 'DELETE'
  }).then(() => {
    getBooksList()
  })
})

/**
 * 目标4：编辑图书
 *  4.1 编辑弹框->显示和隐藏
 *  4.2 获取当前编辑图书数据->回显到编辑表单中
 *  4.3 提交保存修改，并刷新列表
 */
// 4.1 编辑弹框->显示和隐藏
const editDom = document.querySelector('.edit-modal')
const editModal = new bootstrap.Modal(editDom)
document.querySelector('.list').addEventListener('click', e => {
  if (!e.target.classList.contains('edit')) {
    return
  }
  // 查询最新图书数据并回显
  const theId = e.target.parentNode.dataset.id
  axios({
    url: `https://hmajax.itheima.net/api/books/${theId}`
  }).then(result => {
    const bookObj = result.data.data
    console.log(bookObj)
    Object.keys(bookObj).forEach(key => {
      document.querySelector(`.edit-form .${key}`).value = bookObj[key]
    })
  })
  // 显示编辑弹框
  editModal.show()
})

// 修改按钮->点击->隐藏弹框
document.querySelector('.edit-btn').addEventListener('click', () => {
  const editForm = document.querySelector('.edit-form')
  const { id, bookname, author, publisher } = serialize(editForm, { hash: true, empty: true })
  axios({
    url: `https://hmajax.itheima.net/api/books/${id}`,
    method: 'PUT',
    data: {
      bookname,
      author,
      publisher,
      creator
    }
  }).then(() => {
    getBooksList()
    editModal.hide()
  })
})