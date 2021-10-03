<template>
<div>
  <el-page-header label-width="120px" content="激活Clubby账号"/>
  <el-container class="body">
    <el-alert title="你好，欢迎加入xxx社团。在开始之前，你需要对你的社团账号进行激活。" type="info" show-icon> </el-alert>
  </el-container>
</div>
</template>

<script>
export default {
  name: "ActivateAccount.vue"
}
</script>

<style lang="scss" scoped>
.body {
  padding: 2em 4em;
}
</style>