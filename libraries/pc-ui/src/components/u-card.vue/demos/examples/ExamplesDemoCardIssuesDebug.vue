<!-- u-card：嵌套分割线 / 头部内边距与分割线 / 定高内线性布局 三项回归 -->

<template>
    <div :class="$style.page">
        <h2 :class="$style.h2">u-card 三项问题调试（Storybook）</h2>

        <section :class="$style.section">
            <h3 :class="$style.h3">问题一：嵌套卡片 — 分割线应各自独立</h3>
            <p :class="$style.note">
                预期：外层只控制「外层头部的线」；仅当勾选「外层 split」时出现；内层的线只跟「内层 split」。
            </p>
            <div :class="$style.toolbar">
                <label><input v-model="outerSplit1" type="checkbox" /> 外层 split</label>
                <label><input v-model="innerSplit1" type="checkbox" /> 内层 split</label>
            </div>
            <u-card title="外层卡片" :split="outerSplit1" :class="$style.narrowCard">
                <template #default>
                    <u-card title="内层卡片（应不受外层分割线误伤）" :split="innerSplit1">
                        <div :class="$style.fillMuted">默认槽内容（内）</div>
                    </u-card>
                </template>
            </u-card>
        </section>

        <section :class="$style.section">
            <h3 :class="$style.h3">问题二：头部内边距与分割线分离</h3>
            <p :class="$style.note">
                已通过 CSS 变量放大头部纵向内边距。预期：开/关「分割线」时，头部四周留白观感一致可见；不应只剩「关掉分割线才有内边距」。
            </p>
            <div :class="$style.toolbar">
                <label><input v-model="split2" type="checkbox" /> 分割线</label>
            </div>
            <div :style="{ '--card-head-padding-y': '28px', '--card-head-padding-x': '20px' }">
                <u-card title="头部内边距主题值较大" content="正文区域" :split="split2" />
            </div>
        </section>

        <section :class="$style.section">
            <h3 :class="$style.h3">问题三：卡片定高 — 内线性布局高度 100%</h3>
            <p :class="$style.note">
                外层卡片 height:280px；内层 u-linear-layout 使用 mode=flex / type=root（与项目约定一致）。预期：下层灰底铺满卡片主体剩余高度。
            </p>
            <u-card title="外层定高卡片" shadow="never" border :class="$style.tallCard">
                <template #default>
                    <u-linear-layout
                        mode="flex"
                        type="root"
                        direction="vertical"
                        :class="$style.layoutFill"
                        layout="block"
                    >
                        <div :class="$style.layoutBar">上边一条（占位）</div>
                        <div height-stretch="true" :class="$style.layoutStretch">
                            下方区域应铺满剩余高度（背景区别）
                        </div>
                    </u-linear-layout>
                </template>
            </u-card>
        </section>
    </div>
</template>

<script>
export default {
    name: 'ExamplesDemoCardIssuesDebug',
    data() {
        return {
            outerSplit1: false,
            innerSplit1: false,
            split2: false,
        };
    },
};
</script>

<style module>
.page {
    max-width: 720px;
    font-size: 14px;
    line-height: 1.5;
}

.h2 {
    margin: 0 0 16px;
    font-size: 18px;
}

.h3 {
    margin: 0 0 8px;
    font-size: 15px;
}

.section + .section {
    margin-top: 28px;
    padding-top: 20px;
    border-top: 1px dashed #ccc;
}

.note {
    margin: 0 0 12px;
    color: #666;
}

.toolbar {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    align-items: center;
    margin-bottom: 12px;
}

.toolbar label {
    display: inline-flex;
    gap: 6px;
    align-items: center;
    cursor: pointer;
    user-select: none;
}

.narrowCard {
    width: 100%;
}

.tallCard {
    width: 100%;
    height: 280px;
}

.fillMuted {
    padding: 8px;
    background: #fafafa;
    border-radius: 4px;
}

.layoutFill {
    min-height: 0;
}

.layoutBar {
    flex: none;
    padding: 8px;
    background: #e8f4ff;
}

.layoutStretch {
    padding: 8px;
    background: #f0f0f0;
    border-radius: 4px;
}
</style>
