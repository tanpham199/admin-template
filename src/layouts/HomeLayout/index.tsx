import React, { PropsWithChildren, useState } from 'react';
import { FormOutlined, HomeOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, Button, theme, Avatar, Dropdown } from 'antd';
import styles from './HomeLayout.module.scss';
import Image from 'next/image';
import { APP_LOGO, MOBILE_BREAKPOINT } from '@/constants';
import Link from 'next/link';
import { PagePath } from '@/enums';
import classNames from 'classnames';
import useUserStore from '@/stores/user';
import { useRouter } from 'next/router';

const { Header, Sider, Content } = Layout;

const HomeLayout = ({ children }: PropsWithChildren) => {
  const [collapsed, setCollapsed] = useState(window.innerWidth < MOBILE_BREAKPOINT);
  const router = useRouter();

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { logout } = useUserStore();

  const menuItems = [
    {
      key: PagePath.Home,
      icon: <HomeOutlined />,
      label: 'Dashboard',
      onClick: () => router.push(PagePath.Home),
    },
    {
      key: PagePath.Forms,
      icon: <FormOutlined />,
      label: 'Forms',
      onClick: () => router.push(PagePath.Forms),
    },
  ];

  return (
    <Layout className={styles.layout}>
      <Sider trigger={null} collapsible collapsed={collapsed} className={collapsed ? styles.siderCollapsed : undefined}>
        <Link href={PagePath.Home} className={classNames(styles.logo, 'center')}>
          <Image src={APP_LOGO} alt="Logo" priority />
        </Link>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[menuItems.find(({ key }) => router.pathname === key)?.key || PagePath.Home]}
          items={menuItems}
          className={styles.menu}
        />
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
