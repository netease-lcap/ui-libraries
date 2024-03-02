import React from 'react';

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
