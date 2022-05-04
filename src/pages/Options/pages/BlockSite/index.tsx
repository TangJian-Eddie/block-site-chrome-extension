import React, { useCallback, useEffect, useState } from 'react';
import { Input, Button, List, Row, Col } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
import s from './style.module.scss';

export default () => {
  const [blockList, setBlockList] = useState([]);
  const [text, setText] = useState('');
  const inputOnChange = useCallback((e) => {
    setText(e.target.value);
  }, []);
  useEffect(() => {
    chrome.storage.sync.get('blockList', (data) => {
      setBlockList(data.blockList || []);
    });
  }, []);
  const deleteItem = useCallback((e) => {
    const index = e.target.dataset.index;
    const newData = blockList.filter((_, idx) => idx === index)
    setBlockList(newData);
    chrome.storage.sync.set({ blockList: newData });
  }, [blockList]);
  const save = useCallback(() => {
    const newData = [...blockList, text];
    setBlockList(newData);
    chrome.storage.sync.set({ blockList: newData }, () => {
      setText('');
    });
  }, [blockList, text]);
  return (
    <div>
      <Row wrap={false} gutter={24}>
        <Col flex={1}>
          <Input onChange={inputOnChange} value={text} />
        </Col>
        <Col>
          <Button type="primary" onClick={save}>
            Submit
          </Button>
        </Col>
      </Row>
      <Row className={s.list}>
        <Col flex={1}>
          <List
            size="large"
            bordered
            split
            dataSource={blockList}
            renderItem={(item, index) => (
              <List.Item
                actions={[
                  <DeleteTwoTone data-index={index} onClick={deleteItem} />,
                ]}
              >
                {item}
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </div>
  );
};
