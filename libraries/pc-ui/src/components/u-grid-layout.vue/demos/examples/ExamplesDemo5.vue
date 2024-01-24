<!-- 列排序 -->

<template>
  <div><u-grid-layout>
	<u-grid-layout-row :repeat="10">
		<u-grid-layout-column :span="4" :push="6"><u-block>4/10 push=6</u-block></u-grid-layout-column>
		<u-grid-layout-column :span="6" :pull="4"><u-block>6/10 pull=4</u-block></u-grid-layout-column>
	</u-grid-layout-row>
	<u-grid-layout-row :repeat="10">
		<u-grid-layout-column :span="2" :push="8"><u-block>2/10 push=8</u-block></u-grid-layout-column>
		<u-grid-layout-column :span="3" :push="3"><u-block>3/10 push=5</u-block></u-grid-layout-column>
		<u-grid-layout-column :span="5" :pull="5"><u-block>5/10 push=5</u-block></u-grid-layout-column>
	</u-grid-layout-row>
</u-grid-layout></div>
</template>