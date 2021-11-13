import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => {
  return (
    <DefaultFooter
      copyright={`${new Date().getFullYear()} zzfzzf`}
      links={[
        {
          key: 'zzfzzf.com',
          title: 'zzfzzf.com',
          href: 'https://zzfzzf.com',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/zzfn/dashboard',
          blankTarget: true,
        },
        {
          key: 'Ant Design',
          title: 'Ant Design',
          href: 'https://ant.design',
          blankTarget: true,
        },
      ]}
    />
  );
};
