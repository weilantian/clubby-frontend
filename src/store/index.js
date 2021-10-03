import { createStore } from 'vuex'
import auth from './auth.module'
import clubInfo from "@/store/clubInfo.module";
import users from '@/store/users.module'
import user from '@/store/user.module'
export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {

  },
  modules: {
    auth,
    clubInfo,
    users,
    user
  }
})
