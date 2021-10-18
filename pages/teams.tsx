import React, { useEffect, useState } from 'react';
import { Button, Divider, Radio, Table, Typography } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

import Layout from '../components/LayoutTemplate';
import { NextPage } from 'next';
import Team from '../entity/Team';

const { Title } = Typography;

type Props = {
  teams: Team[];
};

const Teams: NextPage<Props> = () => {
  const [teams, setTeamsState] = useState<Team[]>([])

  useEffect(
    () => {
      const handleTeam = async () => {
        let res = await fetch('http://localhost:3000/api/team');
        const response = await res.json();

        if (!response) {
          return {
            notFound: true,
          };
        }
        return setTeamsState(response.data);
      }
      handleTeam()
    }, [])

  const dataSource = teams.map((team) => ({ ...team, key: team.id }))

  console.log('--->', teams)

  const columns = [
    {
      title: 'Key',
      dataIndex: 'key',
      render: (text: string) => <a>{text}</a>,
      key: 'key'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'

    },

    {
      title: () => <EditOutlined />,
      dataIndex: 'edit',
      render: () => <EditOutlined />,
      key: 'edit'

    },
    {
      title: () => <DeleteOutlined />,
      dataIndex: 'delete',
      render: () => <DeleteOutlined />,
      key: 'delete'
    },

  ];
  return (
    <Layout title="teams" description="teams">
      <Title level={3}>TEAMS</Title>
      <Divider />
      <div>
        <Table
          columns={columns}
          dataSource={dataSource}
          scroll={{ x: "max-content", y: "max-content" }}
        />
      </div>

      <Button type="primary" icon={<PlusOutlined />}>
        Add a new team
      </Button>
    </Layout>
  );
}

/* Teams.getInitialProps = async (): Promise<any> => {
  let res = await fetch('http://localhost:3000/api/team');
  const response = await res.json();

  if (!response) {
    return {
      notFound: true,
    };
  }
  return { teams: response.data };
}; */

export default Teams;