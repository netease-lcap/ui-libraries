/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/iframe-has-title */
import { registerComponet } from '@/plugins';
// import Iframe from './iframe';
import * as plugins from './plugins';
import './index.css';

function Iframe(props, { slots }) {
  return (
    <div class="el-iframe" {...props}>
      {props!.src ? (
        <iframe frameborder="0" allowfullscreen="allowfullscreen" src={props!.src} onLoad={props!.onLoad} />
      ) : null}
    </div>
  );
}

export const ElIframe = registerComponet(Iframe, plugins);

export default ElIframe;
