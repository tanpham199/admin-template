import { Card, Typography } from 'antd';
import Head from '../Head';
import styles from './Forms.module.scss';
import BasicForm from './BasicForm';

const { Title } = Typography;

const Forms = () => {
  return (
    <>
      <Head pageTitle="Forms" />
      <Title>Forms</Title>
      <div className={styles.wrapper}>
        <Title level={2}>Basic</Title>
        <Card>
          <BasicForm />
        </Card>
      </div>
    </>
  );
};

export default Forms;
