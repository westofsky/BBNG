const Users = {
    namespaced: true,
    state: { // 변수들
        _id : "",
        nickname : "",
    },
    getters: {
        getUser_oid(state){
            return state._id;
        },
        getUser_nickname(state){
            return state.nickname;
        }
    },
    mutations: {
        setUser_oid(state, oid){
            state._id = oid;
        },
        setUser_nickname(state, nickname){
            state.nickname = nickname;
        }
    },
    actions: { // [비동기 처리를 하는 함수들]
    },
};
export default Users;
