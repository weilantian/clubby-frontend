<template>
  <el-header>
    <el-menu :default-active="headerSelected" mode="horizontal" >
      <div><p class="title">Clubby(MVP)</p></div>

      <user-profile />
    </el-menu>
  </el-header>
</template>

<script>
import UserProfile from "@/components/UserProfile";

export default {
  components:{UserProfile},
  name: "TopHeader"
}
</script>

<style scoped>
.title {
  font-weight:500;
}
</style>