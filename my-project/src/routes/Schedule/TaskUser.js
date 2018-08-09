import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Button,
  Modal,
  message,
  Divider,
  Calendar,
  Badge,
  DatePicker,
} from 'antd';
import moment from 'moment';
import { Link } from 'dva/router';
import styles from './TableList.less';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

@connect(({ task, loading }) => ({
  task,
  taskLoading: loading.models.task,
}))
@Form.create()
export default class TableListUser extends PureComponent {
  state = {
    expandForm: false,
    selectedRows: [],
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    // dispatch({
    //   type: 'rule/fetch',
    // });
    dispatch({
      type: 'task/fetch',
    });
  }

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    // dispatch({
    //   type: 'rule/fetch',
    //   payload: {},
    // });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      // dispatch({
      //   type: 'rule/fetch',
      //   payload: values,
      // });
    });
  };

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="使用者の氏名">
              {getFieldDecorator('name')(<Input placeholder="入力してください" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="性別">
              {getFieldDecorator('sex')(
                <Select placeholder="選択してください" style={{ width: '100%' }}>
                  <Option value="0">男</Option>
                  <Option value="1">女</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                検索
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                リセット
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderForm() {
    return this.state.expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const { task, dispatch } = this.props;
    let scheduleTime = '';

    function editData(data) {
      data.executeTime = scheduleTime._d;
      dispatch({
        type: 'task/add',
        payload: {
          fields: data,
        },
      });
    }

    function dateChange(data) {
      const time = data;
      scheduleTime = time;
    }

    function confirm(data) {
      Modal.confirm({
        iconType: 'bars',
        title: 'タスク詳細情報',
        okText: '保存',
        cancelText: 'キャンセル',
        maskClosable: 'false',
        onOk() {
          editData(data);
        },
        content: (
          <div>
            <Card title="" style={{ marginBottom: 24 }} bordered={false}>
              <FormItem label="タスク予定時間">
                {
                  <DatePicker
                    onChange={dateChange}
                    defaultValue={moment(data.executeTime, 'YYYY/MM/DD')}
                    format={'YYYY/MM/DD'}
                  />
                }
              </FormItem>
              <div>
                <ul className="events">
                  <li>利用者氏名：{data.task_user.name}</li>
                  {/* <li>管理者氏名：{data.task_admin.adminName}</li> */}
                </ul>
              </div>
            </Card>
          </div>
        ),
      });
    }

    function getListData(value) {
      const list = task.data.list;
      let data;
      list.map(item => {
        const executeTime = moment(item.executeTime).format('YYYY-MM-DD');
        const valueTime = moment(value._d).format('YYYY-MM-DD');
        if (executeTime === valueTime) {
          data = item;
        }
      });
      return data;
    }

    function dateCellRender(value) {
      const list = getListData(value);
      if (typeof list === 'undefined') {
        return <div />;
      } else {
        return (
          <ul className="events">
            <a onClick={() => confirm(list)}>
              <li>予定時間:{moment(list.executeTime).format('YYYY-MM-DD')}</li>
              <li>利用者氏名：{list.task_user.name}</li>
              {/* <li>管理者：{list.task_admin.adminName}</li> */}
            </a>
          </ul>
        );
      }
    }

    return (
      <PageHeaderLayout>
        <Card title="検索">
          <div className={styles.tableListForm}>{this.renderForm()}</div>
        </Card>
        <Card title="スケジュール" style={{ marginTop: 16 }}>
          <Calendar dateCellRender={dateCellRender} />
        </Card>
      </PageHeaderLayout>
    );
  }
}
