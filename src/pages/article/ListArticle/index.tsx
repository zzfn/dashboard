import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Space } from 'antd';
import React, { useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { TableListItem } from './data.d';
import { queryRule, removeRule } from './service';
import { history } from 'umi';
import { saveArticle } from '@/pages/article/FormArticle/service';

const handleQueryRule = async ({ params, sorter }: any) => {
  console.log(sorter);
  const {
    data: { records, total },
  } = await queryRule({ ...params, isOnlyRelease: false });
  return {
    data: records,
    success: true,
    total,
  };
};
const TableList: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const handleRemove = (row: TableListItem) => async () => {
    message.loading('正在删除');
    const { msg } = await removeRule({ ...row });
    if (msg === 'success') {
      message.destroy();
      message.success('删除成功，即将刷新');
      actionRef.current?.reload();
    }
  };
  const handleSave = (row: TableListItem) => async () => {
    const { msg } = await saveArticle(row);
    if (msg === 'success') {
      actionRef.current?.reload();
    }
  };
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '标题',
      dataIndex: 'title',
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
      title: '发布时间',
      dataIndex: 'createTime',
      hideInSearch: true,
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <Space>
          <a onClick={handleSave({ ...record, isRelease: true })}>发布</a>
          <a onClick={handleSave({ ...record, isRelease: false })}>下线</a>
          <a onClick={() => history.push({ pathname: '/form-article', query: { id: record.id } })}>
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
          <Button
            type="primary"
            onClick={() => history.push({ pathname: 'form-article', query: {} })}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={(params, sorter) => handleQueryRule({ params, sorter })}
        columns={columns}
      />
    </PageContainer>
  );
};

export default TableList;
