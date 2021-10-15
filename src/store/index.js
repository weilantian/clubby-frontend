import { createStore } from 'vuex'
import auth from './auth.module'
import clubInfo from "@/store/clubInfo.module";
import users from '@/store/users.module'
import user from '@/store/user.module'
import course from '@/store/course.module'
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
    user,
    course,
  }
})
