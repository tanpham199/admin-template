import type { PropsWithChildren } from 'react';
import { App, Spin } from 'antd';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useUserStore from '@/stores/user';
import styles from './Auth.module.scss';
import httpRequest from '@/httpRequest';
import { PagePath } from '@/enums';
import { isNotLoginError } from '@/utils';
import { UNEXPECTED_ERROR_TEXT } from '@/constants';

const PUBLIC_PATHS = [PagePath.Login];

const Auth = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const { user, login } = useUserStore();
  // const { modal } = App.useApp();

  const isInPublicPath = PUBLIC_PATHS.some((path) => router.pathname.includes(path));

  useEffect(() => {
    if (isInPublicPath || user) {
      return;
    }
    router.push(PagePath.Login);
    // console.log(user);
    // httpRequest
    //   .get('/admin/v1/me')
    //   .then((response) => {
    //     // setUserInfo(response.data);
    //   })
    //   .catch((error) => {
    //     console.error('getUserInfo:', error);
    //     if (isNotLoginError(error)) {
    //       modal.error({
    //         title: UNEXPECTED_ERROR_TEXT,
    //         content: 'Cannot connect to server',
    //         okButtonProps: { danger: true },
    //         okText: 'Retry',
    //         onOk: () => {
    //           window.location.reload();
    //         },
    //         centered: true,
    //       });
    //     }
    //   });
  }, [isInPublicPath]);

  if (isInPublicPath) {
    return children;
  }

  if (user == null) {
    return (
      <div className={styles.wrapper}>
        <Spin size="large" />
      </div>
    );
  }

  return children;
};

export default Auth;
