import React, { PureComponent, Fragment } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Button, Modal, Popconfirm, Divider, Table } from 'antd';
// import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import { Link } from 'dva/router';

import styles from './RoleList.less';

const FormItem = Form.Item;
const { Option } = Select;

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      title="管理者登録"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="管理者ID">
        {form.getFieldDecorator('adminId', {
          rules: [{ required: true, message: 'Please input some description...' }],
        })(<Input placeholder="入力してください" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="管理者名前">
        {form.getFieldDecorator('adminName', {
          rules: [{ required: true, message: 'Please input some description...' }],
        })(<Input placeholder="入力してください" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="パスワード">
        {form.getFieldDecorator('password', {
          rules: [{ required: true, message: 'Please input some description...' }],
        })(<Input type="password" placeholder="入力してください" />)}
      </FormItem>
      {/* <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="パスワードの確認">
        {form.getFieldDecorator('password', {
          rules: [{ required: true, message: 'Please input some description...' }],
        })(<Input type="password"  placeholder="入力してください" />)}
      </FormItem> */}
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="Email">
        {form.getFieldDecorator('email', {
          rules: [{ required: true, message: 'Please input some description...' }],
        })(<Input placeholder="入力してください" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="電話番号">
        {form.getFieldDecorator('telephoneNumber', {
          rules: [{ required: true, message: 'Please input some description...' }],
        })(<Input placeholder="入力してください" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="アドレス">
        {form.getFieldDecorator('address', {
          rules: [{ required: true, message: 'Please input some description...' }],
        })(<Input placeholder="入力してください" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="職務">
        {form.getFieldDecorator('post', {
          rules: [{ required: true, message: 'Please input some description...' }],
        })(<Input placeholder="入力してください" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="role">
        {form.getFieldDecorator('role', {
          rules: [{ required: true, message: 'Please input some description...' }],
        })(
          <Select placeholder="選択してください" style={{ width: '100%' }}>
            <Option value="介護士">介護士</Option>
            <Option value="施設内システム管理者1">施設内システム管理者</Option>
            <Option value="看護師">看護師</Option>
            <Option value="相談員">相談員</Option>
          </Select>
        )}
      </FormItem>
    </Modal>
  );
});

@connect(({ role }) => ({
  role,
}))
@Form.create()
export default class RoleList extends PureComponent {
  state = {
    modalVisible1: false,
    modalVisible: false,
    expandForm: false,
    formValues: {},
    roleData: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'role/fetch',
    });
  }
  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    // dispatch({
    //   type: 'role/fetch',
    //   payload: {},
    // });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const fields = {
        adminName: fieldsValue.adminName,
        role: fieldsValue.role,
      };

      this.setState({
        formValues: fields,
      });

      if (typeof fieldsValue.adminName === 'undefined'
       && typeof fieldsValue.role === 'undefined') {
        dispatch({
          type: 'role/fetch',
        });
      } else {
        dispatch({
          type: 'role/search',
          payload: {
            fields,
          },
        });
      }
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleModalVisible1 = record => {
    this.setState({
      modalVisible1: true,
      roleData: record,
    });
  };

  handleCancel = () => {
    this.setState({
      modalVisible1: false,
    });
  };

  handleAdd = fields => {
    this.props.dispatch({
      type: 'role/add',
      payload: {
        fields,
      },
    });

    this.setState({
      modalVisible: false,
      modalVisible1: false,
    });
    // location.reload();
  };

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="管理者名前">
              {getFieldDecorator('adminName')(<Input placeholder="入力してください" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="role">
              {getFieldDecorator('role')(
                <Select placeholder="選択してください" style={{ width: '100%' }}>
                  <Option value="介護士">介護士</Option>
                  <Option value="施設内システム管理者">施設内システム管理者</Option>
                  <Option value="看護師">看護師</Option>
                  <Option value="相談員">相談員</Option>
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
    const { role: { data } } = this.props;

    const { modalVisible, modalVisible1, roleData } = this.state;

    const CreateForm1 = Form.create()(props => {
      const { modalVisible1, form, handleAdd } = props;
      const okHandle = () => {
        form.validateFields((err, fieldsValue) => {
          if (err) return;
          form.resetFields();
          handleAdd(fieldsValue);
        });
      };
      return (
        roleData && (
          <Modal
            title="管理者情報変更"
            visible={modalVisible1}
            onOk={okHandle}
            onCancel={() => this.handleCancel()}
          >
            {/* <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="管理者ID">
            {form.getFieldDecorator('adminId', {
              rules: [{ required: true, message: 'Please input some description...' }],
            })(<Input placeholder="入力してください" />)}
          </FormItem> */}
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="">
              {form.getFieldDecorator('_id', {
                initialValue: roleData._id,
                rules: [{ required: true, message: 'Please input some description...' }],
              })(<Input type="hidden" disabled placeholder="入力してください" />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="管理者名前">
              {form.getFieldDecorator('adminName', {
                initialValue: roleData.adminName,
                rules: [{ required: true, message: 'Please input some description...' }],
              })(<Input placeholder="入力してください" />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="パスワード">
              {form.getFieldDecorator('password', {
                initialValue: roleData.password,
                rules: [{ required: true, message: 'Please input some description...' }],
              })(<Input type="password" placeholder="入力してください" />)}
            </FormItem>            
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="Email">
              {form.getFieldDecorator('email', { initialValue: roleData.email })(
                <Input placeholder="入力してください" />
              )}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="電話番号">
              {form.getFieldDecorator('telephoneNumber', {
                initialValue: roleData.telephoneNumber,
              })(<Input placeholder="入力してください" />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="アドレス">
              {form.getFieldDecorator('address', {
                initialValue: roleData.address,
              })(<Input placeholder="入力してください" />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="職務">
              {form.getFieldDecorator('post', { initialValue: roleData.post })(
                <Input placeholder="入力してください" />
              )}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="role">
              {form.getFieldDecorator('role', { initialValue: roleData.role })(
                <Select placeholder="選択してください" style={{ width: '100%' }}>
                  <Option value="介護士">介護士</Option>
                  <Option value="施設内システム管理者">施設内システム管理者</Option>
                  <Option value="看護師">看護師</Option>
                  <Option value="相談員">相談員</Option>
                </Select>
              )}
            </FormItem>
          </Modal>
        )
      );
    });

    function phone(value) {
      // 139-4093-2459
      var newNumber= value.substr(0, 3) + "-" + value.substr(3, 4) + "-" + value.substr(6, 10);
      return newNumber;
    }  

    const columns = [
      {
        title: '管理者名前',
        dataIndex: 'adminName',
      },
      {
        title: '職務',
        dataIndex: 'post',
      },
      {
        title: 'role',
        dataIndex: 'role',
      },
      {
        title: '電話番号',
        dataIndex: 'telephoneNumber',
        render: text => <Fragment>{phone(text)}</Fragment>,
      },
      {
        title: 'アドレス',
        dataIndex: 'address',
      },
      {
        title: 'Email',
        dataIndex: 'email',
      },
      {
        title: '操作',
        render: record => (
          <Fragment>
            <Button type="primary" onClick={() => this.handleModalVisible1(record)}>
              編集
            </Button>
            <Divider type="vertical" />
            <Link to={'/role/physician-show/' + record._id}>
              <Button>详细 </Button>
            </Link>
          </Fragment>
        ),
      },
    ];

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };

    const parentMethods1 = {
      handleAdd: this.handleAdd,
      handleModalVisible1: this.handleModalVisible1,
    };

    return (
      <PageHeaderLayout title="管理者一覧">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新規
              </Button>
              <Popconfirm title="これを削除しますか？">
                <Button icon="delete" type="danger">
                  削除
                </Button>
              </Popconfirm>
            </div>
            <Table
              // 紧凑型
              size="middle"
              rowKey={record => record._id}
              dataSource={data.list}
              columns={columns}
              pagination={{ pageSize: 10 }}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
        <CreateForm1 {...parentMethods1} modalVisible1={modalVisible1} />
      </PageHeaderLayout>
    );
  }
}
