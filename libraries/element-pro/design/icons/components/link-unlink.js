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
      "d": "M4.3 2.89l3.54 3.54-1.41 1.41L2.89 4.3 4.3 2.9zm5.95-1.7v4.5h-2v-4.5h2zm-8.9 6.9h4.5v2h-4.5v-2zm13.48-2.46l-3.05 3.05-1.4-1.42 3.03-3.04a4.5 4.5 0 016.37 6.36l-3.05 3.05-1.41-1.42 3.04-3.04a2.5 2.5 0 10-3.53-3.54zm-9.2 9.2a2.5 2.5 0 103.54 3.53l3.05-3.04 1.41 1.41-3.04 3.05a4.5 4.5 0 01-6.37-6.37l3.05-3.04 1.41 1.41-3.04 3.05zm12.69-1.08h4.5v2h-4.5v-2zm-2.41 4.4v4.5h-2v-4.5h2zm1.66-2l3.54 3.54-1.42 1.42-3.53-3.54 1.41-1.41z"
    }
  }]
};
var LinkUnlink = Vue.extend({
  name: "LinkUnlinkIcon",
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
      id: "link-unlink",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default LinkUnlink;
//link-unlink.js.map
