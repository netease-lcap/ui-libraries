<template>
   <demo-section>
      <demo-block title="正常表单">
        <van-form>
          <van-field required drole="other" :rules="[{validate: 'filled',message: `表单项不得为空`,trigger: 'input+blur', required: true}]">
            <template #title>
              <van-text text="输入框"></van-text>
            </template>
            <template #input>
              <van-validator
                ref="validator"
                :rules="[{validate: 'filled',message: `表单项不得为空`,trigger: 'input+blur',required: true}]"
                :ignoreValidation="false"
              >
                <van-fieldinput :placeholder="`请输入`"  :value.sync="input"></van-fieldinput>
              </van-validator>
            </template>
          </van-field>

          <van-field name="radio" drole="other" :rules="[{validate: 'filled',message: `表单项不得为空`,trigger: 'input+blur', required: true}]" :required="true">
            <template #title>
              <van-text text="单选框"></van-text>
            </template>
            <template #input>
              <van-radio-group direction="horizontal">
                <template #default>
                  <van-radio name="1" title="单选框 1"></van-radio>
                  <van-radio name="2" title="单选框 2"></van-radio>
                </template>
              </van-radio-group>
            </template>
          </van-field>

          <van-field name="checkbox" drole="other" :rules="[{ validate: 'filled', message: `表单项不得为空`, trigger: 'input+blur', required: true }]" :required="true">
            <template #title>
              <van-text text="多选框"></van-text>
            </template>
            <template #input>
              <van-checkbox-group ref="checkbox_group1" direction="horizontal" converter="none">
                  <van-checkbox ref="checkbox2" label="1" shape="square">
                        <van-text ref="text27" text="节点"></van-text>
                  </van-checkbox>
                  <van-checkbox ref="checkbox3" label="2" shape="square">
                        <van-text ref="text28" text="节点"></van-text>
                  </van-checkbox>
                  <van-checkbox ref="checkbox4" label="3" shape="square">
                        <van-text ref="text29" text="节点"></van-text>
                  </van-checkbox>
              </van-checkbox-group>
            </template>
          </van-field>

          <div style="margin: 16px 16px 0">
            <van-button round block="blockb" type="info" native-type="submit" text="提交">
            </van-button>
          </div>
        </van-form>
      </demo-block>

      <demo-block title="验证器">
        <van-validator
          ref="validator"
          :rules="[{validate: 'filled',message: `表单项不得为空`,trigger: 'input+blur',required: true}]"
          :ignoreValidation="false"
        >
          <van-fieldinput :placeholder="`请输入`"  :value.sync="input"></van-fieldinput>
        </van-validator>

        <button @click="submit">提交</button>
      </demo-block>
   </demo-section>

</template>

<script>
export default {
  data() {
    return {
      username: '',
      username666:'',
      password: '',
      xx: '',
      xxx: '',

      input: '',
    };
  },

  methods: {
    onSubmit(values) {
      console.log(4344343434);
      console.log('submit', values);
    },
    onFailed(errorInfo) {
      console.log('failed', errorInfo);
    },

    submit() {
      this.$refs.validator.validate().then((result) => {
        if (result.valid) {
          console.log('验证通过');
        } else {
          console.log('验证失败');
        }
      })
    },
  },
};
</script>
