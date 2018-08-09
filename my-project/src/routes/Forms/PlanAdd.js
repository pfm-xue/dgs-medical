import React, { PureComponent } from 'react';
import {
  Card,
  Button,
  Form,
  Col,
  Row,
  Input,
  Select,
  Divider,
  Slider,
  // Icon,
  // Popover,
  // DatePicker,
  // Mention,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import FooterToolbar from 'components/FooterToolbar';
import TableForm from './TableForm';
import styles from './PlanAdd.less';
import { Link } from 'dva/router';
import { connect } from 'dva';
const { Option } = Select;

// import moment from 'moment';

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

@connect(({ plan, template, loading }) => ({
  plan,
  template,
  submitting: loading.effects['form/submitAdvancedForm'],
}))
@Form.create()
export default class PlanAdd extends PureComponent {
  state = {
    width: '100%',
    // suggestions: [],
    loading: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'template/fetch',
    });
  }

  render() {
    const { form, dispatch, submitting, template } = this.props;
    const { getFieldDecorator, validateFieldsAndScroll } = form;

    // 計画作成者
    let planAuthor = [];
    // 介護認定
    let certification = [];
    // 管理者
    let admin = [];

    if (typeof template !== 'undefined') {
      pushDate("計画作成者");
      pushDate("介護認定");
      pushDate("管理者");
    }

    function pushDate(value) {
      let list = template.data.list;
      if (typeof list !== 'undefined' && list.length !== 0 ) {
        for (let i = 0; i < list.length; i += 1) {
          const name = list[i].project;
          if (name === value && value === "計画作成者" ) {
            list[i].projectData.map((item,i) => {
              planAuthor.push(<Option key={item}>{item}</Option>);
            });
          break;
          }
          if (name === value && value === "介護認定" ) {
            list[i].projectData.map((item,i) => {
              certification.push(<Option key={i}>{item}</Option>);
            });
          break;
          }
          if (name === value && value === "管理者" ) {
            list[i].projectData.map((item,i) => {
              admin.push(<Option key={i}>{item}</Option>);
            });
          break;
          }
        }
      }
    }

    const validate = () => {
      validateFieldsAndScroll((error, values) => {
        if (!error) {
          // submit the values
          dispatch({
            type: 'plan/add',
            payload: {
              planData: values,
            },
          });
        }
      });
    };

    function handleChange(value) {
      console.log(`selected ${value}`);
    }

    return (
      template && (
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
                    {form.getFieldDecorator('user', {
                      initialValue: this.props.match.params.id,
                      rules: [{ required: true, message: 'ID入力してください' }],
                    })(<Input type="hidden" />)}
                  </Form.Item>
                </Col>
              </Row>            
              <Row gutter={16}>              
                <Col lg={6} md={12} sm={24}>
                  <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="作成日：">
                    {form.getFieldDecorator('createDate', {
                      rules: [{ required: true, message: '作成日入力してください' }],
                    })(<Input type="Date" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="前回作成日：">
                    {form.getFieldDecorator('createLastTime', {
                      rules: [{ required: true, message: '前回作成日入力してください' }],
                    })(<Input type="Date" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="計画作成者：">
                    {form.getFieldDecorator('planAuthor', {
                      rules: [{ required: true, message: '計画作成者入力してください' }],
                    })(
                      <Select
                        // mode="multiple"
                        style={{ width: '100%' }}
                        onChange={handleChange}
                      >
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
                      rules: [{ required: true, message: '介護認定入力してください' }],
                    })(
                      <Select
                        // mode="multiple"
                        style={{ width: '100%' }}
                        onChange={handleChange}
                      >
                        {certification}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="管理者：">
                    {form.getFieldDecorator('admin', {
                      rules: [{ required: true, message: '管理者入力してください' }],
                    })(
                      <Select
                        // mode="multiple"
                        style={{ width: '100%' }}
                        onChange={handleChange}
                      >
                        {admin}
                      </Select>
                      )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="看護：">
                    {form.getFieldDecorator('nursing', {
                      rules: [{ required: true, message: '看護入力してください' }],
                    })(<Input placeholder="入力してください" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="介護：">
                    {form.getFieldDecorator('nursingCare', {
                      rules: [{ required: true, message: '介護入力してください' }],
                    })(<Input placeholder="入力してください" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="機能訓練：">
                    {form.getFieldDecorator('functionalTraining', {
                      rules: [{ required: true, message: '機能訓練入力してください' }],
                    })(<Input placeholder="入力してください" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="相談員：">
                    {form.getFieldDecorator('counselor', {
                      rules: [{ required: true, message: '相談員入力してください' }],
                    })(<Input placeholder="入力してください" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="本人の希望：">
                    {form.getFieldDecorator('oneselfDesire', {
                      rules: [{ required: true, message: '本人の希望入力してください' }],
                    })(<Input placeholder="入力してください" />)}
                  </Form.Item>                
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="家族の希望：">
                    {form.getFieldDecorator('familyDesire', {
                      rules: [{ required: true, message: '家族の希望入力してください' }],
                    })(<Input placeholder="入力してください" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Form.Item wrapperCol={{ span: 20 }} label="障害老人の日常生活自立度：">
                    {getFieldDecorator('disorder', {
                      rules: [{ required: true, message: '入力してください' }],
                    })(<Slider marks={disorderList} max={8} step={null} initialValue={0} />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item wrapperCol={{ span: 20 }} label="認知症老人の日常生活自立度：">
                    {getFieldDecorator('dementia', {
                      rules: [{ required: true, message: '入力してください' }],
                    })(<Slider marks={dementiaList} max={6} step={null} initialValue={0} />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item wrapperCol={{ span: 20 }} label="病名、合併症(心疾患、吸器疾患等)：">
                    {form.getFieldDecorator('diseaseName', {
                      rules: [{ required: true, message: '入力してください' }],
                    })(<Input placeholder="入力してください" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item
                    wrapperCol={{ span: 20 }}
                    label="運動時のリスク(血圧、不整脈、呼吸等)："
                  >
                    {form.getFieldDecorator('exerciseRisk', {
                      rules: [{ required: true, message: '入力してください' }],
                    })(<Input placeholder="入力してください" />)}
                  </Form.Item>                  
                </Col>
              </Row>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item wrapperCol={{ span: 20 }} label="生活課題：">
                    {form.getFieldDecorator('lifeIssues', {
                      rules: [{ required: true, message: '入力してください' }],
                    })(<Input placeholder="入力してください" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item
                    wrapperCol={{ span: 20 }}
                    label="在宅環境(生活課題に関連する在宅環境課題)："
                  >
                    {form.getFieldDecorator('homeEnvironment', {
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
                      rules: [{ required: true, message: '入力してください' }],
                    })(
                      // <Input type="Date" placeholder="長期目標" />
                      // <DatePicker initialValue={moment(new Date(), 'YYYY-MM-DD')} />
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
                    rules: [{ required: true, message: '入力してください' }],
                  })(<Input />)}
                </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="目標逹成度：">
                    {form.getFieldDecorator('additionalTraining.longTermGoalsDegree', {
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
                      rules: [{ required: true, message: '入力してください' }],
                    })(
                      // <Input type="Date" placeholder="長期目標" />
                      // <DatePicker initialValue={moment(new Date(), 'YYYY-MM-DD')} />
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
                    rules: [{ required: true, message: '入力してください' }],
                  })(<Input />)}
                </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="目標逹成度：">
                    {form.getFieldDecorator('additionalTraining.shortTermGoalsDegree', {
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
                      initialValue: "",
                    })(<TableForm />)}
                </Card>                
              </Row>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24} />
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="プログラム立案者：">
                  {form.getFieldDecorator('additionalTraining.mastermind', {
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
                      rules: [{ required: true, message: '入力してください' }],
                    })(
                      // <Input type="Date" placeholder="長期目標" />
                      // <DatePicker initialValue={moment(new Date(), 'YYYY-MM-DD')} />
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
                    rules: [{ required: true, message: '入力してください' }],
                  })(<Input />)}
                </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="目標逹成度：">
                    {form.getFieldDecorator('planTow.longTermGoalsDegree', {
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
                      rules: [{ required: true, message: '入力してください' }],
                    })(
                      // <Input type="Date" placeholder="長期目標" />
                      // <DatePicker initialValue={moment(new Date(), 'YYYY-MM-DD')} />
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
                    rules: [{ required: true, message: '入力してください' }],
                  })(<Input />)}
                </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="目標逹成度：">
                    {form.getFieldDecorator('planTow.shortTermGoalsDegree', {
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
                    initialValue: "",
                  })(<TableForm />)}
                </Card>
              </Row>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24} />
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} />
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="プログラム立案者：">
                  {form.getFieldDecorator('planTow.mastermind', {
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
                      rules: [{ required: true, message: '入力してください' }],
                    })(<Input placeholder="入力してください" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24} >
                  <Form.Item wrapperCol={{ span: 20 }} label="作成状態">
                    {form.getFieldDecorator('state', {
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
            {/* {getErrorInfo()} */}
            <Button type="primary" onClick={validate} loading={submitting}>
              <Link to="/patient/list-patient">
                保存
              </Link>
            </Button>
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
