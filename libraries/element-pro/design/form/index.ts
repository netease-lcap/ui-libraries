import _Form from './form';
import _FormItem from './form-item';
import withInstall from '../utils/withInstall';
import { ElFormProps, ElFormItemProps } from './type';

import './style';

export * from './type';
export type FormProps = ElFormProps;
export type FormItemProps = ElFormItemProps;

export const Form = withInstall(_Form);
export const FormItem = withInstall(_FormItem);
export default Form;
