<template>
  <demo-section>
    <demo-block title="基础用法">
      <van-steps
        direction="vertical"
        :active.sync="step"
        :data-source="load">
        <template #item="current">
          <van-step
          :disabled="(((current || {}).item || {}).entity3 || {}).disabled"
          :status="(((current || {}).item || {}).entity3 || {}).stepStatus">{{current.item.entity3.title}}</van-step>
        </template>
      </van-steps>
    </demo-block>

    <demo-block title="基础用法">
      <van-steps>
        <van-step>sadsdfsadsafdasafasd阿斯顿发生发顺丰阿斯顿发送到发的是分身乏术的阿斯顿夫妇撒地方水电费水电费是大丰收打发分身乏术地方</van-step>
        <van-step icon="sure">2</van-step>
        <van-step>3</van-step>
      </van-steps>
    </demo-block>

    <demo-block title="基础用法">
      <van-steps
        direction="vertical"
      >
        <van-step>sadsdfsadsafdasafasd阿斯顿发生发顺丰阿斯顿发送到发的是分身乏术的阿斯顿夫妇撒地方水电费水电费是大丰收打发分身乏术地方</van-step>
        <van-step icon="sure">2</van-step>
        <van-step>3</van-step>
      </van-steps>
    </demo-block>

  </demo-section>
</template>

<script>
export default {
  i18n: {
    'zh-CN': {
      nextStep: '下一步',
      step1: '买家下单',
      step2: '商家接单',
      step3: '买家提货',
      step4: '交易完成',
      title2: '描述信息',
      title3: '竖向步骤条',
      status1: '【城市】物流状态1',
      status2: '【城市】物流状态',
      status3: '快件已发货',
      customStyle: '自定义样式',
    },
    'en-US': {
      nextStep: 'Next Step',
      step1: 'Step1',
      step2: 'Step2',
      step3: 'Step3',
      step4: 'Step4',
      title2: 'Description',
      title3: 'Vertical Steps',
      status1: '【City】Status1',
      status2: '【City】Status2',
      status3: '【City】Status3',
      customStyle: 'Custom Style',
    },
  },

  data() {
    return {
      active: 1,
      step: 0,
    };
  },

  methods: {
    nextStep() {
      this.active = ++this.active % 4;
    },
    load() {
      return {
                "list": [
          {
            "entity3": {
              "id": 2646691305690368,
              "createdTime": "2023-07-04T05:55:31.000Z",
              "updatedTime": "2023-07-05T09:13:31.000Z",
              "createdBy": null,
              "updatedBy": null,
              "title": "步骤1",
              "stepStatus": "process"
            }
          },
          {
            "entity3": {
              "id": 2646694855898368,
              "createdTime": "2023-07-04T06:02:44.000Z",
              "updatedTime": "2023-07-05T09:13:51.000Z",
              "createdBy": null,
              "updatedBy": null,
              "title": "步骤2",
              "stepStatus": "wait"
            }
          },
          {
            "entity3": {
              "id": 2646694905050368,
              "createdTime": "2023-07-04T06:02:50.000Z",
              "updatedTime": "2023-07-06T03:16:21.000Z",
              "createdBy": null,
              "updatedBy": null,
              "title": "步骤3",
              "stepStatus": "finish",
              disabled: true
            }
          },
          {
            "entity3": {
              "id": 2647510326850816,
              "createdTime": "2023-07-05T09:41:49.000Z",
              "updatedTime": "2023-07-06T05:39:19.000Z",
              "createdBy": null,
              "updatedBy": null,
              "title": "步骤41111111111顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶",
              "stepStatus": "error"
            }
          },
          {
            "entity3": {
              "id": 2647511004148992,
              "createdTime": "2023-07-05T09:43:12.000Z",
              "updatedTime": "2023-07-05T09:43:12.000Z",
              "createdBy": null,
              "updatedBy": null,
              "title": "步骤5",
              "stepStatus": "finish"
            }
          },
          {
            "entity3": {
              "id": 2648098148037888,
              "createdTime": "2023-07-06T05:37:44.000Z",
              "updatedTime": "2023-07-06T06:14:18.000Z",
              "createdBy": null,
              "updatedBy": null,
              "title": "步骤6",
              "stepStatus": "122"
            }
          },
          {
            "entity3": {
              "id": 2648098207298816,
              "createdTime": "2023-07-06T05:37:52.000Z",
              "updatedTime": "2023-07-06T05:37:52.000Z",
              "createdBy": null,
              "updatedBy": null,
              "title": "步骤7",
              "stepStatus": null
            }
          }
        ],
        "total": 7
      }
    }
  },
};
</script>

<style lang="less">
@import '../../style/var';

.demo-steps {
  .steps-success,
  .van-icon-location {
    color: @green;
  }

  .van-button {
    margin: @padding-md 0 0 @padding-md;
  }

  p,
  h3 {
    margin: 0;
    font-weight: normal;
    font-size: inherit;
  }

  .van-steps__message + p {
    margin-bottom: 10px;
  }
}
</style>
