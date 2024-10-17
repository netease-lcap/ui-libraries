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
      "d": "M19.7 2.13l-.47 1.97a5.5 5.5 0 012.76 5.72l-.18 1.03c-.38 2.07-1.6 6.03-4.1 8.52-2.72 2.72-6.3 3.24-9.08 3.12a19.37 19.37 0 01-4.93-.87h-.03v-.01l-3.2-1.13 3.3-.78.04-.02c.04 0 .1-.03.19-.06.17-.06.43-.15.74-.3.64-.3 1.5-.8 2.38-1.6 1.75-1.59 3.66-4.43 4-9.45v-.16c.22-3.16 3.34-5.04 6.2-4.64l.44-1.81 1.94.47zM7 20.33c.53.08 1.1.14 1.71.17 2.51.1 5.43-.39 7.58-2.54 1.9-1.9 3-4.98 3.44-6.96l-.86-.85-1.65 1.1-1-1.5-1.5 1-1.17-1.74-.5.12c-.5 5.1-2.54 8.22-4.58 10.07-.5.45-1 .83-1.46 1.14zm6.56-13.38l.88-.22.83 1.25 1.5-1 1 1.5 1.35-.9.91.9a3.5 3.5 0 00-2.9-3.02 3.58 3.58 0 00-3.57 1.49z"
    }
  }]
};
var Chili = Vue.extend({
  name: "ChiliIcon",
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
      id: "chili",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default Chili;
//chili.js.map
