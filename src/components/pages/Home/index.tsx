import MaintenanceAlert from '@/components/common/MaintenanceAlert';
import Head from '../Head';
import { Avatar, Card, List, Typography } from 'antd';
import { Col, Row } from '@/components/common/Grid';
import { formatDateTime } from '@/utils';

const { Title, Text } = Typography;
const { Item } = List;

const DUMMY_STATS = [
  {
    title: 'Revenue',
    value: '$341,231',
  },
  {
    title: 'Income',
    value: '$211,331',
  },
  {
    title: 'Payouts',
    value: '$120,312',
  },
  {
    title: 'Agents',
    value: '72',
  },
];

const DUMMY_EVENTS = [
  {
    title: 'KBBQ',
    description: 'Free Korean BBQ for everyone at GEN. Bring your family!',
  },
  {
    title: 'Quarterly Meeting',
    description: 'Discuss quartly revenue, payouts, and bonus.',
  },
  {
    title: 'Company Picnic',
    description: 'We are hosting a company pinic at Helm Park. Food and drink will be provided.',
  },
  {
    title: 'Guest Spaker Gary Vee',
    description: 'Gary is going to speak at our office for 1 hour on Tuesday, December 01 at 5 PM.',
  },
];

const DUMMY_TOP_AGENTS = [
  {
    name: 'Thuan Nguyen',
    sold: 31,
  },
  {
    name: 'Tien Le',
    sold: 22,
  },
  {
    name: 'Janice Smith',
    sold: 18,
  },
  {
    name: 'John Robertson',
    sold: 16,
  },
];

const Home = () => {
  return (
    <main>
      <MaintenanceAlert className="mb-2" />
      <Head pageTitle="Dashboard" />
      <Title>Dashboard</Title>
      <Title level={2}>Overview</Title>
      <Row className="mb-4">
        {DUMMY_STATS.map(({ title, value }) => (
          <Col key={title}>
            <Card size="small" title={title}>
              {value}
            </Card>
          </Col>
        ))}
      </Row>
      <Title level={2}>Top Agents</Title>
      <List
        bordered
        dataSource={DUMMY_TOP_AGENTS}
        renderItem={({ name, sold }, i) => (
          <Item extra={<Text strong>#{i + 1}</Text>}>
            <Item.Meta title={name} description={`${sold} sold`} avatar={<Avatar size="large" src="/favicon.ico" />} />
          </Item>
        )}
      />
      <Title level={2}>Events</Title>
      <List
        bordered
        dataSource={DUMMY_EVENTS}
        renderItem={({ title, description }) => (
          <Item extra={formatDateTime(1693572036163)}>
            <Item.Meta title={title} description={description} />
          </Item>
        )}
      />
    </main>
  );
};

export default Home;
