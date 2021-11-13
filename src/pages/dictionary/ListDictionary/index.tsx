import { Divider, message } from 'antd';
import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import type { TableListItem, TableListParams } from './data.d';
import { addRule, queryRule, removeRule } from './service';
import { useLocation, useAccess } from 'umi';

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
const handleQueryRule: any = async (params: TableListParams) => {
  const { data } = await queryRule(params);
  return {
    data,
  };
};

/**
 * 删除节点
 *
 * @param params
 */

const TableList: React.FC<{}> = () => {
  const access = useAccess();
  const actionRef = useRef<ActionType>();
  const [editableKeys, setEditableKeys] = useState<React.Key[]>([]);
  const location = useLocation();
  const { code } = (location as any).query;
  const handleRemove = async (params: { id: string }) => {
    const hide = message.loading('正在删除');
    try {
      await removeRule(params);
      hide();
      actionRef.current?.reload();
      message.success('删除成功，即将刷新');
      return true;
    } catch (error) {
      hide();
      message.error('删除失败，请重试');
      return false;
    }
  };

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '字典名称',
      dataIndex: 'name',
    },
    {
      title: '字典值',
      dataIndex: 'code',
    },
    {
      title: '排序号',
      dataIndex: 'orderNum',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      hideInTable: !access.canAdmin,
      render: (_, record, index, action) => (
        <>
          <a
            onClick={() => {
              action?.startEditable(record.id);
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <a onClick={() => handleRemove({ id: record.id })}>删除</a>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <EditableProTable<TableListItem>
        recordCreatorProps={
          access.canAdmin
            ? {
                record: () => ({ id: '0', typeCode: code, code: '', name: '' }),
              }
            : false
        }
        actionRef={actionRef}
        rowKey="id"
        editable={{
          type: 'multiple',
          editableKeys,
          onChange: (keys) => setEditableKeys(keys),
          onSave: async (key, record) => {
            await handleAdd({ ...record });
          },
          onDelete: async (key) => {
            console.log(key);
          },
        }}
        request={handleQueryRule}
        columns={columns}
      />
    </PageContainer>
  );
};

export default TableList;
