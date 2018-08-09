import { stringify } from 'qs';
import request from '../utils/request';

import { REMOTE_URL } from '../utils/utils';

  // return request(`${REMOTE_URL}/delivery/?${stringify(params)}`);

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

// export async function queryRule(params) {
//   return request(`/api/rule?${stringify(params)}`);
// }

export async function queryRole() {
  return request(`${REMOTE_URL}/mp/admin/?page=1`);
}

export async function queryTask() {
  return request(`${REMOTE_URL}/mp/task/?page=1`);
}

export async function queryTemplate() {
  return request(`${REMOTE_URL}/mp/template/?page=1`);
}

export async function queryAssessment() {
  return request(`${REMOTE_URL}/mp/assessment/?page=1`);
}

export async function queryPlan() {
  return request(`${REMOTE_URL}/mp/plan/?page=1`);
}

export async function queryUser() {
  return request(`${REMOTE_URL}/mp/user/?page=1`);
}

export async function showUser(params) {
  return request(`${REMOTE_URL}/mp/user/${params}`);
}

export async function showTemplate(params) {
  return request(`${REMOTE_URL}/mp/template/${params}`);
}

export async function showPlan(params) {
  return request(`${REMOTE_URL}/mp/plan/${params}`);
}

export async function userPlan(params) {
  return request(`${REMOTE_URL}/mp/plan/user/${params}`);
}

export async function showAssessment(params) {
  return request(`${REMOTE_URL}/mp/assessment/${params}`);
}

export async function queryTaskUser(params) {
  return request(`${REMOTE_URL}/mp/task/${params}`);
}

export async function userShow(params) {
  return request(`${REMOTE_URL}/mp/user/${params}`);
}

export async function roleShow(params) {
  return request(`${REMOTE_URL}/mp/admin/${params}`);
}

// export async function removeRule(params) {
//   return request('/api/rule', {
//     method: 'POST',
//     body: {
//       ...params,
//       method: 'delete',
//     },
//   });
// }

// export async function addRule(params) {
//   return request('/api/rule', {
//     method: 'POST',
//     body: params,
//     // body: {
//     //   ...params,
//     //   method: 'post',
//     // },
//   });
// }

export async function addAssessment(params) {
  return request(`${REMOTE_URL}/mp/assessment/`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function addTemplate(params) {
  return request(`${REMOTE_URL}/mp/template/`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function searchPlan(params) {
  return request(`${REMOTE_URL}/mp/plan/search/`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function addPlan(params) {
  return request(`${REMOTE_URL}/mp/plan/`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function searchUser(params) {
  return request(`${REMOTE_URL}/mp/user/search/`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function addUser(params) {
  return request(`${REMOTE_URL}/mp/user/`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function searchRole(params) {
  return request(`${REMOTE_URL}/mp/admin/search/`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function addRole(params) {
  return request(`${REMOTE_URL}/mp/admin/`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function addTask(params) {
  return request(`${REMOTE_URL}/mp/task/`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function searchTask(params) {
  return request(`${REMOTE_URL}/mp/task/search/`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
  return request(`${REMOTE_URL}/mp/admin/`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
      login: true,
    },
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}
