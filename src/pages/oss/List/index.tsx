import type {FC} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import {useEffect, useState} from 'react';
import {deleteFolder, delFile, listFiles} from '@/pages/oss/List/service';
import {Button, message, Table} from "antd";
import {DeleteOutlined} from "@ant-design/icons";

const FormTalk: FC = () => {
  const [prefixes, setPrefixes] = useState<string[]>(['']);
  const [dataSource, setDataSource] = useState<any[]>([]);
  const initial = async () => {
    const {data} = await listFiles({prefix: prefixes.at(-1)});
    setDataSource([...data.commonPrefixes.map((item: string) => ({key: item})), ...data.objectSummaries])
  };
  const deleteFile = async (record: any) => {
    if (record.size) {
      const r = await delFile({id: record.key});
      console.log(r)
    } else {
      const r = await deleteFolder({id: record.key});
      console.log(r)
    }
  }
  useEffect(() => {
    initial();
  }, [prefixes]);
  const handleFileClick = (record:any) => async () => {
    if (record.size) {
      message.info(`https://oss-zzf.zzfzzf.com/${record.key}`)
    } else {
      setPrefixes([...prefixes, record.key])
    }
  }
  const columns = [
    {
      title: '文件名',
      dataIndex: 'key',
      key: 'key',
      render: (text: string, record: any) => <a onClick={handleFileClick(record)}>{text}</a>,
    },
    {
      title: '大小',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: '修改时间',
      dataIndex: 'lastModified',
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: any) => (
        <span>
          <Button type="link" onClick={() => deleteFile(record)}><DeleteOutlined/></Button>
        </span>
      ),
    },
  ]
  return (
    <PageContainer>
      <Button type={'link'} onClick={() => setPrefixes(prefixes.slice(0, -1))}>back</Button>
      <Table pagination={false} columns={columns} dataSource={dataSource}/>
    </PageContainer>
  );
};

export default FormTalk;
