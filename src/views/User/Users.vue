<template>
  <el-row justify="end">
    <el-button v-if="authRole==='ADMIN'" @click="$router.push('/dashboard/user/create')" type="primary">添加人员</el-button>
    <el-button :loading="isUsersLoading">刷新</el-button>
  </el-row>
  <el-divider/>
  <el-row>
    <el-col>
      <el-card>
        <template #header>
          <span>社团人员</span>
        </template>
        <el-table v-loading="isUsersLoading" :default-sort="{ prop: 'role', order: 'descending' }" :data="
        users.filter(data=> !search || data.name.includes(search))
" style="width: 100%" >
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
          <el-table-column label="性别" prop="sex">
            <template #default="scope">
              <div class="sex-wrapper">
                {{this.decodeSex(scope.row.sex)}}
              </div>
            </template>
          </el-table-column>
          <el-table-column v-if="authRole==='ADMIN'" label="签到次数" prop="attendedCount" />

          <el-table-column width="300"  align="right">
            <template #header>
              <el-input v-model="search" size="mini" placeholder="根据姓名搜索..." />
            </template>
            <template #default="scope">
              <el-button
                  size="mini"
                  type="primary"
                  @click="showDetail(scope.$index,scope.row)"
              >详情</el-button>
              <el-button
                  size="mini"
                  v-if="authRole==='ADMIN'"
                  @click="handleDelete(scope.$index, scope.row)"
              >出勤记录</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from "vuex";
import useDecodeRoles from "@/composables/useTextDecoder";

//TODO:添加一个忘记密码的功能

export default {
  name: "People",
  computed: {
    ...mapGetters('users',['users','isUsersLoading']),
    ...mapGetters(['authRole'])
  },
  setup() {
    const {decodeRole,decodeSex} = useDecodeRoles()
    return {decodeRole,decodeSex}
  },
  mounted() {
    this.fetchUsers()
  },
  data() {
    return {
      search: '',
    }
  },
  methods: {
    fetchUsers() {
      this.$store.dispatch('users/fetchUsers')
    },
    filterHandler(value,row,column) {
      const property = column['property']
      return row[property] === value
    },
    showDetail(index,row) {
      this.$router.push(`/dashboard/user/${row.id}`)
    }
  }
}
</script>

<style scoped>

</style>