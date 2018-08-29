import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Card,
  Tabs,
  Icon,
  List,
  Form,
  Modal,
  Button,
  Upload,
  Calendar,
  DatePicker,
  // Col,
  // Row,
  // Steps,
  // Input,
  // Avatar,
} from 'antd';
import moment from 'moment';
import { Link } from 'dva/router';
import styles from './UserShow.less';
import { REMOTE_URL } from '../../utils/utils';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const { TabPane } = Tabs;
const FormItem = Form.Item;
const { Description } = DescriptionList;

@connect(({ user, task, plan, assessment }) => ({
  task,
  user,
  plan,
  assessment,
}))
@Form.create()
export default class UserShow extends PureComponent {
  state = {
    formValues: {},
    previewImage: '',
    previewVisible: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'task/fetch',
    });
    dispatch({
      type: 'assessment/fetch',
    });
    dispatch({
      type: 'user/show',
      payload: this.props.match.params.id,
    });
    dispatch({
      type: 'plan/user',
      payload: this.props.match.params.id,　　
    });
  }

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'user/fetch',
      payload: {},
    });
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = file => {
    this.setState({
      previewVisible: true,
      previewImage: file.url || file.thumbUrl,
    });
  };

  render() {
    const { user, task, plan, assessment, dispatch, match } = this.props;
    const { previewVisible, previewImage } = this.state;
    let scheduleTime = '';
    let imageList = [];
    
    if (user.data.list.length > 0) {
      let list = user.data.list[0].image;
      for (let i = 0; i < list.length; i += 1) {
        let image = {};
        image = {
          uid: list[i]._id,
          name: list[i].fileName,
          status: 'done',
          url: `${REMOTE_URL}/image/${list[i].name}`,
          thumbUrl: `${REMOTE_URL}/image/${list[i].name}`,
        };
        imageList.push(image);
      }
    }

    const props = {
      name: 'logo',
      action: `${REMOTE_URL}/mp/user/uploadCover/${this.props.match.params.id}`,
      listType: "picture-card",
      defaultFileList: [...imageList],
    };

    function editData(data) {
      if (scheduleTime !== '') {
        data.executeTime = scheduleTime._d;
        dispatch({
          type: 'task/add',
          payload: {
            fields: data,
          },
        });
      }
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
                  個別機能訓練加算
                  <li>プログラム：{data.task_plan.additionalTraining.enum[0].programContent}</li>
                  個別機能訓練計画書
                  <li>プログラム：{data.task_plan.planTow.enum[0].programContent}</li>
                </ul>
              </div>
            </Card>
          </div>
        ),
      });
    }

    function getListData(value) {
      const list = task.data.list;
      const id = match.params.id;
      let data;
      list.map(item => {
        const executeTime = moment(item.executeTime).format('YYYY-MM-DD');
        const valueTime = moment(value._d).format('YYYY-MM-DD');
        if (executeTime === valueTime && item.task_user._id === id) {
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
      <PageHeaderLayout title="利用者詳細情報">
        <Card style={{ marginBottom: 24 }} title="利用者情報" bordered={false}>
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={user.data.list}
          renderItem={item => (
            <DescriptionList size="large" style={{ marginBottom: 32 }}>
              <Description term="利用者氏名">{item.name}</Description>
              <Description term="ふりがな">{item.phonetic}</Description>
              <Description term="生年月日">{moment(item.birth).format('YYYY-MM-DD')}</Description>
              <Description term="性別">{item.sex}</Description>
              <Description term="電話番号">{phone(item.telephoneNumber)}</Description>
              <Description term="住所">{item.address}</Description>
            </DescriptionList>
          )}
        />
        </Card>
        <Card bodyStyle={{ padding: 0 }} bordered={false} title="">
          <Tabs>
            {/*スケジュール*/}
            <TabPane tab="計画書" key="plan">
              <Card title="" style={{ marginBottom: 24 }} bordered={false}>
                <Link to= {'/form/advanced-form/' + this.props.match.params.id} >
                  <Button type="primary" icon="plus">
                    新規
                  </Button>
                </Link>
                <br/>
                <br/>
                {plan.data.list.map(item => (
                  <Card.Grid
                    className={styles.gridStyle}>
                    <p>作成日:{moment(item.createDate).format('YYYY-MM-DD')}</p>
                    <p>計画作成者:{item.planAuthor.adminName}</p>
                    <p>管理者:{item.admin.adminName}</p>
                    <p>利用者:{item.user.name}</p>
                    <p>特記事項:{item.specialNotes}</p>
                    <p className={styles.center}>
                    <Link to={'/profile/plan-show/' + item._id}>
                      <Icon type="printer"/> プレビュー
                    </Link>
                    <Icon type="pause"/>
                    <Link to={'/form/plan-edit/' + item._id}>
                      <Icon type="edit"/> 編集
                    </Link>
                    </p>
                  </Card.Grid>
                ))}
              </Card>
            </TabPane>
            {/*スケジュール*/}
            <TabPane tab="スケジュール" key="schedule">
              <Card title="" style={{ marginBottom: 24 }} bordered={false}>
                <br/>
                <br/>
                <Calendar dateCellRender={dateCellRender} />
              </Card>
            </TabPane>
            {/*アセスメント*/}
            <TabPane tab="アセスメント" key="assessment">
                <Card title="" style={{ marginBottom: 24 }} bordered={false}>
                {assessment.data.list.map(item => (
                    <Card.Grid
                      className={styles.gridStyle}>
                      <p>テスト作成日:{moment(item.total_Short).format('YYYY-MM-DD')}</p>
                      <p className={styles.center} >
                      <Link to={'/assessment/edit-assessment/' + item._id}>
                        <Icon type="edit" /> 編集
                      </Link>
                      </p>
                    </Card.Grid>
                  ))}
              </Card>
            </TabPane>
            {/*画像*/}
            <TabPane tab="画像" key="record">
              <Card title="" style={{ marginBottom: 24 }} bordered={false}>
                <Upload {...props}>
                  <Button>
                    <Icon type="upload" /> Upload
                  </Button>
                </Upload>                
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                  <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
              </Card>
            </TabPane>
          </Tabs>
        </Card>
      </PageHeaderLayout>
    );
  }
}
