<template>
  <el-flex direction="vertical">
    <el-message-box-designer 
      type="confirm" 
      iconType="info" 
      title="提示" 
      :showCancelButton="true"
      :visible="true"
      :static="true">
      info确认内容
    </el-message-box-designer>

    <el-message-box-designer 
      type="alert" 
      iconType="warning" 
      title="提示" 
      :visible="true" 
      :static="true">
      warning提示内容
    </el-message-box-designer>

    <el-message-box-designer 
      type="alert" 
      iconType="success" 
      title="提示" 
      :visible="true" 
      :static="true">
      success提示内容
    </el-message-box-designer>

    <el-message-box-designer 
      type="alert" 
      iconType="error" 
      title="提示" 
      :visible="true" 
      :static="true">
      error提示内容
    </el-message-box-designer>
  </el-flex>
</template>
