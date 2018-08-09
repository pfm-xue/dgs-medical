import React, { PureComponent, Fragment } from 'react';
import { Table, Button, Input, message, Popconfirm, Divider, Select } from 'antd';
import styles from './style.less';

export default class TableForm extends PureComponent {
  index = 0;

  cacheOriginData = {};

  constructor(props) {
    super(props);

    this.state = {
      data: props.value,
      loading: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        data: nextProps.value,
      });
    }
  }

  getRowByKey(key, newData) {
    const { data } = this.state;
    return (newData || data).filter(item => item.key === key)[0];
  }

  toggleEditable = (e, key) => {
    e.preventDefault();
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      // 进入编辑状态时保存原始数据
      if (!target.editable) {
        this.cacheOriginData[key] = { ...target };
      }
      target.editable = !target.editable;
      this.setState({ data: newData });
    }
  };

  newMember = () => {
    const { data } = this.state;
    let newData = [];
    if (data !== "") {
      newData = data.map(item => ({ ...item }));
    }
    newData.push({
      key: `Enum_ID_${this.index}`,
      programContent: '',
      attention: '',
      frequency: '',
      time: '',
      personLiable: '',
      editable: true,
      isNew: true,
    });
    this.index += 1;
    this.setState({ data: newData });
  };

  remove(key) {
    const { data } = this.state;
    const { onChange } = this.props;
    const newData = data.filter(item => item.key !== key);
    this.setState({ data: newData });
    onChange(newData);
  }

  handleKeyPress(e, key) {
    if (e.key === 'Enter') {
      this.saveRow(e, key);
    }
  }

  handleFieldChange(e, fieldName, key) {
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      if (typeof e.target !== 'undefined') {
        target[fieldName] = e.target.value;
      } else {
        target[fieldName] = e;
      }
      this.setState({ data: newData });
    }
  }

  saveRow(e, key) {
    e.persist();
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      if (this.clickedCancel) {
        this.clickedCancel = false;
        return;
      }
      const target = this.getRowByKey(key) || {};

      if (!target.programContent || !target.attention || !target.frequency || !target.time || !target.personLiable ) {
        message.error('完全な情報を記入してください。');
        e.target.focus();
        this.setState({
          loading: false,
        });
        return;
      }
      const { data } = this.state;
      const { onChange } = this.props;
      delete target.isNew;
      this.toggleEditable(e, key);
      onChange(data);
      this.setState({
        loading: false,
      });
    }, 500);
  }

  cancel(e, key) {
    this.clickedCancel = true;
    e.preventDefault();
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (this.cacheOriginData[key]) {
      Object.assign(target, this.cacheOriginData[key]);
      target.editable = false;
      delete this.cacheOriginData[key];
    }
    this.setState({ data: newData });
    this.clickedCancel = false;
  }

  render() {
    const columns = [
      {
        title: 'プログラム内容',
        dataIndex: 'programContent',
        key: 'programContent',
        width: '35%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                autoFocus
                value={text}
                placeholder="プログラム内容"
                onChange={e => this.handleFieldChange(e, 'programContent', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
              />
            );
          }
          return text;
        },
      },
      {
        title: '留意点',
        dataIndex: 'attention',
        key: 'attention',
        width: '15%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                placeholder="留意点"
                onChange={e => this.handleFieldChange(e, 'attention', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
              />
            );
          }
          return text;
        },
      },
      {
        title: '頻度',
        dataIndex: 'frequency',
        key: 'frequency',
        width: '10%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Select 
                value={text}
                placeholder="頻度"
                onChange={e => this.handleFieldChange(e, 'frequency', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
              >
                <Option value="1">週1回</Option>
                <Option value="2">週2回</Option>
                <Option value="3">週3回</Option>
                <Option value="4">週4回</Option>
                <Option value="5">週5回</Option>
              </Select>
            );
          }
          return text;
        },
      },
      {
        title: '時間',
        dataIndex: 'time',
        key: 'time',
        width: '10%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Select 
                value={text}
                placeholder="時間"
                onChange={e => this.handleFieldChange(e, 'time', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
              >
                <Option value="10">10分</Option>
                <Option value="20">20分</Option>
                <Option value="30">30分</Option>
                <Option value="40">40分</Option>
                <Option value="50">50分</Option>
                <Option value="60">60分</Option>
              </Select>
            );
          }
          return text;
        },
      },
      {
        title: '主な実施者',
        dataIndex: 'personLiable',
        key: 'personLiable',
        width: '15%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                placeholder="主な実施者"
                onChange={e => this.handleFieldChange(e, 'personLiable', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
              />
            );
          }
          return text;
        },
      },            
      {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          const { loading } = this.state;
          if (!!record.editable && loading) {
            return null;
          }
          if (record.editable) {
            if (record.isNew) {
              return (
                <span>
                  <a onClick={e => this.saveRow(e, record.key)}>追加</a>
                  <Divider type="vertical" />
                  <Popconfirm title="これを削除しますか？" onConfirm={() => this.remove(record.key)}>
                    <a>削除</a>
                  </Popconfirm>
                </span>
              );
            }
            return (
              <span>
                <a onClick={e => this.saveRow(e, record.key)}>保存</a>
                <Divider type="vertical" />
                <a onClick={e => this.cancel(e, record.key)}>キャンセル</a>
              </span>
            );
          }
          return (
            <span>
              <a onClick={e => this.toggleEditable(e, record.key)}>編集</a>
              <Divider type="vertical" />
              <Popconfirm title="これを削除しますか？" onConfirm={() => this.remove(record.key)}>
                <a>削除</a>
              </Popconfirm>
            </span>
          );
        },
      },
    ];

    const { loading, data } = this.state;

    return (
      <Fragment>
        <Table
          loading={loading}
          columns={columns}
          dataSource={data}
          pagination={false}
          rowClassName={record => {
            return record.editable ? styles.editable : '';
          }}
        />
        <Button
          style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
          type="dashed"
          onClick={this.newMember}
          icon="plus"
        >
          プログラム
        </Button>
      </Fragment>
    );
  }
}