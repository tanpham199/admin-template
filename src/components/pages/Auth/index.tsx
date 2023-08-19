import { App, Button, Divider, Form, Input } from 'antd';
import Image from 'next/image';
import { APP_LOGO, UNEXPECTED_ERROR_TEXT } from '@/constants';
import styles from './Auth.module.scss';
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
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/firebase';

type FieldType = {
  fullName?: string;
  email: string;
  password?: string;
  confirmPassword?: string;
};

const Item = Form.Item<FieldType>;

type FormType = 'login' | 'register' | 'forgot';

interface LoginProps {
  type?: FormType;
}

const Auth = ({ type = 'login' }: LoginProps) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { message } = App.useApp();
  const { user, login } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push(PagePath.Home);
    }
  }, [user]);

  const onLogin = async ({ email, password = '' }: FieldType) => {
    setIsSubmitting(true);
    try {
      await login({ email, password });
    } catch (error) {
      if (
        (error as AxiosError).status === HttpStatusCode.BadRequest ||
        (error as FirebaseError).code?.includes('auth/')
      ) {
        message.error('Invalid email or password.');
      } else {
        message.error(UNEXPECTED_ERROR_TEXT);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const onRegister = async ({ fullName, email, password = '' }: FieldType) => {
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

  const onForgot = async ({ email }: FieldType) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      if ((error as FirebaseError).code?.includes('auth/')) {
        message.error('Invalid email.');
      } else {
        message.error(UNEXPECTED_ERROR_TEXT);
      }
    } finally {
    }
  };

  const formConfig = {
    login: {
      title: 'Login',
      onFinish: onLogin,
      btnText: 'Login',
    },
    register: {
      title: 'Register',
      onFinish: onRegister,
      btnText: 'Create Account',
    },
    forgot: {
      title: 'Forgot',
      onFinish: onForgot,
      btnText: 'Reset my Password',
    },
  };

  const isLoginForm = type === 'login';
  const isRegisterForm = type === 'register';
  const isForgotForm = type === 'forgot';

  return (
    <div className={classNames(styles.wrapper, 'center')}>
      <Head pageTitle={formConfig[type].title} />
      <Form
        className={styles.form}
        onFinish={formConfig[type].onFinish}
        layout="vertical"
        size="large"
        autoComplete={type !== 'login' ? 'off' : undefined}
      >
        <div className={styles.logo}>
          <Image src={APP_LOGO} alt="Logo" priority />
        </div>
        {isRegisterForm && (
          <Item
            label="Full Name"
            name="fullName"
            rules={[{ required: isRegisterForm, message: 'Please input your full name!' }]}
          >
            <Input />
          </Item>
        )}
        <Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
          <Input />
        </Item>
        {!isForgotForm && (
          <Item
            label="Password"
            name="password"
            rules={[{ required: !isForgotForm, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Item>
        )}
        {isRegisterForm && (
          <Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[
              { required: isRegisterForm, message: 'Please confirm your password!' },
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
        <Item>
          <Button block type="primary" htmlType="submit" loading={isSubmitting}>
            {formConfig[type].btnText}
          </Button>
        </Item>
        {isLoginForm && (
          <Divider plain>
            Forgot password? <Link href={PagePath.Forgot}>Reset</Link>
          </Divider>
        )}
        {isRegisterForm && (
          <Divider plain>
            Already have an account? <Link href={PagePath.Login}>Login</Link>
          </Divider>
        )}
        {!isRegisterForm && (
          <Divider plain>
            Don&apos;t have an account? <Link href={PagePath.Register}>Register</Link>
          </Divider>
        )}
      </Form>
    </div>
  );
};

export default Auth;
