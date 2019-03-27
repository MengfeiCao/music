const mutations = {
    // 一键控制
    addSongList(state,params){
        // console.log("触发mutations")
        state.songlist = params.songlist;
       
        state.currentIndex = params.currentIndex;
        // console.log(params.songlist)
    },
    nextSong(state){
        // 边界判断
        if(state.currentIndex >= state.songlist.length - 1){
            state.currentIndex = 0 
        }else{
            state.currentIndex ++
        }
    },
    prevSong(state){
        // 边界判断
        if(state.currentIndex <= 0){
            state.currentIndex = state.songlist.length - 1
        }else{
            state.currentIndex --
        }
    },

}

export default mutations;