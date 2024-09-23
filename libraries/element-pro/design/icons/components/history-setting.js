import { _ as _defineProperty } from '../_chunks/dep-a77ab85e.js';
import { _ as _objectWithoutProperties } from '../_chunks/dep-0acb3ad3.js';
import Vue from 'vue';
import IconBase from '../icon.js';
import useSizeProps from '../utils/use-size-props.js';
import 'classnames';
import '../utils/use-common-classname.js';
import '../utils/config-context.js';

var _excluded = ["size"];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var element = {
  "tag": "svg",
  "attrs": {
    "fill": "none",
    "viewBox": "0 0 24 24",
    "width": "1em",
    "height": "1em"
  },
  "children": [{
    "tag": "path",
    "attrs": {
      "fill": "currentColor",
      "d": "M12 3.5a8.46 8.46 0 00-7.21 4H8.5v2h-7v-7h2v3.33A10.55 10.55 0 0112 1.5c5.8 0 10.5 4.7 10.5 10.5v1h-2v-1c0-4.7-3.8-8.5-8.5-8.5zM13 6v5.59l1.66 1.66-1.41 1.41L11 12.41V6h2zm-9.56 5.9l.1 1A8.5 8.5 0 0012 20.5h1v2h-1a10.5 10.5 0 01-10.44-9.4l-.1-.99 1.98-.2zM19.5 14v1.14a3.5 3.5 0 011.4.82l1-.57 1 1.73-1 .57a3.51 3.51 0 010 1.62l1 .58-1 1.73-1-.58c-.39.38-.87.66-1.4.82V23h-2v-1.14a3.5 3.5 0 01-1.4-.82l-1 .58-1-1.73 1-.58a3.5 3.5 0 010-1.62l-1-.57 1-1.73 1 .57c.39-.37.87-.66 1.4-.82V14h2zm-1 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
    }
  }]
};
var HistorySetting = Vue.extend({
  name: "HistorySettingIcon",
  functional: true,
  props: {
    size: {
      type: String
    },
    onClick: {
      type: Function
    }
  },
  render: function render(createElement, context) {
    var props = context.props,
      data = context.data;
    var size = props.size,
      otherProps = _objectWithoutProperties(props, _excluded);
    var _useSizeProps = useSizeProps(size),
      className = _useSizeProps.className,
      style = _useSizeProps.style;
    var fullProps = _objectSpread(_objectSpread({}, otherProps || {}), {}, {
      id: "history-setting",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default HistorySetting;
//history-setting.js.map
