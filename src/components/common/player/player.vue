<template>
<!-- 用songList.length判断Player是否显示，为0时消失，有length时显示 -->
    <div class="player">
        <!-- 当用v-show的时候，又元素，display：none；当刷新player页面的时候，currentSong种不会有数据，所以会报错 -->
        <div class="bigPlayer" v-if="songlist.length" v-show="bigplayerState">
            <!-- {{currentSong}} -->
            <span @click="hideBig">↓</span>
            <header>
                <h5>{{currentSong.songname}}</h5>
                <p>{{currentSong.singer_name}}</p>
            </header>
            <div ref="cd_big" class="cd_big">
                <img :src="'https://y.gtimg.cn/music/photo_new/T002R300x300M000' + currentSong.albummid + '.jpg?max_age=2592000'" alt="">
            </div>
            <div class="lyric">此处是歌词</div>
            <audio 
            :src="'http://dl.stream.qqmusic.qq.com/http://dl.stream.qqmusic.qq.com/C400' + currentSong.songmid + '.m4a?guid=1642740400&vkey=84256294AEC2C89B665E2B8C878CE711E96AF7BCD8399219644D58B262D04C5E7A706C66E345EE614D94C34D6B370C37BC12C5C279587A58&uin=0&fromtag=38'" 
            ref="audio" 
            @canplay="canplay"
            >这里是播放器</audio>
            <div class="control">
                <button 
                class="prev" 
                @click="prevSong">prev</button>
                <button 
                class="pause" 
                @click="pauseSong">pause</button>
                <button 
                class="next" 
                @click="nextSong">next</button>
            </div>
        </div>

        <div class="smallPlayer" v-if="songlist.length" v-show="smallplayerState">
            <div class="small_left" @click="showBig">
                <div ref="cd_small">
                    <img :src="'https://y.gtimg.cn/music/photo_new/T002R300x300M000' + currentSong.albummid + '.jpg?max_age=2592000'" alt="">
                </div>
                <div class="songName">
                    <h6>{{currentSong.songname}}</h6>
                    <p class="singerName">{{currentSong.singer_name}}</p>
                </div>
            </div>
            <div class="small_right">
                <span @click="pauseSong">△</span>
                <span @click="showList">歌</span>
            </div>
        </div>
        
        <div class="song_list" v-show="listShow">
            <div class="blank" @click="hideList"></div>
                <div class="bottom_all">
                <div class="list_header">
                    <div class="left">
                        <div class="order active">
                            <span>标</span>
                            <span>顺序播放</span>
                        </div>
                        <!-- <div class="loop">
                            <span>标</span>
                            <span>循环播放</span>
                        </div>
                        <div class="random">
                            <span>标</span>
                            <span>随机播放</span>
                        </div> -->
                    </div>
                    <div class="right" @click="confirm">
                        <span>垃圾箱</span>
                    </div>
                </div>

                <ul class="list">
                    <li 
                    v-for="(item,index) in songlist" 
                    :key="index"
                    >
                        <span>{{item.songname}}</span>
                        <div class="list_right">
                            <span>心</span>
                            <span>X</span>
                        </div>
                    </li>
                </ul>

                <div class="addSong">
                    <div><span>+</span>添加歌曲到队列</div>
                </div>

                <div class="close" @click="hideList">
                    <p>关闭</p>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import {mapState,mapGetters,mapMutations} from "vuex";
// 引入mint-ui的组件
import { MessageBox } from 'mint-ui';
// 歌词转码
import base64 from "js-base64";
// 歌词逐行播放
// import Lyric from " lyric-parser";

export default {
    data(){
        return{
            rotate : 0,
            line : "",
            listShow : false,
        }
    },
    methods: {
        ...mapMutations(["nextSong","prevSong"]),
        // audio自带的方法canplay，可以在里边写逻辑实现自动播放
        canplay(){
            // 选中audio元素（通过ref）
            this.$refs.audio.play();
            // cd转动
            this.startAnim();
            // 获取歌词
            let lyricsrc = `/scrollContent/music/api/lyric?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&songmid=${this.currentSong.songmid}&platform=yqq&hostUin=0&needNewCode=0&categoryId=10000000&pcachetime=1553651978749`;
            this.getLyric(lyricsrc);
        },
        pauseSong(){
            
            // 判断要是audio处于暂停状态则点击播放，否则点击暂停
            if(this.$refs.audio.paused){
                this.$refs.audio.play();
                this.startAnim();
            }else{
                this.$refs.audio.pause();
                this.stopAnim();
            }
            // console.log("触发pause")
        },
        hideBig(){
            // console.log(this.bigplayerState);
            this.$store.state.song.bigplayerState = !this.$store.state.song.bigplayerState;           
        },
        showBig(){
            this.$store.state.song.bigplayerState = !this.$store.state.song.bigplayerState;           
        },
        showList(){
            this.listShow = true;
        },
        hideList(){
            this.listShow = false;
        },
        confirm(){
            MessageBox.confirm('确定执行此操作?')
            .then(action => {
                this.$store.state.song.songlist = [];
                this.listShow = false;
            });
        },
        // 开始转cd
        startAnim() {
            console.log(this.$refs.cd_big,this.$refs.cd_big);
            clearInterval(this.timeout);
            this.timeout = null;
            this.timeout = setInterval(()=>{
                var rotateStyle = "rotate(" + this.rotate + "deg)";

                this.$refs.cd_big.style.transform = rotateStyle;
                this.$refs.cd_big.style["-moz-transform"] = rotateStyle;
                this.$refs.cd_big.style["-webkit-transform"] = rotateStyle;
                this.$refs.cd_big.style["-o-transform"] = rotateStyle;
                this.$refs.cd_big.style["-ms-transform"] = rotateStyle;

                this.$refs.cd_small.style.transform = rotateStyle;
                this.$refs.cd_small.style["-moz-transform"] = rotateStyle;
                this.$refs.cd_small.style["-webkit-transform"] = rotateStyle;
                this.$refs.cd_small.style["-o-transform"] = rotateStyle;
                this.$refs.cd_small.style["-ms-transform"] = rotateStyle;

                this.rotate += 0.2 ;
                // console.log(this.rotate)
                if (this.rotate > 360) {
                    this.rotate = 0;
                }
            }, 5);
        },
        // cd停止转动
        stopAnim() {
            clearInterval(this.timeout);
            this.timeout = null;
        },
        // 获取歌词
        getLyric(url){
            this.$axios.get(url)
            .then((data)=>{
                
                // 将歌词转码
                let text = Base64.decode(data.lyric);
                console.log(text);
                // 歌词逐行播放
                // let LyricObj = new Lyric(text,(line)=>{
                //     console.log(line);
                //     this.line = line;
                // })
            })
            
        }
    },
    // watch: {
    //     lyricInfo(newLyric,oldLyric){
    //         console.log("触发watch")
    //     }
    // },
    computed : {
        ...mapState({
            songlist : state => state.song.songlist,
            currentIndex : state => state.song.currentIndex,
            bigplayerState : state => state.song.bigplayerState,
            smallplayerState : state => state.song.smallplayerState,
        }),
        ...mapGetters(["currentSong"]),
    },
    mounted() {
        
    },
}


</script>

<style lang="less" scoped>
@import "~common/style/index.less";
.player{
    .w(375);
    height: 100%;
    overflow: hidden;
    .bigPlayer{
        // display: none;
        position: fixed;
        .w(375);
        .top(0);
        .bottom(0);
        background: yellowgreen;
        z-index : 10;
        text-align: center;
        span{
            position: absolute;
            .left(10);
            .top(10);
        }
        header{
            .h(60);
            .w(375);
            color: white;
            .padding(0,0,30,0);
            h5{
                .h(50);
                .l-h(50);
                font-size: 20px;
            }
            p{
                .h(20);
                .l-h(20);
                font-size: 20px;
            }
        }
        .cd_big{
            .w(300);
            .h(300);
            margin:  0 auto;
            // background: yellowgreen;
            border-radius: 50%;
            border: 10px solid #333;
            img{
                width: 100%;
                border-radius: 50%;
            }
        }
        .lyric{
            font-size: @font-size-xl;
            .padding(30,0,0,0);
        }
        .control{
            .prev,.next{
                .w(40);
                .h(40);
                border-radius: 50%;
                border: 3px solid yellow;
            }
            .pause{
                .w(50);
                .h(50);
                border-radius: 50%;
                border: 3px solid yellow;
            }
        }
    }
    .smallPlayer{
        position: fixed;
        .w(375);
        .h(60);
        bottom: 0;
        left: 0;
        z-index: 8;
        background: @bg-color-rank;
        display: flex;
        box-sizing: border-box;
        align-items: center;
        justify-content: space-between;
        font-size: @font-size-normal;
        overflow: hidden;
        .small_left{
            display: flex;
            .w(290);
            h6,p{
                color: white;
                .h(20);
                .l-h(20);
            }
            p.singerName{
                color: @font-color-normal;
            }
        }
        img{
            .w(50);
            .h(50);
            border-radius: 50%;
            .padding(0,20,0,20);
        }
        .small_right{
            .padding(0,10,0,0);
            display: flex;
            .w(100);
            justify-content: space-between;
            span{
                display: inline-block;
                background: rgba(7,17,27,0);
                border: 3px solid @font-color-select;
                border-radius: 50%;
                .w(35);
                .h(35);
                .l-h(35);
                text-align: center;
            }
        }
    }
    .song_list{
        .w(375);
        .h(667);
        // background: @bg-color-rank;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 9;
        .blank{
            .w(375);
            .h(237);
            background: rgba(7,17,27,.4);
            
        }
        .bottom_all{
            background: @bg-color-rank;
            .list_header{
                .w(375);
                .h(60);
                .l-h(30);
                .padding(20,30,10,20);
                box-sizing: border-box;
                font-size: @font-size-xl;
                display: flex;
                justify-content: space-between;
                color: @font-color-normal;
                
            }
            .list{
                .w(375);
                .h(240);
                overflow: hidden;
                box-sizing: border-box;
                .padding(0,30,0,20);
                font-size: @font-size-normal;
                color: @font-color-normal;
                
                li{
                    .h(40);
                    .l-h(40);
                    display: flex;
                    justify-content: space-between;
                }
            }
            .addSong{
                .margin(20,0,20,0);
                div{
                    .w(140);
                    .h(30);
                    .l-h(30);
                    border: 2px solid antiquewhite;
                    border-radius: 10px;
                    margin: 0 auto;
                    color: @font-color-normal;
                    font-size: @font-size-l;
                    span{
                        font-weight: bold;
                        font-size: @font-size-xl;
                    }
                }
            }
            .close{
                .w(375);
                .h(52);
                
                background: @bg-color-rank;
                text-align: center;
                color: @font-color-normal;
                font-size: @font-size-xl;
                .l-h(52);
            }
        }
    }
    
}
</style>
