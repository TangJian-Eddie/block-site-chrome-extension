import React from 'react';
import { Modal } from 'antd';

export default ({ isModalVisible, toggleModal, handleConfirm }) => {
  if (!isModalVisible) return null;
  return (
    <Modal
      title="密码设定"
      visible={isModalVisible}
      onOk={handleConfirm}
      onCancel={toggleModal}
    >
      <p>是否确认设定密码</p>
    </Modal>
  );
};
