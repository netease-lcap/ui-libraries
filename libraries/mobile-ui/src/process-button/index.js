import { createNamespace } from '../utils';

import Button from '../button';
import Popover from '../popover';
import Dialog from '../dialog/Dialog';
import Form from '../form';
import Field from '../field';
import TextArea from '../fieldtextarea';
import Picker from '../pickerson';

const [createComponent, bem, t] = createNamespace('process-button');

const mockData = {
  permissionDetails: [
    {
      name: 'submit',
      operateEnable: true, // 操作权限开关
      showText: '提交', // 操作按钮文本
      opinionsEnable: false, // 意见开关
    },
    {
      name: 'approve',
      operateEnable: true, // 操作权限开关
      showText: '同意', // 操作按钮文本
      opinionsEnable: true, // 意见开关
    },
    {
      name: 'reject',
      operateEnable: true, // 操作权限开关
      showText: '拒绝', // 操作按钮文本
      opinionsEnable: true, // 意见开关
    },
    {
      name: 'revert',
      operateEnable: true, // 操作权限开关
      showText: '回退', // 操作按钮文本
      opinionsEnable: true, // 意见开关
    },
    {
      name: 'transfer',
      operateEnable: true, // 操作权限开关
      showText: '转交', // 操作按钮文本
      opinionsEnable: true, // 意见开关
    },
    {
      name: 'withdraw',
      operateEnable: true, // 操作权限开关
      showText: '撤回', // 操作按钮文本
      opinionsEnable: true, // 意见开关
    },
  ],
  allTransferUserList: [{
    userName: '张三',
    userId: '1',
  }, {
    userName: '李四',
    userId: '2',
  }, {
    userName: '王五',
    userId: '3',
  }]
} ;

export default createComponent({
  props: {
    target: { type: String, default: '_self' },
    destination: String,
    link: [String, Function],
  },

  data() {
    return {
      taskId: null,
      permissionDetails: [],

      showPopover: false,
      showDialog: false,

      dialog: {
        item: null,
        opinions: '',
        transfer: '',
      },
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

    this.getOperationPermissionDetail(this.taskId);
  },

  methods: {
    async getOperationPermissionDetail(taskId) {
      if (this.inDesigner() || this.isDev()) {
        this.permissionDetails = mockData.permissionDetails;
        return;
      }

      try {
        const res = await this.$processV2.operationPermissionDetail({
          body: {
            taskId,
          },
        });

        this.permissionDetails = res.data;
      } catch (error) {
        console.log(error);
      }
    },

    async getTransferUserList(taskId) {
      if (this.inDesigner() || this.isDev()) {
        return mockData.allTransferUserList;
      }

      try {
        const res = await this.$processV2.getTransferTargetUserList({
          body: {
            taskId,
          },
        });

        return res.data;
      } catch (error) {
        console.log(error);
        return [];
      }

    },

    async submit(item) {
      const body = {
        taskId: this.taskId,
      };

      // 意见
      if (item.operateEnable) {
        body.comment = this.dialog.opinions;
      }

      // formdata
      const dynamicRenderContainer = document.getElementById('dynamicRenderContainer');
      if (dynamicRenderContainer && dynamicRenderContainer.__vue__) {
        body.data = dynamicRenderContainer.__vue__.processDetailFormData;
      }

      // 转交人
      if (item.name === 'transfer') {
        body.transferTargetUser = this.dialog.transfer;
      }

      const operate = `${item.name}Task`;

      try {
        await this.$processV2.setTaskInstance({
          path: {
            operate,
          },
          body,
        });

        this.refresh();
      } catch (error) {
        console.log(error);
      }
    },

    async onClickItem(item) {
      const { name, opinionsEnable } = item;

      // 需要弹出框的情况opinionsEnable和name是transfer
      if (opinionsEnable || name === 'transfer') {
        this.dialog = {
          item,
        };
        this.showDialog = true;
      } else {
        await this.submit(item);
      }
    },

    async confirm() {
      const { item } = this.dialog;

      const isValid = await this.checkValue();
      if (!isValid) {
        return;
      }

      await this.submit(item);

      this.showDialog = false;
    },

    async checkValue() {
      let isValid = true;

      const result = await this.$refs.form.validate();

      isValid = result.valid;

      return isValid;
    },

    async beforeClose(action, done) {
      if (action === 'confirm') {
        const isValid = await this.checkValue();
        if (!isValid) {
          done(false);
        } else {
          done(true);
        }
      } else {
        done(true);
      }
    },

    refresh() {
      if (this.destination || this.link) {
        this.$refs.link.$el.click();
      } else {
        window.location.reload();
      }
    },

    onOpinionsInput(value) {
      this.dialog.opinions = value;
    },

    onTransferPickerConfirm(value) {
      this.dialog.transfer = value;
    },

    resetDialog() {
      this.dialog = {
        item: null,
        opinions: '',
        transfer: '',
      };
    },
  },

  render() {
    const { permissionDetails } = this;

    // 有权限的操作
    const permissions = permissionDetails?.filter((item) => item.operateEnable);
    const hasPermission = permissions?.length > 0;

    if (!hasPermission) {
      return null;
    }

    let btns = null;

    const hasMore = permissions.length > 2;
    const [first, second, ...rest] = permissions;

    btns = [
      hasMore && (
        <Popover
          vModel={this.showPopover}
          trigger="click"
          placement="top-start"
          scopedSlots={{
            reference: () => <div class={bem('more')}>{t('more')}</div>,
          }}
        >
          {rest.map((item) => (
            <div
              class={bem('popover-item')}
              onClick={() => this.onClickItem(item)}
            >
              {item.showText}
            </div>
          ))}
        </Popover>
      ),
      <div class={bem('operation', { center: !hasMore })}>
        {second && (
          <Button
            type="default"
            squareroud="round"
            onClick={() => this.onClickItem(second)}
          >
            {second.showText}
          </Button>
        )}
        {first && (
          <Button
            type="info"
            size={second ? 'normal' : 'large'}
            squareroud="round"
            onClick={() => this.onClickItem(first)}
          >
            {first.showText}
          </Button>
        )}
      </div>,
    ].filter(Boolean);

    return (
      <div class={bem('wrap')}>
        {btns}

        <van-link
          ref="link"
          class={bem('link')}
          destination={this.destination}
          target={this.target}
          link={this.link}
        ></van-link>

        <Dialog
          vModel={this.showDialog}
          title={this.dialog.item?.showText}
          onConfirm={this.confirm}
          onClosed={this.resetDialog}
          beforeClose={this.beforeClose}
          showCancelButton
          showConfirmButton
          closeOnClickOverlay
          nomattershowfoot
        >
          <div class={bem('dialog')}>
            <Form ref="form">
              {['transfer'].includes(this.dialog.item?.name) && (
                <Field
                  border={false}
                  rules={[
                    {
                      validate: 'filled',
                      message: `选择框不得为空`,
                      trigger: 'input+blur',
                      required: true,
                    },
                  ]}
                  scopedSlots={{
                    input: () => (
                      <Picker
                        value={this.dialog.transfer}
                        valueField="userId"
                        textField="userName"
                        class={bem('dialog-picker')}
                        dataSource={() => this.getTransferUserList(this.taskId)}
                        onConfirm={this.onTransferPickerConfirm}
                        placeholder="请选择转交人"
                        title=""
                        showToolbar
                        closeOnClickOverlay
                        inputAlign="left"
                      />
                    ),
                  }}
                />
              )}

              {this.dialog.item?.opinionsEnable && (
                <Field
                  border={false}
                  rules={[
                    {
                      validate: 'filled',
                      message: `输入框不得为空`,
                      trigger: 'input+blur',
                      required: true,
                    },
                  ]}
                  scopedSlots={{
                    input: () => (
                      <TextArea
                        value={this.dialog.opinions}
                        onInput={this.onOpinionsInput}
                        class={bem('dialog-input')}
                        placeholder="请输入审批意见"
                        inputAlign="left"
                      />
                    ),
                  }}
                ></Field>
              )}
            </Form>
          </div>
        </Dialog>
      </div>
    );
  },
});
