<template>
    <div class="setting">
        <div class="btn" v-if="showBtn">
            <div class="left" @click="change('ChangeUserInfo')">
                <i class="el-icon-edit-outline"></i>
                <span>编辑个人资料</span>
            </div>
            <i></i>
            <div class="right" @click="change('ChangePassword')">
                <i class="el-icon-refresh"></i>
                <span>修改密码</span>
            </div>
        </div>
        <div :class="{ component: true, hide: showBtn }">
            <transition name="component-fade" mode="out-in">
                <component v-bind:is="comName"></component>
            </transition>
        </div>
        <i :class="{ 'el-icon-back' : true, hide: showBtn}" @click="change('')"></i>
    </div>
</template>

<script>
import ChangePassword from '@/components/ChangePassword.vue'
import ChangeUserInfo from '@/components/ChangeUserInfo.vue'
export default {
    components: {
        ChangePassword,
        ChangeUserInfo
    },
    data(){
        return {
            comName: '',
            showBtn: true,
            // btnList: [
            //     {
            //         text: '编辑个人资料',
            //         comName: 'ChangePassword',
            //         icon: 'el-icon-edit-outline'
            //     },{
            //         text: '修改密码',
            //         comName: 'ChangeUserInfo',
            //         icon: 'el-icon-refresh'
            //     },
            // ]
        }
    },
    methods:{
        change(comName){
            this.showBtn = !this.showBtn
            this.$nextTick(() => {
                this.comName = comName
            })
        }
    }
}
</script>

<style lang="less" scoped>
    .component-fade-enter-active, .component-fade-leave-active {
        transition: opacity .5s ease;
    }
    .component-fade-enter, .component-fade-leave-to
    /* .component-fade-leave-active for below version 2.1.8 */ {
        opacity: 0;
    }
    .setting{
        height: 100%;
        position: relative;
        .el-icon-back{
            position: absolute;
            top: 0;
            left: 0;
            cursor: pointer;
            font-size: 30px;
        }
        .hide{
            display: none
        }
        .btn{
            display: flex;
            align-items: center;
            height: 100%;
            div:hover{
                color: #409EFF;
            }
            div{
                cursor: pointer;
                flex: 1;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                i{
                    font-size: 50px;
                    margin-bottom: 8px;
                }
                span{

                }
            }
            >i{
                display: inline-block;
                height: 400px;
                width: 1px;
                background: #eee;
            }
        }
    }
</style>

