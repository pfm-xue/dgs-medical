import { userShow } from '../services/api';

export default {
  namespace: 'show',

  state: {
    data: {
      user: {},
    },
  },

  effects: {
    *user({ payload }, { call, put }) {
      const response = yield call(userShow, payload);
      yield put({
        type: 'save',
        payload: response,
      });
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
