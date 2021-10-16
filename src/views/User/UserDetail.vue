<template>
<div>
  <el-page-header @back="goBack" title="返回" content="用户详情"></el-page-header>
  <el-divider/>
  <el-row justify="end">
    <el-button v-if="authRole==='ADMIN'" :disabled="currentUser.id === user.id"  @click="editUser" :loading="isUserLoading" type="primary">修改信息</el-button>
    <el-button :loading="isUserLoading">刷新</el-button>
  </el-row>
  <el-divider/>
  <el-card>
    <el-descriptions border v-loading="isUserLoading" :title="user.name">
      <el-descriptions-item label="性别">{{decodeSex(user.sex)}}</el-descriptions-item>
      <el-descriptions-item label="邮箱">{{user.email}}</el-descriptions-item>
      <el-descriptions-item label="身份">{{user.roleName}}</el-descriptions-item>
      <el-descriptions-item label="权限">{{decodeRole(user.role)}}</el-descriptions-item>
    </el-descriptions>
  </el-card>
  <el-dialog v-model="editing" title="修改用户信息">
    <el-form :model="form">
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
      <el-form-item prop="role" label="账号类型">
        <el-select placeholder="请选择" v-model="form.role">
          <el-option label="成员" value="MEMBER"></el-option>
          <el-option label="管理员" value="ADMIN"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="editing = false">取消</el-button>
        <el-button :loading="isUserLoading" @click="onSubmit" type="primary">保存更改</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</div>
</template>

<script>
import {mapGetters} from "vuex";
import useDecodeRoles from "@/composables/useTextDecoder";

export default {
  name: "UserDetail",
  data(){
    return {
      editing:false,
      form: {
        email: "",
        name:"",
        role:"",
        roleName:"",
        sex:""
      }
    }
  },
  mounted() {
    this.fetchUser()
  },
  setup() {
    const {decodeRole,decodeSex} = useDecodeRoles()
    return {decodeRole,decodeSex}
  },
  methods: {
    fetchUser() {
      this.$store.dispatch('user/fetchUser',this.$route.params.id)
    },
    goBack() {
      this.$router.back()
    },
    editUser() {
      this.form.email = this.user.email
      this.form.name = this.user.name
      this.form.role = this.user.role
      this.form.roleName = this.user.roleName
      this.form.sex = this.user.sex
      this.editing = true
    },
    onSubmit() {
      this.$store.dispatch('user/updateUser',this.form).then(()=> {
        this.editing = false
      })
    }
  },
  computed: {
    ...mapGetters('user',['user','isUserLoading']),
    ...mapGetters(['authRole','currentUser'])
  }
}
</script>

<style scoped>

</style>