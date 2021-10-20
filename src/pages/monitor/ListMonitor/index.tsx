import React, { useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { fetchList } from './service';
import type { TableListItem, TableListPagination } from './data';

const TableList: React.FC = () => {
  /** 新建窗口的弹窗 */
  const actionRef = useRef<ActionType>();
  /** 国际化配置 */

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '路径',
      dataIndex: 'url',
      ellipsis: true,
    },
    {
      title: 'ip',
      dataIndex: 'ip',
    },
    {
      title: '时间',
      dataIndex: 'time',
    },
    {
      title: 'visitorId',
      dataIndex: 'visitorId',
    },
    {
      title: 'referrer',
      dataIndex: 'referrer',
      ellipsis: true,
    },
    {
      title: '浏览器',
      dataIndex: 'browser',
      renderText: (val: string, record) => `${record.browser}-${record.browserVersion}`,
      colSize: 1,
    },
    {
      title: '操作系统',
      dataIndex: 'os',
      renderText: (val: string, record) => `${record.os}-${record.osVersion}`,
      colSize: 1,
    },
  ];
  const handleQuery = async (params: any) => {
    const { data } = await fetchList({ ...params });
    return {
      data: data.list,
      success: true,
      total: data.count,
    };
  };
  return (
    <PageContainer>
      <ProTable<TableListItem, TableListPagination>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        request={(params) => handleQuery(params)}
        columns={columns}
      />
    </PageContainer>
  );
};

export default TableList;
