// import { queryTask, addTask, removeTask } from '../services/api';
import { queryTask, addTask, searchTask, queryTaskUser } from '../services/api';

export default {
  namespace: 'task',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryTask, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *user({ payload }, { call, put }) {
      const response = yield call(queryTaskUser, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *search({ payload }, { call, put }) {
      const response = yield call(searchTask, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },    
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addTask, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeTask, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
