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
      "d": "M12.81 1.41L12 .3l-.81 1.12-.01.02-.03.04a32.89 32.89 0 01-.64.85c-.43.55-1.03 1.3-1.71 2.1A33.3 33.3 0 016.6 6.8c-.77.74-1.49 1.3-2.07 1.62-.39.21-.73.36-1 .46-.3.1-.47.13-.53.13H2v2h1c.33 0 .67-.07 1-.18V20H2v2h20v-2h-2v-9.18c.33.1.67.18 1 .18h1V9h-1c-.06 0-.23-.02-.52-.13-.28-.1-.62-.25-1-.46-.6-.31-1.3-.88-2.07-1.62a33.29 33.29 0 01-2.2-2.36 54.47 54.47 0 01-2.36-2.96l-.03-.04v-.01h-.01zM16.87 9H7.13c.29-.24.57-.5.85-.76.82-.79 1.63-1.68 2.34-2.51.66-.78 1.25-1.5 1.68-2.07.43.56 1.02 1.3 1.68 2.07A35.24 35.24 0 0016.87 9zM6 11h12v9h-3v-3a3 3 0 00-6 0v3H6v-9zm5 9v-3a1 1 0 112 0v3h-2z"
    }
  }]
};
var Attic = Vue.extend({
  name: "AtticIcon",
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
      id: "attic",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default Attic;
//attic.js.map
