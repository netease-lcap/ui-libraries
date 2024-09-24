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
      "d": "M14.43 6.2c-.68.42-1.36.9-2.05 1.44.84.14 1.56.48 2.09.9H11.3a29.22 29.22 0 00-2.07 2h8.5l-.38-1.29a5.15 5.15 0 00-2.92-3.06z"
    }
  }, {
    "tag": "path",
    "attrs": {
      "fill": "currentColor",
      "d": "M8.33 22.28a10.64 10.64 0 0012.91-4.72l.3-.55.73-1.45h-7.32l-.26.2a4.5 4.5 0 01-2.69.87c-1.08 0-1.9-.36-2.53-.95-.38-.35-.7-.8-.94-1.34l11.19-.1h2.93v-1.97a10.59 10.59 0 00-.57-3.44c.52-1.25.83-2.46.85-3.55a4.14 4.14 0 00-1.1-3.1 4.07 4.07 0 00-2.94-1.1 9.69 9.69 0 00-3.96.94A10.66 10.66 0 001.81 15.44a9.55 9.55 0 00-.74 3.45c.01 1.1.32 2.16 1.1 2.94a4.12 4.12 0 003.1 1.1 9.52 9.52 0 003.06-.65zM8.8 8.8a23.03 23.03 0 017.26-5.08 7.73 7.73 0 012.82-.64c.75 0 1.23.2 1.53.5.32.32.53.84.52 1.65 0 .32-.05.67-.13 1.04A10.74 10.74 0 0019 4.24a9.56 9.56 0 00-2.33.74 8.68 8.68 0 013.98 7.25h-.93l-12.06.12a24.2 24.2 0 00-1.31 1.83 6.56 6.56 0 001.75 2.96c1 .94 2.33 1.5 3.9 1.5a6.5 6.5 0 003.6-1.08h3.24A8.63 8.63 0 014.8 17.1l-.02.04a8.6 8.6 0 00-.62 2.37c.48.52 1 .98 1.57 1.4l-.5.03c-.82.02-1.33-.2-1.64-.51-.3-.3-.51-.79-.52-1.54 0-.76.2-1.72.64-2.82.89-2.2 2.64-4.81 5.09-7.26zm-5.47 3.64v-.17a8.66 8.66 0 018.68-8.66c-1.55 1-3.12 2.28-4.62 3.78a28.24 28.24 0 00-4.06 5.05z"
    }
  }]
};
var LogoIe = Vue.extend({
  name: "LogoIeIcon",
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
      id: "logo-ie",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default LogoIe;
//logo-ie.js.map
