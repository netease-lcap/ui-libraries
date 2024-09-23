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
      "d": "M2 2h5.08A3.93 3.93 0 0111 5.92V11H5.92A3.93 3.93 0 012 7.08V2zm2 2v3.08C4 8.14 4.86 9 5.92 9H9V5.92C9 4.86 8.14 4 7.08 4H4zm12.92 0C15.86 4 15 4.86 15 5.92V9h3.08C19.14 9 20 8.14 20 7.08V4h-3.08zM13 5.92A3.93 3.93 0 0116.92 2H22v5.08A3.93 3.93 0 0118.08 11H13V5.92zM5.92 15C4.86 15 4 15.86 4 16.92V20h3.08C8.14 20 9 19.14 9 18.08V15H5.92zM2 16.92A3.93 3.93 0 015.92 13H11v5.08A3.93 3.93 0 017.08 22H2v-5.08zM13 13h5.08A3.93 3.93 0 0122 16.92V22h-5.08A3.93 3.93 0 0113 18.08V13zm2 2v3.08c0 1.06.86 1.92 1.92 1.92H20v-3.08c0-1.06-.86-1.92-1.92-1.92H15z"
    }
  }]
};
var System3 = Vue.extend({
  name: "System3Icon",
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
      id: "system-3",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default System3;
//system-3.js.map
