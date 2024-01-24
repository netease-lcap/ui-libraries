<!-- append-to body -->

<template>
  <div><u-dropdown append-to="body">
    <template #title="scope">
        <u-text text="下拉菜单"></u-text>
    </template>
    <u-dropdown-item icon="task" text="item"></u-dropdown-item>
    <u-dropdown-item icon="task" text="item"></u-dropdown-item>
    <u-dropdown-item icon="task" text="item"></u-dropdown-item>
    <u-dropdown-item icon="task" disabled text="item"></u-dropdown-item>
</u-dropdown></div>
</template>