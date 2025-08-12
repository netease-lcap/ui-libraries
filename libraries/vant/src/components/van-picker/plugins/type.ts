import { createPluginAccumulateTypes } from '@/plugins/hooks';
import { DataSourceCollectionType } from '@/types';

export const PickerAccumulateTypes = createPluginAccumulateTypes().add<DataSourceCollectionType>();
