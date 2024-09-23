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
      "d": "M2 2h20v20H2V2zm2 2v16h16V4H4zm12.5 3a.5.5 0 00-.5.5c0 .22.16.55.49.9a3.86 3.86 0 00.02 0c.33-.35.49-.68.49-.9a.5.5 0 00-.5-.5zm0 3.96c-.3-.2-.6-.4-.87-.62-.17-.14-.4-.33-.62-.58A3.47 3.47 0 0114 7.5a2.5 2.5 0 015 0c0 1-.6 1.8-1.01 2.26a6.1 6.1 0 01-.62.58c-.28.23-.58.42-.87.62zm-8-.96a.5.5 0 00-.5.5c0 .22.16.55.49.9l.01.02.01-.01c.33-.36.49-.69.49-.91a.5.5 0 00-.5-.5zm0 3.96c-.22-.15-.45-.3-.66-.46a5.54 5.54 0 01-.83-.74A3.47 3.47 0 016 10.5a2.5 2.5 0 015 0c0 1-.6 1.8-1.01 2.26a6.1 6.1 0 01-.83.75c-.21.16-.44.3-.66.45zm11.29-.37l-5.88 2.2-.7-1.88 5.88-2.2.7 1.88zm-8 3l-5.88 2.2-.7-1.88 5.88-2.2.7 1.88z"
    }
  }]
};
var MapDistance = Vue.extend({
  name: "MapDistanceIcon",
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
      id: "map-distance",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default MapDistance;
//map-distance.js.map
