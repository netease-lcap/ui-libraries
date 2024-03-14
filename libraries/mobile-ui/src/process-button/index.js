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
      operationEnabled: true, // 操作权限开关
      displayText: '提交', // 操作按钮文本
      commentRequired: false, // 意见开关
    },
    {
      name: 'approve',
      operationEnabled: true, // 操作权限开关
      displayText: '同意', // 操作按钮文本
      commentRequired: true, // 意见开关
    },
    {
      name: 'reject',
      operationEnabled: true, // 操作权限开关
      displayText: '拒绝', // 操作按钮文本
      commentRequired: true, // 意见开关
    },
    {
      name: 'revert',
      operationEnabled: true, // 操作权限开关
      displayText: '回退', // 操作按钮文本
      commentRequired: true, // 意见开关
    },
    {
      name: 'reassign',
      operationEnabled: true, // 操作权限开关
      displayText: '转交', // 操作按钮文本
      commentRequired: true, // 意见开关
    },
    {
      name: 'withdraw',
      operationEnabled: true, // 操作权限开关
      displayText: '撤回', // 操作按钮文本
      commentRequired: true, // 意见开关
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
  }],
};

export default createComponent({
  props: {
    target: { type: String, default: '_self' },
    destination: String,
    link: [String, Function],
    placement: {
      type: String,
      default: 'top-start',
    },
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
        reassign: '',
      },
    };
  },

  created() {
    window.location.search
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
    hasComment(name) {
      return ['approve', 'reject'].includes(name);
    },
    hasConfirm(name) {
      return ['revert', 'withdraw'].includes(name);
    },
    async getOperationPermissionDetail(taskId) {
      if (this.inDesigner() || this.isDev()) {
        this.permissionDetails = mockData.permissionDetails;
        return;
      }

      try {
        const res = await this.$processV2.getTaskOperationPermissions({
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
        const res = await this.$processV2.getUsersForReassign({
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

      // 意见,   同意 拒绝才有
      if (this.hasComment(item.name)) {
        body.comment = this.dialog.opinions;
      }

      // formdata
      if (window.__processDetailFromMixinFormData__) {
        body.data = window.__processDetailFromMixinFormData__;
      }

      // 转交人
      if (item.name === 'reassign') {
        body.userForReassign = this.dialog.reassign;
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
      const { name } = item;

      // 表单检验
      if (['approve', 'reject', 'submit'].includes(name)) {
        const dynamicRenderContainer = document.getElementById('dynamicRenderContainer');
        if (dynamicRenderContainer && dynamicRenderContainer.__vue__) {
          const formRefName = dynamicRenderContainer.getAttribute('ref-name');
          const formRef = dynamicRenderContainer.__vue__.$refs[formRefName];
          if (formRef && formRef.validate) {
            const validateResult = await formRef.validate();
            if (!validateResult.valid) {
              return;
            }
          }
        }
      }

      // 需要弹出框的情况
      if (['approve', 'reject', 'revert', 'withdraw', 'reassign'].includes(name)) {
        this.dialog = {
          item,
        };
        this.showDialog = true;
      } else {
        await this.submit(item);
      }
      this.showPopover = false;
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
      this.dialog.reassign = value;
    },

    resetDialog() {
      this.dialog = {
        item: null,
        opinions: '',
        reassign: '',
      };
    },
  },

  render() {
    const { permissionDetails } = this;

    // 有权限的操作
    const permissions = permissionDetails?.filter((item) => item.operationEnabled);
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
          placement={this.placement}
          scopedSlots={{
            reference: () => <div class={bem('more')}>{t('more')}</div>,
          }}
        >
          {rest.map((item) => (
            <div class={bem('popover-item')} onClick={() => this.onClickItem(item)}>
              {item.displayText}
            </div>
          ))}
        </Popover>
      ),
      <div class={bem('operation', { center: !hasMore })}>
        {second && (
          <Button type="default" squareroud="round" onClick={() => this.onClickItem(second)}>
            {second.displayText}
          </Button>
        )}
        {first && (
          <Button type="info" size={second ? 'normal' : 'large'} squareroud="round" onClick={() => this.onClickItem(first)}>
            {first.displayText}
          </Button>
        )}
      </div>,
    ].filter(Boolean);

    return (
      <div class={bem('wrap')} vusion-disabled-duplicate="true" vusion-disabled-copy="true">
        {btns}

        <van-link ref="link" class={bem('link')} destination={this.destination} target={this.target} link={this.link} />

        <Dialog
          vModel={this.showDialog}
          title={this.dialog.item?.displayText}
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
              {['reassign'].includes(this.dialog.item?.name) && (
                <Field
                  border={false}
                  rules={[
                    {
                      validate: 'filled',
                      message: '选择框不得为空',
                      trigger: 'input+blur',
                      required: true,
                    },
                  ]}
                  scopedSlots={{
                    input: () => (
                      <Picker
                        value={this.dialog.reassign}
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

              {this.hasComment(this.dialog.item?.name) ? (
                <div
                  class={bem('dialog-formItem_title', {
                    required: this.dialog.item?.commentRequired,
                  })}
                >
                  审批意见
                </div>
              ) : null}
              {this.hasComment(this.dialog.item?.name) ? (
                <Field
                  border={false}
                  rules={[
                    {
                      validate: 'filled',
                      message: '输入框不得为空',
                      trigger: 'input+blur',
                      required: this.dialog.item?.commentRequired,
                    },
                  ]}
                  scopedSlots={{
                    input: () => <TextArea value={this.dialog.opinions} onInput={this.onOpinionsInput} class={bem('dialog-input')} placeholder="请输入审批意见" inputAlign="left" />,
                  }}
                />
              ) : null}

              {this.hasConfirm(this.dialog.item?.name) ? (
                <div class={bem('dialog-confirm_content')}>
                  <p class={bem('dialog-confirm_content_title')}>请确认是否{this.dialog.item?.displayText}流程？</p>
                </div>
              ) : null}
            </Form>
          </div>
        </Dialog>
      </div>
    );
  },
});
