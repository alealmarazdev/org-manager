import React, { useState, FC, useEffect } from 'react';
import { Form, Input, InputNumber, Button, Typography, Drawer, Space, Row, Col, Select, DatePicker } from 'antd';
import Account from '../../entity/Account';

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
  id: string | undefined
}

const DrawerFormAccountUpdate: FC<Props> = ({ id }) => {
  const [account, setAccountState] = useState<Account>({})
  const [form] = Form.useForm()
  console.log('====>', id)

  useEffect(
    () => {
      const handleAccount = async () => {
        let res = await fetch(`http://localhost:3000/api/account/${id}`);
        const response = await res.json();

        if (!response) {
          return {
            notFound: true,
          };
        }
        form.setFieldsValue(response.data)
        console.log('----->', response.data )
        /*setAccountState(response.data);*/
        return
      }
      handleAccount()

    }, [])

  const onFinish = (values: any) => {
    
    const handleAccountUpdate = async () => {
      let res = await fetch(`http://localhost:3000/api/account/${id}`, {
        method: 'PUT',
        body: JSON.stringify(values)
      })

      const response = await res.json()
      console.log(response)
    }
    handleAccountUpdate()  /*  */
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
        <Col span={12}>
          <Form.Item
            name="responsable"
            label="Responsable"
            rules={[{ required: true, message: 'Please enter responsable' }]}
          >
            <Input
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
      </Row>
   
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="client"
            label="Client"
            rules={[{ required: true, message: 'Please select a Client' }]}
          >
            <Select placeholder="Please select a Client">
              <Option value="basic">Basic</Option>
              <Option value="middle">Midle</Option>
              <Option value="advance">Advance</Option>
            </Select>
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

export default DrawerFormAccountUpdate