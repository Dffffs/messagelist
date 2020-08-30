<template>
  <div id="app">
    <div class="app-content">
      <el-scrollbar style="height:100%">
        <transition name='slide-left' mode="out-in">
          <router-view/>
        </transition>
      </el-scrollbar>
    </div>
    <home-right-btn /> 
  </div>
</template>

<script>
import HomeRightBtn from '@/components/HomeRightBtn'
export default {
  components:{
    HomeRightBtn
  }
}
</script>

<style lang="less">
  body{
    padding: 0;
    margin: 0;
  }
  a{
    color: #000;
    text-decoration: none;
  }
  .slide-left-enter-active {
    transition: all .3s ease;
  }
  .slide-left-leave-active {
    transition: all .3s ease;
  }
  .slide-left-enter, .slide-left-leave-to {
    opacity: 0;
  }
  #app{
    background: rgba(140, 197, 255, .5);
    width: 100vw;
    height: 100vh;

    .app-content{
      position: relative;
      width: 60vw;
      height: 95vh;
      padding: 10px 20px;
      box-sizing: border-box;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      background: rgba(255,255,255,1);
      border-radius: 10px;
      box-shadow: 0 2px 2px rgba(10,16,20,.24),0 0 2px rgba(10,16,20,.12);

    }

    .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
</style>
