import _ from 'lodash'
export function handleHrefToRouter(props) {
  const destination = props.get('destination');
  const link = props.get('link');
  const href = props.get('href');
  const target = props.get('target');
  const onClick = props.get('onClick') ?? _.noop;
  const router = props.get('$router');
  const toRouterClick = _.cond([
    [_.matches({ target: '_blank', isExternalLink: true }), (params) => () => window.open(params.externalUrl, '_blank')],
    [_.matches({ isExternalLink: true }), (params) => () => window.location.href = params.externalUrl],
    [_.matches({ target: '_blank' }), _.constant(() => {})],
    [_.matches({ isDestination: true }), (params) => () => router.push(params.destination)],
    [_.stubTrue, _.constant(() => {})],
  ]);
  const isHref = !_.isNil(link) || !_.isNil(href);
  const externalUrl = link || href;
  const isDestination = props.has('destination');
  const routerClick =  toRouterClick({ 
    destination, 
    target, 
    isExternalLink: isHref, 
    externalUrl,
    isDestination
  });

  return {
    onClick: _.wrap(onClick, (fn, ...args) => {
      _.attempt(fn, ...args);
      _.attempt(routerClick, ...args);
    })
  };
}

export * from './item-plugin'