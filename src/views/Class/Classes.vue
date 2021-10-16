<template>
  <el-row justify="end">
    <el-button @click="$router.push('/dashboard/course/create')" type="primary">新建课程</el-button>
    <el-button @click="fetchCourses" :loading="isCoursesLoading">刷新</el-button>
  </el-row>
  <el-divider/>
  <el-row>
    <el-col>
      <el-card>
        <template #header>
          <span>课程</span>
        </template>
        <el-table v-loading="isCoursesLoading" :data="
        courses.filter(data=> !search || data.name.includes(search))
">
          <el-table-column label="标题" prop="name"/>
          <el-table-column v-if="authRole==='ADMIN'" label="状态" prop="published">
            <template #default="scope">
              <div>
                <el-tag :type="
                scope.row.published?'success':'info'
" size="medium">{{decodePublishStatus(scope.row.published)}}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column width="300">
            <template #header>
              <el-input v-model="search" size="mini" placeholder="根据标题搜索..." />
            </template>
            <template #default="scope">
              <el-button @click="showDetail(scope.$index,scope.row)" type="primary" size="mini">详情</el-button>

            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import {mapGetters} from "vuex";
import useTextDecoder from "@/composables/useTextDecoder";

export default {
  name: "Classes",
  data() {
    return {
      search:''
    }
  },
  setup() {
    const {decodePublishStatus} = useTextDecoder()
    return {decodePublishStatus}
  },
  computed: {
    ...mapGetters('course',['courses','isCoursesLoading',]),
    ...mapGetters(['authRole'])
  },
  mounted() {
    this.fetchCourses()
  },
  methods: {
    fetchCourses() {
      this.$store.dispatch('course/fetchCourses')
    },
    showDetail(index,row) {
      this.$router.push(`/dashboard/course/${row.id}`)
    }
  }
}
</script>

<!--<style lang="scss" scoped>-->

<!--.course-card {-->
<!--  height:320px;-->
<!--  width: 360px;-->

<!--  .el-card__body {-->
<!--    display: flex;-->
<!--    flex-direction: row;-->
<!--    justify-content: space-between;-->
<!--    height: -webkit-fill-available;-->
<!--  }-->
<!--  &__inner {-->
<!--    display: flex;-->
<!--    flex-direction: column;-->
<!--    justify-content:space-between;-->
<!--    flex:1;-->
<!--  }-->

<!--  &&#45;&#45;active {-->
<!--    display:flex;-->
<!--    background-color: rgba(0,0,0,0.01);-->
<!--    justify-content: center;-->
<!--    align-items:center;-->
<!--  }-->
<!--}-->
<!--</style>-->