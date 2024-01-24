<!-- 标签块级布局 -->

<template>
  <div><u-linear-layout direction="vertical">
    <u-panel title="结合默认布局">
        <u-form label-layout="block">
            <u-form-item label="计费方式" required>
                <u-radios value="0">
                    <u-radio label="0">包年包月</u-radio>
                    <u-radio label="1">按量付费</u-radio>
                </u-radios>
            </u-form-item>
            <u-form-item label="实例名称" required description="高性能 SSD 云盘不支持快照功能">
                <u-input size="huge" maxlength="63" placeholder="由1-63个小写字母，数字，中划线组成，以字母开头，字母或数字结尾"></u-input>
            </u-form-item>
            <u-form-item>
                <u-button color="primary">查询</u-button>
            </u-form-item>
        </u-form>
    </u-panel>
    <u-panel title="结合栅格布局">
        <u-form repeat="3" label-layout="block">
            <u-form-item label="状态">
                <u-select auto-select>
                    <u-select-item>认证中</u-select-item>
                </u-select>
            </u-form-item>
            <u-form-item label="备案类型">
                <u-select auto-select>
                    <u-select-item>全部</u-select-item>
                </u-select>
            </u-form-item>
            <u-form-item label="备案号">
                <u-input maxlength="63"></u-input>
            </u-form-item>
            <u-form-item label="用户名">
                <u-input maxlength="63"></u-input>
            </u-form-item>
            <u-form-item label="单位名称">
                <u-input maxlength="63"></u-input>
            </u-form-item>
            <u-form-item span="3">
                <u-button color="primary">查询</u-button>
            </u-form-item>
        </u-form>
    </u-panel>
</u-linear-layout></div>
</template>