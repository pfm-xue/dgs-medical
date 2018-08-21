import React, { PureComponent } from 'react';
import { Card, Button, Form, Col, Row, Input, Select, Divider, Slider } from 'antd';
import { connect } from 'dva';
import FooterToolbar from 'components/FooterToolbar';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import TableForm from './TableForm';
import styles from './PlanEdit.less';
import { Link } from 'dva/router';
import moment from 'moment';
const { Option } = Select;

const disorderList = {
  0: '正常',
  1: 'J1',
  2: 'J2',
  3: 'A1',
  4: 'A2',
  5: 'B1',
  6: 'B2',
  7: 'C1',
  8: 'C2',
};
const dementiaList = {
  0: '正常',
  1: 'Ⅰ',
  2: 'Ⅱa',
  3: 'Ⅱb',
  4: 'Ⅲa',
  5: 'Ⅲb',
  6: 'ⅣM',
};

@connect(({ plan, template, role, loading }) => ({
  plan,
  role,
  template,
  planLoading: loading.models.plan,
}))
@Form.create()
export default class PlanEdit extends PureComponent {
  state = {
    width: '100%',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'plan/show',
      payload: this.props.match.params.id,
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFooterToolbar);
  }
  resizeFooterToolbar = () => {
    const sider = document.querySelectorAll('.ant-layout-sider')[0];
    const width = `calc(100% - ${sider.style.width})`;
    if (this.state.width !== width) {
      this.setState({ width });
    }
  };
  render() {
    const { form, dispatch, role, template, submitting, plan } = this.props;
    const { getFieldDecorator, validateFieldsAndScroll } = form;
    let parameter = plan.data.list[0];

    const validate = () => {
      validateFieldsAndScroll((error, values) => {
        if (!error) {
          dispatch({
            type: 'plan/add',
            payload: {
              planData: values,
            },
          });
        }
      });
    };

    // 病名、合併症
    let diseaseName = [];
    // 運動時のリスク
    let exerciseRisk = [];

    if (typeof template !== 'undefined') {
      pushDate("病名、合併症");
      pushDate("運動時のリスク");
    }

    function pushDate(value) {
      let list = template.data.list;
      if (typeof list !== 'undefined' && list.length !== 0 ) {
        for (let i = 0; i < list.length; i += 1) {
          const name = list[i].project;
          if (name === value && value === "病名、合併症" ) {
            list[i].projectData.map((item,i) => {
              diseaseName.push(<Option key={item}>{item}</Option>);
            });
            break;
          }
          if (name === value && value === "運動時のリスク" ) {
            list[i].projectData.map((item,i) => {
              exerciseRisk.push(<Option key={item}>{item}</Option>);
            });
            break;
          }
        }
      }
    }

    // 計画作成者
    let planAuthor = [];
    // 介護認定
    let certification = [];
    // 管理者
    let admin = [];
    // 看護
    let nursing = [];
    // 介護
    let nursingCare = [];
    // 相談員
    let counselor = [];    
    // 機能訓練
    let functionalTraining = [];        

    role.data.list.map((item,) => {
      planAuthor.push(<Option key={item._id}>{item.adminName}</Option>);
      certification.push(<Option key={item._id}>{item.adminName}</Option>);
      admin.push(<Option key={item._id}>{item.adminName}</Option>);
      nursing.push(<Option key={item._id}>{item.adminName}</Option>);
      nursingCare.push(<Option key={item._id}>{item.adminName}</Option>);
      counselor.push(<Option key={item._id}>{item.adminName}</Option>);
      functionalTraining.push(<Option key={item._id}>{item.adminName}</Option>);             
    }); 


    function handleChange(value) {
      console.log(`selected ${value}`);
    }    

    return (
      parameter && (
        <PageHeaderLayout
          title="【個別機能訓練計画書】"
          content=""
          wrapperClassName={styles.advancedForm}
        >
          <Form layout="vertical" hideRequiredMark>
            <Card title="" className={styles.card} bordered={false}>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
                    {form.getFieldDecorator('_id', {
                      initialValue: parameter._id,
                      rules: [{ required: true, message: 'ID入力してください' }],
                    })(<Input type="hidden"/>)}
                  </Form.Item>
                </Col>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
                    {form.getFieldDecorator('user', {
                      initialValue: parameter.user._id,
                      rules: [{ required: true, message: 'ID入力してください' }],
                    })(<Input type="hidden" />)}
                  </Form.Item>
                </Col>                
              </Row>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="作成日：">
                    {form.getFieldDecorator('createDate', {
                      initialValue: moment(parameter.createDate).format('YYYY-MM-DD'),
                      rules: [{ required: true, message: '作成日入力してください' }],
                    })(
                      <Input type="Date" placeholder="入力してください" disabled />
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="前回作成日：">
                    {form.getFieldDecorator('createLastTime', {
                      initialValue: moment(parameter.createLastTime).format('YYYY-MM-DD'),
                      rules: [{ required: true, message: '前回作成日入力してください' }],
                    })(
                      <Input type="Date" placeholder="入力してください" disabled />
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="計画作成者：">
                    {form.getFieldDecorator('planAuthor', {
                      initialValue: parameter.planAuthor._id,
                      rules: [{ required: true, message: '計画作成者入力してください' }],
                    })(
                      <Select disabled style={{ width: '100%' }} onChange={handleChange} >
                        {planAuthor}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="介護認定：">
                    {form.getFieldDecorator('certification', {
                      initialValue: parameter.certification._id,
                      rules: [{ required: true, message: '介護認定入力してください' }],
                    })(
                      <Select disabled style={{ width: '100%' }} onChange={handleChange} >
                        {certification}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="管理者：">
                    {form.getFieldDecorator('admin', {
                      initialValue: parameter.admin._id,
                      rules: [{ required: true, message: '管理者入力してください' }],
                    })(
                      <Select disabled style={{ width: '100%' }} onChange={handleChange} >
                        {admin}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="看護：">
                    {form.getFieldDecorator('nursing', {
                      initialValue: parameter.nursing._id,
                      rules: [{ required: true, message: '看護入力してください' }],
                    })(
                    <Select disabled style={{ width: '100%' }} onChange={handleChange} >
                      {nursing}
                    </Select>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="介護：">
                    {form.getFieldDecorator('nursingCare', {
                      initialValue: parameter.nursingCare._id,
                      rules: [{ required: true, message: '介護入力してください' }],
                    })(
                    <Select disabled style={{ width: '100%' }} onChange={handleChange} >
                      {nursingCare}
                    </Select>                    
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="機能訓練：">
                    {form.getFieldDecorator('functionalTraining', {
                      initialValue: parameter.functionalTraining._id,
                      rules: [{ required: true, message: '機能訓練入力してください' }],
                    })(
                    // <Input placeholder="入力してください" disabled />
                    <Select disabled style={{ width: '100%' }} onChange={handleChange} >
                      {functionalTraining}
                    </Select>                    
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="相談員：">
                    {form.getFieldDecorator('counselor', {
                      initialValue: parameter.counselor._id,
                      rules: [{ required: true, message: '相談員入力してください' }],
                    })(
                    <Select disabled style={{ width: '100%' }} onChange={handleChange} >
                      {counselor}
                    </Select>                       
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="本人の希望：">
                    {form.getFieldDecorator('oneselfDesire', {
                      initialValue: parameter.oneselfDesire,
                      rules: [{ required: true, message: '本人の希望入力してください' }],
                    })(<Input placeholder="入力してください" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="家族の希望：">
                    {form.getFieldDecorator('familyDesire', {
                      initialValue: parameter.familyDesire,
                      rules: [{ required: true, message: '家族の希望入力してください' }],
                    })(<Input placeholder="入力してください" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Form.Item wrapperCol={{ span: 20 }} label="障害老人の日常生活自立度：">
                    {getFieldDecorator('disorder', {
                      initialValue: parameter.disorder,
                      rules: [{ required: true, message: '入力してください' }],
                    })(<Slider marks={disorderList} max={8} step={null} defaultValue={0} />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item wrapperCol={{ span: 20 }} label="認知症老人の日常生活自立度：">
                    {getFieldDecorator('dementia', {
                      initialValue: parameter.dementia,
                      rules: [{ required: true, message: '入力してください' }],
                    })(<Slider marks={dementiaList} max={6} step={null} defaultValue={0} />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item wrapperCol={{ span: 20 }} label="病名、合併症(心疾患、吸器疾患等)：">
                    {form.getFieldDecorator('diseaseName', {
                      initialValue: parameter.diseaseName,
                      rules: [{ required: true, message: '入力してください' }],
                    })(
                      <Select mode="multiple" style={{ width: '100%' }} onChange={handleChange} >
                        {diseaseName}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Form.Item
                    wrapperCol={{ span: 20 }}
                    label="運動時のリスク(血圧、不整脈、呼吸等)："
                  >
                    {form.getFieldDecorator('exerciseRisk', {
                      initialValue: parameter.exerciseRisk,
                      rules: [{ required: true, message: '入力してください' }],
                    })(
                      <Select mode="multiple" style={{ width: '100%' }} onChange={handleChange} >
                        {exerciseRisk}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item wrapperCol={{ span: 20 }} label="生活課題：">
                    {form.getFieldDecorator('lifeIssues', {
                      initialValue: parameter.lifeIssues,
                      rules: [{ required: true, message: '入力してください' }],
                    })(<Input placeholder="入力してください" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item wrapperCol={{ span: 20 }} label="在宅環境(生活課題に関連する在宅環境課題)：" >
                    {form.getFieldDecorator('homeEnvironment', {
                      initialValue: parameter.homeEnvironment,
                      rules: [{ required: true, message: '入力してください' }],
                    })(<Input placeholder="入力してください" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                </Col>
              </Row>
            </Card>
            <Card title="個別機能訓練加算Ⅰ" className={styles.card} bordered={false}>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="長期目標：">
                    {form.getFieldDecorator('additionalTraining.longTermGoals', {
                      initialValue: parameter.additionalTraining.longTermGoals,
                      rules: [{ required: true, message: '入力してください' }],
                    })(
                    // <Input type="Date" placeholder="長期目標" />
                    <Select placeholder="目標期間">
                      <Option value="3">3ヵ月</Option>
                      <Option value="6">6ヵ月</Option>
                    </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item>
                  {getFieldDecorator('additionalTraining.longCalculation', {
                    initialValue: parameter.additionalTraining.longCalculation,
                    rules: [{ required: true, message: '入力してください' }],
                  })(<Input />)}
                </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="目標逹成度：">
                    {form.getFieldDecorator('additionalTraining.longTermGoalsDegree', {
                      initialValue: parameter.additionalTraining.longTermGoalsDegree,
                      rules: [{ required: true, message: '入力してください' }],
                    })(
                      <Select placeholder="逹成度">
                        <Option value="逹成">逹成</Option>
                        <Option value="一部">一部</Option>
                        <Option value="未逹">未逹</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="短期目標：">
                    {form.getFieldDecorator('additionalTraining.shortTermGoals', {
                      initialValue: parameter.additionalTraining.shortTermGoals,
                      rules: [{ required: true, message: '入力してください' }],
                    })(
                    // <Input type="Date" placeholder="短期目標" />
                    <Select placeholder="目標期間">
                      <Option value="3">3ヵ月</Option>
                      <Option value="6">6ヵ月</Option>
                    </Select>                    
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item>
                  {getFieldDecorator('additionalTraining.shortCalculation', {
                    initialValue: parameter.additionalTraining.shortCalculation,
                    rules: [{ required: true, message: '入力してください' }],
                  })(<Input />)}
                </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="目標逹成度：">
                    {form.getFieldDecorator('additionalTraining.shortTermGoalsDegree', {
                      initialValue: parameter.additionalTraining.shortTermGoalsDegree,
                      rules: [{ required: true, message: 'ふりがな入力してください' }],
                    })(
                      <Select placeholder="逹成度">
                        <Option value="逹成">逹成</Option>
                        <Option value="一部">一部</Option>
                        <Option value="未逹">未逹</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Card title="プログラム" bordered={false}>
                  {getFieldDecorator('additionalTraining.enum', {
                    initialValue: parameter.additionalTraining.enum,
                  })(<TableForm />)}
                </Card>
              </Row>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24} />
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="プログラム立案者：">
                  {form.getFieldDecorator('additionalTraining.mastermind', {
                    initialValue: parameter.additionalTraining.mastermind,
                    rules: [{ required: true, message: '入力してください' }],
                  })(<Input placeholder="入力してください" />)}
                </Form.Item>
                </Col>
              </Row>
            </Card>
            <Card title="個別機能訓練計画書Ⅱ" className={styles.card} bordered={false}>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="長期目標：">
                    {form.getFieldDecorator('planTow.longTermGoals', {
                      initialValue: parameter.planTow.longTermGoals,
                      rules: [{ required: true, message: '入力してください' }],
                    })(
                    // <Input type="Date" placeholder="長期目標" />
                    <Select placeholder="目標期間">
                      <Option value="3">3ヵ月</Option>
                      <Option value="6">6ヵ月</Option>
                    </Select>                    
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item>
                  {form.getFieldDecorator('planTow.longCalculation', {
                    initialValue: parameter.planTow.longCalculation,
                    rules: [{ required: true, message: '入力してください' }],
                  })(<Input />)}
                </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="目標逹成度：">
                    {form.getFieldDecorator('planTow.longTermGoalsDegree', {
                      initialValue: parameter.planTow.longTermGoalsDegree,
                      rules: [{ required: true, message: '入力してください' }],
                    })(
                      <Select placeholder="逹成度">
                        <Option value="逹成">逹成</Option>
                        <Option value="一部">一部</Option>
                        <Option value="未逹">未逹</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="短期目標：">
                    {form.getFieldDecorator('planTow.shortTermGoals', {
                      initialValue: parameter.planTow.shortTermGoals,
                      rules: [{ required: true, message: '入力してください' }],
                    })(
                    // <Input type="Date" placeholder="短期目標" />
                    <Select placeholder="目標期間">
                      <Option value="3">3ヵ月</Option>
                      <Option value="6">6ヵ月</Option>
                    </Select>                      
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item>
                  {form.getFieldDecorator('planTow.shortCalculation', {
                    initialValue: parameter.planTow.shortCalculation,
                    rules: [{ required: true, message: '入力してください' }],
                  })(<Input />)}
                </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="目標逹成度：">
                    {form.getFieldDecorator('planTow.shortTermGoalsDegree', {
                      initialValue: parameter.planTow.shortTermGoalsDegree,
                      rules: [{ required: true, message: '入力してください' }],
                    })(
                      <Select placeholder="逹成度">
                        <Option value="逹成">逹成</Option>
                        <Option value="一部">一部</Option>
                        <Option value="未逹">未逹</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Card title="プログラム" bordered={false}>
                  {getFieldDecorator('planTow.enum', {
                    initialValue: parameter.planTow.enum,
                  })(<TableForm />)}
                </Card>
              </Row>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}/>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}/>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="プログラム立案者：">
                  {form.getFieldDecorator('planTow.mastermind', {
                    initialValue: parameter.planTow.mastermind,
                    rules: [{ required: true, message: '入力してください' }],
                  })(<Input placeholder="入力してください" />)}
                </Form.Item>
                </Col>
              </Row>
            </Card>
            <Card title="" className={styles.card} bordered={false}>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item wrapperCol={{ span: 20 }} label="特記事項">
                    {form.getFieldDecorator('specialNotes', {
                      initialValue: parameter.specialNotes,
                      rules: [{ required: true, message: '入力してください' }],
                    })(<Input placeholder="入力してください" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} >
                  <Form.Item wrapperCol={{ span: 20 }} label="作成状態">
                    {form.getFieldDecorator('state', {
                      initialValue: parameter.state,
                      rules: [{ required: true, message: '入力してください' }],
                    })(
                      <Select placeholder="作成状態">
                        <Option value="作成中">作成中</Option>
                        <Option value="作成済み">作成済み</Option>
                      </Select>                    
                    )}
                  </Form.Item>                    
                </Col>
              </Row>
            </Card>
          </Form>
          <FooterToolbar style={{ width: this.state.width }}>
            <Link to="/patient/list-patient">
              <Button type="primary" onClick={validate} loading={submitting}>
                保存
              </Button>
            </Link>
            <Divider type="vertical" />
            <Link to="/patient/list-patient">
              <Button>キャンセル</Button>
            </Link>
          </FooterToolbar>
        </PageHeaderLayout>
      )
    );
  }
}
