<template>
    <u-linear-layout mode="inline" :class="$style.root">
        <u-button v-for="item in permissionDetails" :key="item.name" :color="getColor(item)" @click="onClickButton(item)">
            {{ item.displayText }}
        </u-button>
        <u-modal v-if="currentItem"
            :class="$style.modalSize"
            :title="currentItem.displayText"
            :visible="!!currentItem"
            ref="modal"
            :hasMoreAddSignOption="hasMoreAddSignOption"
            @close="currentItem = undefined">
            <u-form label-layout="block" ref="form">
                <u-form-item :label="$tt('approvalComments')" :required="currentItem.commentRequired" :rules="currentItem.commentRequired?'required':''" v-if="!['reassign', 'addSign'].includes(currentItem.name)">
                    <u-textarea v-model="model.comment" size="normal full" :placeholder="$tt('placeholder')">
                    </u-textarea>
                </u-form-item>
                <u-form-item v-if="hasMoreAddSignOption" :label="$tt('signMethod')" required>
                    <div :class="$style.signOptionSection">
                        <div 
                            :class="$style.signOption" 
                            v-for="item in signOptions" 
                            :selected="model.method === item.value"
                            @click="model.method = item.value">
                            <u-radios v-model="model.method">
                                <u-radio :label="item.value"></u-radio>
                            </u-radios>
                            <div>
                                <div style="font-weight: 500;">{{ item.title }}</div>
                                <div>{{ item.description }}</div>
                            </div>
                        </div>
                    </div>
                </u-form-item>      
                <u-form-item :label="$tt(hasMoreAddSignOption ? 'signPerson' : 'selectTransfer')" required :rules="`required #${$tt('selectTransferEmpty')}`" v-if="['reassign', 'addSign'].includes(currentItem.name)">
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
        colors: Object,
    },
    data() {
        return {
            model: {
                comment: '',
                userName: '',
                method: 'CurrentNode',
            },
            currentItem: undefined,
            taskId: undefined,
            permissionDetails: [],
            signOptions: [],
        };
    },
    computed: {
        hasMoreAddSignOption() { 
            return this.currentItem?.name === 'addSign' && !!this.signOptions.length;
        },
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
                if (this.permissionDetails.some((item) => item?.name === 'addSign')) { // 加签
                    this.getSignOptions(); 
                }
            }
        },
        getColor(item) {
            return this.colors && this.colors[item.name];
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
                this.addSignOperator(currentItem);
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
            const res = await this.$processV2.setTaskInstance({
                path: {
                    operate,
                },
                body,
            });
            if(res?.code === "200") {
                const eventName = `on${name.replace(/^./, (m) => m.toUpperCase())}`
                this.$emit(name);
            }
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
                method: 'CurrentNode',
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
                    const res = await this.$processV2.revertTask({
                        body: {
                            taskId: this.taskId,
                        },
                    });
                    if(res?.code === "200") {
                        const eventName = `on${item.name.replace(/^./, (m) => m.toUpperCase())}`
                        this.$emit(item.name);
                    }
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
                    const res = await this.$processV2.withdrawTask({
                        body: {
                            taskId: this.taskId,
                        },
                    });
                    if(res?.code === "200") {
                        const eventName = `on${item.name.replace(/^./, (m) => m.toUpperCase())}`
                        this.$emit(item.name);
                    }
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
                const body = {
                    taskId: this.taskId,
                    userForAddSign: this.model.userName,
                };
                if (this.hasMoreAddSignOption) body.policyForAddSign = this.model.method;
                const res = await this.$processV2.addSignTask({ body });
                if(res?.code === "200") {
                    const eventName = `on${item.name.replace(/^./, (m) => m.toUpperCase())}`
                    this.$emit(item.name);
                }
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
        async getSignOptions() {
            const res = await this.$processV2.getTaskInfo({
                body: {
                    taskId: this.taskId,
                },
                config: {
                    noErrorTip: true,
                },
            });
            if (!!res?.data) {
                const approvalPolicy = res?.data?.approvalPolicy;
                // 或签、会签、依次审批
                if (['simple', 'parallel', 'sequence'].includes(approvalPolicy)) {
                    const options = approvalPolicy === 'simple'
                        // ? ['CurrentNode', 'PreviousNode', 'NextNode'] // 后端暂时不支持NextNode，先屏蔽
                        ? ['CurrentNode', 'PreviousNode']
                        : ['CurrentNode'];
                    this.signOptions = options.map(item => ({
                        title: this.$tt(`${item}SignTitle`),
                        description: this.$tt(`${item}SignDesc`),
                        value: item,
                    }));
                }
            }
        },
    },
};
</script>

<style module src="./index.css"></style>
