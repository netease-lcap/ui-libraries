<!-- 文字居中 -->

<template>
  <div><u-linear-layout direction="vertical">
    <u-alert type="warning" title="警告提示" horizontal="center"></u-alert>
    <u-alert type="warning" title="警告提示" horizontal="center" style="height: 80px"></u-alert>
    <u-alert type="warning" title="警告提示" horizontal="center" closeable></u-alert>
    <u-alert type="error"  horizontal="center"><template #title>标题提示slot</template>这个是描述信息slot</u-alert>
    <u-alert type="error" closeable  horizontal="center"><template #title>标题提示slot</template>这个是描述信息slot</u-alert>
</u-linear-layout></div>
</template>