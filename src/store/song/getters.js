export default{
    currentSong(state){
        return state.songlist[state.currentIndex];  //获取当前播放的歌曲的信息
    }
}