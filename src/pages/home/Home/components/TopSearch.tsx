import { Card, Table } from 'antd';
import styles from '../style.less';

const columns = [
  {
    title: '节点名',
    dataIndex: 'name',
  },
  {
    title: '在线时间',
    dataIndex: 'uptime',
  },
  {
    title: '负载',
    dataIndex: 'load_1',
  },
  {
    title: '处理器',
    dataIndex: 'cpu',
    render: (_: string) => <span>{_}%</span>,
    sorter: (a: { count: number }, b: { count: number }) => a.count - b.count,
  },
  {
    title: '内存',
    dataIndex: 'ram',
    render: (_: string, row: any) => (
      <span>{((row.memory_used / row.memory_total) * 100).toFixed(2)}%</span>
    ),
    sorter: (a: { count: number }, b: { count: number }) => a.count - b.count,
    className: styles.alignRight,
  },
  {
    title: '硬盘',
    dataIndex: 'hdd',
    render: (_: string, row: any) => (
      <span>{((row.hdd_used / row.hdd_total) * 100.0).toFixed(2)}%</span>
    ),
    sorter: (a: { range: number }, b: { range: number }) => a.range - b.range,
  },
];

const TopSearch = ({ loading, searchData }: { loading: boolean; searchData: any }) => (
  <Card
    extra={new Date(searchData.updated * 1000).toLocaleString()}
    loading={loading}
    bordered={true}
    title={'服务器监控'}
    style={{
      height: '100%',
    }}
  >
    <Table<any>
      rowKey={'host'}
      size="small"
      columns={columns}
      dataSource={searchData.servers}
      pagination={{
        style: { marginBottom: 0 },
        pageSize: 5,
      }}
    />
  </Card>
);

export default TopSearch;
