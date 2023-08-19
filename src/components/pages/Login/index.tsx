import { App, Button, Divider, Form, Input } from 'antd';
import Image from 'next/image';
import { APP_LOGO, UNEXPECTED_ERROR_TEXT } from '@/constants';
import styles from './Login.module.scss';
import useUserStore from '@/stores/user';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { PagePath } from '@/enums';
import Head from '../Head';
import classNames from 'classnames';
import Link from 'next/link';
import { AxiosError, HttpStatusCode } from 'axios';
import { FirebaseError } from 'firebase/app';
import httpRequest, { HttpError } from '@/httpRequest';

type FieldType = {
  fullName?: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

const Item = Form.Item<FieldType>;

interface LoginProps {
  register?: boolean;
}

const Login = ({ register }: LoginProps) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { message } = App.useApp();
  const { user, login } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push(PagePath.Home);
    }
  }, [user]);

  const onLogin = async ({ email, password }: FieldType) => {
    setIsSubmitting(true);
    try {
      await login({ email, password });
    } catch (error) {
      if (
        (error as AxiosError).status === HttpStatusCode.BadRequest ||
        (error as FirebaseError).code?.includes('auth/')
      ) {
        message.error('Invalid email or password');
      } else {
        message.error(UNEXPECTED_ERROR_TEXT);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const onRegister = async ({ fullName, email, password }: FieldType) => {
    setIsSubmitting(true);
    try {
      await httpRequest.post('/agent/v1/me/register', { fullName, email, password });
      await login({ email, password });
    } catch (error) {
      message.error((error as HttpError).response?.data.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const title = register ? 'Register' : 'Login';

  return (
    <div className={classNames(styles.wrapper, 'center')}>
      <Head pageTitle={title} />
      <Form
        className={styles.form}
        name={title}
        onFinish={register ? onRegister : onLogin}
        layout="vertical"
        size="large"
        autoComplete={register ? 'off' : undefined}
      >
        <div className={styles.logo}>
          <Image src={APP_LOGO} alt="Logo" priority />
        </div>
        {register && (
          <Item
            label="Full Name"
            name="fullName"
            rules={[{ required: register, message: 'Please input your full name!' }]}
          >
            <Input />
          </Item>
        )}
        <Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
          <Input />
        </Item>
        <Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password />
        </Item>
        {register && (
          <Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[
              { required: register, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('Passwords do not match');
                },
              }),
            ]}
          >
            <Input.Password />
          </Item>
        )}
        <Item className={register ? styles.mb0 : undefined}>
          <Button block type="primary" htmlType="submit" loading={isSubmitting}>
            {register ? 'Create Account' : 'Login'}
          </Button>
        </Item>
        {!register && (
          <>
            <Divider plain>
              <Link href={PagePath.Forgot}>I forgot my password</Link>
            </Divider>
            <Divider plain className={styles.mb0}>
              Don&apos;t have an account? <Link href={PagePath.Register}>Register</Link>
            </Divider>
          </>
        )}
      </Form>
    </div>
  );
};

export default Login;
