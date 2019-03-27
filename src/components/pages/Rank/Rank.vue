<template>
    <div class="wrapper">
        <ul class="content">
            <li class="content-wrapper" 
            v-for="(group,index) in list" 
            :key="index"
            >
                <div class="left">
                    <img v-lazy="group.picUrl" alt="">
                </div>
                <ul class="right">
                    <li 
                    v-for="(item,index) in group.songList" 
                    :key="index"
                    >
                        {{index + 1}}{{item.songname}}-{{item.singername}}
                    </li>
                </ul>
            </li>
        </ul>
        
    </div>
</template>
<script>
import rankData from "common/data/rankData";
import BScroll from 'better-scroll';


export default {
    data(){
        return{
            list : [],
        }
    },
    methods : {
        initData(data){
            // 用一个延时器模拟ajax异步请求数据
            setTimeout(() => {
                console.log(data.data.topList);
                this.list = data.data.topList;
            }, 100);
        },
        initScroll(){
            new BScroll('.wrapper',{click : "true"});
        }

    },
    created() {
        this.initData(rankData);
    },
    mounted() {
        this.initScroll();
    },
}
</script>
<style lang="less" scoped>
@import "~common/style/index.less";
.wrapper{
    .w(375);
    position: fixed;
    .top(88);
    .bottom(0);
    overflow: hidden;
    ul{
        li.content-wrapper{
            .padding(20,0,0,0);
            .w(335);
            .h(100);
            margin: 0 auto;
            display: flex;
            
            .left{
                .w(100);
                .h(100);
                background: red;
                img{
                    .w(100%);
                }
            }

            .right{
                box-sizing: border-box;
                .padding(11,20,0,20);
                .w(235);
                .h(100);
                background: @bg-color-rank;
                li{
                    
                    .w(195);
                    .h(26);
                    .l-h(26);
                    font-size: @font-size-s;
                    overflow: hidden;
                    color: @font-color-normal;
                }
            }
        }
    }
}
</style>
