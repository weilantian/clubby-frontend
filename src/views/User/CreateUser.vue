<template>

<div>
  <el-page-header label-width="120px" content="新建社员档案" title="返回" @back="goBack" />
  <el-divider/>
  <el-form label-width="100px" label-position="right" ref="form" :model="form">
    <el-form-item prop="email" label="邮箱">
      <el-input  placeholder="John.Doe@company.com" v-model="form.email" />
    </el-form-item>
    <el-form-item prop="password"  label="初始密码">
      <el-input  v-model="form.password" show-password />
      <el-button>生成随机密码</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
export default {
  name: "CreateUser.vue",
  methods: {
    goBack() {
      this.$router.back()
    },
  },
  data() {
    return {
      form: {
        email:"",
        password:"",
        name:"",
        role:"",
        roleName:"",
        sex:""
      }
    }
  }
}
</script>

<style scoped>

</style>