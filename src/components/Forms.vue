<template>
  <div class="forms">
    <el-form size="mini" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
      <el-form-item 
        v-for="(item, index) in formItem" 
        :label="item.label" 
        :prop="item.prop" 
        :key="index"
      >
        <template v-if="item.itemType == 'input'">
          <el-input :type="item.type" v-model="ruleForm[item.prop]"></el-input>
        </template>
      </el-form-item>
      <el-form-item class="lastrow">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button type="primary" @click="otherClick">{{other}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
 export default {
    data() {
      return {

      };
    },
    props: {
      formItem: {
        type: Array
      },
      rules: {
        type: Object
      },
      ruleForm: {
        type: Object
      },
      other: {
        type: String
      }
    },
    methods: {
      submitForm() {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.$bus.$emit('registerOrLogin', this.ruleForm)
          } else {
            return false;
          }
        });
      },
      otherClick(){
        this.$bus.$emit('cancleOrRegister')
      }
    }
  }
</script>

<style lang="less" scoped>
  .forms{
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
    ::v-deep .el-form-item {
      .el-form-item__label{
        font-size: 12px;
      }
    }
    .lastrow{
      display: flex;
      justify-content: center;
    }
  }
</style>