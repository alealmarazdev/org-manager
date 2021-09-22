import React, { FC, useState } from 'react';
import { Button, Divider, Drawer, Radio, Space, Table, Typography } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

import Layout from '../components/LayoutTemplate';
import DrawerForm from '../components/DrawerForm';
import DrawerDetailUser from '../components/DrawerDetailUser';

import dataUsers from '../utils/dataUsers';

const { Title } = Typography;

interface DataType {
  key: React.Key;
  name: string;
  email: string;
  password: string;
}

const Users: FC = () => {
  const [visible, setVisible] = useState(false)
  const [userDetail, setUserDetail] = useState(false)

  const handleState = () => {
    setUserDetail(true)
    setVisible(!visible)
    console.log(userDetail)
  }
   
  const showDrawerForm = () => {
    setUserDetail(false)
    setVisible(!visible)
  };

  const handleEdit = (e: any) => {
    setUserDetail(false)
    setVisible(!visible)
    console.log('edit' + e)
  }

  const handleDelete = (e: any) => {
    console.log('delete' + e)
  }


  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text: string) => <Button onClick={handleState} type="link">{text}</Button>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      
    },
    {
      title: 'Password',
      dataIndex: 'password',
     
    },
    {
      title: () => <EditOutlined />,
      dataIndex: 'edit',
      render : () => <Button onClick={handleEdit} type="text" ><EditOutlined /></Button>,
  
    },
    {
      title: () => <DeleteOutlined />,
      dataIndex: 'delete',
      render : () => <Button onClick={handleDelete} type="text"><DeleteOutlined /></Button>,
   
    },
    
  ];

  return (
    <Layout title="users" description="users">
     <Title level={3}>USERS</Title>
     <Divider /> 
     <div>
      <Table
        columns={columns}
        dataSource={dataUsers.users}
        scroll={{ x: "max-content", y: "max-content" }}
      />
    </div>

    <Button type="primary" onClick={showDrawerForm} icon={<PlusOutlined />}>
      Add a new user
    </Button>
    <Drawer
    title={userDetail ? 'User Profile' :  `Create a new user `}
    width={720}
    onClose={handleState}
    visible={visible}
    bodyStyle={{ paddingBottom: 80 }}
     /* @ts-ignore */ 
    extra={
      <Space>
        <Button onClick={handleState}>Cancel</Button>
        <Button onClick={handleState} type="primary">
          Submit
        </Button>
      </Space>
    }
  >
    {
      userDetail && <DrawerDetailUser /> 
    }
      {!userDetail && <DrawerForm />
    }
    </Drawer>
    </Layout>
  );
}


export default Users