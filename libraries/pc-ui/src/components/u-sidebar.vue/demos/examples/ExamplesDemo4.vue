<!-- 手风琴模式 -->

<template>
  <div><u-sidebar style="--sidebar-group-head-padding-left: 46px; --sidebar-item-padding-left:46px;"  collapsible enableCollapse accordion>
    <u-sidebar-group icon="calendar" title="导航一">
        <u-sidebar-item text="选项一"></u-sidebar-item>
        <u-sidebar-group icon="calendar" title="导航一">
            <u-sidebar-item text="选项一"></u-sidebar-item>
        </u-sidebar-group>
        <u-sidebar-group icon="calendar" title="导航二">
            <u-sidebar-item text="选项一"></u-sidebar-item>
        </u-sidebar-group>
        <u-sidebar-group icon="calendar" title="导航三">
            <u-sidebar-item text="选项一"></u-sidebar-item>
        </u-sidebar-group>
        <u-sidebar-item icon="calendar" value="1" text="导航一"></u-sidebar-item>
    </u-sidebar-group>
    <u-sidebar-group icon="calendar" title="导航二">
        <u-sidebar-item text="选项一"></u-sidebar-item>
    </u-sidebar-group>
    <u-sidebar-group icon="calendar" title="导航三">
        <u-sidebar-item text="选项一"></u-sidebar-item>
    </u-sidebar-group>
    <u-sidebar-group  icon="calendar" title="导航三">
        <i-ico
            name="calendar"
            slot="title"
            notext
        ></i-ico>
        <u-text text="选项二" slot="title"></u-text>
        <u-sidebar-item text="选项一"></u-sidebar-item>
    </u-sidebar-group>
    <u-sidebar-item icon="calendar" value="1" text="导航一"></u-sidebar-item>
    <u-sidebar-item  icon="calendar" value="2" >
      <i-ico
          name="calendar"
          notext
      ></i-ico>
      <u-text text="选项二"></u-text>
    </u-sidebar-item>
</u-sidebar></div>
</template>
