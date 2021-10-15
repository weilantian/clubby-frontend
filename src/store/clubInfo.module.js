import {ClubInfoService} from "@/common/api.service";

const EMPTY_INFO_STATE = {
    clubInfo: {
        id:null,
        name:null,
        description:null,
        type:null,
        designedMemberCount:0,
        totalCount:0,
        memberCount:0,
        adminCount:0,
    },
    isLoading:false
}

const clubInfoModule = {
    namespaced: true,
    state: {
        ...EMPTY_INFO_STATE
    },
    getters: {
        clubInfoLoading(state) {
            return state.isLoading;
        },
        clubInfo(state) {
            return state.clubInfo;
        }
    },
    mutations: {
        fetchStart(state) {
            state.isLoading = true
        },
        fetchEnd(state,data){
            //TODO: 改为深拷贝
            state.isLoading = false
            state.clubInfo.id  = data.id;
            state.clubInfo.name = data.name;
            state.clubInfo.description = data.description;
            state.clubInfo.type = data.type;
            state.clubInfo.designedMemberCount = data.designedMemberCount;
            state.clubInfo.totalCount = data.totalCount;
            state.clubInfo.memberCount = data.memberCount;
            state.clubInfo.adminCount = data.adminCount;
        },
    },
    actions: {
        fetchClubInfo({commit}) {
            commit('fetchStart')
            ClubInfoService.getClubInfo().then(({data})=> {
                commit('fetchEnd',data.data);
            }).catch(error=> {
                throw new Error(error)
            })
        },
        updateClubInfo({commit},payload){
            return new Promise(resolve=> {
                commit('fetchStart')
                const {name,type,description,designedMemberCount} = payload
                ClubInfoService.updateClubInfo(name,type,description,designedMemberCount).then(({data})=> {
                    commit('fetchEnd',data.data)
                    resolve(data.data)
                }).catch(error=> {
                    throw new Error(error)
                })
            })
        }
    }
}

export default clubInfoModule