import React from 'react';
import { Button, Divider, Radio, Table, Typography } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

import Layout from '../components/LayoutTemplate';
import { NextPage } from 'next';
import Team from '../entity/Team';

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

type Props = {
  teams: Team[];
};

const Teams: NextPage<Props> = ({teams}) => {

  console.log('--->', teams)
  return (
    <Layout title="teams" description="teams">
     <Title level={3}>TEAMS</Title>
     <Divider /> 
     <div>
      <Table
        columns={columns}
        dataSource={teams}
        scroll={{ x: "max-content", y: "max-content" }}
      />
    </div>

    <Button type="primary" icon={<PlusOutlined />}>
      Add a new team
    </Button>
    </Layout>
  );
}

Teams.getInitialProps = async (): Promise<any> => {
  let res = await fetch('http://localhost:3000/api/team');
  const response = await res.json();

  if (!response) {
    return {
      notFound: true,
    };
  }
  return { teams: response.data };
};

export default Teams;