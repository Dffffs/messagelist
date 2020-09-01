<template>
  <div class="login">
    <div class="content">
      <transition name="component-fade" mode="out-in">
        <component v-bind:is="componentname"></component>
      </transition>
    </div>
  </div>
</template>

<script>
import { AV } from '@/public/ApiBase.js'
import LoginForm from '@/components/LoginForm.vue'
import RegisterForm from '@/components/RegisterForm.vue'
import { translate } from '@/public/translate.js'
export default {
  components: {
    RegisterForm,
    LoginForm
  },
  data(){
    return {
      componentname: 'LoginForm'
    }
  },
  methods:{
    login(forminfo){
      translate.toZhCn('code')
      // let { componentname } = this 
      // let { name, password } = forminfo
      // const { User } = AV 
      // User.logIn(name, password).then((user) => {
      //   // 登录成功
      // }, (error) => {
      //   console.log(error)
      //   // 登录失败（可能是密码错误）
      // });
    }
  },
  mounted(){
    
    this.$bus.$on('registerOrLogin', (forminfo) => {
      this.login(forminfo)
    })
    this.$bus.$on('cancleOrRegister', () => {
      let { componentname } = this
      this.componentname = (componentname == 'LoginForm' ? 'RegisterForm' : 'LoginForm')
    })
  }
}
</script>

<style lang="less" scoped>
  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .3s ease;
  }
  .component-fade-enter, .component-fade-leave-to
  /* .component-fade-leave-active for below version 2.1.8 */ {
    opacity: 0;
  }
  .content{
    width: 15vw;
    position: absolute;
    top: 45%;
    left: 49%;
    transform: translate(-50%, -50%);
    // background: #eee;
    display: flex;
    justify-content: center;
    padding: 30px 0;
    box-shadow: 0 2px 2px rgba(10,16,20,.24),0 0 2px rgba(10,16,20,.12);
    border-radius: 15px;
  }
</style>