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
      "d": "M2 5a3 3 0 013-3h2a3 3 0 013 3v6H8V8.5H4V11H2V5zm2 1.5h4V5a1 1 0 00-1-1H5a1 1 0 00-1 1v1.5zm8-3h6a3 3 0 013 3V9h-2V6.5a1 1 0 00-1-1h-6v-2zm6 8V13h4v2h-1.06a7.97 7.97 0 01-2.2 4.56c.7.29 1.46.44 2.26.44h1v2h-1a7.96 7.96 0 01-4-1.07A7.96 7.96 0 0113 22h-1v-2h1c.8 0 1.56-.16 2.25-.44a8.01 8.01 0 01-1.48-2.13l-.43-.9 1.8-.86.44.9c.34.73.83 1.37 1.42 1.9 1-.89 1.69-2.1 1.92-3.47H12v-2h4v-1.5h2zM6 13v6a1 1 0 001 1h2.5v2H7a3 3 0 01-3-3v-6h2z"
    }
  }]
};
var Translate = Vue.extend({
  name: "TranslateIcon",
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
      id: "translate",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default Translate;
//translate.js.map
