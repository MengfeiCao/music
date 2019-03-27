<template>
    <div class="tab">
        <router-link 
        tag="div"    
        to="/recommend" 
        active-class="sel"
        >推荐</router-link>

        <router-link 
        tag="div" 
        to="/singer" 
        active-class="sel"
        >歌手</router-link>

        <router-link 
        tag="div" 
        to="/rank" 
        active-class="sel"
        >排行</router-link>

        <router-link 
        tag="div" 
        to="/search" 
        active-class="sel"
        >搜索</router-link>
    </div>
</template>


<script>
export default {

}
</script>

<style lang="less" scoped>
@import "~common/style/index.less";
    .tab{
        .w(375);
        .h(44);
        .l-h(44);
        color: @font-color-normal;
        display: flex;
        justify-content: space-around;
        font-size: @font-size-normal;
        .sel{
            color: @font-color-select;
            border-bottom: 2px solid @font-color-select;
        }
    }
</style>