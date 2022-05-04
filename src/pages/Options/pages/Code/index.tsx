import React, { useCallback, useRef, useState } from 'react';
import { Input, Button, Form, message } from 'antd';
import Modal from './Modal';
import { getStorageSync, setStorageSync } from '../../../../common/storage'

export default () => {
  const [form] = Form.useForm();
  const valueRef = useRef<any>({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = useCallback(() => {
    setIsModalVisible((prev) => !prev);
  }, []);
  const onFinish = useCallback(async (values) => {
    const originPassword = await getStorageSync('blockCode')
    if (originPassword && originPassword !== values.originPassword) {
      return message.error('原密码错误');
    }
    valueRef.current = values;
    toggleModal();
  }, [toggleModal]);
  const handleConfirm = useCallback(async () => {
    await setStorageSync('blockCode', valueRef.current.password || '')
    toggleModal();
    form.resetFields();
  }, [form, toggleModal]);
  return (
    <>
      <div>
        <Form
          form={form}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            label="原始密码"
            name="originPassword"
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="新密码"
            name="password"
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Modal
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
        handleConfirm={handleConfirm}
      />
    </>
  );
};
