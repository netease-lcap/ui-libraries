<template>
    <u-linear-layout mode="inline" :class="$style.root">
        <u-button v-for="item in permissionDetails" :key="item.name" :color="getColor(item)" @click="onClickButton(item)">
            {{ item.displayText }}
        </u-button>
        <u-modal v-if="currentItem"
            :title="currentItem.displayText"
            :visible="!!currentItem"
            ref="modal"
            @close="currentItem = undefined">
            <u-form label-layout="block" ref="form">
                <u-form-item :label="$tt('approvalComments')" :required="currentItem.commentRequired" :rules="currentItem.commentRequired?'required':''" v-if="!['reassign', 'addSign'].includes(currentItem.name)">
                    <u-textarea v-model="model.comment" size="normal full" :placeholder="$tt('placeholder')">
                    </u-textarea>
                </u-form-item>
                <u-form-item :label="$tt('selectTransfer')" required :rules="`required #${$tt('selectTransferEmpty')}`" v-if="['reassign', 'addSign'].includes(currentItem.name)">
                    <u-select
                        size="full"
                        text-field="userName"
                        value-field="userName"
                        :data-source="getUsers(currentItem)"
                        :value.sync="model.userName"
                        :initial-load="true">
                    </u-select>
                </u-form-item>
            </u-form>
            <template #foot>
                <u-linear-layout justify="end">
                    <u-button @click="close()">{{ $tt('cancel') }}</u-button>
                    <u-button color="primary" @click="onSubmit()">{{ $tt('submit') }}</u-button>
                </u-linear-layout>
            </template>
        </u-modal>
        <u-link ref="link" :target="target" :link="link || destination"></u-link>
    </u-linear-layout>
</template>

<script>
import i18nMixin from '../../mixins/i18n';
export default {
    name: 'u-process-button',
    mixins: [i18nMixin('u-process-button')],
    props: {
        target: { type: String, default: '_self' },
        destination: String,
        link: [String, Function],
    },
    data() {
        return {
            model: {
                comment: '',
                userName: '',
            },
            currentItem: undefined,
            taskId: undefined,
            permissionDetails: [],
        };
    },
    created() {
        location.search.replace('?', '').split('&').forEach((item) => {
            const [key, value] = item.split('=');
            if (key === 'taskId') {
                this.taskId = value;
            }
        });
        if (this.taskId) {
            this.getTaskOperationPermissions();
        }
    },
    methods: {
        async getTaskOperationPermissions() {
            if (this.$processV2) {
                const res = await this.$processV2.getTaskOperationPermissions({
                    body: {
                        taskId: this.taskId,
                    },
                });
                this.permissionDetails = (res.data || []).filter((item) => item.operationEnabled);
            }
        },
        getColor(item) {
            if (['approve', 'submit'].includes(item.name)) {
                return 'primary';
            }
            return undefined;
        },
        close() {
            this.currentItem = undefined;
            this.$refs.modal.close();
        },
        async onSubmit() {
            const validateResult = await this.$refs.form.validate();
            if (validateResult.valid) {
                this.submit();
                this.$refs.modal.close();
            }
        },
        async submit(item) {
            if (!this.$processV2) {
                return;
            }
            const currentItem = item || this.currentItem;
            const { name } = currentItem;
            if (name === 'addSign') {
                this.addSignOperator(item);
                return;
            }
            const operate = `${name}Task`;
            const body = {
                taskId: this.taskId,
            };
            if (window.__processDetailFromMixinFormData__) {
                body.data = window.__processDetailFromMixinFormData__;
            }
            if (name === 'reassign') {
                body.userForReassign = this.model.userName;
            } else if(name !== 'submit') {
                body.comment = this.model.comment;
            }
            await this.$processV2.setTaskInstance({
                path: {
                    operate,
                },
                body,
            });
            this.refresh();
        },
        refresh() {
            if (this.destination || this.link) {
                this.$refs.link.$el.click();
            } else {
                window.location.reload();
            }
        },
        async onClickButton(item) {
            if (item.name === 'revert') {
                this.revertOperator(item);
                return;
            }
            if (item.name === 'withdraw') {
                this.withdrawOperator(item);
                return;
            }
            // 表单验证后打开弹窗
            if (window.__processDetailFromMixinFormVm__ && window.__processDetailFromMixinFormVm__.validate) {
                const validateResult = await window.__processDetailFromMixinFormVm__.validate();
                if (validateResult.valid) {
                    if (item.name === 'submit') {
                        return this.submit(item);
                    } else {
                        this.openModal(item);
                    }
                }
            } else {
                this.openModal(item);
            }
        },
        openModal(item) {
            this.currentItem = item;
            Object.assign(this.model, {
                comment: '',
                userName: '',
            });
        },
        /**
         * 回退
         */
        revertOperator(item) {
            return this.$confirm({
                title: item.displayText,
                content: this.$tt('revertContent',  { revertDisplayText: item.displayText }),
                okButton: this.$tt('revertOK'),
                cancelButton: this.$tt('revertCancel'),
            }).then(async () => {
                if (this.$processV2) {
                    await this.$processV2.revertTask({
                        body: {
                            taskId: this.taskId,
                        },
                    });
                    this.refresh();
                }
            }).catch(() => {
                // do nothing
                console.log('error');
            });
        },
        /**
         * 撤回
         */
        withdrawOperator(item) {
            return this.$confirm({
                title: item.displayText,
                content: this.$tt('withdrawContent', { withdrawDisplayText: item.displayText }),
                okButton: this.$tt('withdrawOK'),
                cancelButton: this.$tt('withdrawCancel'),
            }).then(async () => {
                if (this.$processV2) {
                    await this.$processV2.withdrawTask({
                        body: {
                            taskId: this.taskId,
                        },
                    });
                    this.refresh();
                }
            }).catch(() => {
                // do nothing
            });
        },
        /**
         * 加签
         */
        async addSignOperator(item) {
            if (this.$processV2) {
                await this.$processV2.addSignTask({
                    body: {
                        taskId: this.taskId,
                        userForAddSign: this.model.userName
                    },
                });
                this.refresh();
            }
        },
        getUsers(item) {
            return async () => {
                const map = {
                    reassign: 'getUsersForReassign',
                    addSign: 'getUsersForAddSign'
                };
                if (this.$processV2) {
                    const result = await this.$processV2[map[item.name]]({
                        body: {
                            taskId: this.taskId,
                        },
                    });
                    return result.data;
                }
            }
        },
    },
};
</script>

<style module src="./index.css"></style>
