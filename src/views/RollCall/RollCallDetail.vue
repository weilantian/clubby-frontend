<template>
<div>
  <el-page-header @back="goBack" title="返回" content="出勤记录"/>
  <el-divider/>
<el-row justify="end">
  <el-button @click="fetchAttendanceRecord" :loading="isAttendanceRecordLoading">刷新</el-button>
  <el-button @click="showAddPersonDialog" type="primary">添加人员</el-button>
</el-row>
  <el-divider/>
  <el-row>
    <el-col>
      <el-card>
        <el-descriptions border>
          <el-descriptions-item label="日期">
            {{attendanceRecord.date}}
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
    </el-col>
  </el-row>
  <el-divider/>
  <el-row>
    <el-col>
      <el-card v-loading="isAttendanceRecordLoading">
        <template #header>
          <span>报到社员</span>
        </template>
        <el-table :data="attendanceRecord.attended">
          <el-table-column label="姓名" prop="name" />
          <el-table-column width="300" label="操作">
            <template #default="scope">
              <el-button @click="showDetail(scope.$index,scope.row)" type="primary" size="mini">详情</el-button>
              <el-button size="mini" @click="removeRecord(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </el-row>
  <el-dialog v-model="addingPerson" title="添加成员">
    <el-form>
      <el-form-item label="成员">
        <el-select-v2 filterable style="width: 240px" placeholder="输入姓名来搜索" :options="userOptions" :loading="isUsersLoading" v-model="addPersonId"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="addingPerson = false">取消</el-button>
      <el-button @click="addPerson" type="primary">确认添加</el-button>
    </template>
  </el-dialog>
</div>
</template>

<script>
import {mapGetters} from "vuex";
import useDecodeRoles from "@/composables/useTextDecoder";
import {ElMessageBox} from 'element-plus'
export default {
  name: "RollCallDetail",
  setup() {
    const {decodeRole} = useDecodeRoles()
    return {decodeRole}
  },
  data() {
    return {
      addingPerson:false,
      addPersonId:"",
      userOptions:[]
    }
  },
  mounted() {
    this.fetchAttendanceRecord()
  },
  methods: {
    fetchAttendanceRecord() {
      this.$store.dispatch('attendance/fetchAttendanceRecord',this.$route.params.id)
    },
    goBack() {
      this.$router.back()
    },
    removeRecord(row) {
      ElMessageBox.confirm(
        `确认要将${row.name}从本出勤名单中删除吗?`,
        '删除人员',
          {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning',
          }
      ).then(()=> {
        this.$store.dispatch('attendance/removePersonFromAttendanceRecord',row.id)
      })
    },
    showDetail(index,row) {
      this.$router.push(`/dashboard/user/${row.id}`)
    },
    showAddPersonDialog() {
      this.$store.dispatch('users/fetchUsers')
      this.addingPerson = true
    },
    addPerson() {
      this.$store.dispatch('attendance/addPersonToAttendanceRecord',this.addPersonId).then(()=> {
        ElMessageBox.alert("添加社员成功","提示",{
          confirmButtonText:"好",
          callback: ()=> {
            this.addingPerson = false
            this.addPersonId = ""
          }
        })
      })
    }
  },
  computed: {
    ...mapGetters('attendance',['attendanceRecord','isAttendanceRecordLoading']),
    ...mapGetters('users',['isUsersLoading','users'])
  },
  watch: {
    isUsersLoading(isLoading) {
      if (isLoading) return false
      for (const user of this.users) {
        this.userOptions.push({
          value:user.id,
          label:user.name
        })
      }
    }
  }
}
</script>

<style scoped>

</style>