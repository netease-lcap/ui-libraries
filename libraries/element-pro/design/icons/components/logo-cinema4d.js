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
      "d": "M2.75 17.95l.02.04.03.06A10.98 10.98 0 0012 23a11 11 0 10-9.25-5.05zm.67-8.68a9 9 0 0111.61-5.75c-.08.21-.2.31-.4.36-1 .27-1.96.52-2.93.71C9.57 5 7.57 5.75 5.8 7.11a9.96 9.96 0 00-2.38 2.16zm1.52 8.32c-.15-.2-.3-.4-.44-.62-.92-1.98-.88-3.61-.39-4.92a7.02 7.02 0 012.81-3.28l.03-.02.03-.03.56-.4a6.67 6.67 0 00.7 6.14 7.1 7.1 0 006.84 3.05c-1.5 1.66-3.89 2.73-5.97 2.5a6.56 6.56 0 01-4.17-2.42zm15.41-8.96a9 9 0 01-6.06 12.07 9.67 9.67 0 002.8-2.5h.01c1.31-1.78 2-3.8 2.31-5.9.14-.94.32-1.87.5-2.81.08-.35.22-.63.44-.86zM16.83 4.4a9.05 9.05 0 012.55 2.46 2.4 2.4 0 00-.25.18l-.01.01c-.64.56-1.01 1.29-1.16 2.04-.2.96-.38 1.93-.52 2.92-.16 1.02-.4 1.98-.77 2.88a5.11 5.11 0 01-6.76-1.54 4.75 4.75 0 011.3-6.6l.86-.2c1.05-.2 2.08-.46 3.08-.73a2.5 2.5 0 001.68-1.42z"
    }
  }]
};
var LogoCinema4D = Vue.extend({
  name: "LogoCinema4DIcon",
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
      id: "logo-cinema4d",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default LogoCinema4D;
//logo-cinema4d.js.map
