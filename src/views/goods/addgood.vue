<template>
  <div>
    <el-card>
      <el-alert
        title="添加商品信息"
        type="warning"
        :closable="false"
        center
        show-icon
      >
      </el-alert>
      <!-- steps -->
      <el-steps
        :active="active"
        finish-status="success"
        style="margin-top: 15px; width: 90%; margin: 15px auto"
      >
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- tabs-->
      <el-tabs tab-position="left" v-model="name" @tab-click="tabclick">
        <el-tab-pane label="基本信息" name="0">
          <el-form :model="goodsinfo" :rules="rules">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="goodsinfo.goods_name"> </el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="goodsinfo.goods_price"> </el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="goodsinfo.goods_weight"> </el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="goodsinfo.goods_number"> </el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <!-- <el-select v-model="goods_cat" placeholder="请选择">
                <el-option
                  v-for="item in sort"
                  :key="item.cat_id"
                  :label="item.cat_name"
                  :value="item.cat_id"
                >
                </el-option>
              </el-select> -->
              <el-cascader
                v-model="goodsinfo.goods_cat"
                :options="sort"
                :props="{
                  expandTrigger: 'hover',
                  label: 'cat_name',
                  value: 'cat_id',
                }"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品参数" name="1">
          <el-form>
            <el-form-item
              v-for="(item, index) in tableData"
              :key="index"
              :label="item.attr_name"
            >
            <!-- <el-checkbox-group v-model="checkbox" size="mini"> -->
              <el-checkbox
                v-for="(item1,index1) in item.attr_vals.split(' ')"
                :key="index1"
                :name="item1"
                :label="item1"
                border
                checked
                @change='delcheck(item,item1,index1)'
                size="mini"
                v-show="item.attr_vals !== ''"
              ></el-checkbox>
            <!-- </el-checkbox-group> -->
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品属性" name="2">
          <el-form>
            <el-form-item
              v-for="(item, index) in tableData"
              :key="index"
              :label="item.attr_name"
            >
              <el-checkbox
                v-for="(item1, index1) in item.attr_vals.split(' ')"
                :key="index1"
                :label="item1"
                border
                checked
                @change='delcheck(item,item1,index1)'
                size="mini"
                v-show="item.attr_vals !== ''"
              ></el-checkbox>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品图片" name="3">
          <UploadImg :limit='4' ref='comimg'></UploadImg>
        </el-tab-pane>
        <el-tab-pane label="商品内容" name="4">
          <quill-editor
            v-model="content"
            ref="myQuillEditor"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @change="onEditorChange($event)"
            @ready="onEditorReady($event)"
            style="height:350px"
          >
          </quill-editor>
          <el-row style="margin-top:70px">
          <el-button type="primary" @click="addgood">添加商品</el-button>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { sortlist, attrslist, addgood } from '@/api/goods'
import UploadImg from '@/components/UploadImg'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  created () {
    this.sortlist()
  },
  data () {
    return {
      active: 0,
      name: '0',
      goodsinfo: {
        goods_name: '',
        goods_price: 0,
        goods_number: 0,
        goods_weight: 0,
        goods_introduce: '',
        goods_cat: '',
        pics: [],
        attrs: ''
      },
      sort: [],
      rules: {
        goods_name: [{ required: true, message: '必填', trigger: 'blur' }],
        goods_price: [{ required: true, message: '必填', trigger: 'blur' }],
        goods_number: [{ required: true, message: '必填', trigger: 'blur' }],
        goods_weight: [{ required: true, message: '必填', trigger: 'blur' }],
        goods_introduce: [{ required: true, message: '必填', trigger: 'blur' }],
        goods_cat: [{ required: true, message: '必填', trigger: 'blur' }]
      },
      tableData: [],
      sel: '',
      checkbox: [],
      checkbox1: [],
      fileList: [
        {
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        },
        {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
      ],
      content: '',
      // 富文本编辑器配置
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
            ['blockquote', 'code-block'], // 引用  代码块
            [{ header: 1 }, { header: 2 }], // 1、2 级标题
            [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
            [{ script: 'sub' }, { script: 'super' }], // 上标/下标
            [{ indent: '-1' }, { indent: '+1' }], // 缩进
            [{ direction: 'rtl' }], // 文本方向
            [{ size: ['12', '14', '16', '18', '20', '22', '24', '28', '32', '36'] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6] }], // 标题
            [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
            // [{ font: ['songti'] }], // 字体种类
            [{ align: [] }], // 对齐方式
            ['clean'], // 清除文本格式
            ['image', 'video'] // 链接、图片、视频
          ]
        },
        placeholder: '请输入正文'
      },
      list: []
    }
  },
  methods: {
    async sortlist () {
      this.sort = await sortlist()
      console.log(this.sort)
    },
    handleChange (val) {
      console.log(val)
      // 根据分类id获取商品参数或商品属性
    },
    tabclick () {
      this.active = parseInt(this.name)
      // this.attrslist()
    },
    delcheck (item, item1, index) {
      console.log(item)
      console.log(item1)
      // const a = item.attr_vals.split(' ')
      // a.splice(index, 1)
      // console.log(a)
      this.tableData.forEach(val => {
        if (val.attr_id === item.attr_id) {
          const b = val.attr_vals.split(' ')
          b.splice(index, 1)
          val.attr_vals = b.join(' ')
        }
      })
      console.log(item)
      // this.attrs.push({ attr_id: item.attr_id, attr_vals: item.attr_vals })
    },
    // 12
    async attrslist () {
      console.log(this.cid)
      if (this.name === '1') {
        this.sel = 'many'
      } else if (this.name === '2') {
        this.sel = 'only'
      }
      const res = await attrslist({
        id: this.goodsinfo.goods_cat[2],
        sel: this.sel
      })
      this.tableData = res
      this.list.push(...[...res])
      console.log(this.tableData)
      console.log(res)
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },

    // 失去焦点事件
    onEditorBlur (quill) {
      console.log('editor blur!', quill)
    },
    // 获得焦点事件
    onEditorFocus (quill) {
      console.log('editor focus!', quill)
    },
    // 准备富文本编辑器
    onEditorReady (quill) {
      console.log('editor ready!', quill)
    },
    // 内容改变事件
    onEditorChange ({ quill, html, text }) {
      console.log(html)
      this.goodsinfo.goods_introduce = html
    },
    async addgood () {
      this.goodsinfo.attrs = this.list.map(item => {
        return { attr_id: item.attr_id, attr_value: item.attr_vals }
      })
      this.$nextTick(async function () {
        console.log(this.$refs.comimg.fileList)
        this.goodsinfo.pics = this.$refs.comimg.fileList.map(item => { return item.url })
        console.log(this.goodsinfo.pics)
        await addgood({ ...this.goodsinfo, goods_cat: this.goodsinfo.goods_cat.join(',') })
        this.$message.success('添加商品成功')
        this.$router.push('goods')
      })
    }
  },
  computed: {},
  watch: {
    name () {
      this.$nextTick(function () {
        this.attrslist()
      })
    }
  },
  filters: {},
  components: { quillEditor, UploadImg }
}
</script>

<style scoped lang="less"></style>
