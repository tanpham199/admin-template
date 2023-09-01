import React, { PropsWithChildren, useState } from 'react';
import {
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Avatar, Dropdown } from 'antd';
import styles from './HomeLayout.module.scss';
import Image from 'next/image';
import { APP_LOGO } from '@/constants';
import Link from 'next/link';
import { PagePath } from '@/enums';
import classNames from 'classnames';
import useUserStore from '@/stores/user';
import { ItemType, MenuItemType } from 'antd/es/menu/hooks/useItems';
import Router from 'next/router';

const { Header, Sider, Content } = Layout;

const MENU_ITEMS: ItemType<MenuItemType>[] = [
  {
    key: '1',
    icon: <HomeOutlined />,
    label: 'Dashboard',
    onClick: () => Router.push(PagePath.Home),
  },
  {
    key: '2',
    icon: <VideoCameraOutlined />,
    label: 'nav 2',
    onClick: () => Router.push(PagePath.Home),
  },
  {
    key: '3',
    icon: <UploadOutlined />,
    label: 'nav 3',
    onClick: () => Router.push(PagePath.Home),
  },
];

const HomeLayout = ({ children }: PropsWithChildren) => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { logout } = useUserStore();

  return (
    <Layout className={styles.layout}>
      <Sider trigger={null} collapsible collapsed={collapsed} className={collapsed ? styles.siderCollapsed : undefined}>
        <Link href={PagePath.Home} className={classNames(styles.logo, 'center')}>
          <Image src={APP_LOGO} alt="Logo" priority />
        </Link>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={MENU_ITEMS} className={styles.menu} />
      </Sider>
      <Layout>
        <Header className={styles.header} style={{ background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className={styles.collapse}
          />
          <Dropdown
            trigger={['click']}
            menu={{
              items: [
                {
                  key: '1',
                  label: <Link href={PagePath.Home}>Settings</Link>,
                },
                {
                  key: '2',
                  danger: true,
                  label: <Link href={PagePath.Login}>Logout</Link>,
                  onClick: logout,
                },
              ],
            }}
          >
            <Avatar src="/favicon.ico" icon={<UserOutlined />} className={classNames(styles.avatar, 'center')} />
          </Dropdown>
        </Header>
        <Content
          className={styles.content}
          style={{
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomeLayout;
