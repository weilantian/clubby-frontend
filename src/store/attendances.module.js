import {AttendanceService} from "@/common/api.service";

const attendancesModule = {
    namespaced:true,
    state: {
        attendanceRecords: [],
        isLoading:false
    },
    getters: {
        attendanceRecords(state) {
            return state.attendanceRecords;
        },
        isAttendanceRecordsLoading(state) {
            return state.isLoading
        }
    },
    mutations: {
        fetchStart(state) {
            state.isLoading = true;
        },
        fetchEnd(state,payload) {
            state.isLoading = false;
            state.attendanceRecords = payload
        }
    },
    actions: {
        fetchAttendanceRecords({commit}) {
            commit('fetchStart')
            AttendanceService.getAllAttendanceRecords().then(({data})=> {
                commit('fetchEnd',data.data)
            })
        }
    }
}

export default attendancesModule