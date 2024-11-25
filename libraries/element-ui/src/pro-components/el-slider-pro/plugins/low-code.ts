/* 仅在 ide 环境生效的插件 */
import { createUseFormLowcode } from '../../../plugins/use-form-lowcode';
import { TAG_NAME, FORM_TAG_NAME } from '../constants';

export const useFormLowcode = createUseFormLowcode(TAG_NAME, FORM_TAG_NAME);

