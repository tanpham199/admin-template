import Auth from '@/components/pages/Auth';
import EmptyLayout from '@/layouts/EmptyLayout';

const RegisterPage = () => {
  return <Auth type="register" />;
};

RegisterPage.Layout = EmptyLayout;

export default RegisterPage;
