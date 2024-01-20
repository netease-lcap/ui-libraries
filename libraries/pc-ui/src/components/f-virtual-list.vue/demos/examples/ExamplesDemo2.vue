<!-- 设置高度 -->
<template>
<f-virtual-list :class="$style.list" :list="list" :item-height="78">
    <div :class="$style.item" v-for="item in list" :key="item.id" :even="!!(item.id%2)">
        <div :class="$style.line" v-for="line in item.content" :key="line">{{ line }}</div>
    </div>
</f-virtual-list>
</template>
<script>
export default {
    data() {
        const list = [];
        for (let i = 0; i < 200000; i++) {
            const item = {
                content: [],
            };
            const lines = 3;
            for (let j = 0; j < lines; j++)
                item.content.push('Index ' + i + ' - Line ' + (j + 1));

            item.id = i;
            list.push(item);
        }

        return {
            list,
        };
    },
};
</script>
<style module>
.list {
    border: 1px solid var(--border-color-base);
    height: 400px;
}

.item[even] {
    background: var(--background-color-base);
}

.line {
    padding: 2px 12px;
}
</style>