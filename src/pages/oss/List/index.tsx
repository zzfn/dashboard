import type { FC } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { useEffect, useState } from 'react';
import {deleteFolder, delFile, listFiles} from '@/pages/oss/List/service';
import {Button, message} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import styles from './index.module.less'
const FormTalk: FC = () => {
  const [prefixes,setPrefixes] = useState<string[]>(['']);
  const [list, setList] = useState<any[]>([]);
  const [folder, setFolder] = useState<string[]>([]);
  const initial = async () => {
    const { data } = await listFiles({ prefix:prefixes.at(-1) });
    setList(data.objectSummaries);
    setFolder(data.commonPrefixes);
  };
  const deleteFile=async (id: string) => {
    const r=await delFile({id});
    console.log(r)
  }
  const deleteFiles=async (id: string) => {
    const r=await deleteFolder({id});
    console.log(r)
  }
  useEffect(() => {
    initial();
  }, [prefixes]);
  return (
    <PageContainer>
      <Button type={'link'} onClick={()=>setPrefixes(prefixes.slice(0,-1))}>back</Button>
      {folder?.map((item) => (
        <div className={styles.delete} key={item}><span onClick={()=>setPrefixes([...prefixes,item])}>{item}</span> <DeleteOutlined className={styles.icon} onClick={()=>deleteFiles(item)}/></div>
      ))}
      {list?.map((item) => (
        <div onClick={()=>{
          message.info(`https://oss-zzf.zzfzzf.com/${item.key}`)
        }} className={styles.delete} key={item.key}>{item.key} <DeleteOutlined className={styles.icon} onClick={()=>deleteFile(item.key)} /></div>
      ))}
    </PageContainer>
  );
};

export default FormTalk;
