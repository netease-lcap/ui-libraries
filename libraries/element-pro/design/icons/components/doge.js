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
      "d": "M1 1h4.74l2.03 1.97a11.51 11.51 0 018.36-.04L17.61 1H23v12c-.24 5.61-5.13 10-11 10S1.24 18.61 1 13V1zm2 5.6a10.82 10.82 0 012.89-2.67L4.93 3H3v3.6zm0 5.99C3 17.18 6.97 21 12 21c5.03 0 9-3.82 9-8.41 0-3.27-2-6.14-4.98-7.53a9.47 9.47 0 00-8.04 0A8.38 8.38 0 003 12.6zM21 6.6V3h-2.4l-.64.83c1.19.73 2.22 1.67 3.04 2.77zM9 9v3H7V9h2zm8 0v3h-2V9h2zm-5 2.26l.9 1.8c.37.75.85.98 1.18 1 .22.02.45-.03.67-.18l.83-.57 1.12 1.66-.82.56c-.36.24-.76.41-1.17.49-.18.44-.4.93-.67 1.38-.2.34-.44.7-.73.99-.26.26-.7.61-1.3.61-.61 0-1.06-.35-1.32-.61a4.9 4.9 0 01-.73-.99c-.26-.45-.49-.94-.67-1.38a3.1 3.1 0 01-1.16-.49l-.83-.56 1.12-1.66.83.57c.22.15.45.2.67.19.33-.03.8-.26 1.19-1.02l.9-1.79zm-.68 4.42a8.04 8.04 0 00.68 1.18 8.02 8.02 0 00.68-1.18c-.24-.14-.47-.3-.68-.5-.21.2-.44.36-.68.5z"
    }
  }]
};
var Doge = Vue.extend({
  name: "DogeIcon",
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
      id: "doge",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default Doge;
//doge.js.map
