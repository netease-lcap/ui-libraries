import { areaList } from '@vant/area-data';

import { createNamespace } from '../utils';
import { pickerProps } from '../picker/shared';
import Picker from '../picker';
import Popup from '../popup';
import Field from '../field';
import { EmptyCol } from '../emptycol';

import { FieldMixin } from '../mixins/field';
import PreviewMixin from '../mixins/preview';
import { EventSlotCommandProvider } from '../mixins/EventSlotCommandProvider';

const [createComponent, bem] = createNamespace('area');

const PLACEHOLDER_CODE = '000000';

function isOverseaCode(code) {
  return code[0] === '9';
}

function pickSlots(instance, keys) {
  const { $slots, $scopedSlots } = instance;
  const scopedSlots = {};

  keys.forEach((key) => {
    if ($scopedSlots[key]) {
      scopedSlots[key] = $scopedSlots[key];
    } else if ($slots[key]) {
      scopedSlots[key] = () => $slots[key];
    }
  });

  return scopedSlots;
}

export default createComponent({
  mixins: [
    FieldMixin,
    EventSlotCommandProvider(['confirm', 'cancel']),
    PreviewMixin,
  ],
  props: {
    ...pickerProps,
    value: String,
    areaListprop: [Object, String],
    columnsNum: {
      type: [Number, String],
      default: 3,
    },
    isOverseaCode: {
      type: Function,
      default: isOverseaCode,
    },
    columnsPlaceholder: {
      type: Array,
      default: () => [],
    },
    converter: {
      type: String,
      default: 'json',
    },
    placeholder: {
      type: String,
    },
    labelField: {
      type: String,
      default: '',
    },
    inputAlign: String,
    closeOnClickOverlay: Boolean,
    isNew: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      code: this.value || '',
      columns: [{ values: [] }, { values: [] }, { values: [] }],
      // areaList: {},
      valuepopup: false,
      getTitle: '',
      oldcode: '',
    };
  },

  computed: {
    areaList() {
      return this.areaListprop ? this.fromValue(this.areaListprop) : areaList;
    },
    province() {
      return this.areaList.province_list || {};
    },

    city() {
      return this.areaList.city_list || {};
    },

    county() {
      return this.areaList.county_list || {};
    },

    displayColumns() {
      return this.columns.slice(0, +this.columnsNum);
    },

    placeholderMap() {
      return {
        province: this.columnsPlaceholder[0] || '',
        city: this.columnsPlaceholder[1] || '',
        county: this.columnsPlaceholder[2] || '',
      };
    },
  },

  watch: {
    value: {
      handler(val) {
        this.code = this.convertName(val);
        this.setValues();
        this.setTitle();
      },
      immediate: true,
    },

    areaListprop: {
      deep: true,
      handler: 'setValues',
    },

    isNew() {
      this.$nextTick(function() {
        this.setValues(true);
      });
    },

    columnsNum() {
      this.$nextTick(() => {
        this.setValues(true);
      });
    },
  },

  mounted() {
    this.setValues();
    this.setTitle();
  },

  methods: {
    designerOpen(e) {
      let currentElement = e.target;
      let nodePath = false;
      while (currentElement) {
        const np = currentElement.getAttribute('vusion-node-path');
        if (np) {
          nodePath = np;
          break;
        }
        currentElement = currentElement.parentElement;
      }
      if (this?.$attrs?.['vusion-node-path'] === nodePath) {
        this.valuepopup = true;
        this.$refs.popforcas.togglePModal();
        this.$nextTick(function() {
          this.setValues(true);
        });
      }
    },
    designerClose() {
      // readme:ide会记录通过designerDbControl打开的浮窗，需要通过该命令清除，在触发方式双击变单击后，暂无作用
      if (window.parent && this?.$attrs?.['vusion-node-path']) {
        window.parent?.postMessage(
          {
            protocol: 'vusion',
            sender: 'helper',
            type: 'send',
            command: 'setPopupStatusInfo',
            args: [
              {
                nodePath: this?.$attrs?.['vusion-node-path'],
                visible: false,
              },
            ],
          },
          '*',
        );
      }
      this.$refs.popforcas.togglePModal();
      this.valuepopup = false;
    },
    ifDesigner() {
      return this.$env && this.$env.VUE_APP_DESIGNER;
    },
    setTitle() {
      if (this.ifDesigner()) {
        this.getTitle = this.value;
        return;
      }
      if (!this.value && !this.code) {
        this.getTitle = '';
        return;
      }
      // 有转换器的时候，需要用 code
      const tcode =
        this.value && this.converter !== 'name' ? this.value : this.code;
      const provincet = this.getListTempNew(
        'province',
        tcode.slice(0, 2) + '0000',
      );
      const cityt = this.getListTempNew('city', tcode.slice(0, 4) + '00');
      const countyt = this.getListTempNew('county', tcode.slice(0, 6));

      this.getTitle = [provincet, cityt, countyt]
        .filter((item) => !!item)
        .join('/');
    },
    togglePopup() {
      this.valuepopup = !this.valuepopup;
      this.$refs.popforcas.togglePModal();
      if (this.valuepopup) {
        this.$nextTick(function() {
          this.setValues();
        });
      }
    },
    fromValue(value) {
      if (this.converter === 'json') {
        try {
          if (value === null || value === undefined) return {};
          if (typeof value === 'string') return JSON.parse(value || '{}');
          if (typeof value === 'object') return value;
        } catch (err) {
          return {};
        }
      } else {
        return value || {};
      }
    },
    // get list by code
    getList(type, code) {
      let result = [];
      if (type !== 'province' && !code) {
        return result;
      }

      const list = this[type];
      result = Object.keys(list).map((listCode) => ({
        code: listCode,
        name: list[listCode],
      }));

      if (code) {
        // oversea code
        if (this.isOverseaCode(code) && type === 'city') {
          code = '9';
        }

        result = result.filter((item) => item.code.indexOf(code) === 0);
      }

      if (this.placeholderMap[type] && result.length) {
        // set columns placeholder
        let codeFill = '';
        if (type === 'city') {
          codeFill = PLACEHOLDER_CODE.slice(2, 4);
        } else if (type === 'county') {
          codeFill = PLACEHOLDER_CODE.slice(4, 6);
        }

        result.unshift({
          code: `${code}${codeFill}`,
          name: this.placeholderMap[type],
        });
      }

      return result;
    },

    // get index by code
    getIndex(type, code) {
      let compareNum = type === 'province' ? 2 : type === 'city' ? 4 : 6;
      const list = this.getList(type, code.slice(0, compareNum - 2));

      // oversea code
      if (this.isOverseaCode(code) && type === 'province') {
        compareNum = 1;
      }

      code = code.slice(0, compareNum);

      for (let i = 0; i < list.length; i++) {
        if (list[i].code.slice(0, compareNum) === code) {
          return i;
        }
      }

      return 0;
    },

    // parse output columns data
    parseOutputValues(values) {
      return values.map((value, index) => {
        // save undefined value
        if (!value) return value;

        value = JSON.parse(JSON.stringify(value));

        if (!value.code || value.name === this.columnsPlaceholder[index]) {
          value.code = '';
          value.name = '';
        }

        return value;
      });
    },

    onChange(picker, values, index) {
      this.oldcode = this.code;
      this.code = values[index].code;
      this.setValues();

      const parsedValues = this.parseOutputValues(picker.getValues());
      this.$emit('change', picker, parsedValues, index);
    },

    confirm() {
      // tirgger picker confirm
      if (typeof this.$refs?.picker?.confirm === 'function') {
        this.$refs?.picker?.confirm();
      }
    },

    onConfirm(values, index) {
      values = this.parseOutputValues(values);
      this.setValues();
      // 有 name 转换器的时候这里需要重置一下 code
      if (!this.value || this.converter === 'name') {
        this.code = values[this.columnsNum - 1].code;
      }
      // 最后一位选择的值
      const lastValue = this.convertCode(values[this.columnsNum - 1].code);
      this.$emit('update:value', lastValue);
      this.$emit('confirm', values, index, lastValue);
      this.togglePopup();
      this.setTitle();
    },

    cancel() {
      // tirgger picker cancel
      if (typeof this.$refs?.picker?.cancel === 'function') {
        this.$refs?.picker?.cancel();
      }
    },

    onCancel() {
      this.togglePopup();
      this.code = this.oldcode;
    },
    getDefaultCode() {
      if (this.columnsPlaceholder.length) {
        return PLACEHOLDER_CODE;
      }

      const countyCodes = Object.keys(this.county);
      if (countyCodes[0]) {
        return countyCodes[0];
      }

      const cityCodes = Object.keys(this.city);
      if (cityCodes[0]) {
        return cityCodes[0];
      }

      return '';
    },

    setValues(isForce = false) {
      let { code } = this;
      // readme: 现在要在编辑态显示出来
      if (!isForce && this.ifDesigner()) return;
      if (!code) {
        code = this.getDefaultCode();
      }
      const { picker } = this.$refs;
      const province = this.getList('province');
      const city = this.getList('city', code.slice(0, 2));
      if (!picker) {
        return;
      }

      picker.setColumnValues(0, province);
      picker.setColumnValues(1, city);

      if (
        city.length &&
        code.slice(2, 4) === '00' &&
        !this.isOverseaCode(code)
      ) {
        [{ code }] = city;
      }

      picker.setColumnValues(2, this.getList('county', code.slice(0, 4)));
      picker.setIndexes([
        this.getIndex('province', code),
        this.getIndex('city', code),
        this.getIndex('county', code),
      ]);
    },
    getListTemp(type, code) {
      return this[type][code];
    },
    getValues() {
      const { picker } = this.$refs;
      let getValues = picker
        ? picker.getValues().filter((value) => !!value)
        : [];
      getValues = this.parseOutputValues(getValues);
      return getValues;
    },
    getArea() {
      const values = this.getValues();
      const area = {
        code: '',
        country: '',
        province: '',
        city: '',
        county: '',
      };

      if (!values.length) {
        return area;
      }

      const names = values.map((item) => item.name);
      const validValues = values.filter((value) => !!value.code);

      area.code = validValues.length
        ? validValues[validValues.length - 1].code
        : '';

      if (this.isOverseaCode(area.code)) {
        area.country = names[1] || '';
        area.province = names[2] || '';
      } else {
        area.province = names[0] || '';
        area.city = names[1] || '';
        area.county = names[2] || '';
      }

      return area;
    },

    // @exposed-api
    reset(code) {
      this.code = code || '';
      this.setValues();
    },
    getListTempNew(type, code) {
      return this.areaList[`${type}_list`][code];
    },
    convertName(names) {
      if (this.converter === 'name' && names) {
        const nameArr = names.split('/').map((item) => item.trim());
        const levelMap = ['province', 'city', 'county'];

        function search(level, prefixCode) {
          if (level >= nameArr.length) return prefixCode;
          for (const [code, name] of Object.entries(
            areaList[`${levelMap[level]}_list`],
          )) {
            if (code.startsWith(prefixCode) && name === nameArr[level]) {
              return level === nameArr.length - 1
                ? code
                : search(level + 1, code.substring(0, (level + 1) * 2));
            }
          }
        }

        const res = search(0, '');
        return res;
      }
      return names;
    },
    convertCode(code) {
      if (this.converter === 'name') {
        this.setTitle();
        return this.getTitle;
      }
      return code;
    },

    genColumnsTopForNew() {
      let topSlot = this.slots('picker-top');
      let titleSlot = this.slots('pannel-title');
      if (this.inDesigner()) {
        if (!topSlot) {
          topSlot = <EmptyCol></EmptyCol>;
        }
        if (!titleSlot) {
          titleSlot = <EmptyCol></EmptyCol>;
        }
      }
      return (
        <template slot="columns-top">
          <div class={bem('picker-top')}>
            {topSlot && (
              <div
                vusion-slot-name="picker-top"
                style="display:flex; justify-content: space-between; align-items: center; min-height:32px;"
              >
                {topSlot}
              </div>
            )}
            <div
              style="position:absolute; top: 50%; left:50%; transform: translate(-50%,-50%);"
              vusion-slot-name="pannel-title"
            >
              {titleSlot || this.title}
            </div>
          </div>
        </template>
      );
    },

    genColumnsBottomForNew() {
      let bottomSlot = this.slots('picker-bottom');
      if (this.inDesigner()) {
        if (!bottomSlot) {
          bottomSlot = <EmptyCol></EmptyCol>;
        }
      }

      if (!bottomSlot) return null;

      return (
        <template slot="columns-bottom">
          <div vusion-slot-name="picker-bottom" class={bem('picker-bottom')}>
            {bottomSlot}
          </div>
        </template>
      );
    },

    onClickField() {
      if (this.readonly || this.disabled) {
        return;
      }

      this.togglePopup();
    },
  },

  render() {
    const on = {
      ...this.$listeners,
      change: this.onChange,
      confirm: this.onConfirm,
    };
    const tempSlot = {
      title: () => this.slots('title'),
    };

    if (this.isPreview) {
      return (
        <div class={bem('wrappparea')} vusion-click-enabled="true">
          <Field
            label={this.labelField}
            value={this.getTitle || '--'}
            scopedSlots={tempSlot}
            readonly
            isLink
            input-align={this.inputAlign || 'right'}
            // eslint-disable-next-line no-prototype-builtins
            notitle={!this.$slots.hasOwnProperty('title')}
            insel={true}
            nofi={true}
          />
        </div>
      );
    }

    let children = null;
    if (this.isNew) {
      children = (
        <Picker
          ref="picker"
          class={bem()}
          showToolbar
          valueKey="name"
          toolbarPosition="none"
          title={this.title}
          columns={this.displayColumns}
          columnsprop={this.displayColumns}
          loading={this.loading}
          readonly={this.readonly}
          itemHeight={this.itemHeight}
          swipeDuration={this.swipeDuration}
          visibleItemCount={this.visibleItemCount}
          cancelButtonText={this.cancelButtonText}
          confirmButtonText={this.confirmButtonText}
          onCancel={this.onCancel}
          {...{ on }}
        >
          {this.genColumnsTopForNew()}
          {this.genColumnsBottomForNew()}
        </Picker>
      );
    } else {
      children = (
        <Picker
          ref="picker"
          class={bem()}
          showToolbar
          valueKey="name"
          title={this.title}
          columns={this.displayColumns}
          columnsprop={this.displayColumns}
          loading={this.loading}
          readonly={this.readonly}
          itemHeight={this.itemHeight}
          swipeDuration={this.swipeDuration}
          visibleItemCount={this.visibleItemCount}
          cancelButtonText={this.cancelButtonText}
          confirmButtonText={this.confirmButtonText}
          onCancel={this.onCancel}
          scopedSlots={pickSlots(this, [
            'title',
            'columns-top',
            'columns-bottom',
          ])}
          {...{ on }}
        />
      );
    }

    return (
      <div class={bem('wrappparea')} vusion-click-enabled="true">
        <Field
          label={this.labelField}
          value={this.getTitle}
          scopedSlots={tempSlot}
          readonly
          disabled={this.disabled}
          placeholder={this.placeholder}
          isLink
          input-align={this.inputAlign || 'right'}
          onClick={this.inDesigner() ? this.designerOpen : this.onClickField}
          // eslint-disable-next-line no-prototype-builtins
          notitle={!this.$slots.hasOwnProperty('title')}
          insel={true}
          nofi={true}
        />
        <Popup
          safe-area-inset-bottom
          round
          ref="popforcas"
          class={bem('popup')}
          position={'bottom'}
          closeOnClickOverlay={this.closeOnClickOverlay}
          // onClickOverlay={this.togglePopup}
          get-container="body" // 放body下不易出现异常情况
          vusion-scope-id={this?.$vnode?.context?.$options?._scopeId}
          {...{
            attrs: { ...this.$attrs, 'vusion-empty-background': undefined },
          }}
        >
          <div class={bem(this.isNew && 'content-wrapper')}>
            {this.inDesigner() && (
              <div
                class={bem('designer-close-button')}
                vusion-click-enabled="true"
                onClick={this.designerClose}
              >
                点击关闭
              </div>
            )}
            {children}
          </div>
        </Popup>
      </div>
    );
  },
});
