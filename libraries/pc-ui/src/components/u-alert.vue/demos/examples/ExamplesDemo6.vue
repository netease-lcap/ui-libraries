<!-- 文字居右 -->

<template>
  <div><u-linear-layout direction="vertical">
    <u-alert type="warning" title="警告提示" horizontal="right"></u-alert>
    <u-alert type="warning" title="警告提示" horizontal="right" closeable></u-alert>
    <u-alert type="error"  horizontal="right"><template #title>标题提示slot</template>这个是描述信息slot</u-alert>
    <u-alert type="error" closeable  horizontal="right"><template #title>标题提示slot</template>这个是描述信息slot</u-alert>
</u-linear-layout></div>
</template>