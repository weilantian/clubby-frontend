<template>
  <div class="wrapper">
    <div class="login-box">
      <el-form ref="form" :rules="rules" :model="form">
        <h3>欢迎回到Clubby</h3>
        <el-divider/>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="form.email"/>
        </el-form-item>
        <el-form-item label="密码" prop="password" >
          <el-input v-model="form.password" show-password/>
        </el-form-item>
        <el-form-item>
          <div class="login-box__button-group">
            <el-button :loading="isLoading" @click="onSubmit">登陆</el-button>
            <el-button type="text">忘记密码？</el-button>
          </div>

        </el-form-item>
      </el-form>
    </div>
  </div>

</template>

<script>
import { ElNotification } from 'element-plus'
export default {
  name: "Login.vue",
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      rules: {
        email:[{
          required: true,
          type:"email",
          message:"输入邮箱个格式不正确"
        }],
        password:[{
          required: true,
          message:"请输入账号密码"
        }]
      },
      isLoading:false
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid=> {
        if(!valid) {
          return false
        }
        this.isLoading = true
        this.$store.dispatch('login',{
          email:this.form.email,
          password:this.form.password,
        }).then(()=> {
          this.isLoading = false
          this.$router.push('/dashboard/general')
        }).catch((err)=> {
          this.isLoading = false
          const errCode = err.data.code
          if (errCode === "AUTH_FAILED") {
            ElNotification({
              title: '无法登陆',
              message: '邮箱与密码不匹配',
              type: 'warning',
            })
          } else {
            ElNotification({
              title: '未知错误',
              message: '登陆时出现未知错误，请稍后再试。',
              type: 'error',
            })
          }
        })
      })
    }
  },
  inputRules: {
    email:[{
      required: true,
      type:"email",

    }]
  }
}
</script>

<style lang="scss" scoped>

.wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  align-items:center;
  justify-content: center;
}
.login-box {
  &__button-group {
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    flex:none;
    padding:0 4em;
   }
  margin-top:4em;
  width:480px;
  max-width:100vw;
  border: 1px solid #E4E7ED;
  padding: 0.5em 2em;
  border-radius: 6px;
}
</style>