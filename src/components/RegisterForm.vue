<template>
  <div class="register">
      <forms :ruleForm="ruleForm" :rules="rules" :formItem="formItem" other="取消"/>
  </div>
</template>

<script>
import forms from './Forms'
import { validSome } from '@/public/commonFun.js'
export default {
  components:{
    forms
  },
  data(){
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    let validEmail = (rule, value, callback) => {
      // ^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$
      if (!value) {
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
      ruleForm:{},
      rules: {
        name : [
          { required: true, message: '请填写用户名', trigger: 'blur' },
          { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' },
          { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }
        ],
        confirmPassWord: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        email: [
          { required: true, validator: validEmail, trigger: 'blur' }
        ]
      },
      formItem: [
        {
          label: '用户名',
          prop: 'name',
          itemType: 'input',
          type: 'text'
        },{
          label: '密码',
          prop: 'password',
          itemType: 'input',
          type: 'password'
        },{
          label: '确认密码',
          prop: 'confirmPassWord',
          itemType: 'input',
          type: 'password'
        },{
          label: '邮箱',
          prop: 'email',
          itemType: 'input',
          type: 'text'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>

</style>