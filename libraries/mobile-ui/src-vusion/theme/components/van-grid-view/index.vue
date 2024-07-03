<template>
<van-grid-view :col="0" :col-width="150" :filterable="true" pageable="load-more" :data-source="[1,2,3,4,5]">
    <template #item="scope">
<van-cardu>
            <template #head>
                <van-text :text="'动态'+scope.item"></van-text>
            </template>
            <van-text text="卡片内容"></van-text>
        </van-cardu>
</template>
</van-grid-view>
</template>
