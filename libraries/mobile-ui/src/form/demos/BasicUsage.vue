<template>
  <demo-block :title="t('basicUsage')">
    <div>ipRangeLength: <van-stepper-new :value.sync="ipRangeLength"></van-stepper-new></div>
    <van-form>
      <van-field required drole="other" :rules="[{validate: 'ipRange', args: [ipRangeLength], message: `请输入正确的 IP 段`,trigger: 'input+blur'}]">
        <template #title>
          <van-text text="名称"></van-text>
        </template>
        <template #input>
          <van-fieldinput type="integer" placeholder="请输入" clearable></van-fieldinput>
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

    <!-- <van-fieldtextarea :value.sync="xxx" :maxlength="10" :autosize="{ maxHeight: 100, minHeight: 50 }" placeholder="请输入" clearable></van-fieldtextarea> -->
  </demo-block>
</template>

<script>
export default {
  i18n: {
    'zh-CN': {
      submit: '提交',
      username: '用户名',
      password: '密码',
      requireUsername: '请填写用户名',
      requirePassword: '请填写密码',
    },
    'en-US': {
      submit: 'Submit',
      username: 'Username',
      password: 'Password',
      requireUsername: 'Username is required',
      requirePassword: 'Password is required',
    },
  },

  data() {
    return {
      username: '',
      username666:'',
      password: '',
      xx: '',
      xxx: '',
      ipRangeLength: 4
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
  },
};
</script>
