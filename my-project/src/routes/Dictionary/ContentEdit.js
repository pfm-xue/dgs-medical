import React, { PureComponent } from 'react';
import { Card, Button, Form, Icon, Divider, Popover, Input, Select } from 'antd';
import { connect } from 'dva';
import FooterToolbar from 'components/FooterToolbar';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './ContentAdd.less';
import { Link } from 'dva/router';
const Option = Select.Option;
const FormItem = Form.Item;

@connect(({ template, loading }) => ({
  template,
  submitting: loading.effects['form/submitAdvancedForm'],
}))
@Form.create()
export default class ContentAdd extends PureComponent {
  state = {
    width: '100%',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'template/show',
      payload: this.props.match.params.id,
    });
  }

  render() {
    const { template, form, dispatch, submitting } = this.props;
    const { validateFieldsAndScroll, getFieldsError } = form;
    const parameter = template.data.list[0];

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

    const validate = () => {
      validateFieldsAndScroll((error, values) => {
        if (!error) {
          // submit the values
          dispatch({
            type: 'template/add',
            payload: {
              template: values,
            },
          });
        }
      });
    };
    const errors = getFieldsError();
    const getErrorInfo = () => {
      const errorCount = Object.keys(errors).filter(key => errors[key]).length;
      if (!errors || errorCount === 0) {
        return null;
      }
      const scrollToField = fieldKey => {
        const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
        if (labelNode) {
          labelNode.scrollIntoView(true);
        }
      };
      const errorList = Object.keys(errors).map(key => {
        if (!errors[key]) {
          return null;
        }
        return (
          <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
            <Icon type="cross-circle-o" className={styles.errorIcon} />
            <div className={styles.errorMessage}>{errors[key][0]}</div>
          </li>
        );
      });

      return (
        <span className={styles.errorIcon}>
          <Popover
            title="表单校验信息"
            content={errorList}
            overlayClassName={styles.errorPopover}
            trigger="click"
            getPopupContainer={trigger => trigger.parentNode}
          >
            <Icon type="exclamation-circle" />
          </Popover>
          {errorCount}
        </span>
      );
    };

    let projectData = [];

    if (typeof parameter !== 'undefined') {
      const data = parameter.projectData;
      data.map((item,i) => {
        // children.push(item);
        projectData.push(<Option key={item}>{item}</Option>);
      });
    }

    function handleChange(value) {
      console.log(`selected ${value}`);
    }

    return (
      parameter && (
        <PageHeaderLayout
          title="プロジェクト編集"
          content=""
          wrapperClassName={styles.advancedForm}
        >
          <Form layout="vertical" hideRequiredMark style={{ marginTop: 8 }}>
            <Card style={{ marginBottom: 24 }} bordered={false}>
              <FormItem display="none" {...formItemLayout} label="">
                {form.getFieldDecorator('_id', {
                  initialValue: parameter._id,
                  rules: [{ required: true, message: '選択入力してください' }],
                })(<Input type="hidden" readOnly />)}
              </FormItem>
              <FormItem display="none" {...formItemLayout} label="プロジェクト">
                {form.getFieldDecorator('project', {
                  initialValue: parameter.project,
                  rules: [{ required: true, message: '選択入力してください' }],
                })(<Input readOnly />)}
              </FormItem>
              <FormItem {...formItemLayout} label="データ">
                {form.getFieldDecorator('projectData', {
                  rules: [{ required: true, message: '選択入力してください' }],
                })(
                  <Select
                    mode="tags"
                    style={{ width: '100%' }}
                    initialValue={parameter.projectData}
                    onChange={handleChange}
                  >
                    {projectData}
                  </Select>
                )}
              </FormItem>
            </Card>
          </Form>
          <FooterToolbar style={{ width: this.state.width }}>
            {getErrorInfo()}
            <Button type="primary" onClick={validate} loading={submitting}>
              <Link to="/dictionary/plan-dictionary">保存</Link>
            </Button>
            <Divider type="vertical" />
            <Link to="/dictionary/plan-dictionary">
              <Button>キャンセル</Button>
            </Link>
          </FooterToolbar>
        </PageHeaderLayout>
      )
    );
  }
}
