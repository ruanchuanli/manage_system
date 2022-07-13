import request from '@/utils/request'

// 角色列表
export const rolelist = () => request({
  url: 'roles'
})

// 权限列表
export const rights = () => request({
  url: 'rights/tree'
})

// 添加角色
export const addrole = (data) => request({
  url: 'roles',
  method: 'POST',
  data
})

// 根据id查询角色
export const getRoleById = (id) => request({
  url: `roles/${id}`
})

// 编辑提交角色
export const editrole = (data) => request({
  url: `roles/${data.id}`,
  method: 'PUT',
  data
})

// 删除角色
export const delrole = (id) => request({
  url: `roles/${id}`,
  method: 'delete'
})
// 角色授权
export const roleright = (data) => request({
  url: `roles/${data.roleId}/rights`,
  method: 'post',
  data
})

//  删除角色指定权限
export const delright = (roleId, rightId) => request({
  url: `roles/${roleId}/rights/${rightId}`,
  method: 'delete'
})
