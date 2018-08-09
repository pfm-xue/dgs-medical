// import { queryRole, removeRole, addRole } from '../services/api';
import { routerRedux } from 'dva/router';
import { queryRole, addRole, roleShow, searchRole } from '../services/api';

export default {
  namespace: 'role',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryRole, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *search({ payload }, { call, put }) {
      const response = yield call(searchRole, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },    
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addRole, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
      // if (response.status === 'ok') {
      //   reloadAuthorized();
      //   yield put(routerRedux.push('/home'));
      // }      
    },
    *show({ payload, callback }, { call, put }) {
      const response = yield call(roleShow, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeRole, payload);
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
