import request from '@/utils/request'

export const orders = (params) => request({
  url: 'orders',
  params
})
// 修改订单状态
export const editorder = (data) => request({
  url: `orders/${data.id}`,
  method: 'put',
  data
})

// 查看订单详情
export const getorder = (id) => request({
  url: `orders/${id}`
})

// 查看物流信息
export const kuaidi = (id) => request({
  url: `/kuaidi/${id}`
})
