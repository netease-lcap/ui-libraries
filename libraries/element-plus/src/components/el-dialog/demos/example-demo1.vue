<template>
  <div>
    <el-button plain @click="handleOpen">
      Click to open the Dialog1
    </el-button>

    <el-dialog
      ref="dialogRef"
      title="Tips"
      
      width="500"
    >
      <span>This is a message</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue'
import { ElMessageBox } from 'element-plus'

const dialogVisible = ref(false)
const dialogRef = ref(null)
console.log(dialogRef,'dialogRef');

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}

const handleOpen = () => {
  console.log(dialogRef.value.open());
}
</script>
