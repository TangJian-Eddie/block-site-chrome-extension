import React from 'react';
import { LockTwoTone, SettingTwoTone } from '@ant-design/icons';

const menus = [
    {
      path: "/block-site",
      element: 'BlockSite',
      title: '封锁网站',
      icon: <SettingTwoTone/>,
    },
    {
      path: "/code",
      element: 'Code',
      title: '密码保护',
      icon: <LockTwoTone/>
    },
]
export default menus