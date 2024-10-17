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
      "d": "M12 3a7 7 0 00-7 7c0 2.86 1.78 5.62 3.74 7.76a26.16 26.16 0 003.26 3 24.68 24.68 0 003.26-3C17.22 15.62 19 12.86 19 10a7 7 0 00-7-7zm0 20.21l-.57-.39-.03-.02-.07-.05a16.88 16.88 0 01-1.22-.94 28.16 28.16 0 01-2.85-2.7C5.22 16.88 3 13.64 3 10a9 9 0 0118 0c0 3.64-2.22 6.88-4.26 9.11a28.15 28.15 0 01-4.14 3.7h-.02l-.01.01-.57.4zM9 7h4.64c.44 0 1.02.16 1.5.57.52.45.86 1.14.86 2.03 0 .9-.34 1.58-.86 2.03-.48.41-1.06.57-1.5.57H11V15H9V7zm2 3.2h2.64l.07-.02a.38.38 0 00.23-.21.91.91 0 00.06-.37c0-.19-.03-.3-.06-.37a.38.38 0 00-.3-.23H11v1.2z"
    }
  }]
};
var LocationParkingPlace = Vue.extend({
  name: "LocationParkingPlaceIcon",
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
      id: "location-parking-place",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default LocationParkingPlace;
//location-parking-place.js.map
