import { Steps as AntdSteps } from 'antd';
import type { StepProps } from 'antd';
import { registerComponet } from '@/plugins/index';
import * as plugin from './plugins';
import type { pluginType } from '@/plugins/type';

import './index.module.less';

// type TransferProps = AntdTransferProps

const mapProps = {
  mySize: 'size',
};

const Steps = registerComponet<
  StepProps,
  pluginType<StepProps>
>(
  AntdSteps,
  { plugin, displayName: AntdSteps.displayName, mapProps },
);

export default Steps;

export const StepsItem = AntdSteps.Step;
