<template>
  <el-row justify="end">
    <el-button @click="$router.push('/dashboard/user/create')" type="primary">添加人员</el-button>
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
          <el-table-column label="签到次数" prop="role" />

          <el-table-column width="300"  align="right">
            <template #header>
              <el-input v-model="search" size="mini" placeholder="根据姓名搜索..." />
            </template>
            <template #default="scope">
              <el-button
                  size="mini"
                  type="primary"
                  @click="handleDelete(scope.$index, scope.row)"
              >详情</el-button
              >
              <el-button
                  size="mini"

                  @click="handleDelete(scope.$index, scope.row)"
              >出勤</el-button
              >
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
              >
              <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
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
export default {
  name: "People",
  computed: {
    ...mapGetters('users',['users','isUsersLoading'])
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
    decodeRole(role) {
      const roleList = {
        "ADMIN":"管理员",
        "MEMBER":"成员"
      }
      return roleList[role]
    },
    decodeSex(sex) {
      const sexList = {
        "MALE":"男",
        "FEMALE":"女",
        "OTHER":"非二元",
        "UNSET":"未设置"
      }
      return sexList[sex]
    },
    fetchUsers() {
      this.$store.dispatch('users/fetchUsers')
    },
    handleEdit() {

    },
    handleDelete() {

    },
    filterHandler(value,row,column) {
      const property = column['property']
      return row[property] === value
    }
  }
}
</script>

<style scoped>

</style>