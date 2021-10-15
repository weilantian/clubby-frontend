<template>

<div>
  <el-page-header label-width="120px" content="新建社员档案" title="返回" @back="goBack" />
  <el-divider/>
  <el-form label-width="100px" :rules="userEditRules" label-position="right" ref="form" :model="form">
    <el-form-item prop="name" label="姓名">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item prop="roleName" label="成员角色">
      <el-input placeholder="社员" v-model="form.roleName" />
    </el-form-item>
    <el-form-item prop="sex" label="性别">
      <el-radio-group v-model="form.sex">
        <el-radio label="MALE">男</el-radio>
        <el-radio label="FEMALE">女</el-radio>
        <el-radio label="OTHER">非二元</el-radio>
        <el-radio label="UNSET">留空</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item prop="email" label="邮箱">
      <el-input  placeholder="John.Doe@company.com" v-model="form.email" />
    </el-form-item>
    <el-form-item prop="password"  label="初始密码">
      <div class="password-input"><el-input  v-model="form.password" show-password />
        <el-button @click="generatePassword">生成随机密码</el-button></div>
    </el-form-item>
    <el-form-item prop="role" label="账号类型">
      <el-select placeholder="请选择" v-model="form.role">
        <el-option label="成员" value="MEMBER"></el-option>
        <el-option label="管理员" value="ADMIN"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button :loading="isUserLoading" @click="onSubmit" type="primary">创建</el-button>
      <el-button :disabled="isUserLoading" @click="goBack">返回</el-button>
    </el-form-item>
  </el-form>
  <el-dialog
      v-model="createUserSuccess"
      title="成功"
      width="30%"
  >
    <span>账号成功创建</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="copyDeliverable">复制账号信息</el-button>
        <el-button type="primary" @click="goBack"
        >完成</el-button
        >
      </span>
    </template>
  </el-dialog>
</div>
</template>

<script>


import { ElMessage } from 'element-plus'
import {mapGetters} from "vuex";
import useUserEditRules from "@/composables/useUserEditRules";

export default {
  name: "CreateUser.vue",
  methods: {
    goBack() {
      this.createUserSuccess = false
      //初始化注册状态
      this.$router.back()

    },
    copyDeliverable() {
      const deliverable = `姓名:${this.form.name} 登陆邮箱:${this.form.email} 初始密码:${this.form.password}`
      navigator.clipboard.writeText(deliverable)
      ElMessage({
        message: '账号信息已经复制到粘贴板',
        type: 'success',
      })
      this.goBack()
    },
    onSubmit() {
      //1.填写注册信息 2.注册成功（可复制回执信息）
      this.$refs.form.validate(valid=> {
        if (!valid) {
          return false
        }
        this.$store.dispatch('user/createUser',{
          email: this.form.email,
          name: this.form.name,
          sex:this.form.sex,
          role: this.form.role,
          roleName: this.form.roleName,
          password: this.form.password,

        }).then(()=> {
         this.createUserSuccess = true
        })
      })
    },
    generatePassword() {
      let result           = '';
      let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let charactersLength = characters.length;
      for ( let i = 0; i < 18; i++ ) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
      }
      this.form.password = result
    },
  },
  computed: {
    ...mapGetters('user',["isUserLoading"])
  },
  setup() {
    const {userEditRules} = useUserEditRules()
    return {userEditRules}
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
      },
      createUserSuccess: false,
    }
  }
}
</script>

<style lang="scss" scoped>
.password-input {
  display: flex;
  align-items: center;
}
</style>