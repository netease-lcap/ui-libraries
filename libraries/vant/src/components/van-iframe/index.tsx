/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/iframe-has-title */
import { registerComponent } from '@/plugins';
// import Iframe from './iframe';
import * as plugins from './plugins';
import './index.css';

function Iframe(props, { slots }) {
  return (
    <div class="van-iframe" {...props}>
      {props!.src ? <iframe frameborder="0" src={props!.src} onLoad={props!.onLoad} /> : null}
    </div>
  );
}

export const VanIframe = registerComponent(Iframe, plugins);

export default VanIframe; 