import { WarningOutlined } from '@ant-design/icons';
import { Alert, AlertProps } from 'antd';

const MaintenanceAlert = ({
  type = 'warning',
  message = 'This page is under maintenance. Not all features are available.',
  closable = true,
  icon = <WarningOutlined />,
  showIcon = true,
  ...rest
}: AlertProps) => {
  return <Alert type={type} message={message} closable={closable} icon={icon} showIcon={showIcon} {...rest} />;
};

export default MaintenanceAlert;
