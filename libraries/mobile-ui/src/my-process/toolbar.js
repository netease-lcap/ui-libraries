import { createNamespace } from '../utils';
import dayjs from '../utils/dayjs';
import Row from '../row';
import Col from '../col';
import Iconv from '../iconv';

import DateTimePicker from '../datetime-picker';
import Picker from '../pickerson';

import mockData from './mock';

const [createComponent, bem, t] = createNamespace('my-process-toolbar');

export default createComponent({
  props: {
    tab: String,
  },

  data() {
    return {
      allProcess: [],
      allInitiator: [],

      processPopupValue: false,
      initiatorPopupValue: false,
      startTimePopupValue: false,
      viewedStatePopupValue: false,
    };
  },

  computed: {
    colCount() {
      return this.tab === 'myCCTaskList' ? 6 : 8;
    }
  },

  methods: {
    showProcessPicker() {
      this.getAllProcess().then((data) => {
        this.allProcess = data;
        this.$refs.processPicker.togglePopup();
      });
    },

    showInitiatorPicker() {
      this.getAllInitiator().then((data) => {
        this.allInitiator = data.map((item) => ({
          ...item,
          userId: item.userId || item.userName,
        }));
        this.$refs.initiatorPicker.togglePopup();
      });
    },

    showViewedStatePicker() {
      this.$refs.viewedStatePicker.togglePopup();
    },

    async getAllProcess() {
      if (this.isDev()) {
        return mockData.allProcess;
      }

      const { data } = await this.$processV2?.getProcDefInfos();
      const result = data;

      return result;
    },

    async getAllInitiator() {
      if (this.isDev()) {
        return mockData.allInitiator;
      }

      const { data } = await this.$processV2?.getProcInstInitiators();
      const result = data;

      return result;
    },

    onProcessPickerChange(value) {
      this.$emit('change', {
        procDefKey: value,
      }, this.tab);
    },

    onInitiatorPickerChange(value) {
      this.$emit('change', {
        procInstInitiator: value,
      }, this.tab);
    },

    onViewedStatePickerChange(value) {
      this.$emit('change', {
        viewed: value,
      }, this.tab);
    },

    onStartTimePickerChange(value) {
      const { start, end } = value;
      this.$emit('change', {
        procInstStartTimeAfter: dayjs(`${start} 00:00:00`).toISOString(),
        procInstStartTimeBefore: dayjs(`${end} 23:59:59`).toISOString(),
      }, this.tab);
    },
  },

  render() {
    return (
      <div>
        <Row class={bem()} align="center">
          <Col span={this.colCount}>
            <div class={bem('button')} onClick={this.showProcessPicker}>
              {t('process')}
              <Iconv
                class={bem('button-icon')}
                name="bottom-triangle"
                size={12}
                icotype="only"
              ></Iconv>
            </div>
          </Col>

          {this.tab !== 'myLaunchList' ? (
            <Col span={this.colCount}>
              <div class={bem('button')} onClick={this.showInitiatorPicker}>
                {t('initiator')}
                <Iconv
                  class={bem('button-icon')}
                  name="bottom-triangle"
                  size={12}
                  icotype="only"
                ></Iconv>
              </div>
            </Col>
          ) : null}

          <Col span={this.colCount}>
            <div
              class={bem('button')}
              onClick={() => {
                this.$refs.datePicker.open();
              }}
            >
              {t('startTime')}
              <Iconv
                class={bem('button-icon')}
                name="bottom-triangle"
                size={12}
                icotype="only"
              ></Iconv>
            </div>
          </Col>

          {this.tab === 'myCCTaskList' ? (
            <Col span={this.colCount}>
              <div
                class={bem('button')}
                onClick={this.showViewedStatePicker}
              >
                {t('viewedState')}
                <Iconv
                  class={bem('button-icon')}
                  name="bottom-triangle"
                  size={12}
                  icotype="only"
                ></Iconv>
              </div>
            </Col>
          ) : null}
        </Row>
        {/* 选择器--流程 */}
        <Picker
          vShow={false}
          ref="processPicker"
          dataSource={[
            { procDefKey: null, procDefTitle: '全部' },
            ...this.allProcess,
          ]}
          valueField="procDefKey"
          textField="procDefTitle"
          onConfirm={this.onProcessPickerChange}
          showToolbar
          title={t('process')}
          closeOnClickOverlay
        />
        {/* 选择器--发起人 */}
        <Picker
          vShow={false}
          ref="initiatorPicker"
          dataSource={[
            { userName: '全部', userId: null },
            ...this.allInitiator,
          ]}
          valueField="userId"
          textField="userName"
          onConfirm={this.onInitiatorPickerChange}
          showToolbar
          title={t('initiator')}
          closeOnClickOverlay
        />
        {/* 选择器--时间 */}
        <DateTimePicker
          vShow={false}
          ref="datePicker"
          range
          type="date"
          unit="date"
          onConfirm={this.onStartTimePickerChange}
          title={t('startTime')}
          closeOnClickOverlay
        />
        {/* 选择器--查看状态 */}
        <Picker
          vShow={false}
          ref="viewedStatePicker"
          dataSource={[
            { title: '全部', value: null },
            { title: t('notViewed'), value: false },
            { title: t('viewed'), value: true },
          ]}
          valueField="value"
          textField="title"
          onConfirm={this.onViewedStatePickerChange}
          showToolbar
          title={t('viewedState')}
          closeOnClickOverlay
        />
      </div>
    );
  },
});
