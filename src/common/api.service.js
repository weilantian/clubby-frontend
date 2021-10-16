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
            if (!error.response) {
                ElMessage.error("网络连接出现问题，请刷新本页后重试。")
            }
            throw error
        })
    },
    get(resource,slug="") {
        return axios.get(`${resource}/${slug}`).catch((error)=> {
            if (!error.response) {
                ElMessage.error("网络连接出现问题，请刷新本页后重试。")
            }
            throw error
        })
    },
    post(resource,params) {
        return axios.post(`${resource}`,params).catch((error)=> {
            if (!error.response) {
                ElMessage.error("网络连接出现问题，请刷新本页后重试。")
            }
            throw error
        })
    },
    update(resource,slug,params) {
        return axios.patch(`${resource}/${slug}`,params).catch((error)=> {
            if (!error.response) {
                ElMessage.error("网络连接出现问题，请刷新本页后重试。")
            }
            throw error
        })
    },
    delete(resource,slug) {
        return axios.delete(`${resource}/${slug}`).catch(error=> {
            if (!error.response) {
                ElMessage.error("网络连接出现问题，请刷新本页后重试。")
            }
            throw error
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

export const CourseService = {
    getAllCourses() {
        return ApiService.get('course')
    },
    getCourse(id) {
        return ApiService.get('course',id)
    },
    createCourse({name,content,fileLinks,published}) {
        return ApiService.post('course',{
            name,content,fileLinks,published
        })
    },
    updateCourse(id,{name,content,fileLinks,published}) {
        return ApiService.update('course',id,{
            name,content,fileLinks,published
        })
    },
    deleteCourse(id) {
        return ApiService.delete('course',id)
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
    updateCurrentUser({email,name,sex,role,roleName}) {
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
    },
    activate(newPassword) {
        return ApiService.post('auth/activate',{
            newPassword
        })
    },
}

export const AttendanceService = {
    createAttendanceRecord(attended) {
        return ApiService.post('attendance',{
            attended
        })
    },
    getAttendanceRecord(id) {
        return ApiService.get('attendance',id)
    },
    getAllAttendanceRecords() {
        return ApiService.get('attendance')
    },
    addPersonToAttendanceRecord(id,userId) {
        return ApiService.update(`attendance`,`${id}/add`,{
            userId
        })
    },
    removePersonFromAttendanceRecord(id,userId) {
        return ApiService.update('attendance',`${id}/remove`,{
            userId
        })
    }
}

export default ApiService