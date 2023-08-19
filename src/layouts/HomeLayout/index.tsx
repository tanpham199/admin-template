import React, { PropsWithChildren, useState } from 'react';
import {
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

const { Header, Sider, Content } = Layout;

const MENU_ITEMS = [
  {
    key: '1',
    icon: <UserOutlined />,
    label: 'nav 1',
  },
  {
    key: '2',
    icon: <VideoCameraOutlined />,
    label: 'nav 2',
  },
  {
    key: '3',
    icon: <UploadOutlined />,
    label: 'nav 3',
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
      <Header className={styles.header} style={{ background: colorBgContainer }}>
        <div className={classNames('center-row-between', styles.logo)}>
          <Link href={PagePath.Home}>
            <Image src={APP_LOGO} alt="Logo" height={48} priority />
          </Link>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className={styles.collapse}
          />
        </div>
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
                onClick: () => {
                  logout();
                },
              },
            ],
          }}
        >
          <Avatar src="/favicon.ico" icon={<UserOutlined />} className={classNames(styles.avatar, 'center')} />
        </Dropdown>
      </Header>
      <Layout hasSider>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={MENU_ITEMS} />
        </Sider>
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
