<template>
  <div class="home">

    <el-row justify="end">
      <el-button type="primary">开始点名</el-button>
      <el-button
        :loading="clubInfoLoading"
        @click="fetchClubInfo()" icon="el-icon-refresh">刷新</el-button></el-row>

    <el-divider/>
      <el-row  gutter="20">
        <el-col :span="8">
          <el-card shadow="hover" class="box-card">
            <template #header>
              <div class="card-header">
                <span>社团总人数</span>
                <el-button class="button" type="text">管理社员</el-button>
              </div>
            </template>
            <div v-loading="clubInfoLoading" class="count-card__body">
              <h1>{{clubInfo.totalCount}}</h1>
              <p>人</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover" class="box-card">
            <template #header>
              <div  class="card-header">
                <span>社员人数</span>
              </div>
            </template>
            <div v-loading="clubInfoLoading" class="count-card__body">
              <h1>{{clubInfo.memberCount}}</h1>
              <p>人</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover" class="box-card">
            <template #header>
              <div class="card-header">
                <span>管理员人数</span>

              </div>
            </template>
            <div v-loading="clubInfoLoading" class="count-card__body">
              <h1>{{clubInfo.adminCount}}</h1>
              <p>人</p>
            </div>
          </el-card>
        </el-col>

      </el-row>
    <el-divider/>
    <el-row  gutter="20">
      <el-col>
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>社团概要信息</span>
              <el-button @click="$router.push('/dashboard/general/modify')" class="button" icon="el-icon-edit" type="text">编辑</el-button>
            </div>
          </template>

            <el-descriptions v-loading="clubInfoLoading" column="2" direction="vertical" :title="clubInfo.name">
              <el-descriptions-item label="类型">{{clubInfo.type}}</el-descriptions-item>
              <el-descriptions-item label="设计社员数量"><el-tag>{{clubInfo.designedMemberCount}} 人</el-tag></el-descriptions-item>

              <el-descriptions-item label="简介"
              >{{clubInfo.description}}</el-descriptions-item
              >
            </el-descriptions>

        </el-card>
      </el-col>

    </el-row>
    <el-divider/>
    <el-row  gutter="20">
      <el-col>
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>收到的组员问答</span>

            </div>
          </template>
          <div class="count-card__body">
            <h1>32</h1>
            <p>人</p>
          </div>
        </el-card>
      </el-col>

    </el-row>

    <el-divider/>

    <el-row  gutter="20">
      <el-col :span="16">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>近期社团日程</span>

            </div>
          </template>
          <div class="count-card__body">
            <!--              <h1>32</h1>-->
            <p style="color:var(--el-color-info)">暂无</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>与你有关的待办事项</span>

            </div>
          </template>
          <div class="count-card__body">
            <!--              <h1>32</h1>-->
            <p style="color:var(--el-color-info)">暂无</p>
          </div>
        </el-card>
      </el-col>
    </el-row>


  </div>
</template>

<script>

import { mapGetters } from "vuex";
export default {
  name: 'Home',

  mounted() {
    this.fetchClubInfo()
  },
  computed: {
    ...mapGetters('clubInfo',["clubInfoLoading","clubInfo"])
  },
  methods: {
    fetchClubInfo() {
      this.$store.dispatch('clubInfo/fetchClubInfo')
    }
  }

}
</script>

<style scoped lang="scss">
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height:32px;
}
.count-card__body {
  display: flex;
  align-items: end;
  justify-content: center;
  & h1{
    margin: 12px 0;
    font-size:2em;
  }
}
</style>
