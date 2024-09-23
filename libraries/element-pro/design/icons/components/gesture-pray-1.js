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
      "d": "M7.04 4.99a.45.45 0 00-.74.5 2.34 2.34 0 00.09.18l.12.24 1.96 4-2.16 4.66 3.64 1.11 1-5.97.01-.04.04-.22v-.01-.02c-.04-.35-.2-.67-.45-.92L7.04 5zm2.58 12.68L4.77 16.2H4v2.96h5.37l.25-1.48zM4.28 14.2l1.97-4.25L4.7 6.76l-.01-.01-.08-.17-.01-.02a2.45 2.45 0 013.85-2.99l3.52 3.52.03.03.03-.03 3.52-3.52a2.45 2.45 0 013.85 3l-.09.18v.01l-1.56 3.18 1.97 4.25H22v6.96h-9.06L12 15.56l-.94 5.59H2v-6.96h2.28zM13 9.45c0 .04 0 .11.04.22v.04l1 5.97 3.65-1.11-2.16-4.66 1.96-4 .12-.24.02-.03.07-.16a.45.45 0 00-.74-.5L13.45 8.5a1.56 1.56 0 00-.45.94m6.23 6.75l-4.85 1.48.25 1.48H20v-2.96h-.77z"
    }
  }]
};
var GesturePray1 = Vue.extend({
  name: "GesturePray1Icon",
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
      id: "gesture-pray-1",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default GesturePray1;
//gesture-pray-1.js.map
