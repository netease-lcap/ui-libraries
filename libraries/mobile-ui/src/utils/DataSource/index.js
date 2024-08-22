import Vue from 'vue';
import _get from 'lodash/get';
import _set from 'lodash/set';
import _cloneDeep from 'lodash/cloneDeep';

const isOperator = (value) => {
    const operators = [
        '=',
        '==',
        'eq',
        '!=',
        'neq',
        '<',
        'lt',
        '<=',
        'lte',
        '>',
        'gt',
        '>=',
        'gte',
        'includes',
        'startsWith',
        'endsWith',
    ];
    return typeof value === 'function' || operators.includes(value);
};

export const solveCondition = (condition, obj) => {
    if (Array.isArray(condition))
        return condition.some((cond) => solveCondition(cond, obj));
    if (typeof condition === 'object') {
        return Object.keys(condition).every((key) => {
            let expression = condition[key];
            if (expression === undefined)
                return true;
            if (typeof expression !== 'object')
                expression = ['=', expression];
            if (Array.isArray(expression)) {
                if (!isOperator(expression[0])) {
                    // 多选项过滤，暂时简单处理
                    const sourceValue = getType(obj) === 'String' ? obj : _get(obj, key);
                    const targetValue = expression;
                    return targetValue.includes(sourceValue);
                }
                expression = {
                    operator: expression[0],
                    value: expression[1],
                };
            }

            let sourceValue = getType(obj) === 'String' ? obj : _get(obj, key);
            let targetValue = expression.value;
            if (expression.caseInsensitive) {
                sourceValue
          = typeof sourceValue === 'string' ? sourceValue.toLowerCase() : sourceValue;
                targetValue
          = typeof targetValue === 'string' ? targetValue.toLowerCase() : targetValue;
            }

            if (typeof expression.operator === 'function')
                return expression.operator(sourceValue, targetValue, expression);
            if (
                expression.operator === '='
        || expression.operator === '=='
        || expression.operator === 'eq'
            )
                return sourceValue === targetValue;
            if (expression.operator === '!=' || expression.operator === 'neq')
                return sourceValue !== targetValue;
            if (expression.operator === '<' || expression.operator === 'lt')
                return sourceValue < targetValue;
            if (expression.operator === '<=' || expression.operator === 'lte')
                return sourceValue <= targetValue;
            if (expression.operator === '>' || expression.operator === 'gt')
                return sourceValue > targetValue;
            if (expression.operator === '>=' || expression.operator === 'gte')
                return sourceValue >= targetValue;
            if (expression.operator === 'includes')
                return String(sourceValue).includes(targetValue);
            if (expression.operator === 'startsWith')
                return String(sourceValue).startsWith(targetValue);
            if (expression.operator === 'endsWith')
                return String(sourceValue).endsWith(targetValue);
            throw new TypeError('Unknown operator in conditions!');
        });
    } throw new TypeError('Condition must be a Object or Array!');
};

function getType(o) {
    return Object.prototype.toString.call(o).slice(8, -1);
}

/**
 * @example 作为简单的 query
 * const dataSource = new DataSource();
 * dataSource.query({
 *     paging,
 *     sorting,
 *     filtering,
 * }).then();
 *
 * @example 作为状态储存
 * const dataSource = new DataSource();
 * dataSource.filter();
 *
 */

const VueDataSource = Vue.extend({
    data() {
        return {
          data: [],
          cache: true,
          viewMode: 'more',
          paging: undefined, // @TODO
          sorting: undefined, // @readonly
          filtering: undefined, // @readonly
          // grouping: undefined,
          remote: false,
          // remotePaging: false,
          // remoteSorting: false,
          // remoteFiltering: false,
          // remoteGrouping: false,
          // ------
          arrangedData: [], // 整理过的数据，用于缓存过滤和排序行为。比如多次获取分页的话，没有必要重新整理
          originTotal: Infinity, // @readonly - originTotal 作为很重要的判断有没有加载完所有数据的依据

          cleared: false, // 标志是否触发了清除本地数据 通常组件reload会触发

          treeDisplay: false,

          // 选择项相关
          needAllData: false, // 是否需要所有数据，比如分页时用于选择项回显
          allData: null, // 所有数据，用于选择项回显
        };
    },
    computed: {
        pageable() {
          return !!this.paging && (this.paging.size > 0 && this.paging.size < Infinity);
        },
        offset() {
            return this.pageable ? (this.paging.number - 1) * this.paging.size : 0;
        },
        limit() {
            return this.pageable ? this.paging.size : Infinity;
        },
        /**
         * 当前的总数，过滤后的分页数目
         */
        total() {
            return this.originTotal === Infinity ? this.data.length : this.originTotal;
        },
        totalPage() {
            if (!this.pageable) return 1;

            const totalPage = Math.ceil(this.total / this.paging.size);
            if (totalPage === Infinity || totalPage === 0)
                return 1;
            return totalPage;
        },
        viewData() {
            if (this.pageable) {
              let data;
              if (this.viewMode === 'more') {
                data = this.arrangedData.slice(0, this.offset + this.limit);
              } else {
                data = this.arrangedData.slice(
                  this.offset,
                  this.offset + this.limit
                );
              }

              return data;
            }

            return this.arrangedData;
        },
    },
    // paging, sorting, filtering 暂不用 watch
    created() {
        // 数据源是函数，优先默认是后端请求，后续再根据函数结果来重写
        this.remote = !!this._load;
        // 传 data 为本地数据模式，此时已知所有数据
        if (!this.remote) {
            this.originTotal = this.data.length;
            this.arrange(this.data);
        }
    },
    methods: {
        arrange(data = this.data) {
          let arrangedData = Array.from(data);

          const { filtering } = this;
          if (!this.remote && filtering && Object.keys(filtering).length) {
            arrangedData = arrangedData.filter((item) =>
              solveCondition(filtering, item),
            );
            // 前端筛选， 且无后端分页 时重置originTotal
            this.originTotal = arrangedData.length;
          }

          const { sorting } = this;
          if (!this.remote && sorting && sorting.field) {
            const { field } = sorting;
            const orderSign = sorting.order === 'asc' ? 1 : -1;
            if (sorting.compare) {
              arrangedData.sort((item1, item2) =>
                sorting.compare(item1[field], item2[field], orderSign),
              );
            } else {
              arrangedData.sort((item1, item2) =>
                this.defaultCompare(item1[field], item2[field], orderSign),
              );
            }
          }

          // 树形展示处理
          if (this.treeDisplay) {
            arrangedData = this.listToTree(arrangedData, {
              valueField: this.treeDisplay.valueField,
              parentField: this.treeDisplay.parentField,
              childrenField: this.treeDisplay.childrenField,
            });

            this.originTotal = arrangedData.length;
          }

          this.arrangedData = arrangedData;

          // 重置清除标志
          if (this.cleared) {
            this.cleared = false;
          }

          return arrangedData;
        },
        clearLocalData() {
            this.remote && (this.data = []);
            this.arrangedData = [];
            this.originTotal = Infinity; // originTotal 必须清空，否则空列表不会更新

            this.cleared = true;
        },
        mustRemote() {
          if (this.remote) {
            // 还有未获取的后端数据 或 reload
            return !this.hasAllRemoteData() || this.cleared;
          }

          return false;
        },
        /**
         * 根据 viewData，是否还有数据
         * @param {Number} offset - 位置
         */
        hasMore(offset) {
            if (offset === undefined || offset === Infinity)
                offset = this.offset + this.limit;

            return offset < this.originTotal;
        },
        /**
         * 是否还有后端数据
         * @param {Number} offset - 位置
         */
        hasAllRemoteData() {
            // 非后端数据
            if (!this.remote)
                return true;

            if (this.data.length >= this.originTotal) {
              for (let i = 0; i < this.data.length; i++) {
                const item = this.data[i];
                if (!item) {
                  return false
                }
              }
              return true;
            }

            return false
        },
        defaultCompare(a, b, sign) {
            if (a === b)
                return 0;
            return a > b ? sign : -sign;
        },
        _getExtraParams() {
            return undefined;
        },
        // _load(params)
        load(offset = this.offset, limit = this.limit, newPageNumber) {
          // reload 或 query变化
          if (this.cleared && newPageNumber === undefined) {
            if (this.paging) {
              this.paging.number = 1;
            }
            offset = 0;
          }

          // 不需要走后端
          if (!this.mustRemote()) {
            return Promise.resolve(this.arrange(this.data));
          }

          const paging = {
            offset,
            limit: this.limit,
            ...this.paging,
          };
          if (newPageNumber !== undefined) {
            paging.number = newPageNumber;
          }

          const params = {
            paging: this.pageable ? paging : undefined,
            sorting: this.sorting,
            filtering: this.filtering,
            ...this._getExtraParams(), // 带上filterText
          };

          // 支持 JDL
          if (params.paging) {
            params.page = params.paging.number;
            params.start = params.paging.offset;
            params.size = params.paging.size;
          }

          if (this.sorting && this.sorting.field) {
            params.sort = params.sorting.field;
            params.order = params.sorting.order;
          }

          const extraParams = this._getExtraParams();

          if (this.needAllData && (!this.allData?.length || this.cleared)) {
            this.loadAll();
          };

          return this._load(params, extraParams)
            .then((result) => {
              const finalResult = {
                data: [],
                total: 0,
              };

              // 判断是否后端数据
              if (getType(result) === 'Object') {
                if (
                  result.hasOwnProperty('list') &&
                  result.hasOwnProperty('total')
                ) {
                  finalResult.data = result.list;
                  finalResult.total = result.total;
                } else if (
                  result.hasOwnProperty('totalElements') &&
                  result.hasOwnProperty('content')
                ) {
                  finalResult.data = result.content;
                  finalResult.total = result.totalElements;
                } else {
                  finalResult.data = result.data;
                  finalResult.total = result.total;
                }

                // 非后端数据
                if (
                  !finalResult.hasOwnProperty('data') ||
                  !finalResult.hasOwnProperty('total')
                ) {
                  // this.remote = false;
                }
              } else if (getType(result) === 'Array') {
                finalResult.data = result;
                finalResult.total = result.length;
                // this.remote = false;
              } else {
                // this.remote = false;
              }

              if (!this.remote) {
                this.data = finalResult.data;
              } else {
                // 远端数据未分页
                if (!this.pageable || limit === Infinity || finalResult.data.length >= finalResult.total) {
                  this.data = finalResult.data;
                } else {
                  for (let i = 0; i < limit; i++) {
                    const item = finalResult.data[i];
                    if (item) {
                      this.data[offset + i] = item;
                    }
                  }
                }
              }

              this.originTotal = finalResult.total;

              return this.arrange(this.data);
            })
        },
        loadMore() {
            if (!this.hasMore()) {
              return Promise.resolve([]);
            }

            const newPageNumber = this.paging.number + 1;
            return this.load(
                this.offset + this.limit,
                undefined,
                newPageNumber,
            ).then(() => (this.paging.number = newPageNumber));

        },
        reload() {
          this.remote = !!this._load;
          this.clearLocalData();
          this.page({
            ...(this.paging || {}),
            number: 1,
          });

          return this.load();
        },
        page(paging) {
            this.paging = paging;
        },
        sort(sorting) {
            this.sorting = sorting;
            this.clearLocalData();
        },
        filter(filtering) {
            this.filtering = filtering;
            this.clearLocalData();
        },
        listToTree(data, options) {
            const { valueField, parentField, childrenField } = options;

            data = _cloneDeep(data);

            // Map记录一下
            const nodes = {}; // Record<id, { entity }>
            data.forEach((item) => {
                const id = _get(item, valueField);
                if (id) {
                    nodes[id] = item;
                }
            });

            const tree = [];

            data.forEach((item) => {
                const parentId = _get(item, parentField);
                const parent = nodes[parentId];
                // 没有parentId 或者 parent不存在的不处理
                if (!parentId || !parent) {
                    tree.push(item);
                } else {
                    if (!_get(parent, childrenField)) {
                      _set(parent, childrenField, []);
                    }

                    _get(parent, childrenField).push(item);
                }
            });

            return tree;
        },
        loadAll() {
          const params = {
            page: 1,
            size: 10000,
            filterText: '',
          };

          return this._load(params)
            .then((result) => {
              const finalResult = {};

              // 判断是否后端数据
              if (getType(result) === 'Object') {
                if (
                  result.hasOwnProperty('list') &&
                  result.hasOwnProperty('total')
                ) {
                  finalResult.data = result.list;
                  finalResult.total = result.total;
                } else if (
                  result.hasOwnProperty('totalElements') &&
                  result.hasOwnProperty('content')
                ) {
                  finalResult.data = result.content;
                  finalResult.total = result.totalElements;
                } else {
                  finalResult.data = result.data;
                  finalResult.total = result.total;
                }
              } else if (getType(result) === 'Array') {
                finalResult.data = result;
                finalResult.total = result.length;
              }

              return finalResult.data;
            })
            .then((data) => {
              this.allData = data;
            });
        }
    },
});

function DataSource(options) {
    const data = {};
    const methods = {};

    Object.keys(options).forEach((key) => {
        const option = options[key];
        if (typeof option === 'function')
            methods['_' + key] = option;
        else
            data[key] = option;
    });

    VueDataSource.call(this, {
        data() {
            return data;
        },
        methods,
    });
}

DataSource.prototype = Object.create(VueDataSource.prototype);
// DataSource.prototype.constructor = DataSource;

export default DataSource;
