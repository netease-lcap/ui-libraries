<!-- 垂直对齐方式 -->

<template>
  <div><u-grid-layout gap="large small">
	<u-grid-layout-row :repeat="6" alignment="start">
		<u-grid-layout-column :span="1"><u-block>start</u-block></u-grid-layout-column>
		<u-grid-layout-column :span="1"><u-block size="normal auto">start</u-block></u-grid-layout-column>
		<u-grid-layout-column :span="1"><u-block size="large auto">start</u-block></u-grid-layout-column>
	</u-grid-layout-row>
	<u-grid-layout-row :repeat="6" alignment="center">
		<u-grid-layout-column :span="1"><u-block>center</u-block></u-grid-layout-column>
		<u-grid-layout-column :span="1"><u-block size="normal auto">center</u-block></u-grid-layout-column>
		<u-grid-layout-column :span="1"><u-block size="large auto">center</u-block></u-grid-layout-column>
	</u-grid-layout-row>
	<u-grid-layout-row :repeat="6" alignment="end">
		<u-grid-layout-column :span="1"><u-block>end</u-block></u-grid-layout-column>
		<u-grid-layout-column :span="1"><u-block size="normal auto">end</u-block></u-grid-layout-column>
		<u-grid-layout-column :span="1"><u-block size="large auto">end</u-block></u-grid-layout-column>
	</u-grid-layout-row>
	<u-grid-layout-row :repeat="6" alignment="baseline">
		<u-grid-layout-column :span="1"><u-block>baseline</u-block></u-grid-layout-column>
		<u-grid-layout-column :span="1"><u-block size="normal auto">baseline</u-block></u-grid-layout-column>
		<u-grid-layout-column :span="1"><u-block size="large auto">baseline</u-block></u-grid-layout-column>
	</u-grid-layout-row>
	<u-grid-layout-row :repeat="6" alignment="stretch">
		<u-grid-layout-column :span="1"><u-block style="height: 100%">stretch</u-block></u-grid-layout-column>
		<u-grid-layout-column :span="1"><u-block size="normal auto" style="height: 100%">stretch</u-block></u-grid-layout-column>
		<u-grid-layout-column :span="1"><u-block size="large auto" style="height: 100%">stretch</u-block></u-grid-layout-column>
	</u-grid-layout-row>
</u-grid-layout></div>
</template>