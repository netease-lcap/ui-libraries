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
      "d": "M10.41 3.7c-.3.43-.41.96-.41 1.3v.52l-.43.3c-.36.26-.77.71-1 1.33l-.04.09c-.23.6-.4 1.07-.4 1.6 0 .48.17 1.12.95 1.96.45.42.77.64 1.15.9l.06.03.54.37.17-.34v-1.35L8.59 8 10 6.59l1 1V5h2v2.59l1-1L15.41 8 13 10.41v1.35l.17.34.54-.37.06-.04c.38-.25.7-.47 1.15-.9.78-.83.94-1.47.95-1.96a4.33 4.33 0 00-.44-1.68 2.91 2.91 0 00-1-1.33l-.43-.3V5c0-.34-.11-.87-.41-1.3-.27-.36-.72-.7-1.59-.7-.87 0-1.32.34-1.59.7zm5.86 8.57a9.34 9.34 0 01-1.45 1.13l-.38.25a17.23 17.23 0 001.59-.53c1.34-.48 2.56-.92 3.49-1.55.94-.64 1.48-1.4 1.48-2.57 0-.9-.2-1.39-.39-1.64a1.13 1.13 0 00-.79-.43 4.61 4.61 0 00-2.2.4c.12.37.22.8.24 1.27l1.35-1 1.19 1.6-4.13 3.07zm.55-6.78c1-.4 2.19-.7 3.3-.54.77.11 1.54.47 2.1 1.2.53.72.78 1.68.78 2.85 0 2-1.03 3.32-2.36 4.23-.92.62-2.03 1.08-3.1 1.47.28.43.55.87.78 1.3.44.8.84 1.7.92 2.57.1.94-.17 1.9-1.08 2.56-.74.54-1.8.8-3.14.86-.7.64-1.7 1.01-3.02 1.01a4.32 4.32 0 01-3.02-1.01 5.7 5.7 0 01-3.14-.86 2.68 2.68 0 01-1.08-2.56c.08-.86.48-1.76.92-2.56.23-.44.5-.88.78-1.3-1.07-.4-2.18-.86-3.1-1.48A4.9 4.9 0 011 9c0-1.17.25-2.13.79-2.85a3.12 3.12 0 012.1-1.2c1.1-.16 2.3.14 3.3.54.24-.4.54-.73.84-1 .08-.6.3-1.31.76-1.95A3.78 3.78 0 0112 1c1.53 0 2.58.66 3.21 1.54.46.64.68 1.35.76 1.95.3.27.6.6.85 1zM6.38 7.32a4.61 4.61 0 00-2.2-.4c-.37.06-.62.2-.8.44C3.2 7.6 3 8.09 3 9c0 1.17.54 1.93 1.48 2.57.93.63 2.15 1.07 3.49 1.55l.37.14c.42.15.83.28 1.22.39a22.67 22.67 0 00-.44-.3 9.34 9.34 0 01-1.4-1.08L3.6 9.2l1.2-1.6 1.34.99c.02-.47.12-.9.24-1.28zm2.91 8.33l-.89-.26c-.35.53-.69 1.06-.97 1.58-.4.73-.64 1.34-.68 1.8-.04.4.05.59.27.75.17.12.45.25.89.34-.08-.65 0-1.26.14-1.68l.02-.06 1.22-2.47zM12 14.32l-.32 1.01-1.75 3.54c-.04.16-.07.41-.04.69.03.3.13.6.31.81.23.29.7.63 1.8.63s1.57-.34 1.8-.63c.18-.22.28-.5.31-.81.03-.28 0-.53-.04-.69l-1.75-3.54-.32-1zm4.1 5.54c.43-.1.71-.22.88-.34.22-.16.31-.35.27-.75a5.22 5.22 0 00-.68-1.8c-.28-.52-.62-1.05-.97-1.58-.3.1-.6.18-.9.26l1.23 2.47.02.06c.14.42.22 1.03.14 1.68z"
    }
  }]
};
var ChineseCabbage = Vue.extend({
  name: "ChineseCabbageIcon",
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
      id: "chinese-cabbage",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default ChineseCabbage;
//chinese-cabbage.js.map
