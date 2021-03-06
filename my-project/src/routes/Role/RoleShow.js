import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Card,
  Tabs,
  List,
  Form,
  Modal,
  Input,
  message,
  Calendar,
  DatePicker,
} from 'antd';
const { TabPane } = Tabs;
import moment from 'moment';
const FormItem = Form.Item;
const { Description } = DescriptionList;
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAddTask, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAddTask(fieldsValue);
    });
  };
  return (
    <Modal
      title="管理者登録"
      visible={modalVisible}
      okText="確認"
      cancelText="キャンセル"      
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="実行時間">
        {form.getFieldDecorator('executeTime', {
          rules: [{ required: true, message: '入力してください。' }],
        })(<Input type="Date" placeholder="実行時間" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="到着時間">
        {form.getFieldDecorator('arrivalTime', {
          rules: [{ required: true, message: '入力してください。' }],
        })(<Input type="Date" placeholder="到着時間" />)}
      </FormItem>
    </Modal>
  );
});

@connect(({ task, role, loading }) => ({
  role,
  task,
  roleLoading: loading.models.user,
  taskLoading: loading.models.task,
}))
@Form.create()
export default class RoleShow extends PureComponent {
  state = {
    formValues: {},
    selectedRows: [],
    expandForm: false,
    modalVisible: false,
    modalVisible1: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'role/show',
      payload: this.props.match.params.id,
    });
    dispatch({
      type: 'task/fetch',
    });
  }

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleAddTask = fields => {
    this.props.dispatch({
      type: 'task/add',
      payload: {
        fields,
      },
    });

    message.success('添加成功');
    this.setState({
      modalVisible: false,
    });
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });

  render() {
    const { task, role, dispatch, match } = this.props;
    const { modalVisible } = this.state;
    let scheduleTime = '';

    const parentMethods = {
      handleAddTask: this.handleAddTask,
      handleModalVisible: this.handleModalVisible,
    };

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
            <Card style={{ marginBottom: 24 }} bordered={false}>
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

    function phone(value) {
      var newNumber= value.substr(0, 3) + "-" + value.substr(3, 4) + "-" + value.substr(6, 10);
      return newNumber;
    }

    return (
      <PageHeaderLayout title="管理者詳細情報">
        <Card style={{ marginBottom: 24 }} title="管理者情報" bordered={false}>
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={role.data.list}
          renderItem={item => (
            <DescriptionList size="large" style={{ marginBottom: 32 }}>
              <Description term="名前">{item.adminName}</Description>
              <Description term="職務">{item.post}</Description>
              <Description term="role">{item.role}</Description>
              <Description term="電話番号">{phone(item.telephoneNumber)}</Description>
              <Description term="Email">{item.email}</Description>
              <Description term="アドレス">{item.address}</Description>
            </DescriptionList>
          )}
        />
        </Card>
        <Card bodyStyle={{ padding: 0 }} bordered={false}>
          <Tabs>
            {/*スケジュール*/}
            <TabPane tab="スケジュール" key="assessment">
              <Card style={{ marginBottom: 24 }} bordered={false}>
                <br />
                <br />
                <Calendar dateCellRender={dateCellRender} />
              </Card>
            </TabPane>
          </Tabs>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
      </PageHeaderLayout>
    );
  }
}
