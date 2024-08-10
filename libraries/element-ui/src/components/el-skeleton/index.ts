import Skeleton from 'element-ui/lib/skeleton';
import SkeletonItem from 'element-ui/lib/skeleton-item';
import { registerComponent } from '@lcap/nasl-hoc-vue/index';
import * as plugins from './plugins';

export const ElSkeleton = registerComponent(Skeleton, plugins, {
  nativeEvents: [],
  slotNames: ['default', 'template'],
  methodNames: [],
});
export const ElSkeletonItem = SkeletonItem;

export default ElSkeleton;
