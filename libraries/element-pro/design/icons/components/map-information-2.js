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
      "d": "M12 4a3 3 0 00-3 3c0 1.24.78 2.5 1.74 3.54.45.5.91.91 1.26 1.2.35-.29.8-.7 1.26-1.2C14.22 9.5 15 8.24 15 7a3 3 0 00-3-3zm0 10.21l-.57-.39h-.02l-.04-.04a8.3 8.3 0 01-.63-.49c-.4-.33-.94-.8-1.48-1.4C8.22 10.75 7 9.01 7 7a5 5 0 0110 0c0 2.01-1.22 3.75-2.26 4.9a14.58 14.58 0 01-2.11 1.88l-.04.03-.02.01-.57.4zm0-6.96a.25.25 0 100-.5.25.25 0 000 .5zM10.25 7a1.75 1.75 0 113.5 0 1.75 1.75 0 01-3.5 0zm-7.14 3H7v2H4.9l-.78 7h15.76l-.77-7H17v-2h3.9l1.22 11H1.88l1.23-11z"
    }
  }]
};
var MapInformation2 = Vue.extend({
  name: "MapInformation2Icon",
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
      id: "map-information-2",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default MapInformation2;
//map-information-2.js.map
