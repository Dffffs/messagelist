<template>
    <div class="changePassWord">
        <div class="content">
            <span>邮箱</span>
            <div>
                <el-input v-model="email"></el-input>
                <el-button type="primary" @click="send">发送邮件</el-button>
            </div>
        </div>
        <el-dialog
            title="提示"
            :visible.sync="dialog"
            width="30%"
            :append-to-body="true"
        >
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialog = false">取 消</el-button>
                <el-button type="primary" @click="dialog = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { AV } from '@/public/ApiBase.js'
import { validSome } from '@/public/commonFun.js'
export default {
    data(){
        return {
            email: '',
            dialog: false
        }
    },
    methods: {
        send(){
            let { email } = this
            let flag = validSome(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/)
            if (flag(email)) {
                let user = AV.User.current()
                if (!user.get('emailVerified')) {
                    this.dialog = !this.dialog
                    return
                }
                AV.User.requestPasswordReset(email)
                .then(res => {
                    this.$message.success('发送成功,重设密码后将强制重新登录.')
                })
                .catch(err => {
                    // console.log(err)
                    this.$message.error('输入邮箱与注册邮箱不同')
                });
            } else {
                this.$message.error('输入邮箱有误,请重新输入')
            }
        },
        handleClose(){

        }
    }
}
</script>

<style lang="less" scoped>
    .changePassWord{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        .content{
            width: 50%;
            padding: 15px 20px;
            box-shadow: 0 2px 2px rgba(10, 16, 20, 0.24), 0 0 2px rgba(10, 16, 20, 0.12);
            border-radius: 5px;
            border: 1px solid #eee;
            >span{
                margin-bottom: 10px;
                display: block;
                font-size: 18px;
                font-weight: 600;
            }
            >div{
                display: flex;
                align-items: center;
                ::v-deep .el-input__inner{
                    border-radius: 5px 0px 0px 5px;
                }
                input{
                    border-radius: 5px 0px 0px 5px;
                }
                button{
                    // margin-left: 50px;
                    border-radius: 0 5px 5px 0;
                }
            }
        }
    }
</style>
