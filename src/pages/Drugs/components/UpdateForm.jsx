import { Form, Input, Modal } from 'antd';
import React from 'react';
import Create from '@/pages/create';
import { connect } from 'dva';

const CreateForm = props => {
  const { modalVisible, form, handleModalVisible } = props;
  let formRef = null;
  const okHandle = () => {
    formRef.props.form.validateFields((err, values) => {
      if (err) return;
      form.resetFields();
      if (!err) {
        props.dispatch({
          type: 'drugs/add',
          payload: values,
        });
        handleModalVisible();
      }
    });
  };

  return (
    <Modal
      width="50%"
      destroyOnClose
      title="新建药品"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <Create wrappedComponentRef={form => (formRef = form)} />
    </Modal>
  );
};

export default connect()(Form.create()(CreateForm));
