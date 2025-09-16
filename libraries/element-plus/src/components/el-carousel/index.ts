import { ElCarousel as ElCarouselPlus, ElCarouselItem as ElCarouselItemPlus } from 'element-plus';
import _ from 'lodash';
import { registerComponent } from '@/plugins';
import basicsPlugin from './plugins/basic-plugins';
import itemPlugins from './plugins/item-plugins';

function ElCarouselRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(basicsPlugin, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

function ElCarouselItemRegister(BaseComponent, plugin = {}, extend = true) {
  const componentPlugin = extend ? _.assign(itemPlugins, plugin) : plugin;
  return registerComponent(BaseComponent, { plugin: componentPlugin });
}

const ElCarousel = registerComponent(ElCarouselPlus, { plugin: basicsPlugin, name: 'el-carousel' });
const ElCarouselItem = registerComponent(ElCarouselItemPlus, { plugin: itemPlugins });

export { ElCarouselPlus, ElCarouselItemPlus, ElCarousel, ElCarouselItem, ElCarouselRegister, ElCarouselItemRegister };
export default ElCarousel;
