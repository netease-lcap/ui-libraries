import { createNamespace } from '../utils';
import { SlotsMixin } from '../mixins/slots';
import VanEmptyCol from '../emptycol';
import encodeUrl from '../utils/encodeUrl';
const [, bem] = createNamespace('cardu');
export default {
    name: 'van-cardu',
    components: {
    },
    mixins: [SlotsMixin],
    props: {
        sr: { type: String, default: 'r' },
        shadow: { type: Boolean, default: true },
        border: { type: Boolean, default: true },
        split: { type: Boolean, default: false },
        coverSlot: { type: Boolean, default: false },
        noTitle: { type: Boolean, default: false },
        href: String,
        target: { type: String, default: '_self' },
        to: [String, Object],
        replace: { type: Boolean, default: false },
        append: { type: Boolean, default: false },
        decoration: { type: Boolean, default: true },
        download: { type: Boolean, default: false },
        destination: String,
        link: [String, Function]
    },
    methods: {
      async onClick(event) {
          const props = this._props;
          const parent = this.$parent;
          function currentHref() {
            if (props.href !== undefined)
                return encodeUrl(props.href);
            else if (parent?.$router && props.to !== undefined)
                return encodeUrl(parent?.$router.resolve(props.to, parent?.$route, props.append).href);
            else
                return undefined;
          }
          if (props.link) {
            const url = props.link;
            const target = props.target;
            let realUrl;
            if (typeof url === 'function') {
                // @ts-ignore
                realUrl = await url();
            } else {
                realUrl = url;
            }
            function linkpao() {
                const a = document.createElement('a');
                a.setAttribute('href', realUrl);
                // @ts-ignore
                a.setAttribute('target', target);
                document.body.appendChild(a);
                a.click();
                setTimeout(() => {
                    document.body.removeChild(a);
                }, 500);
            }
            linkpao();
            return;
          }
          const hrefR = currentHref();
          // if (!hrefR && !this.$listeners.click) {
          //   return
          // }
          this.$listeners?.click?.(event);
          if (hrefR === undefined) {
          let to;
          if (props.destination) {
              if (props.destination.startsWith('http')) {
                  window.location.href = encodeUrl(props.destination);
                  return;
              }
              to = props.destination;
          }


          const currentTo = to || props.to;
          if (currentTo === undefined)
              return;
          let cancel = false;
          // emit(that, 'before-navigate',  {
          //   to: currentTo,
          //   replace: props.replace,
          //   append: props.append,
          //   preventDefault: () => (cancel = true),
          // });
          if (cancel)
              return;
          const $router = parent?.$router;
          const $route = parent?.$route;
          const { location } = $router.resolve(
              currentTo,
              $route,
              props.append,
          );
          if (props.target === '_self') {
            props.replace ? $router.replace(location) : $router.push(location);
          } else {
            this.$linkpao(currentTo, props.target);
          }
        } else {
          function downloadClick() {
            const a = document.createElement("a");
            a.setAttribute("href", hrefR);
            document.body.appendChild(a);
            a.click();
            setTimeout(() => {
              document.body.removeChild(a);
            }, 500);
          }
          downloadClick();
        }
        }
    },
    render() {
      const { sr, split, border, shadow, coverSlot, noTitle} = this;
      const ifDesigner = this.$env && this.$env.VUE_APP_DESIGNER;
      return (
        <div class={bem('wrap', {border, shadow: shadow, sr: sr === 'r', image: coverSlot})} onClick={this.onClick}>
          <div class="van-cardu-cover" vusion-slot-name="cover">
            {this.slots('cover')}
            {(ifDesigner && coverSlot && !this.slots('cover')) ? <VanEmptyCol /> : null}
          </div>
          <div class={bem('head')} vusion-slot-name="head">
            {this.slots('head')}
            {(ifDesigner && !noTitle &&!this.slots('head')) ? <VanEmptyCol /> : null}
          </div>
          { split ? <div class={bem('divider')}></div> : null }
          <div class={bem('content')} vusion-slot-name="default">
            {this.slots()}
            {(ifDesigner && !this.slots()) ? <VanEmptyCol /> : null}
          </div>
        </div>
      );
    }
};
