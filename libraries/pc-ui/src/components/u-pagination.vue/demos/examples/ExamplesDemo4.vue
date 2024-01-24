<!-- 显示总条数 -->

<template>
  <div><u-linear-layout direction="vertical">
    <u-pagination :total-items="75" show-total></u-pagination>
    <u-pagination :total-items="75" show-total>
        <template slot="total" slot-scope="{ data }">
            {{ (data.page - 1)*data.pageSize + 1}}-{{ data.page*data.pageSize}}条，共{{data.totalItems}}条
        </template>
    </u-pagination>
</u-linear-layout></div>
</template>