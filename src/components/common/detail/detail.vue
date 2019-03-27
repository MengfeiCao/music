<template>
    <div class="detail">
        <div class="tit">
            <img :src="songDataList.img_url" alt="">
            <span class="back" 
            @click="back"> 《 </span>
            <p>{{songDataList.singer_name}}</p>
            <button><span>随机播放全部</span></button>
        </div>
        <div class="list">
            <ul 
            v-for="(item,index) in songDataList.list" 
            :key="index" 
            @click="toPlayer(index)" 
            >
                <li>{{item.songname}}</li>
                <li class="singer-album"><span>{{item.singer_name}}-</span>{{item.albumname}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
// https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&hostUin=0&needNewCode=0&platform=yqq&order=listen&begin=0&num=80&songstatus=1&singermid=002J4UUk29y8BY&jsonpCallback=jp3
// 引入封装的jsonp
import jsonp from "@/utils/jsonp.js";
import {mapMutations} from "vuex";

export default {
    data(){
        return{
            songDataList : {
                singer_name : "",
                singer_mid : "",
                list : []
            },
        }
    },
    methods: {
        // 通过jsonp获取数据
        initSingerData(singermid){
            // 通过查询数据链接，发现singermid后的参数即为获取不同数据的关键，且参数正好是动态路由传过来的参数
            let url = `https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&hostUin=0&needNewCode=0&platform=yqq&order=listen&begin=0&num=80&songstatus=1&singermid=${singermid}`
                        // http://ustbhuangyi.com/music/api/getCdInfo?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&disstid=3852068305&type=1&json=1&utf8=1&onlysong=0&platform=yqq&hostUin=0&needNewCode=0
            jsonp(url,{param : "jsonpCallback"})
            .then((data)=>{
                console.log(data);//获取到的数据比较多，我们整理下，提取自己想要的数据
                this.songDataList.singer_name = data.data.singer_name;
                this.songDataList.singer_mid = data.data.singer_mid;
                this.songDataList.img_url = 'https://y.gtimg.cn/music/photo_new/T001R300x300M000'+ data.data.singer_mid +'.jpg?max_age=2592000'
                data.data.list.forEach((item,index) => {
                    // console.log(item.musicData.albumname);
                    this.songDataList.list.push({
                            albumname : item.musicData.albumname,
                            songname : item.musicData.songname,
                            albummid : item.musicData.albummid,
                            singer_name : data.data.singer_name,
                            songmid : item.musicData.songmid,
                        });
                    // this.songDataList.list.push({});
                });
                console.log(this.songDataList);
            })
        },
        initRecommendData(dissid){
            let url = `/scrollContent/music/api/getCdInfo?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&disstid=${dissid}&type=1&json=1&utf8=1&onlysong=0&platform=yqq&hostUin=0&needNewCode=0`
            this.$axios(url)
            .then((data)=>{
                console.log(data);
                // this.songDataList.singer_name = data.cdlist[0].dissname;

                this.songDataList.img_url = data.cdlist[0].logo;
                data.cdlist[0].songlist.map((item,index)=>{
                this.songDataList.singer_name = item.singer[0].name;
                this.songDataList.singer_mid = item.singer[0].mid;
                    this.songDataList.list.push({
                            albumname : item.albumname,
                            songname : item.songname,
                            albummid : item.albummid,
                            singer_name : item.singer[0].name,
                            songmid : item.songmid,
                        });
                })
                console.log(this.songDataList)
            })
            
        },
        // ...mapMutations(["addSongList"]), //this.$store.mutations.xxx
        back(){
            // console.log(this)
            this.$router.back();
        },
        toPlayer(index){
            // 跳转到player页面，实际就是在songList中添加数据即可
            this.$store.commit("addSongList",{
                songlist : this.songDataList.list,
                currentIndex : index
            })
            // console.log(this.$store.state.song)
            this.$store.state.song.bigplayerState = !this.$store.state.song.bigplayerState;
        },
    },
    created() {
        // console.log(this.$route);
        if(this.$route.params.Fsinger_mid){
            this.initSingerData(this.$route.params.Fsinger_mid);
        }else if(this.$route.params.dissid){
            this.initRecommendData(this.$route.params.dissid);
        }
        // console.log(this.songDataList);
        
    },
    computed: {
        
    },
}
</script>

<style lang="less" scoped>
@import "~common/style/index.less";
.detail{
    z-index: 5;
    color: #fff;
    background: yellowgreen;
    position: fixed;
    .top(0);
    .bottom(0);
    .left(0);
    .right(0);
    .tit{
        .w(375);
        .h(262.5);
        background: rgba(7,17,27,.4);
        img{
            .w(375);
            height: auto;
            position: absolute;
            z-index: -1;
        };
        .back{
            position: absolute;
            font-size: @font-size-xl;
            .h(40);
            .l-h(40);
        };
        p{
            text-align: center;
            .w(375);
            font-size: @font-size-xl;
            .h(40);
            .l-h(40);
        };
        button{
            .w(135);
            .h(32);
            margin: 0 auto;
            position: absolute;
            .left(0);
            .right(0);
            .top(200);
            color: @font-color-select;
            border: 1px solid @font-color-select;
            background: rgba(7,17,27,0) ;
        }
    }
    .list{
        .w(375);
        .h(5096);
        background: @bg-color;
        box-sizing: border-box;
        .padding(20,0,20,0); 
        ul{
            .w(315);
            .h(64);
            margin: 0 auto;
            box-sizing: border-box;
            .padding(10,0,10,0);
            li{
                font-size: @font-size-normal;
                .h(20);
                .l-h(20);
                color: #fff;
            };
            .singer-album{
                color: @font-color-normal;
            }
        }
    }
}
</style>
