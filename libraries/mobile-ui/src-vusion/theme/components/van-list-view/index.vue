<template>
<van-list-view :filterable="true" pageable="load-more" :data-source="[1,2,3,4,5]">
    <template #item="scope"><van-text :text="'动态'+scope.item"></van-text>
</template>
</van-list-view>
</template>
