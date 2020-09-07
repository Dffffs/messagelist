<template>
    <div class="setting">
        <div class="btn" v-if="showBtn">
            <div class="left">
                <i class="el-icon-edit-outline"></i>
                <span>编辑个人资料</span>
            </div>
            <i></i>
            <div class="right">
                <i class="el-icon-refresh"></i>
                <span>修改密码</span>
            </div>
        </div>
        <div class="component" v-else>
            <transition name="component-fade" mode="out-in">
                <component v-bind:is="comName"></component>
            </transition>
        </div>
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
            comName: 'ChangePassword',
            showBtn: true,
            btnList: [
                {
                    
                }
            ]
        }
    },

}
</script>

<style lang="less" scoped>
    .setting{
        height: 100%;
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

