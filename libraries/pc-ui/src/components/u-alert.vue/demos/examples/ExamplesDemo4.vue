<!-- 页面顶部通告形式 -->

<template>
  <div><u-linear-layout direction="vertical">
    <u-alert :bordered="false" type="info" title="信息提示" :show-icon="false"></u-alert>
    <u-alert :bordered="false" type="success" title="成功提示"></u-alert>
    <u-alert :bordered="false" type="warning" title="警告提示" horizontal="center"></u-alert>
    <u-alert :bordered="false" type="error" closeable><template #title>标题提示slot</template>描述信息slot</u-alert>
</u-linear-layout></div>
</template>