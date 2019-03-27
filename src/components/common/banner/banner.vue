<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide" 
            v-for="(item,index) in bannerList" 
            :key="index"
            >
                <img :src="item.picUrl" alt="">
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
    </div>
</template>

<script>
// 引入swiper
import Swiper from "swiper";
import ApiConfig from "@/common/api/apiconfig.js";
export default {
    data(){
        return{
            bannerList : [],
        }
    },
    methods: {
        // 将swiper封装成一个方法
        initSwiper(){
            new Swiper ('.swiper-container', {
                loop: true, // 循环模式选项
                autoplay : true,
                
                // 如果需要分页器
                pagination: {
                    el: '.swiper-pagination',
                },
            })
        },
        // 通过initData的方法获取banner接口数据
        initData(){
            // 声明一个url
            let url = ApiConfig.bannerApi;
            this.$axios.get(url)
            .then((data)=>{
                this.bannerList = data.data.slider;
                // console.log(this.bannerList[0].picUrl);
                // 因为请求数据是异步的，所以需要在请求数据之后再渲染swiper
                // $nextTick的意思是在上一次数据更新之后并且在页面加载完成后执行
                this.$nextTick(()=>{
                    this.initSwiper();
                })
            })
        }
    },
    created() {
        this.initData();
    },
    mounted() {
        
    },
}
</script>

<style lang="less" scoped>
// 引入我们自己写的样式
@import "~common/style/index.less";
// 引入swiper的css样式
@import "../../../../node_modules/swiper/dist/css/swiper.min.css";

.swiper-container{
    .w(375);
    .h(150);
    img{
        width: 100%;
    }
}
</style>
