<template>
<div>
  <el-page-header title="返回" content="新建课程"></el-page-header>
  <el-divider/>
  <el-form :rules="rules" label-width="140px" ref="formRef" :model="form">
    <el-form-item label="标题" prop="name">
      <el-input placeholder="Python入门" v-model="form.name" label="标题"/>
    </el-form-item>
    <el-form-item label="纲要" prop="content">
      <el-input type="textarea" rows="8" placeholder="了解Python..." v-model="form.content"/>
    </el-form-item>
    <el-form-item label="资料链接">
      <el-input placeholder="https://" v-model="form.fileLinks"/>
    </el-form-item>
    <el-form-item label="发布（对社员可见）">
      <el-switch v-model="form.published" label="对社员可见"/>
    </el-form-item>
    <el-form-item>
      <el-button @click="onSubmit" :loaing="isCourseLoading" type="primary">添加</el-button>
      <el-button :disabled="isCourseLoading" @click="goBack">返回</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import {useRouter} from "vue-router";
import {computed, reactive, ref, toRefs} from "vue";
import {useStore} from "vuex";
import {ElMessageBox} from "element-plus";

export default {
  name: "CreateCourse",
  setup() {
    const formRef = ref(null)
    const router = useRouter()
    const store = useStore()
    const isCourseLoading = computed(()=> store.getters.isCourseLoading)
    const goBack = ()=> {
      router.back()
    }
    const data = reactive({
      form: {
        name:"",
        content:"",
        fileLinks: "",
        published:false
      },
      rules: {
        name: [{
          required:true,
          message:"请输入标题"
        }],
        content: [{
          required:true,
          message:"请简述纲要"
        }]
      }
    })
    const onSubmit = ()=> {
      formRef.value.validate(valid=> {
        if (!valid) {
          return false
        }
        store.dispatch('course/createCourse',data.form).then(()=> {
          ElMessageBox.alert("创建课程成功",'成功',{
            confirmButtonText:"好",
            callback:()=> {
              router.back()
            }
          })
        })
      })
    }
    return {goBack,...toRefs(data),isCourseLoading,formRef,onSubmit}
  }
}
</script>

<style scoped>

</style>