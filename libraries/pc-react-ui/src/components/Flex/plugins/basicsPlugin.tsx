import React from 'react';
import _ from 'lodash';

function useHandle(props) {
  return {
    // render(selfProps) {
    //   const Compoent = props.get('render');
    //   // const partProps = _.omit(selfProps, ['onClick']);
    //   return (
    //     <div>
    //       <div>1234</div>
    //       <Compoent {...selfProps} />
    //     </div>
    //   );
    // },
    render: React.forwardRef((selfProps, ref) => {
      const Compoent = props!.get('render');
      return (
        <div>
          <Compoent {...selfProps} ref={ref} />
        </div>
      );
    }),
  };
}
export function useHandleScroll(props) {
  const styleProps = props.get('style');
  const style = _.assign(styleProps, { overflow: 'scroll' });
  return { style };
}
