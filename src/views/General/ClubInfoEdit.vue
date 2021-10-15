<template>
<div>
  <el-page-header label-width="120px" content="编辑社团基本信息" title="返回" @back="goBack" />
<el-divider/>
  <el-form v-loading="isLoading"  ref="form" :rules="inputRules" :model="form">
    <el-form-item prop="name" label="社团名称">
      <el-input placeholder="街舞社" v-model="form.name"/>
    </el-form-item>
    <el-form-item prop="type" label="社团类型">
      <el-input placeholder="舞蹈" v-model="form.type"/>
    </el-form-item>
    <el-form-item prop="description" label="社团简介">
      <el-input rows="8" v-model="form.description" type="textarea"></el-input>
    </el-form-item>
    <el-form-item prop="num" label="社团设定人数">
      <el-input-number :min="1" v-model="form.designedMemberCount" type="textarea"></el-input-number>
    </el-form-item>
    <el-form-item>
      <el-button :loading="clubInfoLoading" @click="onSubmit" type="primary">保存信息</el-button>
      <el-button :disabled="clubInfoLoading" @click="goBack" >返回</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import { ElMessageBox } from 'element-plus'
import { mapGetters } from "vuex";
export default {
  name: "ClubInfoEdit",
  methods: {
    goBack() {
      this.$router.back()
    },
    onSubmit() {
      this.$refs.form.validate(valid=> {
        if (!valid) {
          return false
        }
        this.$store.dispatch('clubInfo/updateClubInfo',{
          name:this.form.name,
          description:this.form.description,
          type:this.form.type,
          designedMemberCount:this.form.designedMemberCount
        }).then(()=> {
          ElMessageBox.alert("基本信息修改完成",'成功',{
            confirmButtonText:"好",
            callback: ()=> {
              this.$router.back()
            }
          })
        })
      })
    },
  },
  computed: {
    ...mapGetters('clubInfo',["clubInfoLoading","clubInfo"])
  },
  mounted() {
    this.$store.dispatch('clubInfo/fetchClubInfo')
  },
  watch: {
    clubInfoLoading(loading) {
      if (!loading) {
        this.form.name = this.clubInfo.name
        this.form.type = this.clubInfo.type
        this.form.description = this.clubInfo.description
        this.form.designedMemberCount = this.clubInfo.designedMemberCount
      }
    }
  },
  data(){
    return {
      form: {
        name:"",
        description:"",
        type:"",
        designedMemberCount:1
      },
      inputRules: {
        name: [{
          required:true,
          message:"请输入社团名称",
          trigger: 'blur',
        }],
        description: [{
          required:true,
          message:"请填写社团简介",
          trigger: 'blur',
        }],
        type: [{
          required:true,
          message:"请填写社团类型",
          trigger: 'blur',
        }]
      }
    }
  }
}
</script>

<style scoped>

</style>