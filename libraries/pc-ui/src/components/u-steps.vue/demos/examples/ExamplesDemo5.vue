<!-- 工具提示 -->

<template>
  <div><u-steps :value="1" :readonly="false">
    <u-step tooltip="使用属性添加工具提示"></u-step>
    <u-step>
        <div slot="tooltip">使用 Slot 添加工具提示</div>
    </u-step>
    <u-step>
        <div slot="tooltip">使用 Slot 添加工具提示</div>
    </u-step>
</u-steps></div>
</template>