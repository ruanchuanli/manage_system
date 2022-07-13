import request from '@/utils/request'

export const rightslist = () => request({
  url: 'rights/list'
})

// 左侧菜单权限
export const menus = () => request({
  url: 'menus'
})
