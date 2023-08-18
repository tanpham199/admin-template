import { App, Button, Checkbox, Form, Input } from 'antd';
import EmptyLayout from '@/layouts/EmptyLayout';
import Image from 'next/image';
import { APP_LOGO, UNEXPECTED_ERROR_TEXT } from '@/constants';
import styles from './Login.module.scss';
import useUserStore from '@/stores/user';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { PagePath } from '@/enums';
import Head from '../Head';
import classNames from 'classnames';

type FieldType = {
  email: string;
  password: string;
  remember?: string;
};

const Item = Form.Item<FieldType>;

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { message } = App.useApp();
  const { user, login } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push(PagePath.Home);
    }
  }, [user]);

  const onFinish = async (values: FieldType) => {
    setIsSubmitting(true);
    try {
      login(values);
    } catch (error) {
      message.error(UNEXPECTED_ERROR_TEXT);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={classNames(styles.wrapper, 'center')}>
      <Head pageTitle="Login" />
      <Form
        className={styles.form}
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
        size="large"
      >
        <div className={styles.logo}>
          <Image src={APP_LOGO} alt="Logo" priority />
        </div>
        <Item label="Email" name="email" rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input />
        </Item>
        <Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password />
        </Item>
        <Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Item>
        <Item>
          <Button block type="primary" htmlType="submit" loading={isSubmitting}>
            Login
          </Button>
        </Item>
      </Form>
    </div>
  );
};

Login.Layout = EmptyLayout;

export default Login;
