<template>
  <demo-section>
      <demo-block card title="受控联动绑定">
          <div>value: {{ date }}</div>
          <div>start: {{ startDate }}</div>
          <div>end: {{ endDate }}</div>
          <van-datetime-picker
              :isNew="false"
              :ref="`datetime_picker1`"
              type="date"
              title="选择date"
              input-align="left"
              :value.sync="date"
              :startValue.sync="startDate"
              :endValue.sync="endDate"
              :range="false"
              :advanced-format="{enable: true, value: 'YYYY年MM月DD日'}"
              @confirm="onConfirm"
          >
              <template #title>
                  <van-text text="顶部标题"></van-text>
              </template>
              <template #pannel-title>
                  <van-text text="顶部标题"></van-text>
              </template>
              <template #top>
                  <van-datetime-picker-action-slot :vusion-disabled-cut="true" :vusion-disabled-move="true" :vusion-disabled-drag="true" target-method="cancel">
                      <van-iconv name="left-arrow" icotype="only"></van-iconv>
                  </van-datetime-picker-action-slot>
                  <van-datetime-picker-action-slot :vusion-disabled-cut="true" :vusion-disabled-move="true" :vusion-disabled-drag="true" target-method="confirm"></van-datetime-picker-action-slot>
              </template>
              <template #bottom>
                  <van-datetime-picker-action-slot :vusion-disabled-cut="true" :vusion-disabled-move="true" :vusion-disabled-drag="true" target-method="cancel">
                      <van-button type="info_secondary" size="normal" text="取消" squareroud="round"></van-button>
                  </van-datetime-picker-action-slot>
                  <van-datetime-picker-action-slot :vusion-disabled-cut="true" :vusion-disabled-move="true" :vusion-disabled-drag="true" target-method="confirm">
                      <van-button type="info" size="normal" text="确认" squareroud="round"></van-button>
                  </van-datetime-picker-action-slot>
              </template>
          </van-datetime-picker>
          <van-button @click="clear">clear</van-button>
          <div>time: {{ time }}</div>
          <div>start: {{ startTime }}</div>
          <div>end: {{ endTime }}</div>
          <van-datetime-picker
              :isNew="false"
              :ref="`datetime_picker1`"
              type="time"
              title="选择time"
              input-align="left"
              :value.sync="time"
              :startValue.sync="startTime"
              :endValue.sync="endTime"
              :range="true"
          >
              <template #title>
                  <van-text text="顶部标题"></van-text>
              </template>
              <template #pannel-title>
                  <van-text text="顶部标题"></van-text>
              </template>
              <template #top>
                  <van-datetime-picker-action-slot :vusion-disabled-cut="true" :vusion-disabled-move="true" :vusion-disabled-drag="true" target-method="cancel">
                      <van-iconv name="left-arrow" icotype="only"></van-iconv>
                  </van-datetime-picker-action-slot>
                  <van-datetime-picker-action-slot :vusion-disabled-cut="true" :vusion-disabled-move="true" :vusion-disabled-drag="true" target-method="confirm"></van-datetime-picker-action-slot>
              </template>
              <template #bottom>
                  <van-datetime-picker-action-slot :vusion-disabled-cut="true" :vusion-disabled-move="true" :vusion-disabled-drag="true" target-method="cancel">
                      <van-button type="info_secondary" size="normal" text="取消" squareroud="round"></van-button>
                  </van-datetime-picker-action-slot>
                  <van-datetime-picker-action-slot :vusion-disabled-cut="true" :vusion-disabled-move="true" :vusion-disabled-drag="true" target-method="confirm">
                      <van-button type="info" size="normal" text="确认" squareroud="round"></van-button>
                  </van-datetime-picker-action-slot>
              </template>
          </van-datetime-picker>

          <van-button @click="clear">clear</van-button>
      </demo-block>

      <demo-block card title="年月日">
          <div>value: {{ value.date }}</div>
          <van-datetime-picker :value.sync="value.date" type="date" unit="date" displayFormat="YYYY年M月D日" />
      </demo-block>
      <demo-block card title="年周">
          <div>value: {{ value.week }}</div>
          <van-datetime-picker :value.sync="value.week" type="date" unit="week"  />
      </demo-block>
      <demo-block card title="年月">
          <div>value: {{ value.month }}</div>
          <van-datetime-picker :value.sync="value.month" type="date" unit="month"  />
      </demo-block>
      <demo-block card title="年季度">
          <div>value: {{ value.quarter }}</div>
          <van-datetime-picker :value.sync="value.quarter" type="date" unit="quarter"  />
      </demo-block>
      <demo-block card title="年">
          <div>value: {{ value.year }}</div>
          <van-datetime-picker :value.sync="value.year" type="date" unit="year"  />
      </demo-block>

      <demo-block card :title="t('datetimeType')">
          <div>value: {{value.datetime}}</div>
          <van-datetime-picker :value.sync="value.datetime" type="datetime" :title="t('datetimeType')" />
      </demo-block>
      <demo-block card :title="t('datetimeType')">
          <div>value: {{value.datetime}}</div>
          <van-datetime-picker :value.sync="value.datetime" type="datetime" unit="minute" :title="t('datetimeType')" />
      </demo-block>

      <demo-block card :title="t('timeType')">
          <div>value: {{value.time}}</div>
          <van-datetime-picker :value.sync="value.time" type="time" :title="t('timeType')" />
      </demo-block>
      <demo-block card :title="t('timeType')">
          <div>value: {{value.secondTime}}</div>
          <van-datetime-picker :value.sync="value.secondTime" type="time" unit="second" :title="t('timeType')" />
      </demo-block>

      <demo-block card title="临时测试">
          <van-datetime-picker :close-on-click-overlay="true" type="date" />
      </demo-block>
  </demo-section>
</template>

<script>
export default {
  i18n: {
      'zh-CN': {
          day: '日',
          year: '年',
          month: '月',
          timeType: '选择时间',
          dateType: '选择年月日',
          datetimeType: '选择完整时间',
          datehourType: '选择年月日小时',
          monthDayType: '选择月日',
          yearMonthType: '选择年月',
          optionFilter: '选项过滤器',
          sortColumns: '自定义列排序',
      },
      'en-US': {
          day: ' Day',
          year: ' Year',
          month: ' Month',
          timeType: 'Choose Time',
          dateType: 'Choose Date',
          datetimeType: 'Choose DateTime',
          datehourType: 'Choose DateHour',
          monthDayType: 'Choose Month-Day',
          yearMonthType: 'Choose Year-Month',
          optionFilter: 'Option Filter',
          sortColumns: 'Columns Order',
      },
  },

  data() {
      return {
          variable1: undefined,

          minDate: new Date(2020, 0, 1),
          maxDate: '2020-12-12 12:12:12' || new Date(2025, 10, 1),
          date: '2021-01-13 00:00:00' || new Date(2021, 0, 17),
          startDate: 'asdfsadf-asdf',
          endDate: 'asdfasdf',

          time: undefined,
          startTime: undefined,
          endTime: undefined,

          value: {
              date: '2021-01-13 00:00:00' || new Date(2021, 0, 17),
              week: null,
              month: null,
              quarter: null,
              year: null,

              time: '12:00',
              secondTime: '12:11:11',
              datetime: '2022-03-31T07:21:52.066Z',
              datehour: new Date(2020, 0, 1),
              monthDay: new Date(2020, 0, 1),
              // yearMonth: new Date(2020, 0, 1),
              yearMonth: '2020-08',
              optionFilter: '12:00',
              sortColumnsDate: new Date(2020, 0, 1),
          },
      };
  },

  methods: {
      formatter(type, value) {
          if (type === 'year') {
              return value + this.t('year');
          }
          if (type === 'month') {
              return value + this.t('month');
          }
          if (type === 'day') {
              return value + this.t('day');
          }
          return value;
      },

      filter(type, values) {
          if (type === 'minute') {
              return values.filter((value) => value % 5 === 0);
          }

          return values;
      },
      changeDate() {
          this.date = '2023-09-01';
      },
      clear() {
          this.date = null;
          this.startDate = null;
          this.endDate = null;
          this.time = null;
          this.startTime = null;
          this.endTime = null;
      },
      onConfirm() {
        console.log('onConfirm', this.date);
      }
  },
};
</script>
