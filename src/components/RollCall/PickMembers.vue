<template>
<div>
  <p>请选择参与人员</p>
  <el-divider/>
  <el-row>
    <el-col>
      <el-table height="300" v-loading="isUsersLoading" :default-sort="{ prop: 'role', order: 'descending' }" :data="
        users.filter(data=> !search || data.name.includes(search))"
                @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="姓名" prop="name" />
        <el-table-column label="角色" prop="roleName" />
        <el-table-column :filters="[
              {text:'成员',value:'MEMBER'},
              {text:'管理员',value:'ADMIN'}
              ]" :filter-method="filterHandler" label="类型" prop="role" >
          <template #default="scope">
            <div class="name-wrapper">
              <el-tag size="medium">{{ this.decodeRole(scope.row.role) }}</el-tag>
            </div>
          </template>

        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
  <el-divider/>
  <el-row justify="end">
    <el-button @click="$router.back()">取消</el-button>
    <el-button @click="startRollCall" type="primary">开始点名</el-button>
  </el-row>

</div>
</template>

<script>
import {mapGetters} from "vuex";
import useDecodeRoles from "@/composables/useTextDecoder";
import {useActor} from "@xstate/vue";
import {onMounted, reactive, toRefs} from "vue";
import {useStore} from "vuex";

export default {
  name: "PickMembers",
  props: [
    "service"
  ],
  setup(props) {
    const data = reactive({
      search:"",
      selection:[]
    })
    const store = useStore()
    const {decodeRole,decodeSex} = useDecodeRoles()
    const {state,send} = useActor(props.service)
    onMounted(()=> {
      fetchUsers()
    })
    const fetchUsers = ()=> {
      store.dispatch('users/fetchUsers')
    }
    const handleSelectionChange = (val)=> {
      data.selection = val
    }
    const startRollCall = ()=> {
      send({
        type:"SELECTED",
        participators: data.selection
      })
    }
    return {decodeRole,decodeSex,state,send,fetchUsers,handleSelectionChange,startRollCall,...toRefs(data)}
  },
  computed: {
    ...mapGetters('users',['users','isUsersLoading'])
  },
}
</script>

<style scoped>

</style>