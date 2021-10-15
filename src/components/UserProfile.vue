<template>
<div class="profile">
  <el-dropdown v-if="isAuthenticated"  @command="handleMenuCommand">
    <el-avatar fit="fill" :size="50" :src="avatarUrl"></el-avatar>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item disabled>你好,{{currentUser.name}}</el-dropdown-item>
        <el-dropdown-item>查看个人资料</el-dropdown-item>
        <el-dropdown-item>修改个人信息</el-dropdown-item>
        <el-dropdown-item @click="logout">登出</el-dropdown-item>

      </el-dropdown-menu>
    </template>
  </el-dropdown>


</div>
</template>

<script>
import { mapGetters } from "vuex";
import {ElMessageBox} from "element-plus";
export default {
  name: "UserProfile",
  data() {
    return {
      avatarUrl: "https://placekitten.com/200/300"
    }
  },
  setup() {
    const handleMenuCommand = (command)=> {
      console.log(command)
    }
    return {handleMenuCommand}
  },
  methods: {
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
  computed: {
    ...mapGetters(["currentUser","isAuthenticated"])
  }
}
</script>

<style lang="scss" scoped>
.profile {
  margin-left:auto;
}
.el-avatar {
  cursor:pointer;
}
</style>