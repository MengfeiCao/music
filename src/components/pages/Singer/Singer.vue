<template>
    <div class="singer">
        <div class="wrapper">
            <ul class="content">
                <li 
                v-for="(group,index) in singerlist" 
                :key="index"
                >
                    <!-- 要想点击字母跳转，必须得获取到对应的dom元素，所以加:ref -->
                    <p :ref="group.tit">{{group.tit}}</p>
                    <div 
                    v-for="(item,index) in group.items" 
                    :key="index" 
                    @click="toDetail(item)" 
                    >
                        <img v-lazy="item.avator" alt="">
                        <span>{{item.name}}</span>
                    </div>
                </li>
            </ul>
        </div>
        <!-- 用于点击singer的li时跳转到详情的路由 -->
        <router-view></router-view>
<!-- 滑动侧边栏的字母让左边显示同样的数据思路：
    1.获取点击的Y坐标
    2.获取滑动的Y坐标；
    3.获取两个坐标的差值；
    4.差值除以间隔的空隙得出滑动了几个字母的距离；
    5.最初的字母 + 间隔的字母 得出现在的字母位置
 -->
        
        <ul class="slider" 
        @touchstart="start" 
        @touchmove="move" 
        >
        
            <li
            v-for="(item,index) in silderData" 
            :key="index"
            @click="jump(item,index)" 
            :class="index == Findex? 'sel' : ''"
            >
            {{item}}
            </li>
        </ul>
    </div>
</template>
<script>
// 将自己做的假数据引入
import singerData from "common/data/singerData.js";
import BScroll from 'better-scroll';

// 引入数据处理的封装
import singerMethod from "common/js/singer.js";


export default {
    data() {
        return {
            singerlist : [
                {
                    tit : "热",
                    list : [],
                },                
            ],
            Findex : 0 ,  //此数据用于点击变色
        }
    },
    methods: {
        toDetail(item){
            console.log(item);
            this.$router.push(`/singer/detail/${item.Fsinger_mid}`); //通过点击事件触发的方法将参数写在动态路由中传递到detail页面
        },
        initScroll(){
            // this.scroll是为了使用scroll的scrollToElement方法
            this.scroll = new BScroll('.wrapper',{click:"true",probeType:2});  //查询文档可知probeType:2是实施派发scroll事件的参数
            // 通过scroll事件获取到y轴上移动的距离
            this.scroll.on("scroll",(e)=>{
                // console.log(e.y);
                this.createHeight.forEach((item,index) => {
                    if(Math.abs(e.y) > item){
                        this.Findex = index + 1 ;
                    }else if(Math.abs(e.y) < this.createHeight[0]){
                        this.Findex = 0;
                    }
                });
                
            })
        },
        initData(){
            // 用延时器模拟ajax请求
            setTimeout(() => {
                let list = singerData.data.list;
                console.log(singerData);

                // 需要的信息有以下三点：
                // Fsinger_name
                // Findex
                // Fsinger_mid

// ----------------数据处理 start ----------------

                this.singerlist = singerMethod.initSinger(list);
                

// ----------------数据处理 end ----------------
            }, 100)

            // 数据获取完毕后出发better-scroll
            this.$nextTick(()=>{
                this.initScroll();
            })
        },
        jump(item,index){
            // 运用了 点击的项 和 选中元素的ref值相同，结合获取对应元素
            // console.log(item);
            // console.log(this.$refs);
            // console.log(this.$refs[item][0]);

            // scrollToElement是scroll实例的一个方法
            this.scroll.scrollToElement(this.$refs[item][0]);

            // 点击哪个就让哪个的Findex 等于 index
            this.Findex = index ;
            // console.log(this.Findex,index);
        },
        start(e){
            // console.log(e);
            // console.log(e.target.offsetTop);
            // 因为在data里边声明的数据是为了实现数据绑定的，只是为了保存下，所以直接赋值
            this.startY = e.touches[0].clientY ;
            // console.log(e.target.innerText);
            console.log(this)

            // 获取开始元素的下标(this.silderData是所有A~Z数组信息)
            this.startIndex = this.silderData.indexOf(e.target.innerText);

            
        },
        move(e){
            
            this.moveY = e.touches[0].clientY ;
            this.distance = this.moveY - this.startY ;
            let index = Math.ceil(this.distance/20);
            // console.log(this.index,this.startIndex);
            // 移动时让Findex赋值为初始的index + 移动的差值
            this.Findex = index + this.startIndex;
            // 边界检测：
            if(this.Findex > (this.silderData.length - 1)){
                this.Findex = (this.silderData.length - 1)
            }else if(this.Findex < 0){
                this.Findex = 0 ;
            }
            // 获取当前下标对应的字母
            let cItem = this.silderData[this.Findex];
            // 还是利用better-scroll中的scrollToElement方法
            this.scroll.scrollToElement(this.$refs[cItem][0]);

        },
    },
    created() {
        this.initData();
    },
    computed: {
        // 通过computed将侧边栏的数据整理出来
        silderData(){
            let arr = this.singerlist.map((item)=>{
                return item.tit;
            })
            console.log(arr);
            return arr;
        },
        createHeight(){
            // 先创建一个 每个模块（A~Z）高度 的数组,要注意map的使用！
            let arr = this.singerlist.map((el)=>{
                // 每一组的高度都是第一项的高度，也就是30 + 项数 * 每项的高度
                return 30 + el.items.length * 70
            })
            
            // 将上边获取的数组进行循环，获取高度累加的数组
            let heights = [];
            let height = 0;
            for (let index = 0; index < arr.length; index++) {
                height += arr[index];
                heights.push(height);
            }
            return heights;
        }
    },
}
</script>
<style lang="less" scoped>
@import "~common/style/index.less";
.singer{
    .w(375);
    position: fixed;
    .top(88);
    .bottom(0);
    .wrapper{
        position: fixed;
        .top(88);
        .left(0);
        .right(0);
        .bottom(0);
        overflow: hidden;
        ul{
            li{
                font-size: @font-size-normal;
                color: @font-color-normal;
                p{
                    .w(375);
                    .h(30);
                    .l-h(30);
                    background: #333;
                    box-sizing: border-box;
                    .padding(0,0,0,20);
                }
                div{
                    .h(70);
                    .l-h(70);
                    box-sizing: border-box;
                    .padding(0,0,0,50);
                    img{
                        .w(50);
                        .h(50);
                        border-radius: 50%;
                        border: none;
                        vertical-align: middle;
                        
                    };
                    span{
                        display: inline-block;
                        .h(50);
                        .l-h(50);
                        .padding(0,0,0,20);
                    }
                }
                
            }
        }
    }
    .slider{
            .w(20);
            position: fixed;
            top:50%;
            right: 0;
            transform: translateY(-40%);
            background: rgba(0, 0, 0, .3);
            font-size: @font-size-normal;
            .padding(10,0,10,0);
            border-radius: 10px;
            text-align: center;
            color: @font-color-normal;
            .sel{
                color: @font-color-select;
            }
    }

}
</style>
