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
    userlogin(name, password){
      const { User } = AV 
      User.logIn(name, password).then((user) => {
        // 登录成功
        localStorage.setItem('token', AV.User.current().getSessionToken())
        this.$router.replace({
          path: '/'
        })
      }, (error) => {
        this.$message.error(error.rawMessage)
        console.log(error.rawMessage)
        // 登录失败（可能是密码错误）
      });
    },
    login(forminfo){
      let { componentname } = this 
      let { name, password } = forminfo
      
      if (componentname == 'LoginForm') {
        this.userlogin(name, password)
      } else {
        this.sign(forminfo)
      }
    },
    sign(forminfo){
      let { name, password, email } = forminfo
      // 创建实例
      const user = new AV.User();
      user.setUsername(name);
      user.setPassword(password);
      user.set('email', email)
      // 可选
      user.signUp().then((user) => {
        // 注册成功
        // console.log(`注册成功。objectId：${user.id}`);
        this.userlogin(name, password)
      }, (error) => {
        // 注册失败（通常是因为用户名已被使用）
        this.$message.error(error.rawMessage)
      });
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
    min-width: 225px;
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