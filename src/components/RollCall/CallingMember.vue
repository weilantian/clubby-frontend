<template>
<div>
<el-row>
  <el-alert title="正在点名" type="warning" />
</el-row>
  <el-row justify="center">
    <div class="name__wrapper">
      <h1 class="name">{{state.context.calling.name}}</h1>
    </div>
  </el-row>
<el-divider/>
  <el-row justify="center">

      <el-button @click="setArrival(false)">未到达</el-button>
    <el-button @click="setArrival(true)" type="primary">到达</el-button>


  </el-row>
</div>
</template>

<script>
import {useActor} from "@xstate/vue";

export default {
  name: "CallingMember",
  props: ["service"],
  setup(props){
    const {state,send} = useActor(props.service)
    const setArrival = (arrival)=> {
      send({
        type:"CALLED",
        arrived:arrival
    })
    }
    return {state,send,setArrival}
  },
  methods: {

  },
  mounted() {
    this.name = this.state.context.calling.name
  }
}
</script>

<style lang="scss" scoped>
.name {
  font-size:32px;
}
</style>