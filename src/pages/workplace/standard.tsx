const standard = new Map();
standard.set('LCP', [2500, 4000]);
standard.set('CLS', [0.1, 0.25]);
standard.set('FID', [100, 300]);
standard.set('FCP', [1800, 3000]);

const columns = [
  {
    title: '类别',
    dataIndex: 'id',
  },
  {
    title: '最小值',
    dataIndex: 'min',
    render: (text: any, record: any) => transform(standard.get(record.id), text),
  },
  {
    title: '平均值',
    dataIndex: 'avg',
    render: (text: any, record: any) => transform(standard.get(record.id), text),
  },
  {
    title: '最大值',
    dataIndex: 'max',
    render: (text: any, record: any) => transform(standard.get(record.id), text),
  },
  {
    title: '参考值',
    key: 'id',
    render: (item: any) =>
      `${standard.get(item.id) ? standard.get(item.id)[0] : null}/${
        standard.get(item.id) ? standard.get(item.id)[1] : null
      }`,
  },
];
const links = [
  {
    title: '新增文章',
    href: '/form-article',
  },
  {
    title: '日志查询',
    href: '/monitor',
  },
  {
    title: 'jenkins',
    href: 'https://jenkins.zzfzzf.com/',
  },
  {
    title: 'npm',
    href: 'https://npm.zzfzzf.com/',
  },
  {
    title: 'Github',
    href: 'https://github.com/',
  },
  {
    title: '掘金',
    href: 'https://juejin.cn/',
  },
  {
    title: 'Ant Design Charts',
    href: 'https://charts.ant.design/zh-CN',
  },
  {
    title: 'ANT DESIGN PRO',
    href: 'https://pro.ant.design/zh-CN/',
  },
  {
    title: 'ProComponents',
    href: 'https://procomponents.ant.design/',
  },
];
const hello = new Map();
hello.set(0, { time: '夜已深', tip: '注意休息哦~' });
hello.set(1, { time: '早上好', tip: '开启美好的一天叭~' });
hello.set(2, { time: '下午好', tip: '祝您工作愉快~' });
hello.set(3, { time: '晚上好', tip: '你可要注意身体呢~' });
function transform(name: Map<string, [number, number]>, value: number) {
  if (name) {
    if (value < name[0]) {
      return <span style={{ color: '#0cce68' }}>{value}</span>;
    } else if (value > name[1]) {
      return <span style={{ color: '#ff4e42' }}>{value}</span>;
    } else {
      return <span style={{ color: '#ffa400' }}>{value}</span>;
    }
  } else {
    return value;
  }
}

export { columns, links, hello };
