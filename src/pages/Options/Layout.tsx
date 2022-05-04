import React from 'react';
import { Layout, Menu } from 'antd';
import Routes, { renderMenus } from './routes';
import s from './style.module.scss';

const { Header, Content, Sider } = Layout;

export default () => {
  return (
    <Layout className={s.root}>
      <Header className={s.header}>Block-Site</Header>
      <Layout>
        <Sider width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['0']}
            style={{ height: '100%' }}
          >
            {renderMenus()}
          </Menu>
        </Sider>
        <Content className={s.content}>
          <Routes />
        </Content>
      </Layout>
    </Layout>
  );
};
