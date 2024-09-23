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
      "d": "M16.52 4.11l.98.98L19.6 3c-.37-.06-.78 0-1.26.16a7.6 7.6 0 00-1.8.95zm4.48.32L18.92 6.5l.97.98c.4-.58.75-1.2.95-1.8.16-.47.22-.89.16-1.25zm-2.34 4.65L17.5 7.92l-1.57 1.57 1.34 1.34.99-1.24.4-.51zm-2.65 3.32l-1.5-1.5-2.06 2.06c1-.05 2 .04 2.9.26l.66-.82zm1.31 1.57a9.17 9.17 0 011.86 1.3l.02.01v.01l1.38 1.38-1.9.31h-.02l-.14.05c-.15.04-.39.13-.73.29-.68.3-1.74.9-3.19 1.98l-.52.4c-1 .79-2.58 2.02-4.26 2.7-1.03.4-2.2.65-3.38.41a5.2 5.2 0 01-3.15-2.1 5.2 5.2 0 01-2.1-3.15 6.01 6.01 0 01.42-3.38c.67-1.68 1.9-3.25 2.69-4.26l.4-.52a17.9 17.9 0 001.98-3.2 6.25 6.25 0 00.34-.88l.31-1.9 1.38 1.37v.01l.02.02a3.77 3.77 0 01.2.22 8.18 8.18 0 011.1 1.62l4.35-3.44c.82-.66 2.02-1.53 3.32-1.96 1.33-.44 2.93-.48 4.23.83 1.29 1.3 1.25 2.9.8 4.22-.43 1.3-1.29 2.49-1.95 3.31l-.96 1.21-1.69 2.12-.8 1.02zm-2.4-8.63l-1.76 1.38 1.36 1.35 1.57-1.57-1.17-1.16zM13.1 9.49L11.6 7.97l-.82.65c.23.92.32 1.92.27 2.93l2.06-2.06zm-3.47 6.3l-4.27 4.26c.5.48 1 .7 1.46.8.68.13 1.44.01 2.26-.32a15.97 15.97 0 003.69-2.34l.63-.49a21.7 21.7 0 013.03-1.94c-.3-.16-.65-.32-1.02-.44-1.83-.61-4.23-.48-5.78.47zm-5.68 2.85l4.26-4.27c.95-1.55 1.08-3.97.47-5.8-.13-.37-.28-.7-.44-1A21.7 21.7 0 016.3 10.6l-.49.63c-.8 1.02-1.8 2.3-2.34 3.69a4.04 4.04 0 00-.32 2.26c.1.47.32.96.8 1.46z"
    }
  }]
};
var Corn = Vue.extend({
  name: "CornIcon",
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
      id: "corn",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default Corn;
//corn.js.map
