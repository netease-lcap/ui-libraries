<template>
  <demo-block :title="t('basicUsage')">
    <van-form @submit="onSubmit" @failed="onFailed">
      <van-field
        v-model="username"
        name="username"
        :label="t('username')"
        :rules="[{ required: true, message: t('requireUsername') }]"
        :placeholder="t('username')"
      />
      <van-field
        :value.sync="username666"
        name="username6666"
        :label="t('username')"
        rules="required | pattern(/^[a-zA-Z0-9/\s]+$/)"
        wga
        :placeholder="t('username')"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        :label="t('password')"
        :rules="[{ required: true, message: t('requirePassword') }]"
        :placeholder="t('password')"
      />
      <div style="margin: 16px 16px 0;">
        <van-button round block type="info" native-type="submit">
          {{ t('submit') }}
        </van-button>
      </div>
    </van-form>
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
