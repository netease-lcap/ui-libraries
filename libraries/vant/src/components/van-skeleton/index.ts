import {
  Skeleton as VantSkeleton,
  SkeletonTitle as VantSkeletonTitle,
  SkeletonParagraph as VantSkeletonParagraph,
  SkeletonImage as VantSkeletonImage,
  SkeletonAvatar as VantSkeletonAvatar,
} from 'vant';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import * as basicPlugin from './plugins/index';

function VanSkeletonRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const VanSkeleton = registerComponent(VantSkeleton, {
  plugin: basicPlugin,
  name: 'van-skeleton',
});

const VanSkeletonTitle = registerComponent(VantSkeletonTitle, {
  plugin: basicPlugin,
  name: 'van-skeleton-title',
});

const VanSkeletonParagraph = registerComponent(VantSkeletonParagraph, {
  plugin: basicPlugin,
  name: 'van-skeleton-paragraph',
});

const VanSkeletonImage = registerComponent(VantSkeletonImage, {
  plugin: basicPlugin,
  name: 'van-skeleton-image',
});

const VanSkeletonAvatar = registerComponent(VantSkeletonAvatar, {
  plugin: basicPlugin,
  name: 'van-skeleton-avatar',
});

export {
  VanSkeleton,
  VanSkeletonTitle,
  VanSkeletonParagraph,
  VanSkeletonImage,
  VanSkeletonAvatar,
  VanSkeletonRegister,
  VantSkeleton,
  VantSkeletonTitle,
  VantSkeletonParagraph,
  VantSkeletonImage,
  VantSkeletonAvatar,
};
export default VanSkeleton;
