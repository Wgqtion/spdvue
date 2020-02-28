<template>
  <el-form :model="passwordRuleForm" ref="ruleForm" :rules="rules">
    <el-form-item label="新的密码" prop="password1">
      <el-input v-model="message.password1" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="再次输入" prop="password2">
      <el-input v-model="message.password2" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: 'ChangePassword',
    props: ['message'],
    data () {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.message.password1 !== '') {
            this.$refs.ruleForm.validateField('password2');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.message.password1) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        passwordRuleForm: {
          password1: null,
          password2: null,
        },
        rules: {
          password1: [
            { validator: validatePass, trigger: 'blur' }
          ],
          password2: [
            {validator: validatePass2, trigger: 'blur'}
          ]
        }
      }
    }
  }
</script>

<style scoped>

</style>
