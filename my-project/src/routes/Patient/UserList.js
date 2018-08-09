import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Icon,
  Card,
  Form,
  Input,
  Select,
  Button,
  Modal,
  DatePicker,
  Popconfirm,
  Divider,
  Table,
  Upload,
  message,
} from 'antd';
import { Link } from 'dva/router';
import { REMOTE_URL } from '../../utils/utils';
// import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './UserList.less';

const FormItem = Form.Item;
const { Option } = Select;

// 利用者 新建
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
      title="利用者登録"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="利用者氏名">
        {form.getFieldDecorator('name', {
          rules: [{ required: true, message: '氏名入力してください' }],
        })(<Input placeholder="入力してください" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="ふりがな">
        {form.getFieldDecorator('phonetic',)(<Input placeholder="入力してください" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="生年月日">
        {form.getFieldDecorator('birth', {
          rules: [{ required: true, message: '生年月日を選択してください' }],
        })(<Input type="Date" placeholder="入力してください" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="性別">
        {form.getFieldDecorator('sex', {
          rules: [{ required: true, message: '性別を選択してください' }],
        })(<Select placeholder="選択してください" style={{ width: '100%' }}>
            <Option value="男">男</Option>
            <Option value="女">女</Option>
          </Select>)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="電話番号">
        {form.getFieldDecorator('telephoneNumber', {})(<Input placeholder="入力してください" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="アドレス">
        {form.getFieldDecorator('address', {})(<Input placeholder="入力してください" />)}
      </FormItem>
    </Modal>
  );
});

@connect(({ user, loading }) => ({
  user,
  loading: loading.models.user,
}))
@Form.create()
export default class UserList extends PureComponent {
  state = {
    modalVisible1: false,
    modalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    userData: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetch',
    });
  }

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    // dispatch({
    //   type: 'user/fetch',
    //   payload: {},
    // });
  };

  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;

    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'user/remove',
          payload: {
            no: selectedRows.map(row => row.no).join(','),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const fields = {
        sex: fieldsValue.sex,
        name: fieldsValue.name,
      };

      this.setState({
        formValues: fields,
      });

      if (typeof fieldsValue.sex === 'undefined'
       && typeof fieldsValue.name === 'undefined') {
        dispatch({
          type: 'user/fetch',
        });
      } else {
        dispatch({
          type: 'user/search',
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
      userData: record,
    });
  };

  handleCancel = () => {
    this.setState({
      modalVisible1: false,
    });
  };

  handleAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/add',
      payload: {
        fields,
      },
    });
    this.setState({
      modalVisible: false,
      modalVisible1: false,
    });
  };

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="利用者氏名">
              {getFieldDecorator('name')(<Input placeholder="入力してください" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="性別">
              {getFieldDecorator('sex')(
                <Select placeholder="選択してください" style={{ width: '100%' }}>
                  <Option value="男">男</Option>
                  <Option value="女">女</Option>
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

  onClick = () => {
    let fields = {printing: true};
    this.props.dispatch({
      type: 'user/add',
      payload: {
        fields,
      },
    });

    message.success(
      <a href="/使用者List.DAT" download="使用者List.DAT">「使用者List.DAT」出力成功。  ダウンロード</a>
    );
  };

  render() {
    const { user: { data }, loading } = this.props;
    const { modalVisible, modalVisible1, userData } = this.state;

    const props = {
      name: 'file',
      action: `${REMOTE_URL}/mp/user/upload`,
      multiple: true,
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    

    // 利用者 编辑
    const CreateForm1 = Form.create()(props => {
      const { modalVisible1, form, handleAdd, handleModalVisible1 } = props;
      const okHandle = () => {
        form.validateFields((err, fieldsValue) => {
          if (err) return;
          form.resetFields();
          handleAdd(fieldsValue);
        });
      };
      return (
        userData && (
          <Modal
            title="利用者情報変更"
            visible={modalVisible1}
            onOk={okHandle}
            onCancel={() => this.handleCancel()}
          >
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="">
              {form.getFieldDecorator('_id', {
                initialValue: userData._id,
                rules: [{ required: true, message: 'Please input some description...' }],
              })(<Input type="hidden" disabled placeholder="入力してください" />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="利用者氏名">
              {form.getFieldDecorator('name', {
                initialValue: userData.name,
              })(<Input placeholder="入力してください" />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="ふりがな">
              {form.getFieldDecorator('phonetic', {
                initialValue: userData.phonetic,
              })(<Input placeholder="入力してください" />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="生年月日">
              {form.getFieldDecorator('birth', {
                initialValue: moment(userData.birth).format('YYYY-MM-DD'),
              })(<Input type="Date" placeholder="入力してください" />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="性別">
              {form.getFieldDecorator('sex', {
                initialValue: userData.sex,
              })(
                <Select placeholder="選択してください" style={{ width: '100%' }}>
                  <Option value="男">男</Option>
                  <Option value="女">女</Option>
                </Select>
              )}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="電話番号">
              {form.getFieldDecorator('telephoneNumber', {
                initialValue: userData.telephoneNumber,
              })(<Input placeholder="入力してください" />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="アドレス">
              {form.getFieldDecorator('address', {
                initialValue: userData.address,
              })(<Input placeholder="入力してください" />)}
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
        title: '利用者氏名',
        dataIndex: 'name',
      },
      {
        title: 'ふりがな',
        dataIndex: 'phonetic',
      },
      {
        title: '生年月日',
        dataIndex: 'birth',
        render: text => <Fragment>{moment(text).format('YYYY-MM-DD')}</Fragment>,
      },
      {
        title: '性別',
        dataIndex: 'sex',
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
        title: '操作',
        render: record => (
          <Fragment>
            <Button type="primary" onClick={() => this.handleModalVisible1(record)}>
              編集
            </Button>
            <Divider type="vertical" />
            <Link to={'/patient/show-patient/' + record._id} className={styles.logo} key="logo">
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
      <PageHeaderLayout title="利用者一覧">
        <Card bordered={false} >
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
              <Divider type="vertical" />              
              <a href="/利用者Import.xlsx" download="利用者Import.xlsx">
              <Button icon="cloud-download" type="primary">
                テンプレート
              </Button>
              </a>
              <Upload {...props}>
                <Button>
                  <Icon type="upload" /> 利用者導入
                </Button>
              </Upload>
            </div>
            <Table
              size="middle"
              rowKey={record => record._id}
              dataSource={data.list}
              columns={columns}
              pagination={{ pageSize: 10 }}
            />
            <Button type="primary" icon="cloud-download" onClick={this.onClick} >利用者出力</Button>         
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
        <CreateForm1 {...parentMethods1} modalVisible1={modalVisible1} />
      </PageHeaderLayout>
    );
  }
}
