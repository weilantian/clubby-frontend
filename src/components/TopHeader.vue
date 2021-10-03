<template>
  <el-header>
    <el-menu :default-active="headerSelected" mode="horizontal" >
      <div><p>Clubby</p></div>
      <el-menu-item  index="1">控制台</el-menu-item>
      <el-menu-item  index="2">关于</el-menu-item>
      <user-profile />
    </el-menu>
  </el-header>
</template>

<script>
import UserProfile from "@/components/UserProfile";

export default {
  components:{UserProfile},
  name: "TopHedaer"
}
</script>

<style scoped>

</style>