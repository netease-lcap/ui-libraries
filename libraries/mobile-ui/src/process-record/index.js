import _debounce from 'lodash/debounce';
import { createNamespace } from '../utils';
import dayjs from '../utils/dayjs';
import List from '../list';
import Steps from '../steps';
import Step from '../step';
import * as mockData from './mock';

const [createComponent, bem, t] = createNamespace('process-record');

export default createComponent({
  props: {
    type: {
      type: String,
      default: 'list', // list timeline
    },
  },

  data() {
    return {
      taskId: null,

      records: [],
      total: 0,
      page: 1,
      size: this.inDesigner() ? 3 : 5,
      finished: false,
    };
  },

  computed: {
    hasMore() {
      return this.total > this.records.length;
    },
  },

  created() {
    this.taskId = this.getTaskId();

    this.onLoad();
  },

  methods: {
    getTaskId() {
      let id = null;

      window.location.search
        .replace('?', '')
        .split('&')
        .forEach((item) => {
          const [key, value] = item.split('=');
          if (key === 'taskId') {
            id = value;
          }
        });

      return id;
    },

    onLoad: _debounce(async function () {
      const result = await this.getProcessRecords(this.taskId);
      const { list, total } = result || {};

      this.records = this.records.concat(list || []);
      this.total = total || 0;
      this.finished = this.records.length >= this.total;
      this.page += 1;
    }, 500, {
      leading: true,
      trailing: false,
    }),

    async getProcessRecords(taskId) {
      if (this.inDesigner() || this.isDev()) {
        return {
          list: mockData.records.slice(this.page - 1, this.page * this.size),
          total: mockData.records.length,
        };
      }

      const result = await this.$processV2?.getProcInstRecords({
        body: {
          taskId,
          page: this.page,
          size: this.size,
        },
      });

      return result?.data;
    },

    getUserName(item) {
      const { nodeOperation, userName } = item;
      if (['cc', 'end'].includes(nodeOperation) && userName === 'SYSTEM_USER') {
        return '系统';
      }
      return userName || '-';
    },

    renderList() {
      return (
        <List
          class={bem('list')}
          onLoad={this.onLoad}
          finished={this.finished}
          immediateCheck={false}
        >
          {this.records.map((item) => {
            const {
              nodeTitle,
              userName,
              recordCreatedTime,
              nodeOperation,
              nodeOperationDisplayText,
              nodeOperationComment: comment,
            } = item;

            return (
              <div class={bem('card')}>
                <div class={bem('card-line')}>
                  <div class={bem('card-label')}>{t('node')}</div>
                  <div class={bem('card-content')}>{nodeTitle || '-'}</div>
                </div>
                <div class={bem('card-line')}>
                  <div class={bem('card-label')}>{t('assignee')}</div>
                  <div class={bem('card-content')}>{this.getUserName(item)}</div>
                </div>
                <div class={bem('card-line')}>
                  <div class={bem('card-label')}>{t('time')}</div>
                  <div class={bem('card-content')}>
                    {recordCreatedTime
                      ? dayjs(recordCreatedTime).format('YYYY-MM-DD HH:mm:ss')
                      : '-'}
                  </div>
                </div>
                <div class={bem('card-line')}>
                  <div class={bem('card-label')}>{t('status')}</div>
                  <div class={bem('card-content')}>
                    <span class={nodeOperation}>{nodeOperationDisplayText || '-'}</span>
                  </div>
                </div>
                <div class={bem('card-line')}>
                  <div class={bem('card-label')}>{t('comment')}</div>
                  <div class={bem('card-content')}>{comment || '-'}</div>
                </div>
              </div>
            );
          })}
        </List>
      );
    },

    renderTimeline() {
      return (
        <Steps
          class={bem('timeline')}
          dataSource={this.records}
          value={this.records.length - 1}
          direction="vertical"
          designerMask={false}
          scopedSlots={{
            item: ({ item }) => {
              const { nodeTitle, userName, recordCreatedTime, nodeOperation, nodeOperationDisplayText, nodeOperationComment: comment } = item;

              let status = 'process';

              if (['submit', 'approve'].includes(nodeOperation)) {
                status = 'finish';
              } else if (['reject', 'revert'].includes(nodeOperation)) {
                status = 'error';
              }

              return (
                <Step
                  status={status}
                  readonly
                  border={false}
                  style={{
                    '--van-step-line-color': '#337EFF',
                    '--van-step-finish-line-color': '#337EFF',
                    '--van-step-active-color': '#337EFF',
                    '--van-step-text-color': '#333',
                  }}
                >
                  <div class={bem('card')}>
                    <div class={bem('card-title')}>{nodeTitle}</div>
                    <div class={bem('card-line')}>
                      <div class={bem('card-label')}>{t('assignee')}</div>
                      <div class={bem('card-content')}>{this.getUserName(item)}</div>
                    </div>
                    <div class={bem('card-line')}>
                      <div class={bem('card-label')}>{t('time')}</div>
                      <div class={bem('card-content')}>{recordCreatedTime ? dayjs(recordCreatedTime).format('YYYY-MM-DD HH:mm:ss') : '-'}</div>
                    </div>
                    <div class={bem('card-line')}>
                      <div class={bem('card-label')}>{t('status')}</div>
                      <div class={bem('card-content')}>
                        <span class={nodeOperation}>{nodeOperationDisplayText || '-'}</span>
                      </div>
                    </div>
                    <div class={bem('card-line')}>
                      <div class={bem('card-label')}>{t('comment')}</div>
                      <div class={bem('card-content')}>{comment || '-'}</div>
                    </div>
                  </div>
                </Step>
              );
            },

            extra: () => {
              return this.hasMore ? (
                <div class={bem('timeline-more')} onClick={this.onLoad}>
                  {t('more')}
                </div>
              ) : (
                <div class={bem('timeline-noMore')}>{t('noMore')}</div>
              );
            },
          }}
        ></Steps>
      );
    }
  },

  render() {
    return (
      <div class={bem()} vusion-disabled-duplicate="true" vusion-disabled-copy="true">
        {this.type === 'list' ? this.renderList() : null}
        {this.type === 'timeline' ? this.renderTimeline() : null}
      </div>
    );
  },
});
