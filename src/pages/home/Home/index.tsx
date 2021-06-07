import { Col, Row } from 'antd';
import React, { Component } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import type { RangePickerProps } from 'antd/es/date-picker/generatePicker';
import type moment from 'moment';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import IntroduceRow from './components/IntroduceRow';
import ProportionSales from './components/ProportionSales';

import { getTimeDistance } from './utils/utils';
import type { AnalysisData } from './data.d';

type RangePickerValue = RangePickerProps<moment.Moment>['value'];

type HomeProps = {
  homeAndHome: AnalysisData;
  dispatch: Dispatch;
  loading: boolean;
};

type HomeState = {
  salesType: 'all' | 'online' | 'stores';
  currentTabKey: string;
  rangePickerValue: RangePickerValue;
};

class Home extends Component<HomeProps, HomeState> {
  state: HomeState = {
    salesType: 'all',
    currentTabKey: '',
    rangePickerValue: getTimeDistance('year'),
  };

  reqRef: number = 0;

  timeoutId: number = 0;

  componentDidMount() {
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'homeAndHome/fetch',
      });
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'homeAndHome/clear',
    });
    cancelAnimationFrame(this.reqRef);
    clearTimeout(this.timeoutId);
  }

  render() {
    const { homeAndHome, loading } = this.props;
    const { visitData, salesTypeData } = homeAndHome;

    return (
      <GridContent>
        <React.Fragment>
          <IntroduceRow loading={loading} visitData={visitData} />
          <Row
            gutter={24}
            style={{
              marginTop: 24,
            }}
          >
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <ProportionSales loading={loading} salesPieData={salesTypeData} />
            </Col>
          </Row>
        </React.Fragment>
      </GridContent>
    );
  }
}

export default connect(
  ({
    homeAndHome,
    loading,
  }: {
    homeAndHome: any;
    loading: {
      effects: Record<string, boolean>;
    };
  }) => ({
    homeAndHome,
    loading: loading.effects['homeAndHome/fetch'],
  }),
)(Home);
