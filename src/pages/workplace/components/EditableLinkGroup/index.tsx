import React, { createElement } from 'react';

import styles from './index.less';
import { Link } from 'umi';

export type EditableLink = {
  title: string;
  href: string;
  id?: string;
};

type EditableLinkGroupProps = {
  links: EditableLink[];
};

const EditableLinkGroup: React.FC<EditableLinkGroupProps> = (props) => {
  const { links } = props;
  return (
    <div className={styles.linkGroup}>
      {links.map((link) =>
        createElement(
          link.href.startsWith('http') ? 'a' : Link,
          {
            key: `linkGroup-item-${link.id || link.title}`,
            to: link.href,
            href: link.href,
            target: link.href.startsWith('http') ? '_blank' : '_self',
          },
          link.title,
        ),
      )}
    </div>
  );
};

export default EditableLinkGroup;
