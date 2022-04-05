import type { FC } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { useEffect, useState } from 'react';
import { listFiles } from '@/pages/img/List/service';

const FormTalk: FC = () => {
  const [list, setList] = useState<any[]>([]);
  const initial = async () => {
    const { data } = await listFiles({ path: 'cdn/' });
    setList(data.objectSummaries);
  };
  useEffect(() => {
    initial();
  }, []);
  return (
    <PageContainer>
      {list?.map((item) => (
        <div key={item.eTag}>{item.key}</div>
      ))}
    </PageContainer>
  );
};

export default FormTalk;
