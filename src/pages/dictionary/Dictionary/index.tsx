import { Divider, message, Space } from 'antd';
import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import type { TableListItem } from './data.d';
import { addRule, queryRule, removeRule } from './service';
import { history, useAccess } from 'umi';

/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields: TableListItem) => {
  fields.id === '0' && Reflect.deleteProperty(fields, 'id');
  const hide = message.loading('正在添加');
  try {
    await addRule({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 删除节点
 *
 * @param params
 */
const handleRemove = async (params: { id: string }) => {
  const hide = message.loading('正在删除');
  try {
    await removeRule(params);
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};
const handleQueryRule = async (params: any): Promise<any> => {
  const { data } = await queryRule(params);
  return {
    data,
  };
};
const TableList: React.FC = () => {
  const access = useAccess();
  const [editableKeys, setEditableKeys] = useState<React.Key[]>([]);
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '字典名称',
      dataIndex: 'name',
      render: (dom, entity) => {
        return (
          <a
            onClick={() =>
              history.push({ pathname: 'list-dictionary', query: { code: entity.code } })
            }
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: '字典类型',
      dataIndex: 'code',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      hideInTable: !access.canAdmin,
      render: (_, record, index, action) => (
        <Space>
          <a
            onClick={() => {
              action?.startEditable(record.id);
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <a onClick={() => handleRemove({ id: record.id })}>删除</a>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <EditableProTable<TableListItem>
        recordCreatorProps={
          access.canAdmin
            ? {
                record: () => ({ id: '0', code: '', name: '' }),
              }
            : false
        }
        editable={{
          type: 'multiple',
          editableKeys,
          onChange: (keys) => setEditableKeys(keys),
          onSave: async (key, record) => {
            await handleAdd(record);
          },
          onDelete: async (key) => {
            console.log(key);
          },
        }}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        request={(params) => handleQueryRule(params)}
        columns={columns}
      />
    </PageContainer>
  );
};

export default TableList;
