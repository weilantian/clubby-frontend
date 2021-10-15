<template>
<div>

    <el-row>
      <el-col>
        <el-card>
          <template  #header>
            <div class="card-header">
              <span>个人资料</span>
              <el-button @click="$router.push('/dashboard/profile/modify')" class="button" type="text">编辑</el-button>
            </div>
          </template>
          <el-descriptions :column="1" border>
            <el-descriptions-item label="姓名">{{currentUser.name}}</el-descriptions-item>
            <el-descriptions-item label="性别">{{decodeSex(currentUser.sex)}}</el-descriptions-item>
            <el-descriptions-item label="邮箱">{{currentUser.email}}</el-descriptions-item>
            <el-descriptions-item label="身份">{{currentUser.roleName}}</el-descriptions-item>
            <el-descriptions-item label="权限">{{decodeRole(currentUser.role)}}</el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
    </el-row>

</div>
</template>

<script>
import {mapGetters} from "vuex";
import useTextDecoder from "@/composables/useTextDecoder";

export default {
  name: "Profile",
  computed: {
    ...mapGetters(['currentUser'])
  },
  setup() {
    const {decodeRole,decodeSex} = useTextDecoder()
    return {decodeRole,decodeSex}
  }
}
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height:32px;
}
</style>