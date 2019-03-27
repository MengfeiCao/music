<template>
    <div class="serch">
        <div class="tit">
            <input type="text" placeholder="搜索歌曲、歌手" @input="getInputValue">
            <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
        </div>
        <div class="hot">
            <h6>热门搜索</h6>
            <span 
            v-for="(item,index) in songListInit" 
            :key="index">{{item.k}}</span>
        </div>
        <div class="wrapper" v-show="listShow">
            <ul class="content">
                <li 
                v-for="(item,index) in serchList" 
                :key="index"
                >
                <span class="glyphicon glyphicon-music" aria-hidden="true"></span>
                {{item.songname}}-{{item.singer[0].name}}
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import jsonp from "@/utils/jsonp.js";
import BScroll from 'better-scroll';

export default {
    data(){
        return{
            timer : null,
            songListInit : [],
            serchList : null,
            listShow : false
        }
    },
    created() {
        this.songInfo();

    },
    mounted() {
        this.scrollInit();
    },
    // filters : {
    //     changrKorean(){
    //         let koreanSinger = serchList

    //     }
    // },
    methods: {
        getInputValue(e){
            // console.log("触发input事件")
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                let inputValue = e.target.value;
                let serchUrl = `/scrollContent/music/api/search?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&w=${inputValue}&p=1&perpage=20&n=20&catZhida=1&zhidaqu=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&remoteplace=txt.mqq.all&uin=0&needNewCode=1&platform=h5`;
                this.$axios(serchUrl)
                .then((data)=>{
                    
                    this.serchList = data.data.song.list;
                    if(this.serchList.length){
                        this.listShow = true;
                    }else{
                        // console.log("数据为空")
                        this.listShow = false;
                    }
                    console.log(this.serchList)
                    
                    // this.serchList.map((item,index)=>{
                    //     let newName = item.singer[0].name.toString('utf-8');
                    //     console.log(newName);
                    // })
                })
            }, 300);

        },
        songInfo(){
            let infoUrl = "/qqmusic/splcloud/fcgi-bin/gethotkey.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&uin=0&needNewCode=1&platform=h5&jsonpCallback=jp0";
            jsonp(infoUrl,{param : "jsonpCallback"})
            .then((data)=>{
                // console.log(data);
                this.songListInit = data.data.hotkey;
            })
        },
        scrollInit(){
            new BScroll('.wrapper',{click : true});
        },
        // 无限滚动，iview 不好使
        // handleReachBottom () {
        //         return new Promise(resolve => {
        //             setTimeout(() => {
        //                 const last = this.serchList[this.serchList.length - 1];
        //                 for (let i = 1; i < 11; i++) {
        //                     this.serchList.push(last + i);
        //                 }
        //                 resolve();
        //             }, 2000);
        //         });
        // }
    },
    
    


}
</script>
<style lang="less" scoped>
@import "~common/style/index.less";
@import url("https://cdn.staticfile.org/twitter-bootstrap/3.3.7/css/bootstrap.min.css");
.serch{
    position: relative;
    .tit{
        position: relative;
        .w(335);
        box-sizing: border-box;
        .h(40);
        .padding(0,6,0,6);
        .margin(10,0,0,10);
        input{
            background: @bg-color-rank;
            border:none;
            .h(40);
            .w(335);
            border-radius: 7px;
            box-sizing: border-box;
            .padding(0,0,0,30);
            color: white;
        }
        .glyphicon{
            position: absolute;
            .top(10);
            .left(10);
            font-size: @font-size-serch ;
            color: @bg-color;
        }
    }
    .hot{
        .padding(30,0,0,20);
        h6{
            color:hsla(0,0%,100%,.5);
            font-size: @font-size-normal;
            .padding(0,0,30,0);
        }
        span{
            color: hsla(0,0%,100%,.3);
            display: inline-block;
            .h(24);
            .l-h(16);
            .padding(5,10,5,10);
            background: @bg-color-rank;
            .margin(0,20,10,0);
            border-radius: 5px;
            text-align: center;
        }
    };
    .wrapper{
        position: fixed;
        .top(150);
        .bottom(0);
        .left(0);
        overflow: hidden;
        .w(375);
        .padding(20,30,0,30);
        background: @bg-color;
        z-index: 1;
        font-size: @font-size-normal;
        color: @font-color-normal;
        li{
            .h(35);
            .l-h(35);
            span{
                .margin(0,10,0,0);
            }
        }
    }
}
</style>
