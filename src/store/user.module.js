import {AuthService, UserService} from "@/common/api.service";

const userModule = {
    namespaced:true,
    state: {
        user: {
            id:null,
            role:null,
            roleName:null,
            name:null,
            jwt: null,
            email:null
        },
        isLoading:false,
    },
    getters: {
        user(state) {
            return state.user
        },
        isUserLoading(state) {
            return state.isLoading
        }
    },
    mutations:{
        fetchStart(state){
            state.isLoading = true
        },
        fetchEnd(state,data) {
            state.isLoading = false
            Object.assign(state.user,data)
        }
    },
    actions: {
        fetchUser({commit},id) {
            commit('fetchStart')
            UserService.getUser(id).then(({data})=> {
                commit('fetchEnd',data.data)
            })
        },
        updateUser({commit,state},payload) {
            return new Promise(resolve => {
                commit('fetchStart')
                const {email,name,sex,role,roleName} = payload
                UserService.updateUser(state.user.id,email,name,sex,role,roleName).then(({data})=> {
                    commit('fetchEnd',data.data)
                    resolve(data.data)
                }).catch(error=> {
                    throw new Error(error)
                })
            })
        },
        createUser({commit},payload) {
            return new Promise(resolve=> {
                commit('fetchStart')
                const {email,name,sex,role,roleName,password} = payload
                AuthService.createAccount(name,email,password,sex,role,roleName).then(({data})=> {
                    commit('fetchEnd',data.data)
                    resolve(data.data)
                }).catch(error=> {
                    throw new Error(error)
                })
            })
        }
    }

}

export default userModule