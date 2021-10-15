import {CourseService} from "@/common/api.service";

const courseModule = {
    namespaced:true,
    state: {
        courses:[],
        isCoursesLoading: false,
        course: {
            id:null,
            name:null,
            fileLinks:null,
            content:null,
            published:false
        },
        isCourseLoading:false
    },
    getters: {
        course(state) {
            return state.course;
        },
        courses(state) {
            return state.courses;
        },
        isCourseLoading(state) {
            return state.isCourseLoading;
        },
        isCoursesLoading(state) {
            return state.isCoursesLoading;
        }
    },
    mutations: {
        fetchCourseStart(state) {
            state.isCourseLoading = true;
        },
        fetchCourseEnd(state,data) {
            state.isCourseLoading = false;
            state.course.id = data.id;
            state.course.content = data.content;
            state.course.name = data.name;
            state.course.fileLinks = data.fileLinks;
            state.course.published = data.published;
        },
        fetchCoursesStart(state) {
            state.isCoursesLoading = true;
        },
        fetchCoursesEnd(state,data) {
            state.courses = data
            state.isCoursesLoading = false;
        }
    },
    actions: {
        fetchCourse({commit},id) {
            commit('fetchCourseStart')
            CourseService.getCourse(id).then(({data})=> {
                commit('fetchCourseEnd',data.data)
            })
        },
        fetchCourses({commit}) {
            commit('fetchCoursesStart')
            CourseService.getAllCourses().then(({data})=> {
                commit('fetchCoursesEnd',data.data)
            })
        },
        createCourse({commit},payload) {
            return new Promise(resolve => {
                commit('fetchCourseStart')
                const {name,content,fileLinks,published} = payload
                CourseService.createCourse({name,content,fileLinks,published}).then(({data})=> {
                    commit('fetchCourseEnd',data.data)
                    resolve(data.data)
                }).catch(error=> {
                    throw new Error(error)
                })
            })
        },
        updateCourse({state,commit},payload) {
            return new Promise(resolve => {
                const {name,content,fileLinks,published} = payload
                commit('fetchCourseStart')
                CourseService.updateCourse(state.course.id,{
                    name,content,fileLinks,published
                }).then(({data})=> {
                    commit('fetchCourseEnd',data.data)
                    resolve(data.data)
                }).catch(error=> {
                    throw new Error(error)
                })
            })
        }
    }
}

export default courseModule