import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Card,
  Badge,
  Table,
  Divider,
  Tabs,
  Button,
  Calendar,
  Steps,
  Icon,
  Form,
  Modal,
  Input,
  TimePicker,
  message,
  Popconfirm,
  Row,
  Col,
} from 'antd';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './AssessmentShow.less';
import moment from 'moment';
import StandardTable from 'components/StandardTable';
import { Link } from 'dva/router';
const { Description } = DescriptionList;
const FormItem = Form.Item;

@connect(({ plan, loading }) => ({
  plan,
  planLoading: loading.models.plan,
}))
@Form.create()
export default class AssessmentShow extends PureComponent {
  state = {
    modalVisible1: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'plan/show',
      payload: this.props.match.params.id,
    });
  }

  // window.location.href = '/個別機能訓綶計画書.xlsx';

  render() {
    const { plan } = this.props;
    let parameter = plan.data.list;

    return (
      parameter && (
        <PageHeaderLayout title="個別機能訓綶計画詳細情報">
          <Card style={{ marginBottom: 24 }} title="操作" bordered={false}>
            <Link to={'/form/plan-edit/' + parameter[0]._id}>
              <Button type="primary" icon="edit">
                編集
              </Button>
            </Link>
            <Divider type="vertical" />
            <Popconfirm title="これを削除しますか？">
              <Button icon="delete" type="danger">
                消除
              </Button>
            </Popconfirm>
            <Divider type="vertical" />
            <Button type="primary" icon="printer" >プレビュー</Button>
          </Card>
          <Row>
            <Col>
              <Card style={{ marginBottom: 24 }} title="個人情報" bordered={false}>
                <Row>
                  <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
                    <p>
                      <b>作成日:</b>
                      {moment(parameter[0].createDate).format('YYYY-MM-DD')}
                    </p>
                    <p>
                      <b>前回作成日:</b>
                      {moment(parameter[0].createLastTime).format('YYYY-MM-DD')}
                    </p>
                    <p>
                      <b>計画作成者:</b>
                      {parameter[0].planAuthor}
                    </p>
                    {/* <p><b>ふりがな:</b>{parameter[0].}</p>
                  <p><b>性別:</b>{parameter[0].}</p>
                  <p><b>生年月日:</b>{parameter[0].}</p> */}
                    <p>
                      <b>介護認定:</b>
                      {parameter[0].certification}
                    </p>
                    <p>
                      <b>管理者:</b>
                      {parameter[0].admin}
                    </p>
                    <p>
                      <b>看護:</b>
                      {parameter[0].nursing}
                    </p>
                    <p>
                      <b>介護:</b>
                      {parameter[0].nursingCare}
                    </p>
                    <p>
                      <b>機能訓練:</b>
                      {parameter[0].functionalTraining}
                    </p>
                  </Col>
                  <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
                    <p>
                      <b>相談員:</b>
                      {parameter[0].counselor}
                    </p>
                    {/* <p><b>氏名:</b>{parameter[0].}</p> */}
                    <p>
                      <b>本人の希望:</b>
                      {parameter[0].oneselfDesire}
                    </p>
                    <p>
                      <b>家族の希望:</b>
                      {parameter[0].familyDesire}
                    </p>
                    <p>
                      <b>前回作成日:</b>
                      {parameter[0].createLastTime}
                    </p>
                    <p>
                      <b>計画作成者:</b>
                      {parameter[0].planAuthor}
                    </p>
                    <p>
                      <b>障害老人の日常生活自立度:</b>
                      {parameter[0].disorder}
                    </p>
                    <p>
                      <b>認知症老人の日常生活自立度:</b>
                      {parameter[0].dementia}
                    </p>
                    <p>
                      <b>運動時のリスク(血圧、不整脈、呼吸等):</b>
                      {parameter[0].exerciseRisk}
                    </p>
                    <p>
                      <b>生活課題:</b>
                      {parameter[0].lifeIssues}
                    </p>
                    <p>
                      <b>在宅環境(生活課題に関連する在宅環境課題):</b>
                      {parameter[0].homeEnvironment}
                    </p>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Row>
                <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
                  <Card style={{ marginBottom: 24 }} title="個別機能訓練加算Ⅰ" bordered={false}>
                    <p>
                      <b>長期目標:</b>
                      {parameter[0].additionalTraining.longTermGoals}
                    </p>
                    <p>
                      <b>目標逹成度:</b>
                      {parameter[0].additionalTraining.longTermGoalsDegree}
                    </p>
                    <p>
                      <b>短期目標:</b>
                      {parameter[0].additionalTraining.shortTermGoals}
                    </p>
                    <p>
                      <b>目標逹成度:</b>
                      {parameter[0].additionalTraining.shortTermGoalsDegree}
                    </p>
                    <p>
                      <b>①プログラム内容:</b>
                    </p>
                    <p>
                      <b>留意点:</b>
                    </p>
                    <p>
                      <b>頻度:</b>
                    </p>
                    <p>
                      <b>時間:</b>
                    </p>
                    <p>
                      <b>主な実施者:</b>
                    </p>
                    <p className={styles.right}>
                      <b>プログラム立案者:</b>
                    </p>
                  </Card>
                </Col>
                <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
                  <Card style={{ marginBottom: 24 }} title="個別機能訓綶計画書Ⅱ" bordered={false}>
                    <p>
                      <b>長期目標:</b>
                      {parameter[0].planTow.longTermGoals}
                    </p>
                    <p>
                      <b>目標逹成度:</b>
                      {parameter[0].planTow.longTermGoalsDegree}
                    </p>
                    <p>
                      <b>短期目標:</b>
                      {parameter[0].planTow.shortTermGoals}
                    </p>
                    <p>
                      <b>目標逹成度:</b>
                      {parameter[0].planTow.shortTermGoalsDegree}
                    </p>
                    <p>
                      <b>①プログラム内容:</b>
                    </p>
                    <p>
                      <b>留意点:</b>
                    </p>
                    <p>
                      <b>頻度:</b>
                    </p>
                    <p>
                      <b>時間:</b>
                    </p>
                    <p>
                      <b>主な実施者:</b>
                    </p>
                    <p className={styles.right}>
                      <b>プログラム立案者:</b>
                    </p>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </PageHeaderLayout>
      )
    );
  }
}
