<!-- 前端过滤 -->
<template>
<u-linear-layout>
    <u-select v-model="value" :data-source="load" filterable clearable placeholder="前端过滤" text-field="companyName" value-field="id"></u-select>
</u-linear-layout>
</template>
<script>
const mockRequest = (data, timeout = 300) => new Promise((res, rej) => setTimeout(() => res(data), timeout));

export default {
    data() {
        return {
            value: undefined,
            values: ['c', 'cpp'],
        };
    },
    methods: {
        async load() {
            return mockRequest({"content":[{"id":"1","companyName":"EMS","createdTime":"2020-12-09T20:02:22.912+08:00","updatedTime":"2020-12-09T20:02:22.912+08:00"},{"id":"2","companyName":"顺丰","createdTime":"2020-12-09T20:02:26.639+08:00","updatedTime":"2020-12-09T20:02:26.639+08:00"},{"id":"3","companyName":"京东","createdTime":"2020-12-09T20:02:30.981+08:00","updatedTime":"2020-12-09T20:02:30.981+08:00"},{"id":"4","companyName":"中通","createdTime":"2020-12-09T20:02:34.515+08:00","updatedTime":"2020-12-09T20:02:34.515+08:00"},{"id":"5","companyName":"圆通","createdTime":"2020-12-09T20:02:38.676+08:00","updatedTime":"2020-12-09T20:02:38.676+08:00"},{"id":"6","companyName":"百世","createdTime":"2020-12-09T20:02:43.112+08:00","updatedTime":"2020-12-09T20:02:43.112+08:00"}],"empty":false,"first":true,"last":true,"number":0,"numberOfElements":6,"size":50,"totalElements":6,"totalPages":null,"total":6,"data":[{"id":"1","companyName":"EMS","createdTime":"2020-12-09T20:02:22.912+08:00","updatedTime":"2020-12-09T20:02:22.912+08:00"},{"id":"2","companyName":"顺丰","createdTime":"2020-12-09T20:02:26.639+08:00","updatedTime":"2020-12-09T20:02:26.639+08:00"},{"id":"3","companyName":"京东","createdTime":"2020-12-09T20:02:30.981+08:00","updatedTime":"2020-12-09T20:02:30.981+08:00"},{"id":"4","companyName":"中通","createdTime":"2020-12-09T20:02:34.515+08:00","updatedTime":"2020-12-09T20:02:34.515+08:00"},{"id":"5","companyName":"圆通","createdTime":"2020-12-09T20:02:38.676+08:00","updatedTime":"2020-12-09T20:02:38.676+08:00"},{"id":"6","companyName":"百世","createdTime":"2020-12-09T20:02:43.112+08:00","updatedTime":"2020-12-09T20:02:43.112+08:00"}]});
        }
    }
};
</script>