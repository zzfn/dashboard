import type { Effect, Reducer } from 'umi';

import type { AnalysisData } from './data.d';
import { fakeChartData, getAll, getTags } from './service';

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
};

const Model: ModelType = {
  namespace: 'homeAndHome',

  state: initState,

  effects: {
    *fetch(_, { call, put }) {
      // const response = yield call(fakeChartData);
      // yield put({
      //   type: 'save',
      //   payload: response,
      // });
      const { data } = yield call(getTags);
      const { data: a } = yield call(getAll);
      yield put({
        type: 'save',
        payload: { salesTypeData: data.map((n: any) => ({ x: n.tag, y: n.count })) },
      });
      yield put({
        type: 'save',
        payload: { visitData: a },
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
