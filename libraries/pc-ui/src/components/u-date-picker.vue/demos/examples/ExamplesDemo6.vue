<!-- 方法 -->
<template>
<u-date-picker min-date="2021-06-18T00:00:00.000Z" time="morning" year-diff="1" max-date="2025" year-add="5" :date.sync="date" @change="change" @select="select" @toggle="toggle($event)">Modal</u-date-picker>
</template>

<script>
export default {
	data(){
		return {
			date: '2018-08-01',
		}
	},
    methods: {
        change(newVal) {
            console.log(newVal);
        },
        select(newVal) {
        	console.log(newVal);
        },
        toggle(event) {
        	console.log(event.open);
        }
    },
    watch: {
        date(newValue) {
            console.log(newValue);
        },
    },
};
</script>