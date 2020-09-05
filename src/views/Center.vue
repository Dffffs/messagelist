<template>
  <div class="center">
    <Send />
    <on-row /> 
  </div>
</template>
 
<script>
import Send from '@/components/Send.vue'
import onRow from '@/components/onRow.vue'
export default {
  components:{
    Send,
    onRow
  },
  data(){
    return {
    }
  },
  methods:{
  }
}
</script>

<style lang="less" scoped>
  .center{
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
</style>