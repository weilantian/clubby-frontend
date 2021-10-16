<template>
<div>
  <el-page-header  @back="goBack" title="返回" content="课程详情"></el-page-header>
  <el-divider/>
  <el-row justify="end">
    <el-button v-if="authRole==='ADMIN'"  @click="editCourse" :loading="isUserLoading" type="primary">修改信息</el-button>
    <el-button @click="fetchCourse" :loading="isCourseLoading">刷新</el-button>
  </el-row>
  <el-divider/>
  <el-card>
    <el-descriptions border v-loading="isCourseLoading" :title="course.name" column="3" direction="vertical">
      <el-descriptions-item label="资料链接">
        <el-link type="primary" v-if="course.fileLinks" :href="course.fileLinks" target="_blank">前往</el-link>
        <span v-else>暂无</span>
      </el-descriptions-item>
      <el-descriptions-item label="状态">{{decodePublishStatus(course.published)}}</el-descriptions-item>
      <el-descriptions-item label="相关的日程">暂无</el-descriptions-item>
      <el-descriptions-item label="内容">{{course.content}}</el-descriptions-item>
    </el-descriptions>
  </el-card>
  <el-dialog v-model="isEditing" title="修改课程信息">
    <el-form :model="form">
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
        <el-button @click="isEditing = false">取消</el-button>
        <el-button :loading="isCourseLoading" @click="onSubmit" type="primary">保存更改</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</div>
</template>

<script>
import {mapGetters} from "vuex";
import useTextDecoder from "@/composables/useTextDecoder";

export default {
  name: "CourseDetail",
  mounted() {
    this.fetchCourse()
  },
  setup(){
    const {decodePublishStatus} = useTextDecoder()
    return {decodePublishStatus}
  },
  data() {
    return {
      isEditing:false,
      form: {
        name:"",
        content:"",
        fileLinks:"",
        published:false
      }
    }
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    fetchCourse() {
      this.$store.dispatch('course/fetchCourse',this.$route.params.id)
    },
    editCourse() {
      this.form.name = this.course.name
      this.form.content = this.course.content
      this.form.fileLinks = this.course.fileLinks
      this.form.published = this.course.published
      this.isEditing = true
    },
    onSubmit() {
      this.$store.dispatch('course/updateCourse',this.form).then(()=> {
        this.isEditing = false
      })
    }
  },
  computed: {
    ...mapGetters('course',['course','isCourseLoading']),
    ...mapGetters(['authRole'])
  }
}
</script>

<style scoped>

</style>