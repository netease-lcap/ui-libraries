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
      "d": "M13.12 3.47c-.35-.53-.81-.96-1.37-1.28-1.5-.87-3.45-.71-5.24.29A10.77 10.77 0 001 12a10.97 10.97 0 0011 11A10.96 10.96 0 0023 11.9c-.02-1.93-.8-4.3-2.02-6.2-1.22-1.88-3.1-3.6-5.43-3.58-1.14 0-1.92.63-2.43 1.34zm6.65 4.14a4.75 4.75 0 00-1.26-.03l-1.16-1.95-1.72 1.02.9 1.5a6.8 6.8 0 00-1.07.63l-.02-.06a5.28 5.28 0 00-1.47-2.14v-.02c.07-.32.18-.74.34-1.14.38-.92.81-1.29 1.25-1.29 1.3-.01 2.64.98 3.74 2.67.17.26.32.54.47.81zm-6.16 3c-.33 0-.67.05-1 .12a3.76 3.76 0 00-1.06-1.15A3.22 3.22 0 008.5 9.2l-.33-.18 3.23-3.17-1.4-1.43-3.83 3.76a5.47 5.47 0 00-2.25-.22A8.7 8.7 0 017.5 4.22c1.36-.76 2.53-.72 3.27-.3.7.4 1.28 1.31 1.13 2.94l-.04.5.38.34c.82.73 1.16 1.2 1.3 1.64.11.32.15.7.08 1.27zm-2.81 1a5.84 5.84 0 00-1.76 2.8l-2.97-3.26-1.48 1.35 4.08 4.49c0 1.19.15 2.4.37 3.51A8.95 8.95 0 013 12c0-1.04.29-1.6.63-1.86.32-.23 1.03-.42 2.47.1.52.2 1.13.5 1.82.93l.5.31.51-.29c.63-.35 1.1-.23 1.47.03.16.11.3.25.4.4zm1.76 9.37l7.3-8.03-1.48-1.35-2.94 3.23.01-1.01-2-.02-.02 3.25-2.49 2.74c-.18-1.02-.3-2.12-.26-3.15.06-1.75.77-3.2 1.8-3.76a3.07 3.07 0 011.8-.23l.88.16.25-.87c.12-.45.46-.94 1-1.37a4.77 4.77 0 011.83-.92c.8-.2 1.48-.1 1.93.22.4.27.79.82.83 1.95V12c0 4.83-3.72 8.7-8.44 8.98z"
    }
  }]
};
var Cabbage = Vue.extend({
  name: "CabbageIcon",
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
      id: "cabbage",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default Cabbage;
//cabbage.js.map
