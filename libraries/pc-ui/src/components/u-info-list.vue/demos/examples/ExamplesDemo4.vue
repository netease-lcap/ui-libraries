<!-- 额外插槽 -->

<template>
  <div><u-info-list>
    <u-info-list-group title="基本信息">
        <template #extra>
            <u-link>设置</u-link>
        </template>
        <u-info-list-item label="VPC名称">defaultVPC</u-info-list-item>
        <u-info-list-item label="UUID">152f36a3cfff4572a3a35</u-info-list-item>
        <u-info-list-item label="网段">10.3.0.4/16</u-info-list-item>
        <u-info-list-item label="默认VPC">是</u-info-list-item>
        <u-info-list-item label="创建时间">2018-02-22</u-info-list-item>
    </u-info-list-group>
</u-info-list></div>
</template>