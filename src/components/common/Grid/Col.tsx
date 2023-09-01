import { Col as AntCol, ColProps } from 'antd';

const Col = ({ span = 24, md = 12, lg = 8, xl = 6, ...rest }: ColProps) => {
  return <AntCol span={span} md={md} lg={lg} xl={xl} {...rest} />;
};

export default Col;
