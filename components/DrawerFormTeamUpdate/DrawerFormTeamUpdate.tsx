import React, { useState, FC, useEffect } from 'react';
import { Form, Input, InputNumber, Button, Typography, Drawer, Space, Row, Col, Select, DatePicker } from 'antd';
import Team from '../../entity/Team';

const { Option } = Select;

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
  id: string | undefined;
  onSubmit: ()=>void;
}

const DrawerFormTeamUpdate: FC<Props> = ({ id, onSubmit }) => {
  const [team, setTeamState] = useState<Team>({})
  const [form] = Form.useForm()

  useEffect(
    () => {
      const handleTeam = async () => {
        let res = await fetch(`http://localhost:3000/api/team/${id}`);
        const response = await res.json();

        if (!response) {
          return {
            notFound: true,
          };
        }
        form.setFieldsValue(response.data)
        return
      }
      handleTeam()

    }, [])

  const onFinish = (values: any) => {
    
    const handleTeamUpdate = async () => {
      let res = await fetch(`http://localhost:3000/api/team/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })

      const response = await res.json()
      console.log(response)
      onSubmit() 
    }
    handleTeamUpdate() 
  }

  return (

    <Form layout="vertical" form={form} hideRequiredMark onFinish={onFinish}>
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

export default DrawerFormTeamUpdate