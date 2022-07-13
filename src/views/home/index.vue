<template>
  <el-container class="homebox">
    <el-header>
      <h2 style="color: white">
        <img
          src="http://liufusong.top/hm-admin/img/heima.b5a855ee.png"
          style="width: 50px; height: 50px"
        />
        后台管理系统
      </h2>
      <el-button @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside class="zuo" :width="show ? '64px' : '220px'">
        <div class="lefttop" @click="show = !show">|||</div>
        <el-menu
        :default-active="activeMenu"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="red"
          :collapse="show"
          :collapse-transition="false"
          router
          unique-opened
        >
          <el-submenu
            :index="item.path"
            v-for="(item, index) in leftmenu"
            :key="index"
          >
            <template slot="title">
              <SvgIcon :name='item.path'></SvgIcon>
              <span>{{ item.authName }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                :index="item1.path"
                v-for="(item1, index1) in item.children"
                :key="index1"
                ><SvgIcon :name='item1.path'></SvgIcon>{{ item1.authName }}</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <!-- <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-help"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="rolelist"
                ><i class="el-icon-date"></i>角色列表</el-menu-item
              >
              <el-menu-item index="permlist"
                ><i class="el-icon-date"></i>权限列表</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-goods"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="goodslist"
                ><i class="el-icon-date"></i>商品列表</el-menu-item
              >
              <el-menu-item index="sortinfo"
                ><i class="el-icon-date"></i>分类参数</el-menu-item
              >
              <el-menu-item index="goodsort"
                ><i class="el-icon-date"></i>商品分类</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-eleme"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="orderslist"
                ><i class="el-icon-date"></i>订单列表</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-date"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="shujulist"
                ><i class="el-icon-date"></i>数据报表</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu> -->
        </el-menu>
      </el-aside>
      <el-main class="main">
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px;font-size:15px">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <!-- <el-breadcrumb-item>{{name1}}</el-breadcrumb-item> -->
          <el-breadcrumb-item v-html='name2||"添加商品"'></el-breadcrumb-item>
        </el-breadcrumb>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { menus } from '@/api/rights'
export default {
  created () {
    this.menus()
  },
  data () {
    return {
      show: false,
      leftmenu: [],
      name2: ''
      // path: localStorage.getItem('path') || 'users'
    }
  },
  methods: {
    logout () {
      this.$store.commit('setToken', null)
      this.$router.push('/login')
    },
    async menus () {
      this.leftmenu = await menus()
      console.log(this.leftmenu)
    }
  },
  computed: {
    activeMenu () {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.name2 = meta.title
      console.log(path.substring(6))
      return path.substring(6)
    }
  },
  watch: {
  },
  filters: {},
  components: {}
}
</script>

<style lang="less">
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}
.homebox {
  height: 100vh;
  .section {
    height: 100%;
  }
  .zuo {
    // height: 100%;
    // width: 220px;
    overflow: hidden;
    .el-menu {
      height: 100%;
      // width: 220px;
    }
  }
  .main {
    height: 90vh;
    overflow: auto;
  }
  .lefttop {
    width: 220px;
    height: 40px;
    background-color: #ff69b4;
    text-align: center;
    line-height: 40px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    letter-spacing: 5px;
    color: #fff;
  }
}
</style>
