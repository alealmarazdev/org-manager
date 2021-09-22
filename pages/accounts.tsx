import React, { FC, useState } from 'react';
import { Button, Divider, Drawer, Radio, Space, Table, Typography } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

import Layout from '../components/LayoutTemplate';
import DrawerFormAccount from '../components/DrawerFormAccount';
import DrawerDetailUser from '../components/DrawerDetailUser';

import dataAccount from '../utils/dataAccount';

const { Title } = Typography;

interface DataType {
  key: React.Key;
  account: string;
  client: string;
  responsable: string;
  team: string;

}

const Accounts: FC = () => {
  const [visible, setVisible] = useState(false)
  const [teamDetail, setTeamDetail] = useState(false)

  const handleState = () => {
    setTeamDetail(true)
    setVisible(!visible)
    console.log(teamDetail)
  }
   
  const showDrawer = () => {
    setTeamDetail(false)
    setVisible(!visible)
  };

  const handleEdit = (e: any) => {
    setTeamDetail(false)
    setVisible(!visible)
    console.log('edit' + e)
  }
  const handleDelete = (e: any) => {
    console.log('delete' + e)
  }

  const columns = [
    {
      title: 'Account',
      dataIndex: 'account',
   
    },
    {
      title: 'Client',
      dataIndex: 'client',
      
    },
    {
      title: 'Responsable',
      dataIndex: 'responsable',
     
    },
    {
      title: 'Team',
      dataIndex: 'team',
      render: (text: string) => <Button onClick={handleState} type="link">{text}</Button>,
     
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
    <Layout title="account" description="account">
     <Title level={3}>ACCOUNT</Title>
     <Divider /> 
     <div>
      <Table
        columns={columns}
        dataSource={dataAccount.accounts}
        scroll={{ x: "max-content", y: "max-content" }}
      />
    </div>

    <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
      Add a new acccount
    </Button>
    <Drawer
    title={teamDetail ? 'Team Members' :  `Create a new account `}
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
      {!teamDetail && <DrawerFormAccount  /> 
    }
      {teamDetail && <DrawerDetailUser />
    }
    </Drawer>
    </Layout>
  );
}

export default Accounts