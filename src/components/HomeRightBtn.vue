<template>
  <div class="homeRightBtn">
    <el-button @click="show3 = !show3">
        <i :class="{'el-icon-menu' : !show3, 'el-icon-s-grid' : show3}"></i>
    </el-button>

    <div class="btnArr">
        <transition name="slide">
            <div v-show="show3" class="seeMore">
                <router-link v-for="(item, index) in btnArr" :key="index" :to="item.url" :class="{ 'seeMoreOne': true}">
                    <i :class="item.icon"></i>
                    <span>{{item.text}}</span>
                </router-link>
                <div class="seeMoreOne" @click="bak">
                    <!-- <i class="el-icon-setting"></i> -->
                    <img src="@/assets/signout.png">
                    <span>退出登陆</span>
                </div>
            </div>
        </transition>
    </div>
  </div>
</template>

<script>
import { AV } from '@/public/ApiBase.js'
export default {
    data: () => ({
      show3: true,
      btnArr: [
        {
            url: '/mine',
            icon: 'el-icon-user',
            text: '我的'
        },
        {
            url: '/',
            icon: 'el-icon-school',
            text: '广场'
        },
        {
            url: '/setting',
            icon: 'el-icon-setting',
            text: '设置'
        }
      ]
    }),
    methods: {
        bak(){
            if (location.pathname.indexOf('login') == -1) {
                AV.User.logOut();
                localStorage.clear()
                this.$router.replace({
                    path:'/login'
                })
                location.reload()
            }
        }
    },
    mounted(){
        
    }
}
</script>

<style lang="less" scoped>
    .slide-enter-active {
        transition: all .3s ease;
    }
    .slide-leave-active {
        transition: all .3s ease;
    }
    .slide-enter, .slide-leave-to {
        opacity: 0;
    }
    .homeRightBtn{
        position: absolute; 
        top: 2.5vh;
        // right: 9vw;
        left: 5px;
        .btnArr{
            // width: 200px;
            .router-link-exact-active{
                color: #409EFF;
            }
            .seeMore{
                border-radius: 10px;
                // width: 100%;
                // height: 300px;
                background: #fff;
                margin-top: 15px;
                box-sizing: border-box;
                font-size: 30px;
                display: flex;
                flex-direction: column;
                padding: 10px 20px;
                
                .seeMoreOne{
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                    margin-bottom: 15px;
                    align-items: center;

                    img{
                        width: 25px;
                    }
                }
                .seeMoreOne:last-child{
                    margin: 0;
                }
                span{
                    font-size: 13px;
                    margin-top: 5px;
                    
                }
            }
        }
    }
</style>