<!-- 输入value 0 测试 -->

<template>
  <div><u-tree-select-new :data-source="
[ { 'data': { 'id': 1, 'deptname': '一级部门a', 'parentid': 99, 'name': '小明' } }, { 'data': { 'id': 2, 'deptname': '一级部门b', 'parentid': 11, 'name': '刷新' } }, { 'data': { 'id': 3, 'deptname': '二级部门a', 'parentid': 1, 'name': '左箭头' } }, { 'data': { 'id': 4, 'deptname': '三级部门a', 'parentid': 3, 'name': '小明3' } } ]
"   
                   value-field="data.id" 
                   text-field="data.deptname"
                   parent-field="data.parentid"
                   childrenField="children"  
></u-tree-select-new></div>
</template>