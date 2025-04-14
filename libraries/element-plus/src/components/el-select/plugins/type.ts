import type { ISelectProps } from 'element-plus';
import { createPluginAccumulateTypes } from '@/plugins/hooks';
import { DataSourceCollectionType } from '@/types';
import { $deletePropsList } from '@/plugins/constants';

export const SelectAccumulateTypes = createPluginAccumulateTypes<ISelectProps>().add<DataSourceCollectionType>();
