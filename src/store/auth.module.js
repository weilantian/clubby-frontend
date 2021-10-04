import JwtService from '@/common/jwt.service'
import ApiService, {AuthService, UserService} from "@/common/api.service";
import router from "@/router";


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
        },
        authError(state) {
            return state.errors
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
        checkAuth(context,autoNavigate) {
            if (JwtService.getToken()) {
                console.log('ok')
                ApiService.setHeader()
                UserService.getCurrentUser().then(({data})=> {
                    context.commit('setAuth',data.data)
                }).catch(async error => {
                    if (error.response) {
                        context.commit('setError',error.response.data)
                        if (!autoNavigate) {
                            return
                        }
                        if (error.response.data.code === 'ACCOUNT_NOT_ACTIVATED'){
                            await router.push('/activate')
                        }
                        if (error.response.data.code === 'JWT_RESIGN_REQUIRED') {
                            console.log("请重新登陆")
                        }
                    }
                })
            } else {
                console.log("请登录")
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
                    //TODO: CATCH DATA USE SET DATA
                    console.log(response)
                    reject(response)
                })
            })
        },
        activateAccount(context,payload) {
            const {password} = payload
            return new Promise((resolve,reject)=> {
                AuthService.activate(password).then(({data})=> {
                    context.commit('setAuth',data.data)
                    resolve(data.data)
                }).catch(({response})=> {
                    //TODO: CATCH DATA USE SET DATA
                    reject(response)
                })
            })
        }
    }
}

export default authModule