<template>
<div>
<pick-members v-if="state.value==='picking'" :service="service"/>
  <calling-member v-show="state.value==='calling'" :service="service"/>
</div>
</template>

<script>
import {createMachine} from 'xstate'
import {useMachine} from "@xstate/vue";
import PickMembers from "@/components/RollCall/PickMembers";
import CallingMember from "@/components/RollCall/CallingMember";
import {AttendanceService} from "@/common/api.service";
import router from "@/router";
import {ElLoading,ElNotification} from "element-plus";
const INITIAL_CONTEXT = {
  participators:[],
  arrivedParticipators:[],
  calling:{
    index:0,
    name:""
  },
  isLoading:false
}
const rollCallMachine = createMachine({
  id: "rollCall",
  initial: "picking",
  context: {
    ...INITIAL_CONTEXT
  },
  states: {
    picking: {
      on: {
        SELECTED: {
          target: "calling",
          actions: (context,event)=> {
            context.participators = event.participators
            context.calling.index = 0
            context.calling.name = context.participators[0].name
            context.arrivedParticipators = []
            console.log(context)
          }
        }
      }
    },
    calling: {
      on: {
        CALLED: [{
          target:"calling",
          cond:(context,event)=> {
            if(event.arrived) {
              context.arrivedParticipators.push(context.participators[context.calling.index])
            }
            if (context.calling.index === context.participators.length - 1) {
              alert("ended")
              return false
            }
            context.calling.index += 1
            context.calling.name = context.participators[context.calling.index].name
            return true
          }
        },{
          //Finished
          target:"picking",
          actions: (context)=> {
            console.log(context.arrivedParticipators)
            const arrivedList = []
            for (const participant of context.arrivedParticipators) {
              arrivedList.push({id:participant.id})
            }
            context.arrivedParticipators = []
            context.participators = []
            console.log("after",context)
            const loading = ElLoading.service({
              lock:true,
              text:"请稍后，正在发布点名信息",
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)',
            })
            AttendanceService.createAttendanceRecord(arrivedList).then(({data})=> {
              loading.close()
              router.push(`/dashboard/attendance/${data.data.id}`)
            }).catch(()=> {
              loading.close()
              ElNotification.error({
                title:"发生错误",
                message:"无法成功发布点名信息"
              })
            })
            //router.push
          }
        }]
      }
    },
  }
})

export default {
  name: "RollCall",
  components: {CallingMember, PickMembers},
  setup() {
    const {state,send,service} = useMachine(rollCallMachine)
    return {state,send,service}
  }
}
</script>

<style scoped>

</style>