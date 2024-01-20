<!-- 基本用法 -->

<template>
  <div><u-grid-layout>
	<u-grid-layout-row :repeat="6">
		<u-grid-layout-column :span="1"><u-block>1/6</u-block></u-grid-layout-column>
		<u-grid-layout-column :span="1"><u-block>1/6</u-block></u-grid-layout-column>
		<u-grid-layout-column :span="1"><u-block>1/6</u-block></u-grid-layout-column>
		<u-grid-layout-column :span="1"><u-block>1/6</u-block></u-grid-layout-column>
		<u-grid-layout-column :span="1"><u-block>1/6</u-block></u-grid-layout-column>
		<u-grid-layout-column :span="1"><u-block>1/6</u-block></u-grid-layout-column>
	</u-grid-layout-row>
	<u-grid-layout-row :repeat="24">
		<u-grid-layout-column :span="2"><u-block>2/24</u-block></u-grid-layout-column>
		<u-grid-layout-column :span="4"><u-block>4/24</u-block></u-grid-layout-column>
		<u-grid-layout-column :span="8"><u-block>8/24</u-block></u-grid-layout-column>
		<u-grid-layout-column :span="10"><u-block>10/24</u-block></u-grid-layout-column>
	</u-grid-layout-row>
	<u-grid-layout-row :repeat="3">
		<u-grid-layout-column :span="1"><u-block>1/3</u-block></u-grid-layout-column>
		<u-grid-layout-column :span="2"><u-block>2/3</u-block></u-grid-layout-column>
	</u-grid-layout-row>
</u-grid-layout></div>
</template>