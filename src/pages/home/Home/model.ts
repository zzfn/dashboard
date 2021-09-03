import type { Effect, Reducer } from 'umi';

import type { AnalysisData } from './data.d';
import { fakeChartData, getAll, getServerInfo, getTags } from './service';

export type ModelType = {
  namespace: string;
  state: AnalysisData;
  effects: {
    fetch: Effect;
    fetchSalesData: Effect;
  };
  reducers: {
    save: Reducer<AnalysisData>;
    clear: Reducer<AnalysisData>;
  };
};

const initState = {
  visitData: [],
  visitData2: [],
  salesData: [],
  searchData: [],
  offlineData: [],
  offlineChartData: [],
  salesTypeData: [],
  salesTypeDataOnline: [],
  salesTypeDataOffline: [],
  radarData: [],
  serverData: {},
};

const Model: ModelType = {
  namespace: 'homeAndHome',

  state: initState,

  effects: {
    *fetch(_, { call, put }) {
      const { data } = yield call(getTags);
      const { data: a } = yield call(getAll);
      const names = ['a', 'b', 'c', 'd'];
      const list = yield names.map((name) => call(getServerInfo, { server: name }));
      const server = list.map((item: any) => item.data);
      yield put({
        type: 'save',
        payload: {
          serverData: { servers: server },
          visitData: a,
          salesTypeData: data.map((n: any) => ({ x: n.tag, y: n.count })),
        },
      });
    },
    *fetchSalesData(_, { call, put }) {
      const response = yield call(fakeChartData);
      yield put({
        type: 'save',
        payload: {
          salesData: response.salesData,
        },
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    clear() {
      return initState;
    },
  },
};

export default Model;
