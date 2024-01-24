<!-- 日期最小单位 -->
<template>
    <u-time-picker minUnit="minute" min-time="12:30" max-time="14:45" :time="time" @change="change($event.time)"></u-time-picker>
</template>
<script>
export default {
	data() {
		return {
			time: '13:12',
		};
	},
    methods: {
        change(time) {
            this.time = time;
            console.log(time);
        },
    },
};
</script>