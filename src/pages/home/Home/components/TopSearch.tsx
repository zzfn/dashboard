import { Card, Table } from 'antd';

const columns = [
  {
    title: '服务器',
    dataIndex: 'name',
  },
  {
    title: '处理器',
    dataIndex: 'cpu',
    render: (_: string) => <span>{Number.parseFloat(_).toFixed(2)}%</span>,
  },
  {
    title: '内存',
    dataIndex: 'ram',
    render: (_: string) => <span>{Number.parseFloat(_).toFixed(2)}%</span>,
  },
];

const TopSearch = ({ loading, searchData }: { loading: boolean; searchData: any }) => (
  <Card
    extra={new Date().toLocaleString()}
    loading={loading}
    bordered={true}
    title={'服务器监控'}
    style={{
      height: '100%',
    }}
  >
    <Table<any>
      rowKey={'name'}
      size="small"
      columns={columns}
      dataSource={searchData.servers}
      pagination={false}
    />
  </Card>
);

export default TopSearch;
