import React from 'react';
import { Button, Divider, Radio, Table, Typography } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

import Layout from '../components/LayoutTemplate';
import dataUsers from '../utils/dataUsers';

const { Title } = Typography;
const columns = [
  {
    title: 'Key',
    dataIndex: 'key',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: 'Teams',
    dataIndex: 'teams.name',
    
  },{
    title: 'Name',
    dataIndex: 'name',
    
  },
  
  {
    title: () => <EditOutlined />,
    dataIndex: 'edit',
    render : () => <EditOutlined />,

  },
  {
    title: () => <DeleteOutlined />,
    dataIndex: 'delete',
    render : () => <DeleteOutlined />,
 
  },
  
];

interface DataType {
  key: React.Key;
  name: string;

}


export default function Teams() {
  console.log(dataUsers.users)
  return (
    <Layout title="teams" description="teams">
     <Title level={3}>TEAMS</Title>
     <Divider /> 
     <div>
      <Table
        columns={columns}
        dataSource={dataUsers.users}
        scroll={{ x: "max-content", y: "max-content" }}
      />
    </div>

    <Button type="primary" icon={<PlusOutlined />}>
      Add a new team
    </Button>
    </Layout>
  );
}