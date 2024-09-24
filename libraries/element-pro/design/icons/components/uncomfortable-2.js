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
      "d": "M12 3a9 9 0 100 18 9 9 0 000-18zM1 12a11 11 0 1122 0 11 11 0 01-22 0zm6.62-4.86L11 9.04v1.46l-3.2 2.4-1.2-1.6 1.86-1.4-1.82-1.02.98-1.74zm9.74 1.74l-1.82 1.03 1.86 1.39-1.2 1.6-3.2-2.4V9.04l3.38-1.9.98 1.74zM9.5 15.5a1 1 0 00-1 1v1h-2v-1a3 3 0 015.06-2.18.99.99 0 00.25.18h.38l.04-.02a.99.99 0 00.2-.16 3 3 0 015.07 2.18v1h-2v-1a1 1 0 00-1.69-.73c-.32.31-.88.73-1.62.73h-.38a2.4 2.4 0 01-1.62-.73 1 1 0 00-.69-.27zm2.68-1zm-.36 0z"
    }
  }]
};
var Uncomfortable2 = Vue.extend({
  name: "Uncomfortable2Icon",
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
      id: "uncomfortable-2",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default Uncomfortable2;
//uncomfortable-2.js.map
