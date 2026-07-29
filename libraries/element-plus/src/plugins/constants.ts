export const $deletePropsList = Symbol('deletePropsList');
export const $dataSourceField = Symbol('dataSourceField');
export const $labelKey = Symbol('labelKey');
export const $valueKey = Symbol('valueKey');

export const $provide = '__LCAP_UI_PROVIDE__';
export const $inject = Symbol('inject');
export const $formTagName = Symbol('formTagName');
export const $tagName = Symbol('tagName');
export const $mergeRef = Symbol('mergeRef');
export const $router = Symbol('router');
export const $route = Symbol('route');

export const $dataSourceDeleteField = ['dataSource', 'textField', 'valueField', 'parentField', 'childrenField'] as const;

export const $rootStyle = [
  'margin',
  'marginLeft',
  'marginRight',
  'marginBottom',
  'marginTop',
  'position',
  'left',
  'right',
  'bottom',
  'top',
  'display',
  'flex',
  'order',
  'visibility',
  'zIndex',
  'boxSizing',
  'flexGrow',
  'flexShrink',
  'flexBasis',
  'alignSelf',
] as const;
export const $bothStyle = ['width', 'height', 'minWidth', 'maxWidth', 'minHeight', 'maxHeight'] as const;

export const $ide = Symbol('ide');
