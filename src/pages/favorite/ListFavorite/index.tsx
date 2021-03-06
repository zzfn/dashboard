import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Space } from 'antd';
import React, { useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { TableListItem } from './data.d';
import { queryRule, removeRule } from './service';
import { history, Access, useAccess } from 'umi';

const handleQueryRule = async (params: any) => {
  const {
    data: { records, total },
  } = await queryRule({ ...params });
  return {
    data: records,
    success: true,
    total,
  };
};
const TableList: React.FC = () => {
  const access = useAccess();
  const actionRef = useRef<ActionType>();
  const handleRemove = (row: TableListItem) => async () => {
    message.loading('正在删除');
    const { msg } = await removeRule(row);
    if (msg === 'success') {
      message.destroy();
      message.success('删除成功，即将刷新');
      actionRef.current?.reload();
    }
  };

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '标题',
      dataIndex: 'title',
      render: (_, record) => (
        <a target={'_blank'} href={record.link}>
          {record.title}
        </a>
      ),
    },
    {
      title: '是否发布',
      dataIndex: 'isRelease',
      valueEnum: {
        true: { text: '已发布' },
        false: { text: '未发布' },
      },
    },
    {
      title: '排序号',
      dataIndex: 'orderNum',
      hideInSearch: true,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      hideInTable: !access.canAdmin,
      render: (_, record) => (
        <Space>
          <a onClick={() => history.push({ pathname: '/form-favorite', query: { id: record.id } })}>
            编辑
          </a>
          <a onClick={handleRemove(record)}>删除</a>
        </Space>
      ),
    },
  ];
  return (
    <PageContainer>
      <ProTable<TableListItem>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => [
          <Access accessible={access.canAdmin}>
            <Button
              type="primary"
              onClick={() => history.push({ pathname: 'form-favorite', query: {} })}
            >
              <PlusOutlined /> 新建
            </Button>
          </Access>,
        ]}
        request={(params) => handleQueryRule(params)}
        columns={columns}
      />
    </PageContainer>
  );
};

export default TableList;
