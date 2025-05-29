import { ElCarousel as ElCarouselPlus, ElCarouselItem as ElCarouselItemPlus } from 'element-plus';
import { registerComponent } from '../../plugins';
import * as basicsPlugin from './plugins/index';
import * as itemPlugins from './plugins/item-plugins';

export const ElCarousel = registerComponent(ElCarouselPlus, { plugin: basicsPlugin });
export const ElCarouselItem = registerComponent(ElCarouselItemPlus, { plugin: itemPlugins });

export default ElCarousel;
