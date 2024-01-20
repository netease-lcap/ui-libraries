<!-- 分组 -->

<template>
  <div><u-grid-layout>
    <u-grid-layout-row>
        <u-grid-layout-column :span="4">
            <p>默认，无折叠功能</p>
            <u-grid-view>
                <u-grid-view-group title="洗具">
                    <u-grid-view-item>毛巾</u-grid-view-item>
                    <u-grid-view-item>牙刷</u-grid-view-item>
                </u-grid-view-group>
                <u-grid-view-group title="杯具">
                    <u-grid-view-item>牙缸</u-grid-view-item>
                    <u-grid-view-item>水杯</u-grid-view-item>
                </u-grid-view-group>
                <u-grid-view-group title="餐具">
                    <u-grid-view-item>筷子</u-grid-view-item>
                    <u-grid-view-item>碗</u-grid-view-item>
                </u-grid-view-group>
            </u-grid-view>
        </u-grid-layout-column>
        <u-grid-layout-column :span="4">
            <p>开启折叠功能</p>
            <u-grid-view collapsible>
                <u-grid-view-group title="洗具">
                    <u-grid-view-item>毛巾</u-grid-view-item>
                    <u-grid-view-item>牙刷</u-grid-view-item>
                </u-grid-view-group>
                <u-grid-view-group title="杯具" expanded disabled>
                    <u-grid-view-item>牙缸</u-grid-view-item>
                    <u-grid-view-item>水杯</u-grid-view-item>
                </u-grid-view-group>
                <u-grid-view-group title="餐具" :collapsible="false">
                    <u-grid-view-item>筷子</u-grid-view-item>
                    <u-grid-view-item>碗</u-grid-view-item>
                </u-grid-view-group>
            </u-grid-view>
        </u-grid-layout-column>
        <u-grid-layout-column :span="4">
            <p>手风琴模式</p>
            <u-grid-view collapsible accordion value="cup">
                <u-grid-view-group title="洗具">
                    <u-grid-view-item value="towel">毛巾</u-grid-view-item>
                    <u-grid-view-item value="toothbrush">牙刷</u-grid-view-item>
                </u-grid-view-group>
                <u-grid-view-group title="杯具">
                    <u-grid-view-item value="toothcup">牙缸</u-grid-view-item>
                    <u-grid-view-item value="cup">水杯</u-grid-view-item>
                </u-grid-view-group>
                <u-grid-view-group title="餐具">
                    <u-grid-view-item value="chopsticks">筷子</u-grid-view-item>
                    <u-grid-view-item value="bowl">碗</u-grid-view-item>
                </u-grid-view-group>
            </u-grid-view>
        </u-grid-layout-column>
    </u-grid-layout-row>
    <u-grid-layout-row>
        <u-grid-layout-column :span="4">
            <p>触发方式：整行点击均可触发（默认）</p>
            <u-grid-view collapsible expand-trigger="click">
                <u-grid-view-group title="洗具">
                    <u-grid-view-item>毛巾</u-grid-view-item>
                    <u-grid-view-item>牙刷</u-grid-view-item>
                </u-grid-view-group>
                <u-grid-view-group title="杯具">
                    <u-grid-view-item>牙缸</u-grid-view-item>
                    <u-grid-view-item>水杯</u-grid-view-item>
                </u-grid-view-group>
            </u-grid-view>
        </u-grid-layout-column>
        <u-grid-layout-column :span="4">
            <p>触发方式：仅点击小箭头时触发</p>
            <u-grid-view collapsible expand-trigger="click-expander">
                <u-grid-view-group title="洗具">
                    <u-grid-view-item>毛巾</u-grid-view-item>
                    <u-grid-view-item>牙刷</u-grid-view-item>
                </u-grid-view-group>
                <u-grid-view-group title="杯具">
                    <u-grid-view-item>牙缸</u-grid-view-item>
                    <u-grid-view-item>水杯</u-grid-view-item>
                </u-grid-view-group>
            </u-grid-view>
        </u-grid-layout-column>
    </u-grid-layout-row>
</u-grid-layout></div>
</template>