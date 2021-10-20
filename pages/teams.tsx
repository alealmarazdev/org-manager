import React, { useEffect, useState } from 'react';
import { Button, Divider, Drawer, Popconfirm, Radio, Space, Table, Typography } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

import Layout from '../components/LayoutTemplate';
import { NextPage } from 'next';
import Team from '../entity/Team';
import DrawerFormTeam from '../components/DrawerFormTeam';
import DrawerDetailTeam from '../components/DrawerDetailTeam';
import DrawerFormTeamUpdate from '../components/DrawerFormTeamUpdate';

const { Title } = Typography;

type Props = {
  teams: Team[];
};

const Teams: NextPage<Props> = () => {
  const [visible, setVisible] = useState(false)
  const [teamDetail, setTeamDetail] = useState(false)
  const [teams, setTeamsState] = useState<Team[]>([])
  const [teamId, setTeamIdState] = useState<string | undefined>()

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

  const dataSource = teams.map((team) => ({ ...team, key: team.id.toString() }))

  const handleState = () => {
    setTeamDetail(true)
    setVisible(!visible)
    setTeamIdState(undefined)
  }

  const handleAccountDetail = (key: string) => {
    setTeamDetail(true)
    setVisible(!visible)
    setTeamIdState(key)
  }

  const showDrawerForm = () => {
    setTeamDetail(false)
    setVisible(!visible)
  };

  const handleEdit = (key: string) => {
    setTeamDetail(false)
    setVisible(!visible)
    setTeamIdState(key)
  }

  const handleDelete = (key: React.Key) => {
    const data = [...dataSource];
    const handleTeamDelete = async () => {
      let res = await fetch(`http://localhost:3000/api/team/${key}`, {
        method: 'DELETE',
        body: JSON.stringify(key)
      })

      const response = await res.json()
      console.log(response)
    }
    handleTeamDelete()
  };

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
      key: 'edit',
      render: (_: any, record: { key: string }) =>
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

      <Button type="primary" onClick={showDrawerForm} icon={<PlusOutlined />}>
        Add a new team
      </Button>
      <Drawer
        title={teamDetail ? 'Team Profile' : `Create a new team `}
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
        {teamDetail && teamId && <DrawerDetailTeam id={teamId} />}
        {!teamDetail && teamId && <DrawerFormTeamUpdate id={teamId}/>}
        {!teamDetail && !teamId && <DrawerFormTeam />}
      </Drawer>
    </Layout>
  );
}

export default Teams;