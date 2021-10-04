<template>
  <top-header/>
  <el-container>

    <el-container>

      <el-aside width="200px">
        <aside-menu/>
      </el-aside>
      <el-container>
        <el-main><transition name="fade"><router-view/></transition></el-main>
        <el-footer>@2021 Clubby</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
import AsideMenu from "@/components/AsideMenu";
import TopHeader from "@/components/TopHeader";

export default {
  name: "Dashboard.vue",
  components:{AsideMenu, TopHeader}
}
</script>

<style scoped>
.fade-enter-from, .fade-leave-to {
  opacity:0;
  transform: translateY(2em);
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}
</style>