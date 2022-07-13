<template>
  <div>
    <el-row>
      <el-button size="small" type="primary" @click="addattr" :disabled='cid===0'>{{
        active == "only" ? "添加参数" : "添加属性"
      }}</el-button>
    </el-row>
    <el-table :data="tableData" style="width: 100%; margin-bottom: 20px" border>
      <el-table-column type="expand">
        <template v-slot="{ row }">
          <el-row type="flex" justify="center">
            <el-tag
              :key="tag"
              v-for="tag in row.attr_vals.split(' ')"
              closable
              :disable-transitions="false"
              @close="handleClose(row,tag)"
              v-show='row.attr_vals!==""'
            >
              {{ tag }}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm(row)"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button
              v-else
              class="button-new-tag"
              size="small"
              @click="showInput"
              >+ New Tag</el-button
            >
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" label="#" width="180"> </el-table-column>
      <el-table-column prop="attr_name" label="分类名称" width="400">
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="{ row }">
          <el-button type="primary" size="small" @click="editattr(row.attr_id)"
            ><i class="el-icon-edit"></i>编辑</el-button
          >
          <el-button type="danger" size="small" @click="delattr(row.attr_id)"
            ><i class="el-icon-delete"></i>删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="active==='many'?'修改动态参数':'修改静态参数'" :visible='showedit'>
      <el-form label-width="120px">
        <el-form-item label="参数名称">
          <el-input v-model='editform.attr_name'></el-input>
        </el-form-item>
       </el-form>
        <el-row type="flex" justify="center" align="middle">
        <el-col :span="6">
          <el-button size="small" @click="cancle">取消</el-button>
          <el-button size="small" type="primary" @click="sure">确定</el-button>
        </el-col>
      </el-row>
       </el-dialog>
       <el-dialog :title='title' @close='cancle2' :visible='showadd'>
         <el-form label-width="80px">
           <el-form-item :label="colum">
             <el-input v-model="attrname"></el-input>
           </el-form-item>
         </el-form>
          <el-row type="flex" justify="center" align="middle">
        <el-col :span="6">
          <el-button size="small" @click="cancle2">取消</el-button>
          <el-button size="small" type="primary" @click="sure2">确定</el-button>
        </el-col>
      </el-row>
       </el-dialog>
  </div>
</template>

<script>
import { attrslist, getattr, editattr, addattr } from '@/api/goods'
export default {
  props: {
    active: {
      type: String,
      default: 'many'
    },
    cid: {
      type: Number,
      default: 0
    }
  },
  created () {
  },
  data () {
    return {
      tableData: [],
      inputVisible: false,
      inputValue: '',
      editform: {
        attr_name: ''
      },
      showedit: false,
      showadd: false,
      attrname: ''
    }
  },
  methods: {
    async attrslist (cid, sel) {
      console.log(this.cid)
      const res = await attrslist({ id: cid, sel: sel })
      this.tableData = res
      console.log(this.tableData)
      console.log(res)
    },
    async editattr (id) {
      this.editform = await getattr({ id: this.cid, attrId: id, attr_sel: this.active })
      this.showedit = true
    },
    cancle () {
      this.editform = {}
      this.showedit = false
    },
    // 点击确定
    async sure () {
      this.showedit = false
      await editattr({ ...this.editform, attrId: this.editform.attr_id, id: this.editform.cat_id })
      this.attrslist(this.cid, this.active)
      this.$message.success('修改参数成功')
      this.editform = {}
    },
    async handleClose (row, tag) {
      console.log(row)
      this.editform = row
      const tags = row.attr_vals.split(' ')
      tags.splice(tags.indexOf(tag), 1)
      if (tags.length !== 0) {
        this.editform.attr_vals = tags.join(' ')
      } else {
        this.editform.attr_vals = ''
      }
      await editattr({ ...this.editform, attrId: this.editform.attr_id, id: this.editform.cat_id })
      this.$message.success('删除参数成功')
      this.editform = {}
    },

    showInput () {
      this.inputVisible = true
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    async handleInputConfirm (row) {
      console.log(row)
      const inputValue = this.inputValue
      if (inputValue) {
        this.editform = row
        let tags
        if (this.editform.attr_vals !== '') {
          console.log(this.editform.attr_vals)
          tags = this.editform.attr_vals.split(' ')
          tags.push(inputValue)
          console.log(tags)
          tags = tags.join(' ')
        } else {
          tags = inputValue
        }
        this.editform.attr_vals = tags
        await editattr({ ...this.editform, attrId: this.editform.attr_id, id: this.editform.cat_id })
        this.$message.success('创建参数成功')
        // this.editform = {}
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    addattr () {
      this.showadd = true
      console.log('addattr')
    },
    cancle2 () {
      this.showadd = false
    },
    // 点击确定
    async sure2 () {
      this.showadd = false
      await addattr({ id: this.cid, attr_name: this.attrname, attr_sel: this.active })
      this.attrslist(this.cid, this.active)
      this.$message.success('添加参数成功')
      this.editform = {}
    }
  },
  computed: {
    colum () {
      return this.active === 'many' ? '动态参数' : '静态属性'
    },
    title () {
      return this.active === 'many' ? '添加动态参数' : '添加静态属性'
    }
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
