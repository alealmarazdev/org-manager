import React, { useState, FC } from 'react';
import { Form, Input, InputNumber, Button, Typography, Drawer, Space, Row, Col, Select, DatePicker } from 'antd';

const { Option } = Select;


const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */
type Props = {
  
}

const DrawerForm: FC<Props> =() => {
  const onFinish = (values: any) => {
    console.log(values);
  }

  return (
   
    <Form layout="vertical" hideRequiredMark>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter user name' }]}
          >
            <Input placeholder="Please enter user name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please enter email' }]}
          >
            <Input
              style={{ width: '100%' }}
              /* addonBefore="http://"
              addonAfter=".com" */
              placeholder="Please enter email"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="account"
            label="Account"
            rules={[{ required: true, message: 'Please choose the asign account' }]}
          >
            <Select placeholder="Please choose the account">
              <Option value="a">a</Option>
              <Option value="b">b</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="dateTime"
            label="DateTime"
            rules={[{ required: true, message: 'Please choose the dateTime' }]}
          >
            <DatePicker.RangePicker
              style={{ width: '100%' }}
              // getPopupContainer={trigger => trigger.parentElement}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
      <Col span={12}>
          <Form.Item
            name="english"
            label="English level"
            rules={[{ required: true, message: 'Please select a english level' }]}
          >
            <Select placeholder="Please select a english level
            /;">
              <Option value="basic">Basic</Option>
              <Option value="middle">Midle</Option>
              <Option value="advance">Advance</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="resume"
            label="Resume Link"
            rules={[{ required: true, message: 'Please write the resume link' }]}
          >
            <Input
              style={{ width: '100%' }}
              addonBefore="https://docs.google.com/document/"
              /* addonAfter=".com" */
              placeholder="Please enter email"
            />
          </Form.Item>
        </Col>
       
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: 'please enter skills description',
              },
            ]}
          >
            <Input.TextArea rows={4} placeholder="please enter skills description" />
          </Form.Item>
        </Col>
      
      </Row>
     
       <Row gutter={16}>
        <Col span={24}>
        <Form.Item wrapperCol={{  span: 24 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      </Col>
      </Row>
    </Form>

  );
};

export default DrawerForm