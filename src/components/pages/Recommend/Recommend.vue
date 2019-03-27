<template>
    <div class='recommend'>
        <div class="wrapper">
            <div class="content">
                <Swiper></Swiper>
                <div class="list-tit">热门歌单推荐</div>
                <ul>
                    <li
                    v-for="(item,index) in list" 
                    :key="index"
                    @click="toDetail(item)"
                    >
                        <div class="left">
                            <img v-lazy="item.imgurl" alt="">
                        </div>
                        <div class="right">
                            <h4>{{item.creator.name}}</h4>
                            <p>{{item.dissname}}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
import Swiper from "@/components/common/banner/banner";
import BScroll from "better-scroll";
import scrollApi from "@/common/api/apiconfig.js";

export default {
    components:{
        Swiper,
        BScroll,
    },
    data(){
        return{
            list : [],
        }
    },
    methods: {
        toDetail(item){
            console.log("跳转");
            console.log(item);
            this.$router.push(`recommend/detail/${item.dissid}`);

        },
        initScroll(){
            new BScroll(".wrapper",{click:"true"})
        },
        initData(){
            // console.log(scrollApi.scrollContent);
            let url = scrollApi.scrollContent;
            this.$axios.get(url)
            .then((data)=>{
                this.list = data.data.list;
                console.log(data)
                console.log(this.list);
            })
        }
    },
    created() {
        this.initData();

    },
    mounted() {
        this.initScroll();
    },
}
</script>
<style lang="less" scoped>
@import "~common/style/index.less";
.recommend{
    .w(375);
    .top(88);
    .wrapper{
        .w(375);
        position: fixed;
        .top(88);
        .bottom(0);
        overflow: hidden;
        .content{
            .list-tit{
                color: @font-color-select;
                .w(375);
                .h(65);
                .l-h(65);
                font-size: @font-size-xl;
                text-align: center;

            }
            ul{
                    li{
                        .w(375);
                        .h(83);
                        display: flex;
                        justify-content: space-around;
                        align-items: center;
                        .left{
                            .w(60);
                            .h(60);
                            img{
                                width: 100%;
                                height: 100%;
                            }
                        };
                        .right{
                            .w(255);
                            .h(50);
                            .l-h(50);
                            h4,p{
                                font-size: @font-size-l;
                                .h(20);
                                .l-h(20);
                            };
                            h4{
                                color: #fff;
                                font-weight: normal;
                                
                            }
                        }
                    }
                }
        }
    }
}

</style>
