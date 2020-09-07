<template>
  <div class="mine">
    <onRow />
  </div>
</template>

<script>
import onRow from '@/components/onRow.vue'
export default {
  components: {
    onRow
  },
  data(){
    return {

    }
  }
}
</script>

<style lang="less" scoped>
    .mine{
      height: 100%;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    } 
</style>