<template>
  <div class="el-list-components" vusion-slot-name="default">
    <template v-if="options.length > 0">
      <div v-for="(item, index) in options" :key="index" class="el-list-components__frag">
        <el-list-components-item
          v-for="(item2, index2) in item"
          :key="comKey(item2, index2)"
          :item="item2"
          :column="column || 0"
          :style="{ paddingRight: columnGap + 'px', '--cw-margin-bottom': rowGap + 'px' }"
          :equal-width="equalWidth"
          :index="comIndex(index, index2)"
          :class="{ 'is-selected': isItemSelected(item2), 'is-selectable': selectionMode !== 'none' || selectable }"
          @click="handleItemClick(item2, comIndex(index, index2))">
          <template #default="slotProps">
            <slot :item="slotProps.item" :index="comIndex(index, index2)" :selected="isItemSelected(slotProps.item)">
              <!-- 默认内容：如果有 textField 则显示字段值，否则显示原始值 -->
              <div class="el-list-components__default-text">
                {{ getDisplayText(slotProps.item) }}
              </div>
            </slot>
          </template>
        </el-list-components-item>
      </div>
    </template>

    <!-- 分页组件 -->
    <el-pagination
      v-if="showPagination && totalCount > 0"
      class="el-list-components__pagination"
      :current-page="internalCurrentPage"
      :page-size="internalPageSize"
      :total="totalCount"
      :page-sizes="pageSizes"
      :layout="paginationLayout"
      :background="paginationBackground"
      :small="paginationSize === 'small'"
      :hide-on-single-page="hideOnSinglePage"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script>
// import { sync } from '@lcap/vue2-utils';
import ElListComponentsItem from './item.vue';
import { ElPagination } from 'element-plus';
import { at } from 'lodash';
function formatDSResult(result) {
  if (!result) {
    return [];
  } else if (typeof result === 'string') {
    let list = [];
    try {
      list = formatDSResult(JSON.parse(result));
    } catch (err) {
      console.error(err);
    }
    return list;
  } else if (Array.isArray(result)) {
    return result;
  } else if (result && Array.isArray(result.list)) {
    return result.list;
  } else if (result && Array.isArray(result.content)) {
    return result.content;
  } else {
    return [];
  }
}

export default {
  name: 'el-list-components',
  mixins: [
    // sync({
    //   data: 'options',
    // }),
  ],
  components: {
    ElListComponentsItem,
    ElPagination,
  },
  props: {
    dataSource: {
      type: [Array, Object, Function, String],
      default: () => [],
    },
    column: {
      type: Number,
      default: 0,
    },
    rowGap: {
      type: Number,
      default: 0,
    },
    columnGap: {
      type: Number,
      default: 0,
    },
    equalWidth: {
      type: Boolean,
      default: true,
    },
    idField: {
      type: String,
      default: '',
    },
    // 文本字段，当插槽为空时显示该字段的值
    textField: {
      type: String,
      default: '',
    },
    // 选中值
    modelValue: {
      type: [String, Number, Array, Object],
      default: undefined,
    },
    // 选择模式：single-单选，multiple-多选
    selectionMode: {
      type: String,
      default: 'none', // none, single, multiple
      validator: (value) => ['none', 'single', 'multiple'].includes(value),
    },
    // 是否可选
    selectable: {
      type: Boolean,
      default: false,
    },
    // 分页相关属性
    showPagination: {
      type: Boolean,
      default: false,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 50, 100],
    },
    paginationLayout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper',
    },
    paginationBackground: {
      type: Boolean,
      default: true,
    },
    paginationSize: {
      type: String,
      default: 'default',
    },
    hideOnSinglePage: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      options: [],
      totalCount: 0,
      internalCurrentPage: this.currentPage,
      internalPageSize: this.pageSize,
      isServerPagination: false, // 是否为服务端分页
      allData: [], // 前端分页时保存所有数据
      selectedValues: [], // 选中的值（内部状态）
    };
  },
  computed: {},
  watch: {
    dataSource: {
      deep: true,
      handler() {
        // 数据源变化时，重置分页状态
        this.isServerPagination = false;
        this.allData = [];
        this.internalCurrentPage = 1;
        this.update();
      },
      immediate: true,
    },
    currentPage(val) {
      this.internalCurrentPage = val;
      if (this.showPagination) {
        this.update();
      }
    },
    pageSize(val) {
      this.internalPageSize = val;
      if (this.showPagination) {
        this.update();
      }
    },
    modelValue: {
      handler(val) {
        // 同步外部值到内部状态
        if (this.selectionMode === 'multiple') {
          this.selectedValues = Array.isArray(val) ? [...val] : [];
        } else if (this.selectionMode === 'single') {
          this.selectedValues = val !== undefined && val !== null ? [val] : [];
        } else {
          this.selectedValues = [];
        }
      },
      immediate: true,
    },
    selectionMode() {
      // 切换选择模式时清空选中
      this.selectedValues = [];
      this.$emit('update:modelValue', this.selectionMode === 'multiple' ? [] : undefined);
    },
  },
  methods: {
    divide(arr) {
      const result = [];
      const arre = [...arr];
      while (arre.length > 0) {
        const temp = arre.splice(0, this.column || 5);
        result.push(temp);
      }
      return result;
    },
    async update() {
      if (typeof this.dataSource === 'function') {
        try {
          // 如果开启分页
          if (this.showPagination) {
            // 首次加载或后端分页模式：发起请求
            if (!this.isServerPagination && this.internalCurrentPage === 1 && this.allData.length === 0) {
              // 首次加载，请求第一页数据，判断分页模式
              const res = await this.dataSource({
                page: 1,
                size: this.internalPageSize,
              });

              const formattedData = formatDSResult(res);

              // 判断是否为服务端分页（返回值包含 total 字段）
              if (res && typeof res === 'object' && !Array.isArray(res) && res.total !== undefined) {
                // 后端分页模式
                this.isServerPagination = true;
                this.totalCount = res.total;
                this.options = this.divide(formattedData);
              } else {
                // 前端分页模式：需要请求所有数据
                const allRes = await this.dataSource({
                  page: 1,
                  size: 10000, // 请求大量数据
                });
                const allFormattedData = formatDSResult(allRes);
                this.isServerPagination = false;
                this.allData = allFormattedData;
                this.totalCount = allFormattedData.length;

                // 显示第一页数据
                const start = 0;
                const end = this.internalPageSize;
                const paginatedData = allFormattedData.slice(start, end);
                this.options = this.divide(paginatedData);
              }
            } else if (this.isServerPagination) {
              // 后端分页模式：每次翻页都请求
              const res = await this.dataSource({
                page: this.internalCurrentPage,
                size: this.internalPageSize,
              });
              const formattedData = formatDSResult(res);
              this.totalCount = res.total || this.totalCount;
              this.options = this.divide(formattedData);
            } else {
              // 前端分页模式：从已加载的数据中分页
              const start = (this.internalCurrentPage - 1) * this.internalPageSize;
              const end = start + this.internalPageSize;
              const paginatedData = this.allData.slice(start, end);
              this.options = this.divide(paginatedData);
            }
          } else {
            // 未开启分页：加载所有数据
            const res = await this.dataSource({
              page: 1,
              size: 1000,
            });
            const formattedData = formatDSResult(res);
            this.totalCount = formattedData.length;
            this.options = this.divide(formattedData);
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        // 非函数数据源：直接使用数据
        const formattedData = formatDSResult(this.dataSource);
        this.totalCount = formattedData.length;

        // 如果开启分页，进行本地分页
        if (this.showPagination) {
          const start = (this.internalCurrentPage - 1) * this.internalPageSize;
          const end = start + this.internalPageSize;
          const paginatedData = formattedData.slice(start, end);
          this.options = this.divide(paginatedData);
        } else {
          this.options = this.divide(formattedData);
        }
      }
    },
    async reload() {
      // 重置分页状态，重新判断分页模式
      this.isServerPagination = false;
      this.allData = [];
      this.internalCurrentPage = 1;
      return await this.update();
    },
    comIndex(index1, index2) {
      return index1 * (this.column || 5) + index2;
    },
    comKey(item2, index2) {
      return this.idField ? at(item2, this.idField)?.[0] || item2 : index2;
    },
    // 获取显示文本
    getDisplayText(item) {
      if (this.textField) {
        const value = at(item, this.textField)?.[0];
        return value !== undefined ? value : '';
      }
      // 如果是对象且没有指定 textField，返回空字符串
      if (typeof item === 'object' && item !== null) {
        return '';
      }
      // 基础类型直接返回
      return item;
    },
    // 获取项的唯一标识值
    getItemValue(item) {
      if (this.idField) {
        return at(item, this.idField)?.[0] || item;
      }
      return item;
    },
    // 判断项是否被选中
    isItemSelected(item) {
      if (this.selectionMode === 'none' && !this.selectable) {
        return false;
      }
      const itemValue = this.getItemValue(item);
      return this.selectedValues.some(val => {
        if (typeof val === 'object' && typeof itemValue === 'object') {
          return JSON.stringify(val) === JSON.stringify(itemValue);
        }
        return val === itemValue;
      });
    },
    // 处理项点击
    handleItemClick(item, index) {
      if (this.selectionMode === 'none' && !this.selectable) {
        return;
      }

      const itemValue = this.getItemValue(item);
      const isSelected = this.isItemSelected(item);

      if (this.selectionMode === 'single' || this.selectable) {
        // 单选模式
        if (isSelected) {
          // 取消选中
          this.selectedValues = [];
          this.$emit('update:modelValue', undefined);
          this.$emit('selection-change', undefined, []);
        } else {
          // 选中
          this.selectedValues = [itemValue];
          this.$emit('update:modelValue', itemValue);
          this.$emit('selection-change', itemValue, [item]);
        }
      } else if (this.selectionMode === 'multiple') {
        // 多选模式
        if (isSelected) {
          // 取消选中
          this.selectedValues = this.selectedValues.filter(val => {
            if (typeof val === 'object' && typeof itemValue === 'object') {
              return JSON.stringify(val) !== JSON.stringify(itemValue);
            }
            return val !== itemValue;
          });
        } else {
          // 选中
          this.selectedValues.push(itemValue);
        }
        this.$emit('update:modelValue', [...this.selectedValues]);
        // 获取选中的完整项
        const selectedItems = this.getAllItems().filter(itm => this.isItemSelected(itm));
        this.$emit('selection-change', this.selectedValues, selectedItems);
      }
    },
    // 获取所有项（用于多选时获取完整对象）
    getAllItems() {
      const allItems = [];
      this.options.forEach(row => {
        row.forEach(item => {
          allItems.push(item);
        });
      });
      return allItems;
    },
    // 分页事件处理
    handleCurrentChange(page) {
      this.internalCurrentPage = page;
      this.$emit('update:currentPage', page);
      this.$emit('page-change', { page, pageSize: this.internalPageSize });
      this.update();
    },
    handleSizeChange(size) {
      this.internalPageSize = size;
      this.internalCurrentPage = 1; // 改变每页数量时，重置到第一页
      this.$emit('update:pageSize', size);
      this.$emit('update:currentPage', 1);
      this.$emit('size-change', { page: 1, pageSize: size });
      this.update();
    },
  },
};
</script>

<style>
.el-list-components__frag {
}

.el-list-components__pagination {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}

/* 可选项样式 */
.el-list-components__item.is-selectable {
  cursor: pointer;
  transition: all 0.3s ease;
}

.el-list-components__item.is-selectable:hover {
  opacity: 0.8;
}

/* 选中项样式 */
.el-list-components__item.is-selected {
  background-color: rgb(198, 226, 255) !important;
}

.el-list-components__item.is-selected:hover {
  background-color: rgba(198, 226, 255, 0.9) !important;
}

/* 默认文本样式 */
.el-list-components__default-text {
  padding: 12px;
  text-align: center;
  color: #303133;
  font-size: 14px;
}
</style>
