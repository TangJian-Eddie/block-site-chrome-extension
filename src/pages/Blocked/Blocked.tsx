import React from 'react';
import { Layout, Menu } from 'antd';
import s from './style.module.scss';

const { Header, Content } = Layout;

export default () => {
  return (
    <Layout className={s.root}>
      <Header className={s.header}>Block-Site</Header>
      <Content className={s.content}>
        <div>想玩？</div>
      </Content>
    </Layout>
  );
};
