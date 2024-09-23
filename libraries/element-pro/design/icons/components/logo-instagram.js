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
      "d": "M11.95 1h.1c1.83 0 3.27 0 4.42.1 1.18.11 2.16.33 3.03.84a7 7 0 012.56 2.56c.5.87.73 1.85.84 3.03.1 1.15.1 2.6.1 4.42v.1c0 1.83 0 3.27-.1 4.42a7.16 7.16 0 01-.84 3.03 7 7 0 01-2.56 2.56c-.87.5-1.85.73-3.03.84-1.15.1-2.6.1-4.42.1h-.1c-1.83 0-3.27 0-4.42-.1a7.16 7.16 0 01-3.03-.84 7 7 0 01-2.56-2.56 7.17 7.17 0 01-.84-3.03c-.1-1.15-.1-2.6-.1-4.42v-.1c0-1.83 0-3.27.1-4.42.11-1.18.33-2.16.84-3.03A7 7 0 014.5 1.94c.87-.5 1.85-.73 3.03-.84 1.15-.1 2.6-.1 4.42-.1zM7.71 3.1c-1.04.1-1.7.27-2.21.57A5 5 0 003.67 5.5c-.3.52-.48 1.17-.57 2.21C3 8.76 3 10.11 3 12c0 1.89 0 3.24.1 4.29.1 1.04.27 1.7.57 2.21a5 5 0 001.83 1.83c.52.3 1.17.48 2.21.57 1.05.1 2.4.1 4.29.1 1.89 0 3.24 0 4.29-.1 1.04-.1 1.7-.27 2.21-.57a5 5 0 001.83-1.83c.3-.52.48-1.17.57-2.21.1-1.05.1-2.4.1-4.29 0-1.89 0-3.24-.1-4.29a5.23 5.23 0 00-.57-2.21 5 5 0 00-1.83-1.83 5.23 5.23 0 00-2.21-.57C15.24 3 13.89 3 12 3c-1.89 0-3.24 0-4.29.1zm9.04 3.15a1 1 0 112 0 1 1 0 01-2 0zM12 8.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zM6.5 12a5.5 5.5 0 1111 0 5.5 5.5 0 01-11 0z"
    }
  }]
};
var LogoInstagram = Vue.extend({
  name: "LogoInstagramIcon",
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
      id: "logo-instagram",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default LogoInstagram;
//logo-instagram.js.map
