import { Col, Row } from 'antd';
import numeral from 'numeral';
import { ChartCard } from './Charts';
import type { VisitDataType } from '../data.d';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};

const IntroduceRow = ({
  loading,
  visitData,
  title,
}: {
  loading: boolean;
  visitData: VisitDataType[];
  title: string;
}) => (
  <div>
    <div>{title}</div>
    <Row gutter={24}>
      {visitData.map((node) => (
        <Col key={node.label} {...topColResponsiveProps}>
          <ChartCard
            bordered={false}
            title={node.label}
            loading={loading}
            total={numeral(node.value).format('0,0')}
            contentHeight={46}
          />
        </Col>
      ))}
    </Row>
  </div>
);

export default IntroduceRow;
