import { Card } from 'antd';
import type { VisitDataType } from '../data.d';
import { Pie } from './Charts';
import styles from '../style.less';

const ProportionSales = ({
  loading,
  salesPieData,
}: {
  loading: boolean;
  salesPieData: VisitDataType[];
}) => (
  <Card
    loading={loading}
    className={styles.salesCard}
    bordered={false}
    title={'文章标签占比'}
    style={{
      height: '100%',
    }}
  >
    <Pie
      hasLegend
      subTitle={'总文章数'}
      total={salesPieData.reduce((pre, now) => now.y + pre, 0)}
      data={salesPieData}
      valueFormat={(value) => <span>{value}篇</span>}
      height={700}
      lineWidth={4}
    />
  </Card>
);

export default ProportionSales;
