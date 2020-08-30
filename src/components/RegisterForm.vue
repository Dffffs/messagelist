<template>
  <div class="register">
      <forms :ruleForm="ruleForm" :rules="rules" :formItem="formItem" other="取消"/>
  </div>
</template>

<script>
import forms from './Forms'
export default {
  components:{
    forms
  },
  data(){
    return {
      ruleForm:{},
      rules: {},
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