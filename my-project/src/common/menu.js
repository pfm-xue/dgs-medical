import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: 'ホーム',
    icon: 'home',
    path: 'home',
    children: [

    ],
  },
  {
    name: '管理者管理',
    icon: 'form',
    path: 'role',
    children: [
      {
        name: '管理者一覧',
        path: 'physician-role',
      },
    ],
  },
  {
    name: '利用者管理',
    icon: 'user',
    path: 'patient',
    children: [
      {
        name: '利用者一覧',
        path: 'list-patient',
      },
    ],
  },
  {
    name: 'スケジュール管理',
    icon: 'table',
    path: 'schedule',
    children: [
      {
        name: '管理者',
        path: 'roles',
      },
      {
        name: '利用者',
        path: 'patient',
      },
    ],
  },
  {
    name: 'データ辞書',
    icon: 'layout',
    path: 'dictionary',
    children: [
      {
        name: '計画書',
        path: 'plan-dictionary',
      },
    ],
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
