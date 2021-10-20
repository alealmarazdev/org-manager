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

const DrawerFormTeam: FC<Props> = () => {

  const onFinish = (values: any) => {
    const handleTeamCreated = async () => {
      let res = await fetch('http://localhost:3000/api/team', {
        method: 'POST',
        body: JSON.stringify(values)
      })

      const response = await res.json()
      console.log(response)
    }
    handleTeamCreated()
  
  }


  return (

    <Form layout="vertical" hideRequiredMark onFinish={onFinish}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="Team"
            rules={[{ required: true, message: 'Please enter account name' }]}
          >
            <Input placeholder="Please enter account name" />
          </Form.Item>
        </Col>

      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item wrapperCol={{ span: 24 }}>
            <Button type="primary" htmlType="submit" >
              Submit
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>

  );
};

export default DrawerFormTeam