import {UserService} from "@/common/api.service";

const usersModule = {
    namespaced:true,
    state: {
        users:[],
        isLoading: false
    },
    getters: {
        isUsersLoading(state){
            return state.isLoading;
        },
        users(state) {
            return state.users;
        },
        admins(state){
            return state.users.filter(user=> user.role==="ADMIN")
        },
        members(state) {
            return state.users.filter(user=> user.role==="MEMBER")
        }
    },
    mutations: {
        fetchStart(state) {
            state.isLoading = true
        },
        fetchEnd(state, data) {
            state.users = data
            state.isLoading = false
        }
    },
    actions: {
        fetchUsers({commit}){
            commit('fetchStart')
            UserService.getAllUsers().then(({data})=> {
                commit('fetchEnd',data.data);
            })
        }
    },
}

export default usersModule