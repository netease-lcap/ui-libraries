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
      "d": "M13 1v3.53a4.34 4.34 0 013.43 4.2c0 .94-.3 1.79-.8 2.49l2.48 4.88c.6-.2 1.2-.44 1.78-.7l.9-.42.84 1.82-.91.41c-.56.25-1.12.48-1.7.68L21.64 23h-2.25l-2.3-4.52a21.1 21.1 0 01-10.16 0L4.62 23H2.37l2.6-5.1c-.57-.2-1.13-.44-1.69-.69l-.9-.41.82-1.82.91.41c.58.27 1.18.5 1.78.7l2.48-4.87c-.5-.7-.8-1.55-.8-2.48A4.34 4.34 0 0111 4.54V1h2zM7.85 16.65c2.73.6 5.57.6 8.3 0l-2.09-4.1a4.5 4.5 0 01-4.12 0l-2.09 4.1zM12 6.42a2.37 2.37 0 00-2.43 2.32A2.37 2.37 0 0012 11.05a2.37 2.37 0 002.43-2.31A2.37 2.37 0 0012 6.42z"
    }
  }]
};
var Dividers1 = Vue.extend({
  name: "Dividers1Icon",
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
      id: "dividers-1",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default Dividers1;
//dividers-1.js.map
