import request from '@/utils/request'

// 获取商品列表
export const goods = (params) => request({
  url: 'goods',
  params
})

// 添加商品
export const addgood = (data) => request({
  url: 'goods',
  method: 'POST',
  data
})

// 上传图片
export const upload = (data) => request({
  url: 'upload',
  method: 'POST',
  data
})
// 查询商品
export const getgood = (id) => request({
  url: `goods/${id}`
})

// 编辑商品
export const editgood = (data) => request({
  url: `goods/${data.id}`,
  method: 'put',
  data
})

// 删除商品
export const delgood = (id) => request({
  url: `goods/${id}`,
  method: 'delete'
})

/* 分类========================= */
// 分类列表
export const sortlist = (params) => request({
  url: 'categories',
  method: 'get',
  params
})

// 添加分类
export const addsort = (data) => request({
  url: 'categories',
  method: 'post',
  data
})

// 获得某个分类
export const getsort = (id) => request({
  url: `categories/${id}`
})

// 编辑分类
export const editsort = (data) => request({
  url: `categories/${data.id}`,
  method: 'put',
  data
})

// 删除分类
export const delsort = (id) => request({
  url: `categories/${id}`,
  method: 'delete'
})

/* 参数======================== */

// 参数列表

export const attrslist = (params) => request({
  url: `categories/${params.id}/attributes`,
  params
})
// 添加参数
export const addattr = (data) => request({
  url: `categories/${data.id}/attributes`,
  method: 'post',
  data
})
// 删除参数
export const delattr = (id, attrid) => request({
  url: `categories/${id}/attributes/${attrid}`,
  method: 'delete'
})
// 获取某个参数
export const getattr = (params) => request({
  url: `categories/${params.id}/attributes/${params.attrId}`,
  params
})

// 编辑参数
export const editattr = (data) => request({
  url: `categories/${data.id}/attributes/${data.attrId}`,
  method: 'put',
  data
})
