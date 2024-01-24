<!-- 周选择 -->
<template>
<u-date-picker min-date="2017-06-18T00:00:00.000Z" picker="week" time="morning" max-date="2024-5"  year-diff="1" year-add="5" :date.sync="date" @change="change" @select="select" @toggle="toggle($event)">Modal</u-date-picker>
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
        	console.log(event.opened);
        }
    },
    watch: {
        date(newValue) {
            console.log(newValue);
        },
    },
};
</script>