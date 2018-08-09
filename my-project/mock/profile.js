const basicGoods = [
  {
    id: '2018-05-01',
    name: '藤野和宏',
    barcode: '第四次生成計画書。 -- 藤野和宏、冈本柊人',
    price: '2.00',
    num: '1',
    amount: '2.00',
  },
  {
    id: '2018-02-01',
    name: '藤野和宏',
    barcode: '第三次生成計画書。 -- 藤野和宏、冈本柊人',
    price: '3.00',
    num: '2',
    amount: '6.00',
  },
  {
    id: '2017-11-01',
    name: '冈本柊人',
    barcode: '第二次生成計画書。 -- 冈本柊人',
    price: '7.00',
    num: '4',
    amount: '28.00',
  },
  {
    id: '2017-08-01',
    name: '藤野和宏',
    barcode: '計画書が初めて作成する。 -- 藤野和宏、冈本柊人',
    price: '8.50',
    num: '3',
    amount: '25.50',
  },
];

const basicProgress = [
  {
    key: '1',
    time: '2017-10-01 14:10',
    rate: '藤野和宏',
    status: 'processing',
    operator: '画像のアップロード',
    cost: '5mins',
  },
  {
    key: '2',
    time: '2017-10-01 14:05',
    rate: '藤野和宏',
    status: 'success',
    operator: '画像のアップロード',
    cost: '1h',
  },
  {
    key: '3',
    time: '2017-10-01 13:05',
    rate: '藤野和宏',
    status: 'success',
    operator: '画像のアップロード',
    cost: '5mins',
  },
  {
    key: '4',
    time: '2017-10-01 13:00',
    rate: '藤野和宏',
    status: 'success',
    operator: '画像のアップロード',
    cost: '1h',
  },
  {
    key: '5',
    time: '2017-10-01 12:00',
    rate: '藤野和宏',
    status: 'success',
    operator: '画像のアップロード',
    cost: '5mins',
  },
];

const advancedOperation1 = [
  {
    key: 'op1',
    type: '订购关系生效',
    name: '曲丽丽',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
  {
    key: 'op2',
    type: '财务复审',
    name: '付小小',
    status: 'reject',
    updatedAt: '2017-10-03  19:23:12',
    memo: '不通过原因',
  },
  {
    key: 'op3',
    type: '部门初审',
    name: '周毛毛',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
  {
    key: 'op4',
    type: '提交订单',
    name: '林东东',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '很棒',
  },
  {
    key: 'op5',
    type: '创建订单',
    name: '汗牙牙',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
];

const advancedOperation2 = [
  {
    key: 'op1',
    type: '订购关系生效',
    name: '曲丽丽',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
];

const advancedOperation3 = [
  {
    key: 'op1',
    type: '创建订单',
    name: '汗牙牙',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
];

export const getProfileBasicData = {
  basicGoods,
  basicProgress,
};

export const getProfileAdvancedData = {
  advancedOperation1,
  advancedOperation2,
  advancedOperation3,
};

export default {
  getProfileBasicData,
  getProfileAdvancedData,
};
