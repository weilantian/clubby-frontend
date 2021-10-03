<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
import {ref} from "vue";

export default {

  setup() {
    const headerSelected = ref('1')
    const goBack = ()=> {

    }
    return {goBack,headerSelected}
  }
}
</script>

<style>
.el-menu-item {
 display: flex;
  align-items: center;
}
.el-menu-item span {
  margin-left:0.4em;
}
</style>