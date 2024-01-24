<!-- 双向绑定 -->
<template>
<u-linear-layout>
    <u-select v-model="value" placeholder="v-model">
        <u-select-item v-for="item in list" :key="item.value" :value="item.value">{{ item.text }}</u-select-item>
    </u-select>
    <u-select :value.sync="value" :data="list" placeholder=":value.sync"></u-select>
</u-linear-layout>
</template>

<script>
export default {
    data() {
        return {
            value: '',
            list: [
                { text: 'Java', value: 'java' },
                { text: 'Python', value: 'python' },
                { text: 'Node.js', value: 'nodejs' },
                { text: 'Go', value: 'go' },
                { text: '.NET', value: '.net' },
                { text: 'PHP', value: 'php' },
            ],
        };
    },
};
</script>