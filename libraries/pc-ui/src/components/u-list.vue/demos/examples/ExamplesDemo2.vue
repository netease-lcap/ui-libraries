<!-- 列表前缀 -->

<template>
  <div><u-grid-layout>
    <u-grid-layout-row :repeat="3">
        <u-grid-layout-column>
            <u-list type="disc">
                <u-list-item>List Item 1</u-list-item>
                <u-list-item>List Item 2</u-list-item>
                <u-list-item>List Item 3</u-list-item>
                <u-list-item>List Item 4</u-list-item>
                <u-list-item>List Item 5</u-list-item>
            </u-list>
        </u-grid-layout-column>
        <u-grid-layout-column>
            <u-list type="circle">
                <u-list-item>List Item 1</u-list-item>
                <u-list-item>List Item 2</u-list-item>
                <u-list-item>List Item 3</u-list-item>
                <u-list-item>List Item 4</u-list-item>
                <u-list-item>List Item 5</u-list-item>
            </u-list>
        </u-grid-layout-column>
        <u-grid-layout-column>
            <u-list type="decimal">
                <u-list-item>List Item 1</u-list-item>
                <u-list-item>List Item 2</u-list-item>
                <u-list-item>List Item 3</u-list-item>
                <u-list-item>List Item 4</u-list-item>
                <u-list-item>List Item 5</u-list-item>
            </u-list>
        </u-grid-layout-column>
    </u-grid-layout-row>
</u-grid-layout></div>
</template>