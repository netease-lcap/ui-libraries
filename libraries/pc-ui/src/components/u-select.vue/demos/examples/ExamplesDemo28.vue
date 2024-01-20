<!-- 自定义可扩展下拉项 -->
<template>
  <u-select showRenderFooter>
    <u-select-item value="php">PHP</u-select-item>
    <template #renderFooter>
     <div style="padding: 6px 0; text-align: center;">
       <u-button>Click Me</u-button>
      </div>
    </template>
   </u-select>
</template>