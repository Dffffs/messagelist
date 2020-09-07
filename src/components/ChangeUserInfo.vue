<template>
    <div class="changeUserInfo">
        <div class="content">
            <div class="top">
                <el-upload
                    class="upload-demo"
                    ref="upload"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :file-list="fileList"
                    :auto-upload="false"
                    :limit="1"
                >
                    <img :src="pic">
                </el-upload>
            </div>
            <div class="bottom">
                <el-form label-position="left" ref="form" :rules="rules" label-width="80px" :model="form">
                    <el-form-item 
                        v-for="(item, index) in formRow" 
                        :key="index" 
                        :label="item.label" 
                        :prop="item.prop"
                    >
                        <template v-if="item.type == 'input'">
                            <el-input 
                                v-model="form[item.prop]" 
                                :type="item.vType"
                                :placeholder="item.placeholder"
                                size="small"
                                style="width:100%"
                            ></el-input>
                        </template>
                        <template v-else>
                            <el-select 
                                size="small"
                                v-model="form[item.prop]"
                                :placeholder="item.placeholder"
                                style="width:100%"
                            >
                                <el-option
                                    v-for="(i, i1) in item.option"
                                    :key="i1"
                                    :label="i.label"
                                    :value="i.value"
                                ></el-option>
                            </el-select>
                        </template>
                    </el-form-item>
                    <el-form-item>
                        <el-button 
                            class="btn"
                            type="primary" 
                            size="small" 
                            @click="onSubmit"
                        >修改</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
// 修改头像, 昵称, 性别, 年龄, email, 手机号
import { AV } from '@/public/ApiBase.js'
import { validSome } from '@/public/commonFun.js'
export default {
    data(){
        let validPhone = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入手机号'));
            } else {
                let flag = validSome(/^1[34578]\d{9}$/)
                console.log(flag(value),value)
                if (!flag(value)) {
                    callback(new Error('请输入正确的手机号'));
                } else {
                    callback();
                }
            }
        }
        let validEmail = (rule, value, callback) => {
            // ^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$
            if (!value.length) {
                callback(new Error('请输入邮箱'));
            } else {
                let flag = validSome(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/)
                console.log(flag(value),value)
                if (!flag(value)) {
                    callback(new Error('请输入正确的邮箱'));
                } else {
                    callback();
                }
            }
        }
        return {
            fileList: [],
            pic: '',
            form: {
                sex: '1'
            }, 
            rules: {
                roleName: [
                    { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
                ],
                mobilePhoneNumber: [
                    { validator: validPhone, trigger: 'blur' }
                ],
                age: [
                    { min: 1, max: 3, message: '长度 3 个字符以内', trigger: 'blur' }
                ],
                email: [
                    { validator: validEmail,  trigger: 'blur' }
                ]
            },
            formRow: [
                {
                    label: '昵称',
                    prop: 'roleName',
                    type: 'input',
                    vType: 'text',
                    placeholder: '昵称'
                },{
                    label: '手机号',
                    prop: 'mobilePhoneNumber',
                    type: 'input',
                    vType: 'text',
                    placeholder: '手机号'
                },{
                    label: '性别',
                    prop: 'sex',
                    type: 'select',
                    vType: '',
                    option: [
                        {
                            label: '男',
                            value: '1'
                        },{
                            label: '女',
                            value: '2'
                        }
                    ],
                    placeholder: '请选择性别'
                },{
                    label: '年龄',
                    prop: 'age',
                    type: 'input',
                    vType: 'number',
                    placeholder: '请输入年龄'
                },{
                    label: 'email',
                    prop: 'email',
                    type: 'input',
                    vType: 'email',
                    placeholder: '请输入邮箱'
                }
            ]
        }
    },
    methods: {
        onSubmit(){
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    
                    let { form } = this
                    // console.log(form)
                    // 获取对应user表的id为xx的数据
                    const todo = AV.Object.createWithoutData('_User', '5f55b0fb9d404338cdc28313');
                    for (let key in form) {
                        todo.set(key, form[key]);
                    }
                    todo.save();

                    this.$message.success('修改成功')
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    },
    mounted(){
        // console.log(localStorage.getItem('userInfo'))
        let { pic, roleName, age, email, mobilePhoneNumber, sex } = JSON.parse(localStorage.getItem('userInfo'))
        this.pic = pic
        // this.fileList.push(pic)
        let form = { roleName, age, email, mobilePhoneNumber, sex }
        this.form = form
    }
}
</script>

<style lang="less" scoped>
    .changeUserInfo{
        // padding: 25px;
        position: relative;
        ::v-deep .el-form--label-top .el-form-item__label{
            padding: 0;
        }

        ::v-deep .el-input__inner{
            border-bottom: 1px solid #ccc;
            border-top: 0;
            border-right:0;
            border-left: 0;
            border-radius: 0;
        }

        .btn{
            margin-left: 50px;
        }
        .el-form-item{
            margin: 0 0 10px 0;
        }
        .content{
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 300px;
            position: absolute;
            top: 45vh;
            left: 50%;
            transform: translate(-50%, -50%);

            .bottom{
                width: 100%;
            }
            .top{
                margin-bottom: 30px;
            }
            img{
                height: 150px;
                border: 3px solid #ededed;
                width: 150px;
                border-radius: 50%;
                cursor: pointer;
            }
        }
    }
</style>

