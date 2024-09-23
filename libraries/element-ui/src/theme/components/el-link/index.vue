<template>
  <div>
    <el-text size="small">鼠标悬停状态有下划线</el-text>
    <el-flex style="margin: 10px 0 20px 0">
      <el-link href="https://element.eleme.io" target="_blank">默认链接</el-link>
      <el-link type="primary">主要链接</el-link>
      <el-link type="success">成功链接</el-link>
      <el-link type="warning">警告链接</el-link>
      <el-link type="danger">危险链接</el-link>
      <el-link type="info">信息链接</el-link>
    </el-flex>

    <el-text size="small">鼠标悬停状态无下划线</el-text>
    <el-flex style="margin: 10px 0 20px 0">
      <el-link href="https://element.eleme.io" target="_blank" :underline="false">默认链接</el-link>
      <el-link type="primary" :underline="false">主要链接</el-link>
      <el-link type="success" :underline="false">成功链接</el-link>
      <el-link type="warning" :underline="false">警告链接</el-link>
      <el-link type="danger" :underline="false">危险链接</el-link>
      <el-link type="info" :underline="false">信息链接</el-link>
    </el-flex>

    <el-text size="small">禁用状态</el-text>
    <el-flex style="margin-bottom: 10px">
      <el-link disabled>默认链接</el-link>
      <el-link type="primary" disabled>主要链接</el-link>
      <el-link type="success" disabled>成功链接</el-link>
      <el-link type="warning" disabled>警告链接</el-link>
      <el-link type="danger" disabled>危险链接</el-link>
      <el-link type="info" disabled>信息链接</el-link>
    </el-flex>
    <Example2 />
  </div>
</template>