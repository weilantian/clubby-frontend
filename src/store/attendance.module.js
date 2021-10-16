import {AttendanceService} from "@/common/api.service";

const attendanceModule = {
    namespaced: true,
    state: {
        attendanceRecord: {
            id: null,
            date: null,
            attended: [],
        },
        isLoading: false
    },
    getters: {
        attendanceRecord(state) {
            return state.attendanceRecord;
        },
        isAttendanceRecordLoading(state) {
            return state.isLoading;
        }
    },
    mutations: {
        fetchStart(state) {
            state.isLoading = true;
        },
        fetchEnd(state, payload) {
            state.isLoading = false
            for (const key in state.attendanceRecord) {
                state.attendanceRecord[key] = payload[key]
            }
        }
    },
    actions: {
        fetchAttendanceRecord({commit}, id) {
            commit('fetchStart')
            AttendanceService.getAttendanceRecord(id).then(({data}) => {
                commit('fetchEnd', data.data);
            })
        },
        addPersonToAttendanceRecord({commit, state}, userId) {
            commit('fetchStart')
            return new Promise(resolve => {
                    AttendanceService.addPersonToAttendanceRecord(state.attendanceRecord.id, userId).then(({data}) => {
                        commit('fetchEnd', data.data);
                        resolve(data.data);
                    }).catch(err => {
                        throw new Error(err)
                    })
                }
            )

        },
        removePersonFromAttendanceRecord({commit, state}, userId) {
            commit('fetchStart')
            AttendanceService.removePersonFromAttendanceRecord(state.attendanceRecord.id, userId).then(({data}) => {
                commit('fetchEnd', data.data)
            })
        }
    }
}

export default attendanceModule