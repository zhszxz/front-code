import request from '@/utils/request'

// 获取地址列表
export const getAddressList = () => {
  return request.get('/address/list')
}

// 新增地址
export const addAddress = () => {
  return request.post('/address/add', {
    form: {
      name: '陈泽斌',
      phone: '13800000000',
      region: [
        {
          value: 782,
          label: '上海'
        },
        {
          value: 783,
          label: '上海市'
        },
        {
          value: 785,
          label: '徐汇区'
        }
      ],
      detail: '北京路1号楼8888室'
    }
  })
}
