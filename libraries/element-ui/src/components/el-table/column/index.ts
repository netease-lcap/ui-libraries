import TableColumn from 'element-ui/lib/table-column';
import { registerComponent } from '@lcap/nasl-hoc-vue/index';

const selectColumn = {
  renderCell: function(h, scope) {
    const { row, column, isSelected, store, $index } = scope;
    return h('el-checkbox', {
      props: {
        value: isSelected,
        disabled: column.selectable ? !column.selectable.call(null, row, $index) : false
      },
      on: {
        input: () => { store.commit('rowSelectedChanged', row) },
      },
      nativeOn: {
        click: (event) => event.stopPropagation()
      }
    })
  }
}
const indexColumn = {
  renderHeader: function(h, { column }) {
    return column.label || '#';
  },
  renderCell: function(h, { $index, column }) {
    let i = $index + 1;
    const index = column.index;

    if (typeof index === 'number') {
      i = $index + index;
    } else if (typeof index === 'function') {
      i = index($index);
    }

    return h('div', i);
  }
}

const expandColumn = {
  renderHeader: function(h, { column }) {
    return column.label || '';
  },
}

const fn = TableColumn.methods.setColumnRenders;
TableColumn.methods.setColumnRenders = function(column) {
  column = fn.call(this, column);
  
  const type = column.type;
  const oldrenderHeader = column.renderHeader;
  column.renderHeader = function(h, scope) {
    const dataAttr = {};
    const column = scope.column;
    for(let key in column) {
      if(key.startsWith('data-')){
        dataAttr[key] = column[key];
      }
    }
    let forceRender;
    if(type === 'index') {
      forceRender = indexColumn.renderHeader
    }
    if(type === 'expand') {
      forceRender = expandColumn.renderHeader
    }
    return h('div', {
      directives: [
        {
          name: 'hoist-data-attribute',
          value: { 
            topSelector: 'th',
            ...dataAttr,
          },
        }
      ],
    }, [(forceRender || oldrenderHeader).call(this, h, scope)])
  }

  const oldrenderCell = column.renderCell;
  column.renderCell = function(h, scope) {
    const dataAttr = {};
    const column = scope.column;
    for(let key in column) {
      if(key.startsWith('data-')){
        dataAttr[key] = column[key];
      }
    }
    let forceRender;
    if(type === 'selection') {
      forceRender = selectColumn.renderCell
    }
    if(type === 'index') {
      forceRender = indexColumn.renderCell
    }
    return h('div', {
      class: 'cell',
      directives: [
        {
          name: 'hoist-data-attribute',
          value: { 
            topSelector: 'td',
            ...dataAttr,
          },
        }
      ],
    }, [(forceRender || oldrenderCell).call(this, h, scope)])
  }
  
  return column;
} 
const created = TableColumn.created;
TableColumn.created = function() {
  created.call(this);
  Object.keys(this.$attrs).forEach(key => {
    if(key.startsWith('data-')) {
      this.columnConfig[key] = this.$attrs[key];
    }
  })
}
TableColumn.render = function(h) {
  const attrs = {};
  Object.keys(this.$attrs).forEach(key => {
    if(key.startsWith('data-')) {
      attrs[key] = 'undefined'
    }
  });
  return h('div', {
    directives: [
      {
        name: 'remove-data-attribute'
      }
    ],
  }, this.$slots.default);
}

const ElTableColumn = registerComponent(TableColumn, {}, {
  slotNames: [],
  nativeEvents: [],
  methodNames: [],
});

export default ElTableColumn;
