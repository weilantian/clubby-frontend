<template>
<div>
<el-page-header @back="goBack" title="返回" content="编辑个人资料"/>
  <el-divider/>
  <el-form label-width="100px" :rules="userEditRules" label-position="right" ref="formRef" :model="form">
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
      <el-button :loading="fetchingAuthInfo" @click="onSubmit" type="primary">保存修改</el-button>
      <el-button :disabled="fetchingAuthInfo" @click="goBack">返回</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import {useRouter} from "vue-router";
import {computed, reactive, ref, toRefs} from "vue";
import {useStore} from "vuex";
import useUserEditRules from "@/composables/useUserEditRules";
import {ElMessageBox} from "element-plus";

export default {
  name: "EditProfile",
  setup() {
    const formRef = ref(null)
    const router = useRouter()
    const store = useStore()
    const goBack = ()=> {
      router.back()
    }
    const currentUser = computed(()=> store.getters.currentUser)
    const fetchingAuthInfo = computed(()=> store.getters.fetchingAuthInfo)
    const {userEditRules} = useUserEditRules()

    const data = reactive({
      form: {
        name: currentUser.value.name,
        sex: currentUser.value.sex,
        email: currentUser.value.email,
        role: currentUser.value.role,
        roleName: currentUser.value.roleName,
      }
    })

    const onSubmit = ()=> {
      formRef.value.validate(valid=> {
        if (!valid) {
          return false
        }
      })
      store.dispatch('updateCurrentUser',data.form).then(()=> {
        ElMessageBox.alert("个人信息修改成功","成功",{
          confirmButtonText:"好",
          callback: ()=> {
            router.back()
          }
        })
      })
    }
    return {goBack,...toRefs(data),userEditRules,fetchingAuthInfo,formRef,onSubmit}
  }
}
</script>

<style scoped>

</style>