// import { addAssessment, queryAssessment, removeAssessment } from '../services/api';
import { addAssessment, queryAssessment, showAssessment } from '../services/api';  

export default {
  namespace: 'assessment', 

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryAssessment, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addAssessment, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *show({ payload }, { call, put }) {
      const response = yield call(showAssessment, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },    
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeAssessment, payload);
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
