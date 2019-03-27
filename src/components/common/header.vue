<template>
    <div>
        <header>
            <div class="logo">标</div>
            <span class="tit">My music</span>
            <div class="personal">
                人
            </div>
        </header>
        
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
@import "~common/style/index.less";
    header{
        text-align: center;
        font-size: @font-size-l;
        .h(44);
        .l-h(44);
        .w(375);
        .logo{
            display: inline-block;
        };
        .tit{
            color: @font-color-select;
        }
        .personal{
            position: absolute;
            right: 0;
            top: 0;
        }
    }
</style>