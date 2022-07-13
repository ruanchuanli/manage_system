<template>
  <div>
    <el-card>
      <el-row type="flex" justify="start">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            class="input-with-select"
            v-model="page.query"
            clearable
          >
            <el-button slot="append" icon="el-icon-search" @click="userList"></el-button>
          </el-input>
        </el-col>
        <el-col><el-button style="margin-left:20px" type="primary" @click="adduser">添加用户</el-button></el-col>
      </el-row>
      <!-- 表格 -->
      <el-table
      :data="userlist"
      border
      style="width: 100%">
      <el-table-column
      type='index'
        label="#"
        width="180">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话">
      </el-table-column>
      <el-table-column
        prop="role_name"
        label="角色">
      </el-table-column>
      <el-table-column
        prop="mg_state"
        label="状态">
        <template v-slot='{row}'>
          <el-switch  v-model="row.mg_state" @change="editstate(row.id,row.mg_state)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template v-slot='{row}'>
         <el-button type="primary" size="small" @click="edituser(row.id)"><i class='el-icon-edit'></i></el-button>
         <el-button type="danger" size="small" @click="deluser(row.id)"><i class='el-icon-delete'></i></el-button>
         <el-button type="warnning" size="small" @click="assignrole(row)"><i class='el-icon-setting'></i></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-pagination
      @size-change="changesize"
      @current-change="changenum"
      :current-page="page.page"
      :page-sizes="[5,10, 15, 20]"
      :page-size="page.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.totalpage">
    </el-pagination>
    </el-row>
    </el-card>
    <adduser :showadduser.sync="showadduser" @adduser='userList'></adduser>
    <edituser :showedituser.sync="showedituser" @edituser='userList' ref='editform'></edituser>
    <assignrole :showassign.sync="showassign" ref='assignform' :user='user'></assignrole>
  </div>
</template>

<script>
import { userlist, editUserState, delUserById } from '@/api/user'
import adduser from '@/views/user/components/adduser.vue'
import edituser from '@/views/user/components/edituser.vue'
import assignrole from '@/views/user/components/assignrole.vue'
export default {
  created () {
    this.userList()
  },
  data () {
    return {
      showadduser: false,
      showedituser: false,
      showassign: false,
      userlist: [],
      page: {
        query: '',
        pagenum: 1,
        pagesize: 5,
        totalpage: 0
      },
      user: {}
    }
  },
  methods: {
    async userList () {
      const res = await userlist(this.page)
      this.userlist = res.users
      this.page.totalpage = res.total
      console.log(res)
    },
    changesize (val) {
      console.log(val)
      this.page.pagesize = val
      this.userList()
    },
    changenum (val) {
      console.log(val)
      this.page.pagenum = val
      this.userList()
    },
    adduser () {
      this.showadduser = true
    },
    async edituser (id) {
      await this.$refs.editform.userInfoById(id)
      this.showedituser = true
    },
    async editstate (id, type) {
      console.log(id, type)
      await editUserState(id, type)
      this.$message.success('设置状态成功')
    },
    async deluser (id) {
      try {
        await this.$confirm('确定删除该用户吗？')
        await delUserById(id)
        this.$message.success('删除用户成功')
        this.userList()
      } catch (error) {
        console.log(error)
      }
    },
    assignrole (row) {
      this.showassign = true
      this.$refs.assignform.userinfos(row.id)
      this.user = row
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { adduser, edituser, assignrole }
}
</script>

<style scoped lang="less"></style>
