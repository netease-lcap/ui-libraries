<!-- 分组 -->

<template>
  <div><u-grid-layout>
    <u-grid-layout-row>
        <u-grid-layout-column :span="4">
            <p>默认，无折叠功能</p>
            <u-list-view>
                <u-list-view-group title="洗具">
                    <u-list-view-item>毛巾</u-list-view-item>
                    <u-list-view-item>牙刷</u-list-view-item>
                </u-list-view-group>
                <u-list-view-group title="杯具">
                    <u-list-view-item>牙缸</u-list-view-item>
                    <u-list-view-item>水杯</u-list-view-item>
                </u-list-view-group>
                <u-list-view-group title="餐具">
                    <u-list-view-item>筷子</u-list-view-item>
                    <u-list-view-item>碗</u-list-view-item>
                </u-list-view-group>
            </u-list-view>
        </u-grid-layout-column>
        <u-grid-layout-column :span="4">
            <p>开启折叠功能</p>
            <u-list-view collapsible>
                <u-list-view-group title="洗具">
                    <u-list-view-item>毛巾</u-list-view-item>
                    <u-list-view-item>牙刷</u-list-view-item>
                </u-list-view-group>
                <u-list-view-group title="杯具" expanded disabled>
                    <u-list-view-item>牙缸</u-list-view-item>
                    <u-list-view-item>水杯</u-list-view-item>
                </u-list-view-group>
                <u-list-view-group title="餐具" :collapsible="false">
                    <u-list-view-item>筷子</u-list-view-item>
                    <u-list-view-item>碗</u-list-view-item>
                </u-list-view-group>
            </u-list-view>
        </u-grid-layout-column>
        <u-grid-layout-column :span="4">
            <p>手风琴模式</p>
            <u-list-view collapsible accordion value="cup">
                <u-list-view-group title="洗具">
                    <u-list-view-item value="towel">毛巾</u-list-view-item>
                    <u-list-view-item value="toothbrush">牙刷</u-list-view-item>
                </u-list-view-group>
                <u-list-view-group title="杯具">
                    <u-list-view-item value="toothcup">牙缸</u-list-view-item>
                    <u-list-view-item value="cup">水杯</u-list-view-item>
                </u-list-view-group>
                <u-list-view-group title="餐具">
                    <u-list-view-item value="chopsticks">筷子</u-list-view-item>
                    <u-list-view-item value="bowl">碗</u-list-view-item>
                </u-list-view-group>
            </u-list-view>
        </u-grid-layout-column>
    </u-grid-layout-row>
    <u-grid-layout-row>
        <u-grid-layout-column :span="4">
            <p>触发方式：整行点击均可触发（默认）</p>
            <u-list-view collapsible expand-trigger="click">
                <u-list-view-group title="洗具">
                    <u-list-view-item>毛巾</u-list-view-item>
                    <u-list-view-item>牙刷</u-list-view-item>
                </u-list-view-group>
                <u-list-view-group title="杯具">
                    <u-list-view-item>牙缸</u-list-view-item>
                    <u-list-view-item>水杯</u-list-view-item>
                </u-list-view-group>
            </u-list-view>
        </u-grid-layout-column>
        <u-grid-layout-column :span="4">
            <p>触发方式：仅点击小箭头时触发</p>
            <u-list-view collapsible expand-trigger="click-expander">
                <u-list-view-group title="洗具">
                    <u-list-view-item>毛巾</u-list-view-item>
                    <u-list-view-item>牙刷</u-list-view-item>
                </u-list-view-group>
                <u-list-view-group title="杯具">
                    <u-list-view-item>牙缸</u-list-view-item>
                    <u-list-view-item>水杯</u-list-view-item>
                </u-list-view-group>
            </u-list-view>
        </u-grid-layout-column>
    </u-grid-layout-row>
</u-grid-layout></div>
</template>