import axios from 'axios'
import JwtService from '@/common/jwt.service'
import {API_URL} from '@/common/config'
import { ElMessage } from 'element-plus'

const ApiService = {
    init() {
       axios.defaults.baseURL = API_URL
    },
    setHeader() {
        axios.defaults.headers.common["Authorization"] = `Bearer ${JwtService.getToken()}`
    },
    query(resource,params) {
        return axios.get(resource,params).catch(error=> {
            ElMessage.error("网络连接出现问题，请刷新本页后重试。")
            throw new Error(`[CLUBBY] ApiService ${error}`);
        })
    },
    get(resource,slug="") {
        return axios.get(`${resource}/${slug}`).catch((error)=> {
            ElMessage.error("网络连接出现问题，请刷新本页后重试。")
            throw new Error(`[CLUBBY] ApiService ${error}`)

        })
    },
    post(resource,params) {
        return axios.post(`${resource}`,params).catch((error)=> {
            ElMessage.error("网络连接出现问题，请刷新本页后重试。")
            throw new Error(`[CLUBBY] ApiService ${error}`)
        })
    },
    update(resource,slug,params) {
        return axios.patch(`${resource}/${slug}`,params).catch((error)=> {
            ElMessage.error("网络连接出现问题，请刷新本页后重试。")
            throw new Error(`[CLUBBY] ApiService ${error}`)
        })
    },
    delete(resource) {
        return axios.delete(resource).catch(error=> {
            ElMessage.error("网络连接出现问题，请刷新本页后重试。")
            throw new Error(`[CLUBBY] ApiService ${error}`)
        })
    }
}

export const ClubInfoService = {
    getClubInfo() {
        return ApiService.get('info')
    },
    updateClubInfo(name,type,description,designedMemberCount) {
        return ApiService.update('info','',{
            name,description,type,designedMemberCount
        })
    }
}

export const UserService = {
    getCurrentUser() {
        return ApiService.get('user','current')
    },
    getAllUsers() {
        return ApiService.get('user')
    },
    getUser(id) {
        return ApiService.get('user',id)
    },
    updateUser(id,email,name,sex,role,roleName) {
        return ApiService.update('user',id,{
            email,name,sex,role,roleName
        })
    },
    updateCurrentUser(email,name,sex,role,roleName) {
        return ApiService.update('user','current',{
            email,name,sex,role,roleName
        })
    },
}

export const AuthService = {
    login(email,password) {
        return ApiService.post('auth/login',{
            email,password
        })
    },
    updatePIN(email,oldPassword,newPassword) {
        return ApiService.post('auth/updatePIN',{
            email,oldPassword,newPassword
        })
    },
    createAccount(name,email,password,sex,role,roleName) {
        return ApiService.post('auth/signUp',{
            name,email,password,sex,role,roleName
        })
    }
}

export default ApiService