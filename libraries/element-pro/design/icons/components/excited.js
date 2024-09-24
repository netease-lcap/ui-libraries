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
      "d": "M12 3a9 9 0 100 18 9 9 0 000-18zM1 12a11 11 0 1122 0 11 11 0 01-22 0zm6.62-4.86L11 9.04v1.46l-3.2 2.4-1.2-1.6 1.86-1.4-1.82-1.02.98-1.74zm9.74 1.74l-1.82 1.03 1.86 1.39-1.2 1.6-3.2-2.4V9.04l3.38-1.9.98 1.74zM12 11.26l.9 1.8c.37.75.85.98 1.18 1 .22.02.45-.03.67-.18l.83-.57 1.12 1.66-.82.56c-.36.24-.76.41-1.17.49-.18.44-.4.93-.67 1.38-.2.34-.44.7-.73.99-.26.26-.7.61-1.3.61-.61 0-1.06-.35-1.32-.61a4.9 4.9 0 01-.73-.99c-.26-.45-.49-.94-.67-1.38a3.1 3.1 0 01-1.16-.49l-.83-.56 1.12-1.66.83.57c.22.15.45.2.67.19.33-.03.8-.26 1.19-1.02l.9-1.79zm-.68 4.42a8.04 8.04 0 00.68 1.18 8.02 8.02 0 00.68-1.18c-.24-.14-.47-.3-.68-.5-.21.2-.44.36-.68.5z"
    }
  }]
};
var Excited = Vue.extend({
  name: "ExcitedIcon",
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
      id: "excited",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default Excited;
//excited.js.map
