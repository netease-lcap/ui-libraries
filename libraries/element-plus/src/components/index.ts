import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import _ from 'lodash';

export { ElFlex } from './el-flex';
export { ElText } from './el-text';
export { ElTabs, ElTabPane, ElTabsRegister } from './el-tabs';
export { ElInputPlus, ElInput, ElFormInput, ElInputRegister } from './el-input';
export { ElSelect, ElOption, ElFormSelect, ElSelectRegister } from './el-select';
export { ElCascader, ElFormCascader, ElCascaderRegister } from './el-cascader';
export { ElCheckbox, ElCheckboxGroup, ElFormCheckboxGroup, ElCheckboxRegister } from './el-checkbox';
export { ElTable, ElTableColumn, ElTablePlus, ElTableRegister, ElTableColumnRegister, ElTableToolBarRegister } from './el-table';
export { ElFormItemWrap, ElForm, ElFormItem, ElFormRegister, ElFormItemWrapRegister } from './el-form';
// export { ElPagination } from 'element-plus';
export { ElAbsoluteLayout } from './el-absolute-layout';
export { ElRouterView } from './el-router-view';
export { ElIframe } from './el-iframe';
export { ElLink, ElLinkPlus, ElLinkRegister } from './el-link';
export { ElButton, ElButtonPlus, ElButtonRegister } from './el-button';
export { ElInputNumber, ElInputNumberPlus, ElFormInputNumber, ElInputNumberRegister } from './el-input-number';
export { ElInputTag, ElInputTagPlus, ElFormInputTag, ElInputTagRegister } from './el-input-tag';
export { ElRate, ElRatePlus, ElFormRate, ElRateRegister } from './el-rate';
export { ElSwitch, ElSwitchPlus, ElFormSwitch, ElSwitchRegister } from './el-switch';
export { ElTreeSelect, ElTreeSelectPlus, ElFormTreeSelect, ElTreeSelectRegister } from './el-tree-select';
export { ElSlider, ElSliderPlus, ElFormSlider, ElSliderRegister } from './el-slider';
export { ElCalendar, ElCalendarPlus, ElCalendarRegister } from './el-calendar';
export { ElCard, ElCardPlus, ElCardRegister } from './el-card';
export { ElRow, ElCol, ElColRegister } from './el-row';
export { ElPagination, ElPaginationRegister } from './el-pagination';
export { ElDescriptions, ElDescriptionsItem, ElDescriptionsCell, ElDescriptionsRegister } from './el-descriptions';
export { ElImage, ElImageViewer, ElImageRegister, ElImageViewerRegister } from './el-image';
export { ElScrollbar, ElScrollbarRegister } from './el-scrollbar';
export { ElMenu, ElMenuItem, ElMenuItemGroup, ElSubMenu, ElMenuRegister, ElMenuItemRegister, ElMenuItemGroupRegister, ElSubMenuRegister } from './el-menu';
export { ElUpload, ElFormUpload, ElUploadRegister } from './el-upload';
export { ElTimePicker, ElFormTimePicker, ElTimePickerRegister } from './el-time-picker';
export { ElTimeSelect, ElFormTimeSelect, ElTimeSelectRegister } from './el-time-select';
export { ElIcon } from './el-icon';
export { ElMention, ElFormMention, ElMentionRegister } from './el-mention';
export { ElBreadcrumb, ElBreadcrumbItem, ElBreadcrumbRegister, ElBreadcrumbItemRegister } from './el-breadcrumb';
export { ElBacktop, ElBacktopDesigner, ElBacktopRegister } from './el-backtop';
export { ElPageHeader, ElPageHeaderRegister } from './el-page-header';
export { ElSteps, ElStep, ElStepsRegister, ElStepRegister } from './el-steps';
export { ElAlert, ElAlertRegister } from './el-alert';
export { ElDialog, ElDialogRegister } from './el-dialog';
export { ElDrawer, ElDrawerRegister } from './el-drawer';
export { ElPopover, ElPopoverRegister } from './el-popover';
export { ElMessage, ElMessageDesigner } from './el-message';
export { ElMessageBox, ElMessageBoxDesigner } from './el-message-box';
export { ElNotification, ElNotificationDesigner } from './el-notification';
export { ElLoading } from './el-loading';
export { ElDatePicker, ElFormDatePicker, ElDatePickerRegister } from './el-date-picker';
export { ElTransfer, ElFormTransfer, ElTransferRegister } from './el-transfer';
export { ElTree, ElTreeRegister } from './el-tree';
export { ElTooltip, ElTooltipRegister } from './el-tooltip';
export { ElProgress, ElProgressRegister } from './el-progress';
export { ElResult, ElResultRegister } from './el-result';
export { ElTag, ElCheckTag, ElTagRegister, ElCheckTagRegister } from './el-tag';
export { ElDropdown, ElDropdownItem, ElDropdownMenu, ElDropdownRegister, ElDropdownItemRegister } from './el-dropdown';
export { ElRadio, ElRadioGroup, ElFormRadioGroup, ElRadioGroupRegister } from './el-radio';
export { ElConfigProvider as ConfigProvider } from 'element-plus';
export { ElAffix, ElAffixRegister } from './el-affix';
export { ElAnchor, ElAnchorLink, ElAnchorItem, ElAnchorRegister, ElAnchorLinkRegister } from './el-anchor';
export { ElBadge, ElBadgeRegister } from './el-badge';
export { ElCarousel, ElCarouselItem, ElCarouselRegister, ElCarouselItemRegister } from './el-carousel';
export { ElCollapse, ElCollapseItem, ElCollapseRegister, ElCollapseItemRegister } from './el-collapse';
export { ElDivider, ElDividerRegister } from './el-divider';
export { ElTimeline, ElTimelineItem, ElTimelineRegister, ElTimelineItemRegister } from './el-timeline';
export { ElWatermark, ElWatermarkRegister } from './el-watermark';
export { ElMultiLayout, ElMultiLayoutItem } from './el-multi-layout';
export { ElListComponents } from './el-list-components';
// import elementPlus from 'element-plus';
// export { elementPlus };

export function transformKeys(obj: Record<string, any>): Record<string, any> {
  const result = _.reduce(
    obj,
    (result, value, key) => {
      const keys = _.includes(key, '_') ? key.replace('_', '.') : key;
      _.set(result, keys, value);
      return result;
    },
    {} as Record<string, any>,
  );
  return { el: result };
}

export const locale = { zhCn };
