import { SearchOutlined } from '@ant-design/icons';
import type { AutoCompleteProps } from 'antd/es/auto-complete';
import React from 'react';

import classNames from 'classnames';
import styles from './index.less';

export type HeaderSearchProps = {
  onSearch?: (value?: string) => void;
  onChange?: (value?: string) => void;
  onVisibleChange?: (b: boolean) => void;
  className?: string;
  placeholder?: string;
  options: AutoCompleteProps['options'];
  defaultVisible?: boolean;
  visible?: boolean;
  defaultValue?: string;
  value?: string;
};

const HeaderSearch: React.FC<HeaderSearchProps> = (props) => {
  const { className } = props;

  return (
    <div className={classNames(className, styles.headerSearch)}>
      <SearchOutlined
        key="Icon"
        style={{
          cursor: 'pointer',
        }}
      />
    </div>
  );
};

export default HeaderSearch;
