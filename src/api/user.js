import request from '@/utils/request'

// 登录
export const login = (data) => request({
  url: 'login',
  method: 'post',
  data
})

// 用户列表
export const userlist = (params) => request({
  url: 'users',
  params
})

// 添加用户
export const adduser = (data) => request({
  url: 'users',
  method: 'post',
  data
})

// 修改用户状态
export const editUserState = (uId, type) => request({
  url: `users/${uId}/state/${type}`,
  method: 'put'
})

// 根据 ID 查询用户信息
export const userInfoById = (id) => request({
  url: `users/${id}`
})

// 修改用户信息
export const editUserById = (data) => request({
  url: `users/${data.id}`,
  method: 'put',
  data
})

// 删除用户
export const delUserById = (id) => request({
  url: `users/${id}`,
  method: 'delete'
})

// 分配角色
export const assginRole = (data) => request({
  url: `users/${data.id}/role`,
  method: 'put',
  data
})
