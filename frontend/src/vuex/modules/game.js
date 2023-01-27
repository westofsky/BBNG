const Games = {
    namespaced: true,
    state: { // 변수들
        rid : "",
    },
    getters: {
        getGame_rid(state){
            return state.rid;
        },
    },
    mutations: {
        setGame_rid(state, rid){
            state.rid = rid;
        },
    },
    actions: { // [비동기 처리를 하는 함수들]
    },
};
export default Games;
