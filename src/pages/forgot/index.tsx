import Auth from '@/components/pages/Auth';
import EmptyLayout from '@/layouts/EmptyLayout';

const ForgotPage = () => {
  return <Auth type="forgot" />;
};

ForgotPage.Layout = EmptyLayout;

export default ForgotPage;
