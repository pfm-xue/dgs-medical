import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Card, Radio, Row, Col, Divider } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import FooterToolbar from 'components/FooterToolbar';
import { Link } from 'dva/router';
const FormItem = Form.Item;
import styles from './style.less';

@connect(({ assessment, loading }) => ({
  assessment,
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
export default class BasicForms extends PureComponent {

  state = {
    width: '100%',
  };

  componentDidMount() {
    window.addEventListener('resize', this.resizeFooterToolbar);
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

  // handleSubmit = () => {
  //   this.props.dispatch({
  //     type: 'assessment/add',
  //     payload: this.props.form.getFieldsValue(),
  //   });
  // };

  render() {
    const { form, submitting } = this.props;
    const { validateFieldsAndScroll } = form;

    const validate = () => {
      validateFieldsAndScroll((error, values) => {
        if (!error) {
          this.props.dispatch({
            type: 'assessment/add',
            payload: {
              assessmentData:values,
            },
          });
        }
      });
    };
  

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderLayout title="アセスメント" content="">
        <Form hideRequiredMark style={{ marginTop: 8 }}>
          <Card style={{ marginBottom: 24 }} title="関節可動域" bordered={false}>
            <FormItem {...formItemLayout} label="上肢">
              {form.getFieldDecorator('joint_arm', {
                rules: [
                  {
                    required: true,
                    message: '選択入力してください',
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value="1">著名な制限なし</Radio>
                  <Radio value="2">軽度</Radio>
                  <Radio value="3">中等度</Radio>
                  <Radio value="4">重度</Radio>
                </Radio.Group>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="下肢">
              {form.getFieldDecorator('joint_legs', {
                rules: [
                  {
                    required: true,
                    message: '選択入力してください',
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value="1">著名な制限なし</Radio>
                  <Radio value="2">軽度</Radio>
                  <Radio value="3">中等度</Radio>
                  <Radio value="4">重度</Radio>
                </Radio.Group>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="体幹">
              {form.getFieldDecorator('joint_runk', {
                rules: [
                  {
                    required: true,
                    message: '選択入力してください',
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value="1">著名な制限なし</Radio>
                  <Radio value="2">軽度</Radio>
                  <Radio value="3">中等度</Radio>
                  <Radio value="4">重度</Radio>
                </Radio.Group>
              )}
            </FormItem>
          </Card>
          <Card style={{ marginBottom: 24 }} title="筋力" bordered={false}>
            <FormItem {...formItemLayout} label="上肢">
              {form.getFieldDecorator('tendon_arm', {
                rules: [
                  {
                    required: true,
                    message: '選択入力してください',
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value="1">著名な制限なし</Radio>
                  <Radio value="2">軽度</Radio>
                  <Radio value="3">中等度</Radio>
                  <Radio value="4">重度</Radio>
                </Radio.Group>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="下肢">
              {form.getFieldDecorator('tendon_legs', {
                rules: [
                  {
                    required: true,
                    message: '選択入力してください',
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value="1">著名な制限なし</Radio>
                  <Radio value="2">軽度</Radio>
                  <Radio value="3">中等度</Radio>
                  <Radio value="4">重度</Radio>
                </Radio.Group>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="体幹">
              {form.getFieldDecorator('tendon_runk', {
                rules: [
                  {
                    required: true,
                    message: '選択入力してください',
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value="1">著名な制限なし</Radio>
                  <Radio value="2">軽度</Radio>
                  <Radio value="3">中等度</Radio>
                  <Radio value="4">重度</Radio>
                </Radio.Group>
              )}
            </FormItem>
          </Card>
          <Card style={{ marginBottom: 24 }} title="麻痺" bordered={false}>
            <FormItem {...formItemLayout} label="上肢">
              {form.getFieldDecorator('paralysis_arm', {
                rules: [
                  {
                    required: true,
                    message: '選択入力してください',
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value="1">実用</Radio>
                  <Radio value="2">補助</Radio>
                  <Radio value="3">廃用</Radio>
                </Radio.Group>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="下肢">
              {form.getFieldDecorator('paralysis_legs', {
                rules: [
                  {
                    required: true,
                    message: '選択入力してください',
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value="1">かなり動かせる</Radio>
                  <Radio value="2">半分程度</Radio>
                  <Radio value="3">僅かに動かせる</Radio>
                </Radio.Group>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="手指">
              {form.getFieldDecorator('paralysis_finger', {
                rules: [
                  {
                    required: true,
                    message: '選択入力してください',
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value="1">かなり動かせる</Radio>
                  <Radio value="2">半分程度</Radio>
                  <Radio value="3">僅かに動かせる</Radio>
                </Radio.Group>
              )}
            </FormItem>
          </Card>
          <Card style={{ marginBottom: 24 }} title="ADL Barthel Index" bordered={false}>
            <FormItem {...formItemLayout} label="食事">
              {form.getFieldDecorator('meal', {
                rules: [
                  {
                    required: true,
                    message: '選択入力してください',
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value="1">10点</Radio>
                  <Radio value="2">5点</Radio>
                  <Radio value="3">0点</Radio>
                </Radio.Group>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="車椅子〜ベッドへの移乗">
              {form.getFieldDecorator('move', {
                rules: [
                  {
                    required: true,
                    message: '選択入力してください',
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value="1">15点</Radio>
                  <Radio value="2">10点</Radio>
                  <Radio value="3">5点</Radio>
                  <Radio value="4">0点</Radio>
                </Radio.Group>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="整容">
              {form.getFieldDecorator('aesthetic', {
                rules: [
                  {
                    required: true,
                    message: '選択入力してください',
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value="1">5点</Radio>
                  <Radio value="2">0点</Radio>
                </Radio.Group>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="トイレ動作">
              {form.getFieldDecorator('toilet', {
                rules: [
                  {
                    required: true,
                    message: '選択入力してください',
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value="1">10点</Radio>
                  <Radio value="2">5点</Radio>
                  <Radio value="3">0点</Radio>
                </Radio.Group>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="入浴">
              {form.getFieldDecorator('bath', {
                rules: [
                  {
                    required: true,
                    message: '選択入力してください',
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value="1">5点</Radio>
                  <Radio value="2">0点</Radio>
                </Radio.Group>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="歩行">
              {form.getFieldDecorator('walking', {
                rules: [
                  {
                    required: true,
                    message: '選択入力してください',
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value="1">15点</Radio>
                  <Radio value="2">10点</Radio>
                  <Radio value="3">5点</Radio>
                  <Radio value="4">0点</Radio>
                </Radio.Group>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="階段昇降">
              {form.getFieldDecorator('stairs', {
                rules: [
                  {
                    required: true,
                    message: '選択入力してください',
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value="1">10点</Radio>
                  <Radio value="2">5点</Radio>
                  <Radio value="3">0点</Radio>
                </Radio.Group>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="着替え">
              {form.getFieldDecorator('change', {
                rules: [
                  {
                    required: true,
                    message: '選択入力してください',
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value="1">10点</Radio>
                  <Radio value="2">5点</Radio>
                  <Radio value="3">0点</Radio>
                </Radio.Group>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="排便コントロール">
              {form.getFieldDecorator('defecation', {
                rules: [
                  {
                    required: true,
                    message: '選択入力してください',
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value="1">10点</Radio>
                  <Radio value="2">5点</Radio>
                  <Radio value="3">0点</Radio>
                </Radio.Group>
              )}
            </FormItem>
            {/* <FormItem {...formItemLayout} label="合計点">
                {form.getFieldDecorator('total', {
                  rules: [
                    {
                      required: true,
                      message: '選択入力してください',
                    },
                  ],
                })(
                  <Slider defaultValue={0}/>
              )}
              </FormItem> */}
          </Card>
          <Card style={{ marginBottom: 24 }} title="家庭でのIADL" bordered={false}>
            <FormItem {...formItemLayout} label="買い物">
              {form.getFieldDecorator('shopping', {
                rules: [
                  {
                    required: true,
                    message: '選択入力してください',
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value="1">できる</Radio>
                  <Radio value="2">介助でできる</Radio>
                  <Radio value="3">できない</Radio>
                </Radio.Group>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="調理">
              {form.getFieldDecorator('cook', {
                rules: [
                  {
                    required: true,
                    message: '選択入力してください',
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value="1">できる</Radio>
                  <Radio value="2">介助でできる</Radio>
                  <Radio value="3">できない</Radio>
                </Radio.Group>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="掃除">
              {form.getFieldDecorator('cleaning', {
                rules: [
                  {
                    required: true,
                    message: '選択入力してください',
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value="1">できる</Radio>
                  <Radio value="2">介助でできる</Radio>
                  <Radio value="3">できない</Radio>
                </Radio.Group>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="洗濯">
              {form.getFieldDecorator('washing', {
                rules: [
                  {
                    required: true,
                    message: '選択入力してください',
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value="1">できる</Radio>
                  <Radio value="2">介助でできる</Radio>
                  <Radio value="3">できない</Radio>
                </Radio.Group>
              )}
            </FormItem>
          </Card>
          <Card title="Short Physical Performance Battery" bordered={false}>
            <Divider>バランス</Divider>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <FormItem {...formItemLayout} label="閉脚立位">
                  {form.getFieldDecorator('closedStance', {
                    rules: [{ required: true, message: '閉脚立位入力してください' }],
                  })(<Input placeholder="入力してください" />)}
                </FormItem>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="セミタンデム位">
                  {form.getFieldDecorator('semiTandem', {
                    rules: [{ required: true, message: 'セミタンデム位入力してください' }],
                  })(<Input placeholder="入力してください" />)}
                </FormItem>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="タンデム位">
                  {form.getFieldDecorator('tandem', {
                    rules: [{ required: true, message: 'タンデム位入力してください' }],
                  })(<Input placeholder="入力してください" />)}
                </FormItem>
              </Col>
            </Row>
            <Divider>4ｍ　歩行テスト</Divider>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <FormItem {...formItemLayout} label="補助具の使用">
                  {form.getFieldDecorator('subsidize', {
                    rules: [{ required: true, message: '閉脚立位入力してください' }],
                  })(<Input placeholder="入力してください" />)}
                </FormItem>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="1回目">
                  {form.getFieldDecorator('noOne', {
                    rules: [{ required: true, message: 'セミタンデム位入力してください' }],
                  })(<Input placeholder="入力してください" />)}
                </FormItem>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="2回目">
                  {form.getFieldDecorator('noTwo', {
                    rules: [{ required: true, message: 'タンデム位入力してください' }],
                  })(<Input placeholder="入力してください" />)}
                </FormItem>
              </Col>
            </Row>
            <Divider />
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <FormItem {...formItemLayout} label="椅子立ち上がりテスト 5回">
                  {form.getFieldDecorator('chair', {
                    rules: [{ required: true, message: '閉脚立位入力してください' }],
                  })(<Input placeholder="入力してください" />)}
                </FormItem>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                {/* <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="合計">
                  {form.getFieldDecorator('total_Short', {
                    rules: [{ required: true, message: 'セミタンデム位入力してください' }],
                  })(<Slider defaultValue={0} max={12} />)}
                </FormItem>  */}
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="評価日">
                  {form.getFieldDecorator('total_Short', {
                    rules: [{ required: true, message: 'セミタンデム位入力してください' }],
                  })(<Input type="Date" placeholder="入力してください" />)}
                </FormItem>
              </Col>
            </Row>
          </Card>
        </Form>
          <FooterToolbar {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary" onClick={validate} loading={submitting}>
            <Link to="/home">
              保存
            </Link>
            </Button>
            <Link to="/home">
              <Button style={{ marginLeft: 8 }}>キャンセル</Button>
            </Link>
          </FooterToolbar>
      </PageHeaderLayout>
    );
  }
}
