import { createNamespace } from '../utils';
import dayjs from '../utils/dayjs';

const [createComponent, bem, t] = createNamespace('process-info');

const mockData = {
  detail: {
    procInstId: 'ac33c3f2-ba69-11ee-bb3f-fa9450476323',
    procInstInitiator: '张三',
    procInstStartTime: '2024-01-24T03:35:52.000Z',
    procInstEndTime: '2024-01-24T03:35:52.000Z',
    procInstStatus: 'Approving',
    procInstCurrNodes: [
      {
        currNodeTitle: '多人审批任务',
        currNodeParticipants: ['李四', '王五'],
      },
      {
        currNodeTitle: '多人审批任务',
        currNodeParticipants: ['赵六'],
      },
    ],
  },
};

export default createComponent({
  props: {},

  data() {
    return {
      detail: {},
      taskId: null,
    };
  },

  created() {
    location.search
      .replace('?', '')
      .split('&')
      .forEach((item) => {
        const [key, value] = item.split('=');
        if (key === 'taskId') {
          this.taskId = value;
        }
      });

    this.getProcessInfo(this.taskId);
  },

  methods: {
    async getProcessInfo(taskId) {
      if (this.inDesigner() || this.isDev()) {
        this.detail = mockData.detail;

        return;
      }

      const result = await this.$processV2.getProcInstInfo({
        body: {
          taskId,
        },
      });
      this.detail = result.data || {};
    },
  },

  render() {
    const {
      procInstInitiator: startBy,
      procInstStartTime: startTime,
      procInstStatus: status,
      procInstCurrNodes: currentNodeList,
    } = this.detail;

    const nodes = (currentNodeList || [])
      .map((item) => item.currNodeTitle)
      .join('，');
    const assignees = (currentNodeList || [])
      .map((item) => (item.currNodeParticipants || []).join('，'))
      .join('，');

    const statusMap = {
      Approved: '审批通过',
      Approving: '审批中',
    };

    return (
      <div class={bem()}>
        <div class={bem('card')}>
          <div class={bem('card-line')}>
            <div class={bem('card-label')}>{t('initiator')}</div>
            <div class={bem('card-content')}>{startBy || '-'}</div>
          </div>
          <div class={bem('card-line')}>
            <div class={bem('card-label')}>{t('startTime')}</div>
            <div class={bem('card-content')}>
              {startTime ? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss') : '-'}
            </div>
          </div>
          <div class={bem('card-line')}>
            <div class={bem('card-label')}>{t('status')}</div>
            <div class={bem('card-content')}>{statusMap[status] || status || '-'}</div>
          </div>
          <div class={bem('card-line')}>
            <div class={bem('card-label')}>{t('node')}</div>
            <div class={bem('card-content')}>{nodes || '-'}</div>
          </div>
          <div class={bem('card-line')}>
            <div class={bem('card-label')}>{t('assignee')}</div>
            <div class={bem('card-content')}>{assignees || '-'}</div>
          </div>
        </div>
      </div>
    );
  },
});
