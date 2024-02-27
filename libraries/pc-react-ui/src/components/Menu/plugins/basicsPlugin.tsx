import React from 'react';
import _ from 'lodash';
import { theme, Layout } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  Row, Col, Image, Text, Dropdown,
} from '@/index';

const { Header, Content, Footer } = Layout;

function useHandle(props) {
  return {
    render(selfProps) {
      const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
      const Compoent = props.get('render');
      const partProps = _.omit(selfProps, ['onClick']);
      return (
        <Layout>
          <Header style={{ display: 'flex', alignItems: 'center' }}>
            <div className="demo-logo">
              <Image width="32px" src="http://defaulttenant.lcap.react01-lowcode.com/favicon.ico" preview={false} />
              <Text children="应用名称" style={{ color: 'inherit' }} />
            </div>
            <Compoent
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              // items={items}
              style={{ flex: 1, minWidth: 0 }}
            >
              {selfProps.children}
            </Compoent>
          </Header>

        </Layout>
        // <Row style={{ background: colorBgContainer }}>
        //   <Col>
        //     <Image />
        //     <Text />
        //   </Col>
        //   <Col>
        //     <Compoent {...selfProps}>{selfProps.children}</Compoent>
        //   </Col>
        //   <Col>
        //     <Dropdown>
        //       <a onClick={(e) => e.preventDefault()}>
        //         Hover me
        //       </a>
        //     </Dropdown>
        //   </Col>
        // </Row>

      );
    },
  };
}

export function useHandleRouter(props) {
  const onClickPorps = props.get('onClick');
  const navigate = useNavigate();

  return {
    onClick: _.wrap(onClickPorps, (fn, arg) => {
      fn(arg);
      navigate(arg.key);
    }),
  };
}
