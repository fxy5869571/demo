import { router } from 'umi';
import { addRule, queryRule, removeRule, updateRule } from './service';

const Model = {
  namespace: 'drugs',
  state: {
    data: {
      list: [],
      pagination: {},
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *add({ payload }, { put, select }) {
      const { data } = yield select(state => state.drugs);
      data.list.unshift({ ...payload, key: Math.random() });
      yield put({
        type: 'save',
        payload: data,
      });
      router.push('drugs');
    },

    *delete({ payload, callback }, { call, put, select }) {
      const { data } = yield select(state => state.drugs);
      data.list = data.list.filter(item => item.key !== payload.key);
      // const response = yield call(removeRule, payload);
      yield put({
        type: 'save',
        payload: data,
      });
      if (callback) callback();
    },

    *edit({ payload, callback }, { call, put, select }) {
      const { data } = yield select(state => state.drugs);
      console.log(payload, 'payload');
      data.list = data.list.map(item => {
        if (item.key === payload.key) {
          return { ...payload };
        }
        return item;
      });
      // const response = yield call(removeRule, payload);
      yield put({
        type: 'save',
        payload: data,
      });
      if (callback) callback();
    },
  },
  reducers: {
    save(state, action) {
      return { ...state, data: action.payload };
    },
  },
};
export default Model;
