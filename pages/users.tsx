import React, { useEffect, useState } from 'react';
import { Button, Divider, Drawer, Space, Table, Typography } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

import Layout from '../components/LayoutTemplate';
import DrawerForm from '../components/DrawerForm/DrawerForm';
import DrawerDetailUser from '../components/DrawerDetailUser/DrawerDetailUser';

import { NextPage } from 'next';
import User from '../entity/User';

const { Title } = Typography;

/* interface DataType {
  key: React.Key;
  name: string;
  email: string;
  password: string;
}

const Users: FC = () => { */
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
 const dataSource = users.map((user)=> ({...user, key:user.id}))

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text: string) => <Button onClick={handleState} type="link">{text}</Button>,
      key: 'name'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
      
    },
    {
      title: 'Password',
      dataIndex: 'password',
      key:' password'
     
    },
    {
      title: () => <EditOutlined />,
      dataIndex: 'edit',
      render : () => <Button onClick={handleEdit} type="text" ><EditOutlined /></Button>,
      key:'edit'
  
    },
    {
      title: () => <DeleteOutlined />,
      dataIndex: 'delete',
      render : () => <Button onClick={handleDelete} type="text"><DeleteOutlined /></Button>,
      key:'delete'
   
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
/* Users.getInitialProps = async (): Promise<any> => {
  let res = await fetch('http://localhost:3000/api/user');
  const response = await res.json();

  if (!response) {
    return {
      notFound: true,
    };
  }
  return { users: response.data };
}; */

export default Users