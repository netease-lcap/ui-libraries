<template>
  <el-flex direction="vertical">
    <el-message-designer :visible="true" :showClose="true" :static="true">这是一条消息提示</el-message-designer>
    <el-message-designer :visible="true" icon="ri-arrow-up-circle-fill" type="success" :showClose="true" :static="true">恭喜你，这是一条成功消息</el-message-designer>
    <el-message-designer :visible="true" type="warning" :showClose="true" :static="true">警告哦，这是一条警告消息</el-message-designer>
    <el-message-designer :visible="true" type="error" :showClose="true" :static="true">这是一条消息提示</el-message-designer>
  </el-flex>
</template>
