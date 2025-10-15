<!-- textField 默认渲染示例 -->

<template>
  <div>
    <h3>textField 默认渲染示例</h3>

    <!-- 示例 1: 简单数据（无需插槽） -->
    <div style="margin-bottom: 40px;">
      <h4>示例 1: 简单数据（不使用插槽）</h4>
      <p style="color: #909399; font-size: 14px; margin-bottom: 10px;">
        简单的数字或字符串数组，不传插槽时自动显示值
      </p>
      <el-list-components
        :column="5"
        :data-source="simpleData"
        :row-gap="10"
        :column-gap="10">
        <!-- 不传插槽，自动显示数组值 -->
      </el-list-components>
    </div>

    <!-- 示例 2: 对象数据 + textField -->
    <div style="margin-bottom: 40px;">
      <h4>示例 2: 对象数据（使用 textField）</h4>
      <p style="color: #909399; font-size: 14px; margin-bottom: 10px;">
        对象数据，通过 textField="name" 指定显示的字段
      </p>
      <el-list-components
        :column="4"
        :data-source="userData"
        :row-gap="10"
        :column-gap="10"
        text-field="name">
        <!-- 不传插槽，自动显示 name 字段 -->
      </el-list-components>
    </div>

    <!-- 示例 3: 嵌套对象字段 -->
    <div style="margin-bottom: 40px;">
      <h4>示例 3: 嵌套对象字段</h4>
      <p style="color: #909399; font-size: 14px; margin-bottom: 10px;">
        使用 lodash 的 at 语法支持嵌套字段，如 "info.title"
      </p>
      <el-list-components
        :column="3"
        :data-source="nestedData"
        :row-gap="12"
        :column-gap="12"
        text-field="info.title">
        <!-- 不传插槽，自动显示 info.title 字段 -->
      </el-list-components>
    </div>

    <!-- 示例 4: textField + 单选 -->
    <div style="margin-bottom: 40px;">
      <h4>示例 4: textField + 单选模式</h4>
      <p style="color: #909399; font-size: 14px; margin-bottom: 10px;">
        结合选中功能，不传插槽时使用 textField 显示，点击可以选中
      </p>
      <div style="margin-bottom: 10px;">
        <el-tag type="success">当前选中 ID: {{ selectedProduct || '未选中' }}</el-tag>
        <el-button size="small" style="margin-left: 10px;" @click="clearProduct">清空选中</el-button>
      </div>
      <el-list-components
        :column="4"
        :data-source="products"
        :row-gap="10"
        :column-gap="10"
        text-field="name"
        id-field="id"
        selection-mode="single"
        v-model="selectedProduct"
        @selection-change="handleProductChange">
        <!-- 不传插槽，自动显示 name 字段 + 选中高亮 -->
      </el-list-components>
    </div>

    <!-- 示例 4.5: textField + 多选 -->
    <div style="margin-bottom: 40px;">
      <h4>示例 4.5: textField + 多选模式</h4>
      <p style="color: #909399; font-size: 14px; margin-bottom: 10px;">
        使用 textField 的多选模式
      </p>
      <div style="margin-bottom: 10px;">
        <el-tag>已选中 {{ selectedProducts.length }} 项</el-tag>
        <el-tag 
          v-for="id in selectedProducts" 
          :key="id" 
          type="success"
          closable
          style="margin-left: 5px;"
          @close="removeProduct(id)">
          产品ID: {{ id }}
        </el-tag>
        <el-button size="small" style="margin-left: 10px;" @click="clearProducts">清空</el-button>
      </div>
      <el-list-components
        :column="4"
        :data-source="products"
        :row-gap="10"
        :column-gap="10"
        text-field="name"
        id-field="id"
        selection-mode="multiple"
        v-model="selectedProducts">
        <!-- 多选模式 + textField -->
      </el-list-components>
    </div>

    <!-- 示例 5: textField + 分页 -->
    <div style="margin-bottom: 40px;">
      <h4>示例 5: textField + 分页</h4>
      <p style="color: #909399; font-size: 14px; margin-bottom: 10px;">
        结合分页功能使用 textField
      </p>
      <el-list-components
        :column="5"
        :data-source="cities"
        :row-gap="10"
        :column-gap="10"
        text-field="name"
        :show-pagination="true"
        :page-size="10">
        <!-- 不传插槽，分页显示城市名称 -->
      </el-list-components>
    </div>

    <!-- 示例 6: 自定义插槽（覆盖默认渲染） -->
    <div style="margin-bottom: 40px;">
      <h4>示例 6: 自定义插槽（覆盖 textField）</h4>
      <p style="color: #909399; font-size: 14px; margin-bottom: 10px;">
        即使设置了 textField，传入插槽后会使用自定义渲染
      </p>
      <el-list-components
        :column="3"
        :data-source="userData"
        :row-gap="16"
        :column-gap="16"
        text-field="name">
        <!-- 传入自定义插槽，覆盖 textField 的默认渲染 -->
        <template #default="{ item }">
          <el-card shadow="hover" :body-style="{ padding: '15px' }">
            <div style="display: flex; align-items: center;">
              <el-avatar :size="50" :src="item.avatar" style="margin-right: 15px;" />
              <div>
                <h4 style="margin: 0 0 5px 0;">{{ item.name }}</h4>
                <p style="margin: 0; color: #909399; font-size: 12px;">{{ item.role }}</p>
                <el-tag size="small" style="margin-top: 5px;">ID: {{ item.id }}</el-tag>
              </div>
            </div>
          </el-card>
        </template>
      </el-list-components>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 简单数据
const simpleData = ref(['苹果', '香蕉', '橘子', '葡萄', '西瓜', '草莓', '芒果', '樱桃', '桃子', '梨']);

// 用户数据
const userData = ref([
  { id: 1, name: '张三', role: '产品经理', avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png' },
  { id: 2, name: '李四', role: '前端工程师', avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' },
  { id: 3, name: '王五', role: '后端工程师', avatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png' },
  { id: 4, name: '赵六', role: 'UI 设计师', avatar: 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png' },
  { id: 5, name: '钱七', role: '测试工程师', avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png' },
  { id: 6, name: '孙八', role: '运维工程师', avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' },
  { id: 7, name: '周九', role: '架构师', avatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png' },
  { id: 8, name: '吴十', role: '项目经理', avatar: 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png' },
]);

// 嵌套对象数据
const nestedData = ref([
  { id: 1, info: { title: '文档管理系统', desc: '企业级文档管理' } },
  { id: 2, info: { title: '权限管理系统', desc: '角色权限管理' } },
  { id: 3, info: { title: '日志监控系统', desc: '实时日志监控' } },
  { id: 4, info: { title: '用户管理系统', desc: '用户信息管理' } },
  { id: 5, info: { title: '数据分析系统', desc: '大数据分析' } },
  { id: 6, info: { title: '报表生成系统', desc: '自动报表生成' } },
]);

// 产品数据（选中）
const products = ref([
  { id: 1, name: 'iPhone 15', price: 5999 },
  { id: 2, name: 'MacBook Pro', price: 12999 },
  { id: 3, name: 'iPad Air', price: 4799 },
  { id: 4, name: 'Apple Watch', price: 2999 },
  { id: 5, name: 'AirPods Pro', price: 1899 },
  { id: 6, name: 'iMac', price: 9999 },
  { id: 7, name: 'Mac Mini', price: 4999 },
  { id: 8, name: 'Apple TV', price: 1299 },
]);

const selectedProduct = ref(null);
const selectedProducts = ref([]);

const handleProductChange = (value, items) => {
  console.log('选中产品改变:', value, items);
};

const clearProduct = () => {
  selectedProduct.value = null;
};

const removeProduct = (id) => {
  selectedProducts.value = selectedProducts.value.filter(v => v !== id);
};

const clearProducts = () => {
  selectedProducts.value = [];
};

// 城市数据（分页）
const cities = ref([
  { id: 1, name: '北京' },
  { id: 2, name: '上海' },
  { id: 3, name: '广州' },
  { id: 4, name: '深圳' },
  { id: 5, name: '杭州' },
  { id: 6, name: '成都' },
  { id: 7, name: '重庆' },
  { id: 8, name: '武汉' },
  { id: 9, name: '西安' },
  { id: 10, name: '南京' },
  { id: 11, name: '天津' },
  { id: 12, name: '苏州' },
  { id: 13, name: '长沙' },
  { id: 14, name: '郑州' },
  { id: 15, name: '青岛' },
  { id: 16, name: '大连' },
  { id: 17, name: '宁波' },
  { id: 18, name: '厦门' },
  { id: 19, name: '福州' },
  { id: 20, name: '济南' },
]);
</script>

<style scoped>
h3 {
  margin-bottom: 24px;
  color: #303133;
  border-bottom: 2px solid #409eff;
  padding-bottom: 10px;
}

h4 {
  margin-bottom: 16px;
  color: #606266;
  font-size: 16px;
}
</style>

