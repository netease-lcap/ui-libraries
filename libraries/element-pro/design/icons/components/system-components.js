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
      "d": "M12 4c-.66 0-1.22.55-1.22 1.25S11.34 6.5 12 6.5c.66 0 1.22-.55 1.22-1.25S12.66 4 12 4zM8.78 5.25A3.24 3.24 0 0112 2a3.25 3.25 0 011 6.34v.84l3.85 2.25v4.45l.82.41c.56-.49 1.3-.79 2.1-.79 1.8 0 3.23 1.47 3.23 3.25A3.24 3.24 0 0119.78 22a3.24 3.24 0 01-3.14-3.98l-.75-.38L12 19.9l-3.88-2.27-.76.38A3.24 3.24 0 014.22 22 3.24 3.24 0 011 18.75a3.24 3.24 0 013.22-3.25c.81 0 1.55.3 2.11.8l.82-.42v-4.45L11 9.18v-.84a3.25 3.25 0 01-2.22-3.09zM12 10.91l-2.85 1.66v3.36L12 17.59l2.85-1.66v-3.36L12 10.91zm-6.78 7.12c-.22-.32-.59-.53-1-.53-.66 0-1.22.55-1.22 1.25S3.56 20 4.22 20c.67 0 1.22-.55 1.22-1.25 0-.15-.02-.29-.06-.42l-.16-.3zm13.4.3c-.04.14-.06.27-.06.42 0 .7.55 1.25 1.22 1.25.66 0 1.22-.55 1.22-1.25s-.56-1.25-1.22-1.25c-.41 0-.78.2-1 .53l-.16.3z"
    }
  }]
};
var SystemComponents = Vue.extend({
  name: "SystemComponentsIcon",
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
      id: "system-components",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default SystemComponents;
//system-components.js.map
