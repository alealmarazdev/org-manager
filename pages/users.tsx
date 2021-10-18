import React, { useEffect, useState } from 'react';
import { Button, Divider, Drawer, Popconfirm, Space, Table, Typography } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

import Layout from '../components/LayoutTemplate';
import DrawerForm from '../components/DrawerForm/DrawerForm';
import DrawerDetailUser from '../components/DrawerDetailUser/DrawerDetailUser';

import { NextPage } from 'next';
import User from '../entity/User';

const { Title } = Typography;

type Props = {
  users: User[];
};

const Users: NextPage<Props> = () => {
  const [visible, setVisible] = useState(false)
  const [userDetail, setUserDetail] = useState(false)
  const [users, setUsersState] = useState<User[]>([])

  useEffect(
    () => {
      const handleUser = async () => {
        let res = await fetch('http://localhost:3000/api/user');
        const response = await res.json();

        if (!response) {
          return {
            notFound: true,
          };
        }
        return setUsersState(response.data);
      }
      handleUser()
    }, [])

  const dataSource = users.map((user) => ({ ...user, key: user.id.toString() }))

  const handleState = (/* key: React.Key */) => {
    setUserDetail(true)
    setVisible(!visible)
    console.log(userDetail)
   /*  console.log('state' + key); */
  }

  const showDrawerForm = () => {
    setUserDetail(false)
    setVisible(!visible)
  };

  const handleEdit = (key: React.Key) => {
    setUserDetail(false);
    setVisible(!visible);
    console.log('edit' + key);
  };

  const handleDelete = (key: React.Key) => {
    const data = [...dataSource];
    /* this.setState({ dataSource: data.filter(item => item.key !== key) }); */
    const handleUserDelete = async () => {
      let res = await fetch(`http://localhost:3000/api/user/${key}`, {
        method: 'DELETE',
        body: JSON.stringify(key)
      })

      const response = await res.json()
      console.log(response)
    }
    handleUserDelete()
  };


  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <Button onClick={handleState} type="link">{text}</Button>,
     /*  render: (_: any, text: string, record: { key: React.Key }) =>
      <Popconfirm title="Sure to edit?" onConfirm={() => handleState(record.key)}>
        {text}
      </Popconfirm> */
      
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Password',
      dataIndex: 'password',
      key: ' password'
    },
    {
      title: () => <EditOutlined />,
      dataIndex: 'edit',
      key: 'edit',
      render: (_: any, record: { key: React.Key }) =>
        <Popconfirm title="Sure to edit?" onConfirm={() => handleEdit(record.key)}>
          <EditOutlined />
        </Popconfirm>
    },
    {
      title: () => <DeleteOutlined />,
      dataIndex: 'delete',
      key: 'delete',
      render: (_: any, record: { key: React.Key }) =>
        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
          <DeleteOutlined />
        </Popconfirm>
    },
  ];

  return (
    <Layout title="users" description="users">
      <Title level={3}>USERS</Title>
      <Divider />
      <div>
        <Table
          columns={columns}
          dataSource={dataSource}
          scroll={{ x: "max-content", y: "max-content" }}
        />
      </div>

      <Button type="primary" onClick={showDrawerForm} icon={<PlusOutlined />}>
        Add a new user
      </Button>
      <Drawer
        title={userDetail ? 'User Profile' : `Create a new user `}
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