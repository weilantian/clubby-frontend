<template>
  <el-menu :router="true" :default-active="this.$route.path">
    <el-menu-item index="/dashboard/general">
      <template #title>
        <el-icon size="24">
          <box-icon name="home"></box-icon>
        </el-icon>
        <span>基本概要</span>
      </template>
    </el-menu-item>
    <el-menu-item index="/dashboard/user">
      <template #title>
        <el-icon size="24">
          <box-icon name="group"></box-icon>
        </el-icon>
        <span>社团人员</span>
      </template>
    </el-menu-item>
    <el-menu-item index="/dashboard/course">
      <template #title>
        <el-icon size="24">
          <box-icon name="list-ul"></box-icon>
        </el-icon>
        <span>课程</span>
      </template>
    </el-menu-item>
    <el-menu-item index="/dashboard/attendance">
      <template #title>
        <el-icon size="24">
          <box-icon name="calendar"></box-icon>
        </el-icon>
        <span>考勤管理</span>
      </template>
    </el-menu-item>
<!--    <el-menu-item index="/dashboard/schedule">-->
<!--      <template #title>-->
<!--        <el-icon size="24">-->
<!--          <box-icon name="calendar"></box-icon>-->
<!--        </el-icon>-->
<!--        <span>日程管理</span>-->
<!--      </template>-->
<!--    </el-menu-item>-->
    <el-menu-item index="/dashboard/profile">
      <template #title>
        <el-icon size="24">
          <box-icon name="user"></box-icon>
        </el-icon>
        <span>个人中心</span>
      </template>
    </el-menu-item>
  </el-menu>
</template>

<script>
//TODO: 为社员定制基本概要页面。
export default {
  name: "AsideMenu"
}
</script>

<style scoped>

</style>