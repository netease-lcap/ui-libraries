<template>
  <el-flex  direction="vertical">
    <el-notification-designer 
      :visible="true" 
      :static="true" 
      title="提示" 
      type="info" 
      :showClose="true">
      这是一条消息提示
    </el-notification-designer>

    <el-notification-designer 
      :visible="true" 
      :static="true" 
      title="提示" 
      icon="ri-arrow-up-circle-fill" 
      type="success" 
      :showClose="true">
      恭喜你，这是一条成功消息
    </el-notification-designer>

    <el-notification-designer 
      :visible="true" 
      :static="true" 
      title="提示"  
      type="warning" 
      :showClose="true">
      警告哦，这是一条警告消息
    </el-notification-designer>

    <el-notification-designer 
      :visible="true" 
      :static="true" 
      title="提示" 
      type="error" 
      :showClose="true">
      注意哦，这是一条错误消息
    </el-notification-designer>
  </el-flex>
</template>
