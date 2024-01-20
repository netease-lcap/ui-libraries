<!-- 水平分布方式 -->

<template>
  <div><u-grid-layout>
	<u-grid-layout-row :repeat="6" justify="start">
		<u-grid-layout-column :span="1"><u-block>start</u-block></u-grid-layout-column>
		<u-grid-layout-column :span="1"><u-block>start</u-block></u-grid-layout-column>
		<u-grid-layout-column :span="1"><u-block>start</u-block></u-grid-layout-column>
	</u-grid-layout-row>
	<u-grid-layout-row :repeat="6" justify="center">
		<u-grid-layout-column :span="1"><u-block>center</u-block></u-grid-layout-column>
		<u-grid-layout-column :span="1"><u-block>center</u-block></u-grid-layout-column>
		<u-grid-layout-column :span="1"><u-block>center</u-block></u-grid-layout-column>
	</u-grid-layout-row>
	<u-grid-layout-row :repeat="6" justify="end">
		<u-grid-layout-column :span="1"><u-block>end</u-block></u-grid-layout-column>
		<u-grid-layout-column :span="1"><u-block>end</u-block></u-grid-layout-column>
		<u-grid-layout-column :span="1"><u-block>end</u-block></u-grid-layout-column>
	</u-grid-layout-row>
	<u-grid-layout-row :repeat="6" justify="space-between">
		<u-grid-layout-column :span="1"><u-block>space-between</u-block></u-grid-layout-column>
		<u-grid-layout-column :span="1"><u-block>space-between</u-block></u-grid-layout-column>
		<u-grid-layout-column :span="1"><u-block>space-between</u-block></u-grid-layout-column>
	</u-grid-layout-row>
	<u-grid-layout-row :repeat="6" justify="space-around">
		<u-grid-layout-column :span="1"><u-block>space-around</u-block></u-grid-layout-column>
		<u-grid-layout-column :span="1"><u-block>space-around</u-block></u-grid-layout-column>
		<u-grid-layout-column :span="1"><u-block>space-around</u-block></u-grid-layout-column>
	</u-grid-layout-row>
</u-grid-layout></div>
</template>