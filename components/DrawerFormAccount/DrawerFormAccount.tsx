import React, { useState, FC } from 'react';

import { Form, Input, InputNumber, Button, Typography, Drawer, Space, Row, Col, Select, DatePicker } from 'antd';

const { Option } = Select;

/* 
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
}; */
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

const DrawerFormAccount: FC<Props> =() => {

  const onFinish = (values: any) => {
    const handleAccountCreated = async () => {
      let res = await fetch('http://localhost:3000/api/account', {
        method: 'POST',
        body: JSON.stringify(values)
      })

      const response = await res.json()
      console.log(response)
    }
    handleAccountCreated()
    console.log(values);
  }


  return (

    <Form layout="vertical" hideRequiredMark onFinish={onFinish}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="account"
            label="Account"
            rules={[{ required: true, message: 'Please enter account name' }]}
          >
            <Input placeholder="Please enter account name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="client"
            label="Client"
            rules={[{ required: true, message: 'Please enter client name' }]}
          >
            <Input
              style={{ width: '100%' }}
              placeholder="Please enter client name"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
      <Col span={12}>
          <Form.Item
            name="responsable"
            label="Responsable name"
            rules={[{ required: true, message: 'Please enter responsable name' }]}
          >
            <Input placeholder="Please enter responsable name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="team"
            label="Team"
            rules={[{ required: true, message: 'Please choose the asign team' }]}
          >
            <Select placeholder="Please choose the team">
              <Option value="a">a</Option>
              <Option value="b">b</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Form>

  );
};

export default DrawerFormAccount