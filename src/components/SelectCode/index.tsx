import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { fetchList } from '@/components/SelectCode/service';

interface SelectCodeProps {
  code: string;
  placeholder?: string;
}

const SelectCode: React.FC<SelectCodeProps> = (props) => {
  const { code } = props;
  const [list, setList] = useState([]);
  const handleFetchList = async () => {
    const { data } = await fetchList({ code });
    setList(data);
  };
  useEffect(() => {
    handleFetchList().then();
  }, [code]);
  return (
    <Select
      {...props}
      showSearch
      style={{ width: 200 }}
      filterOption={(input, option: any) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {list.map((item: any) => (
        <Select.Option key={item.id} value={item.code}>
          {item.name}
        </Select.Option>
      ))}
    </Select>
  );
};
export default SelectCode;
