import JwtService from '@/common/jwt.service'
import ApiService, {AuthService, UserService} from "@/common/api.service";

const EMPTY_AUTH_STATE = {
    user: {
        id:null,
        role:null,
        roleName:null,
        name:null,
        jwt:null
    },
    errors:null,
    isAuthenticated: !!JwtService.getToken()
}

const authModule = {
    state: {
        ...EMPTY_AUTH_STATE
    },
    getters: {
        currentUser(state) {
            return state.user
        },
        isAuthenticated(state) {
            return state.isAuthenticated
        }
    },
    mutations: {
        setAuth(state,user) {
            state.isAuthenticated = true
            Object.assign(state.user,user)
            state.errors = {}
            JwtService.saveToken(state.user.jwt)
        },
        setError(state,error) {
            state.errors = error
        },
        purgeAuth(state) {
            Object.assign(state,EMPTY_AUTH_STATE)
        }
    },
    actions: {
        checkAuth(context) {
            if (JwtService.getToken()) {
                console.log('ok')
                ApiService.setHeader()
                UserService.getCurrentUser().then(({data})=> {
                    context.commit('setAuth',data.data)
                }).catch(({response}) => {
                    context.commit('setError',response.data.errors)
                })
            }
        },
        logout(context) {
            context.commit('purgeAuth')
        },
        login(context,payload) {
            const {email,password} = payload
            return new Promise((resolve,reject)=> {
                AuthService.login(email,password).then(({data})=> {
                    context.commit('setAuth',data.data)
                    resolve(data.data)
                }).catch(({response}) => {
                    console.log(response)
                    reject(response)
                })
            })
        }
    }
}

export default authModule