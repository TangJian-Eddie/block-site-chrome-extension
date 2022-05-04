import React from 'react';
import { Route, Routes, Link, Navigate } from 'react-router-dom';
import { Menu } from 'antd';
import allElement from '../pages';
import menus from './config';

const renderMenus = () => {
  return menus.map((item, index) => {
    return (
      <Menu.Item key={`${index}`} icon={item.icon}>
        <Link to={item.path}>{item.title}</Link>
      </Menu.Item>
    );
  });
};

const createRoute = (menus) => {
  return menus.map((item) => {
    const Element = allElement[item.element];
    return (
      <Route key={item.path} path={item.path} element={<Element />}></Route>
    );
  });
};

const Router = () => {
  return (
    <Routes>
      {createRoute(menus)}
      <Route path="*" element={<Navigate to="/block-site" replace />} />
    </Routes>
  );
};

export {
  renderMenus,
}
export default Router;
