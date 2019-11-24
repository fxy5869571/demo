import {
  Button,
  Card,
  DatePicker,
  Form,
  Icon,
  Input,
  InputNumber,
  Radio,
  Select,
  Tooltip,
} from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import styles from './style.less';

const FormItem = Form.Item;

class Create extends Component {
  handleSubmit = e => {
    const { dispatch, form, options } = this.props;

    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (options) {
          dispatch({
            type: 'drugs/edit',
            payload: values,
          });
        } else {
          dispatch({
            type: 'drugs/add',
            payload: values,
          });
        }
      }
    });
  };

  render() {
    const {
      options,
      form: { getFieldDecorator },
    } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 4,
        },
        sm: {
          span: 4,
        },
      },
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 20,
        },
        md: {
          span: 20,
        },
      },
    };

    return (
      <Card bordered={false}>
        <Form
          onSubmit={this.handleSubmit}
          hideRequiredMark
          style={{
            marginTop: 8,
          }}
        >
          <FormItem {...formItemLayout} label="药品名称">
            {getFieldDecorator('name', {
              initialValue: options.name,
              rules: [
                {
                  required: true,
                  message: '请输入标题',
                },
              ],
            })(<Input placeholder="药品名称" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="外文名称">
            {getFieldDecorator('eName', {
              initialValue: options.eName,
              rules: [
                {
                  required: true,
                  message: '请输入标题',
                },
              ],
            })(<Input placeholder="外文名称" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="是否处方药">
            {getFieldDecorator('prescription', {
              initialValue: options.prescription,
              rules: [
                {
                  required: true,
                  message: '请输入标题',
                },
              ],
            })(<Input placeholder="是否处方药" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="剂    型">
            {getFieldDecorator('dosage', {
              initialValue: options.dosage,
              rules: [
                {
                  required: true,
                  message: '剂    型',
                },
              ],
            })(<Input placeholder="剂    型" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="是否纳入医保">
            {getFieldDecorator('medical', {
              initialValue: options.medical,
              rules: [
                {
                  required: true,
                  message: '是否纳入医保',
                },
              ],
            })(<Input placeholder="是否纳入医保" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="药品类型">
            {getFieldDecorator('type', {
              initialValue: options.type,
              rules: [
                {
                  required: true,
                  message: '药品类型',
                },
              ],
            })(<Input placeholder="药品类型" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="批准文号">
            {getFieldDecorator('numbers', {
              initialValue: options.numbers,
              rules: [
                {
                  required: true,
                  message: '批准文号',
                },
              ],
            })(<Input placeholder="批准文号" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="主要适用症">
            {getFieldDecorator('main', {
              initialValue: options.main,
              rules: [
                {
                  required: true,
                  message: '主要适用症',
                },
              ],
            })(<Input.TextArea placeholder="主要适用症" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="主要用药禁忌">
            {getFieldDecorator('danger', {
              initialValue: options.danger,
              rules: [
                {
                  required: true,
                  message: '主要用药禁忌',
                },
              ],
            })(<Input.TextArea placeholder="主要用药禁忌" />)}
          </FormItem>
        </Form>
      </Card>
    );
  }
}

export default Form.create()(
  connect(({ loading }) => ({
    submitting: loading.effects['create/submitRegularForm'],
  }))(Create),
);
