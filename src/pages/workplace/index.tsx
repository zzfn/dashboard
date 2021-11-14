import type { FC } from 'react';
import { Avatar, Card, Col, Skeleton, Row, Statistic, Table } from 'antd';
import { Pie, WordCloud } from '@ant-design/charts';

import { PageContainer } from '@ant-design/pro-layout';
import EditableLinkGroup from './components/EditableLinkGroup';
import styles from './style.less';
import type { CurrentUser } from './data.d';
import { getHomeOverview } from './service';
import { useModel } from '@@/plugin-model/useModel';
import { useEffect, useState } from 'react';
import { columns, links, hello } from './standard';

const PageHeaderContent: FC<{ currentUser: Partial<CurrentUser> }> = ({ currentUser }) => {
  const loading = currentUser && Object.keys(currentUser).length;
  if (!loading) {
    return <Skeleton avatar paragraph={{ rows: 1 }} active />;
  }
  return (
    <div className={styles.pageHeaderContent}>
      <div className={styles.avatar}>
        <Avatar size="large" src={currentUser.avatar} />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          {hello.get(Math.floor(new Date().getHours() / 6)).time}，{/*@ts-ignore*/}
          {currentUser?.nickName as any}，{hello.get(Math.floor(new Date().getHours() / 6)).tip}
        </div>
        <div>
          {currentUser.title} |{currentUser.group}
        </div>
      </div>
    </div>
  );
};

const ExtraContent: FC<any> = ({ dataSource }) => (
  <div className={styles.extraContent}>
    <div className={styles.statItem}>
      <Statistic
        title="文章数"
        value={dataSource.releaseCount}
        suffix={`/ ${dataSource.allCount}`}
      />
    </div>
    <div className={styles.statItem}>
      <Statistic title="本日uv" value={dataSource.userCount?.todayUserView ?? 0} />
    </div>
    <div className={styles.statItem}>
      <Statistic title="本日pv" value={dataSource.userCount?.todayUniqueVisitor ?? 0} />
    </div>
    <div className={styles.statItem}>
      <Statistic title="总uv" value={dataSource.userCount?.allUniqueVisitor ?? 0} />
    </div>
    <div className={styles.statItem}>
      <Statistic title="总pv" value={dataSource.userCount?.allPageView ?? 0} />
    </div>
  </div>
);

const Workplace: FC = () => {
  const [dataSource, setDataSource] = useState<any>({ tags: [] });
  const [loading, setLoading] = useState(true);
  const { initialState } = useModel('@@initialState');
  const initial = async () => {
    const { data } = await getHomeOverview();
    setLoading(false);
    setDataSource(data);
    // const socket = new WebSocket('ws://localhost:8060/websocket');
    //
    // socket.onopen = function () {
    //   console.log('连接成功');
    // };
    // socket.onclose = function () {
    //   console.log('退出连接');
    // };
    //
    // socket.onmessage = function (event) {
    //   console.log('收到消息' + event.data);
    // };
    //
    // socket.onerror = function () {
    //   console.log('连接出错');
    // };
    //
    // window.onbeforeunload = function () {
    //   socket.close();
    // };
  };

  useEffect(() => {
    initial().then();
  }, []);
  return (
    <PageContainer
      loading={loading}
      content={<PageHeaderContent currentUser={initialState?.currentUser || ({} as any)} />}
      extraContent={<ExtraContent dataSource={dataSource} />}
    >
      <Row gutter={[24, 12]}>
        <Col xl={16} lg={24} md={24} sm={24} xs={24}>
          <Card title={'文章分类'}>
            <Pie
              label={{
                type: 'outer',
                content: '{name} {percentage}',
              }}
              radius={0.9}
              data={dataSource.tags}
              angleField={'count'}
              colorField={'tag'}
            />
          </Card>
        </Col>
        <Col className={styles.right} xl={8} lg={24} md={24} sm={24} xs={24}>
          <Card title="快速开始 / 便捷导航" bordered={false} bodyStyle={{ padding: 0 }}>
            <EditableLinkGroup links={links} />
          </Card>
          <Card bodyStyle={{ padding: 0 }} bordered={false} title="热门搜索">
            <WordCloud
              autoFit={false}
              height={235}
              data={dataSource.searchKeywords}
              weightField={'score'}
              wordField={'value'}
            />
          </Card>
        </Col>
        <Col xl={16} lg={24} md={24} sm={24} xs={24}>
          <Card title={'性能指标(Last 30 days)'}>
            <Table
              pagination={false}
              size={'small'}
              rowKey={'id'}
              dataSource={dataSource.performances}
              columns={columns}
            />
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Workplace;
