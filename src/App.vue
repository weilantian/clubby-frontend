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
    //const router = useRouter()
    //const route = useRoute()
    const goBack = ()=> {

    }
    // onMounted(()=> {
    //   const autoNavigate = route.path !== '/activate' && route.path!=='/login'
    //   store.dispatch('checkAuth',autoNavigate)
    // })
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