import Carousel from 'element-ui/lib/carousel';
import CarouselItem from 'element-ui/lib/carousel-item';
import { registerComponent } from '@lcap/vue2-utils/plugins/index';
import * as plugins from './plugins';

export const ElCarousel = registerComponent(Carousel, plugins, {
  nativeEvents: [],
  slotNames: ['default'],
  methodNames: ['setActiveItem', 'prev', 'next'],
});
export const ElCarouselItem = CarouselItem;

export default ElCarousel;
