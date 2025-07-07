import { createPluginAccumulateTypes } from '@/plugins/hooks';
import { DataSourceCollectionType } from '@/types';
import { $deletePropsList } from '@/plugins/constants';

export const PickerAccumulateTypes = createPluginAccumulateTypes().add<DataSourceCollectionType>(); 