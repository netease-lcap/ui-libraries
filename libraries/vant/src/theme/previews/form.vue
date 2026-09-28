<template>
  <div class="form-page">
    <!-- 顶部导航栏 -->
    <van-nav-bar
      title="表单页"
      left-arrow
      @click-left="onClickLeft"
      class="form-header"
    >
      <template #right>
        <van-icon name="ellipsis" @click="onClickMore" />
      </template>
    </van-nav-bar>

    <!-- 表单内容 -->
    <div class="form-content">
      <!-- 基本信息卡片 -->
      <van-cell-group inset>
        <van-field
          v-model="formData.visitorName"
          label="访客姓名"
          placeholder="请输入"
        />
        <van-field
          v-model="formData.purpose"
          label="来访目的"
          placeholder="请选择"
          readonly
          is-link
          @click="showPurposePicker = true"
        />
        <van-field
          v-model="formData.appointmentTime"
          label="约见时间"
          placeholder="请选择时间"
          readonly
          is-link
          @click="showTimePicker = true"
        />
        <van-field
          v-model="formData.endTime"
          label="结束时间"
          placeholder="请选择时间"
          readonly
          is-link
          @click="showEndTimePicker = true"
        />
        <van-field
          v-model="formData.phone"
          label="联系电话"
          placeholder="请输入"
          type="tel"
        />
      </van-cell-group>

      <!-- 来访理由卡片 -->
      <van-cell-group inset>
        <van-field
          v-model="formData.reason"
          label="来访理由"
          type="textarea"
          placeholder="请输入来访理由"
          rows="4"
          maxlength="150"
          show-word-limit
          :border="false"
          class="reason-field"
        />
      </van-cell-group>

      <!-- 上传附件卡片 -->
      <van-cell-group inset>
        <div class="upload-section">
          <div class="upload-label">上传附件</div>
          <van-uploader
            v-model="formData.attachments"
            :max-count="9"
            :after-read="afterRead"
            class="upload-area"
          >
            <div class="upload-placeholder">
              <van-icon name="photograph" size="24" />
              <div class="upload-text">点击上传</div>
            </div>
          </van-uploader>
        </div>
      </van-cell-group>

      <!-- 审批人卡片 -->
      <van-cell-group inset>
        <van-field
          v-model="formData.approver"
          label="审批人"
          placeholder="请选择"
          readonly
          is-link
          @click="showApproverPicker = true"
          :border="false"
        />
      </van-cell-group>
    </div>

    <!-- 提交按钮 -->
    <div class="submit-section">
      <van-button
        type="primary"
        size="large"
        block
        @click="onSubmit"
        round
        :loading="submitting"
      >
        提交
      </van-button>
    </div>

    <!-- 选择器弹窗 -->
    <van-popup v-model:show="showPurposePicker" position="bottom">
      <van-picker
        :columns="purposeOptions"
        @confirm="onPurposeConfirm"
        @cancel="showPurposePicker = false"
        title="选择来访目的"
      />
    </van-popup>

    <van-popup v-model:show="showTimePicker" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        @confirm="onTimeConfirm"
        @cancel="showTimePicker = false"
        title="选择约见时间"
      />
    </van-popup>

    <van-popup v-model:show="showEndTimePicker" position="bottom">
      <van-datetime-picker
        v-model="currentEndDate"
        type="datetime"
        @confirm="onEndTimeConfirm"
        @cancel="showEndTimePicker = false"
        title="选择结束时间"
      />
    </van-popup>

    <van-popup v-model:show="showApproverPicker" position="bottom">
      <van-picker
        :columns="approverOptions"
        @confirm="onApproverConfirm"
        @cancel="showApproverPicker = false"
        title="选择审批人"
      />
    </van-popup>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { showToast } from 'vant'

// 表单数据
const formData = reactive({
  visitorName: '',
  purpose: '',
  appointmentTime: '',
  endTime: '',
  phone: '',
  reason: '',
  attachments: [],
  approver: ''
})

// 弹窗控制
const showPurposePicker = ref(false)
const showTimePicker = ref(false)
const showEndTimePicker = ref(false)
const showApproverPicker = ref(false)

// 当前选择的时间
const currentDate = ref(new Date())
const currentEndDate = ref(new Date())

// 提交状态
const submitting = ref(false)

// 选项数据
const purposeOptions = ['商谈', '面试', '参观', '培训', '其他']
const approverOptions = ['张三', '李四', '王五', '赵六']

// 事件处理
const onClickLeft = () => {
  showToast('返回')
}

const onClickMore = () => {
  showToast('更多选项')
}

const onPurposeConfirm = (value) => {
  formData.purpose = value
  showPurposePicker.value = false
}

const onTimeConfirm = (value) => {
  formData.appointmentTime = formatDateTime(value)
  showTimePicker.value = false
}

const onEndTimeConfirm = (value) => {
  formData.endTime = formatDateTime(value)
  showEndTimePicker.value = false
}

const onApproverConfirm = (value) => {
  formData.approver = value
  showApproverPicker.value = false
}

const afterRead = (file) => {
  showToast('上传成功')
}

const onSubmit = () => {
  if (!formData.visitorName) {
    showToast('请输入访客姓名')
    return
  }
  if (!formData.purpose) {
    showToast('请选择来访目的')
    return
  }
  if (!formData.appointmentTime) {
    showToast('请选择约见时间')
    return
  }
  if (!formData.phone) {
    showToast('请输入联系电话')
    return
  }

  submitting.value = true
  setTimeout(() => {
    submitting.value = false
    showToast('提交成功')
  }, 1500)
}

const formatDateTime = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}:00`
}
</script>

<style scoped>
.form-page {
  min-height: 100vh;
  background-color: var(--van-background);
  padding-bottom: 80px;
}

.form-header {
  background-color: var(--van-background-2);
  color: var(--van-text-color);
}

.form-content {
  padding: var(--van-padding-md) 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  gap: var(--van-padding-sm);
}

.reason-field {
  padding: var(--van-padding-md);
}

.upload-section {
  padding: var(--van-padding-md);
  width: 100%;
}

.upload-area {
  width: 100%;
  display: block;
}

.upload-label {
  font-size: var(--van-font-size-md);
  color: var(--van-text-color);
  margin-bottom: var(--van-padding-sm);
}


.upload-placeholder {
  width: 120px;
  height: 120px;
  background-color: var(--van-background-2);
  border: 2px dashed var(--van-border-color);
  border-radius: var(--van-radius-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--van-text-color-3);
  box-sizing: border-box;
  min-width: 0;
  flex-shrink: 0;
}

.upload-text {
  margin-top: var(--van-padding-xs);
  font-size: var(--van-font-size-sm);
}

.submit-section {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: var(--van-padding-md);
  background-color: var(--van-background-2);
  border-top: 1px solid var(--van-border-color);
}

</style>
