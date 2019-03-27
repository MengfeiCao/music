// 引入：
import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

// 配置路由信息
import Recommend from "../components/pages/Recommend/Recommend.vue";
import Rank from '../components/pages/Rank/Rank'
import Singer from '../components/pages/Singer/Singer'
import Search from '../components/pages/Search/Search'
import Detail from "@/components/common/detail/detail"

// 路由懒加载
// const Recommend = () => import('../components/pages/Recommend/Recommend.vue');
// const Singer = () => import('../components/pages/Singer/Singer');
// const Rank = () => import('../components/pages/Rank/Rank');
// const Search = () => import('../components/pages/Search/Search');
// const Detail = () => import('@/components/common/detail/detail');




const router = new VueRouter({
    routes : [
        {
            path : "/recommend",    //匹配hash变化
            name : "recommend",     //路由的名字
            component : Recommend, //加载的模块+
            children : [
                {
                    path : "detail/:dissid",  //嵌套路由不要加 /
                    component : Detail  //要加载的模块
                }
            ]
        },
        {
            path : "/singer",    
            name : "singer",     
            component : Singer,
            children : [
                {
                    path : "detail/:Fsinger_mid",  //运用动态路由将Fsinger_mid参数传过去
                    component : Detail,  //要加载的模块
                }
            ] 
        },
        {
            path : "/rank",    
            name : "rank",     
            component : Rank ,
            children : [
                {
                    path : "detail/:Fsinger_mid",  //嵌套路由不要加 /
                    component : Detail  //要加载的模块
                }
            ]
        },
        {
            path : "/search",    
            name : "search",     
            component : Search 
        },
        {
            path : "/",
            redirect : "/recommend" //重定向
        }
    ]
})

// 抛出
export default router;

