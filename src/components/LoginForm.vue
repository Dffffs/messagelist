<template>
  <div class="loginform">
      <forms :ruleForm="ruleForm" :rules="rules" :formItem="formItem" other="注册"/> 
  </div>
</template>

<script>
import forms from './Forms'
export default {
  components: {
    forms
  },
  data(){
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
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>

</style>