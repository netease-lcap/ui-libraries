<!-- 列偏移 -->

<template>
  <div><u-grid-layout>
	<u-grid-layout-row :repeat="12">
		<u-grid-layout-column :span="4"><u-block>4/12</u-block></u-grid-layout-column>
		<u-grid-layout-column :span="4" :offset="4"><u-block>4/12 offset=4</u-block></u-grid-layout-column>
	</u-grid-layout-row>
	<u-grid-layout-row :repeat="12">
		<u-grid-layout-column :span="3" :offset="3"><u-block>3/12 offset=3</u-block></u-grid-layout-column>
		<u-grid-layout-column :span="3" :offset="3"><u-block>3/12 offset=3</u-block></u-grid-layout-column>
	</u-grid-layout-row>
</u-grid-layout></div>
</template>