<template>
<div>
  <el-page-header label-width="120px" content="激活Clubby账号"/>
<div class="body">
  <el-alert title="欢迎加入社团。在开始之前，你需要对你的社团账号进行激活。" type="info" show-icon> </el-alert>
  <el-divider/>
  <el-form  label-width="100px" label-position="right" ref="form">
    <el-form-item v-if="authError.data" prop="name" label="用户名">

      <el-input v-model="authError.data.name" disabled=""  show-></el-input>
    </el-form-item>
    <el-form-item prop="password" label="新密码">
      <el-input v-model="form.password" show-password></el-input>
    </el-form-item>
    <el-form-item class="button_wrapper">
      <el-button type="primary" @click="activateAccount">激活账号</el-button>
      <el-button @click="logout">退出登陆</el-button>
    </el-form-item>
  </el-form>
</div>


</div>
</template>

<script>
import {mapGetters} from "vuex";
import {ElMessageBox} from "element-plus";
//TODO:刷新后仍然显示名字。

export default {
  name: "ActivateAccount.vue",
  mounted() {

  },
  data() {
    return {
      form: {
        name: "",
        password: ""
      }
    }
  },
  computed: {
    ...mapGetters(['authError'])
  },
  methods: {
    activateAccount() {
      this.$store.dispatch('activateAccount',{password:this.form.password}).then(()=> {
        //TODO:这里加个Message Box
        this.$router.push('/')
      })
    },
    logout() {
      ElMessageBox.confirm('你即将登出Clubby,确定要继续吗？','登出',{
        confirmButtonText:"登出",
        cancelButtonText:"取消",
        type:'warning'
      }).then(()=> {
        this.$store.dispatch('logout')
      })

    }
  },
  watch:{
  }
}
</script>

<style lang="scss" scoped>
.body {
  padding: 2em 4em;
  .el-form {
    margin:auto;
    max-width:40em;
  }
}
</style>