<template>
    <div class="changePassWord">
        <div class="content">
            <span>邮箱</span>
            <div>
                <el-input v-model="email"></el-input>
                <el-button type="primary" @click="send">发送邮件</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { AV } from '@/public/ApiBase.js'
import { validSome } from '@/public/commonFun.js'
export default {
    data(){
        return {
            email: '',
            emailVerified: false
        }
    },
    methods: {
        async send(){
            let { email, emailVerified } = this
            let flag = validSome(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/)
            if (flag(email)) {
                if (!emailVerified) {
                    // return this.$message.warning('邮箱验证后才可修改密码。')
                    return this.notCheckEmail()
                }
                let info = AV.User.current()
                let user = await info.fetch()
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
        notCheckEmail(){
            let { email } = this
            this.$confirm(`邮箱验证后才可修改密码,是否发送邮件到${email}?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                AV.User.requestEmailVerify(email);
                this.$message({
                    type: 'success',
                    message: '发送邮件成功!'
                });
            }).catch(() => {  
            });
        },
        handleClose(){

        }
    },
    async mounted(){
        let current = AV.User.current()
        let res = await current.fetch()
        this.email = res.get('email')
        this.emailVerified = res.get('emailVerified')
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
