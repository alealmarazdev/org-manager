import React, { useEffect, useState } from 'react';
import { Button, Divider, Drawer, Popconfirm, Space, Table, Typography } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

import Layout from '../components/LayoutTemplate';
import DrawerFormAccount from '../components/DrawerFormAccount/DrawerFormAccount';
import DrawerDetailUser from '../components/DrawerDetailUser/DrawerDetailUser';

import { NextPage } from 'next';
import Account from '../entity/Account';

const { Title } = Typography;

type Props = {
  accounts: Account[];
};

const Accounts: NextPage<Props> = () => {
  const [visible, setVisible] = useState(false);
  const [teamDetail, setTeamDetail] = useState(false);
  const [accounts, setAccountsState] = useState<Account[]>([])

  useEffect(
    () => {
      const handleAccount = async () => {
        let res = await fetch('http://localhost:3000/api/account');
        const response = await res.json();

        if (!response) {
          return {
            notFound: true,
          };
        }
        return setAccountsState(response.data);
      }
      handleAccount()
    }, [])

  console.log('-->', accounts)

  const handleState = () => {
    setTeamDetail(true);
    setVisible(!visible);
    console.log(teamDetail);
  };

  const showDrawer = () => {
    setTeamDetail(false);
    setVisible(!visible);
  };

  const handleEdit = (key: React.Key) => {
    setTeamDetail(false);
    setVisible(!visible);
    console.log('edit' + key);
  };
  /*   const handleDelete = (e: any) => {
      console.log('delete' + e);
    }; */

  const dataSource = accounts.map((account) => ({ ...account, key: account.id.toString() }))

  const handleDelete = (key: React.Key) => {
    const data = [...dataSource];
    /* this.setState({ dataSource: data.filter(item => item.key !== key) }); */
    const handleAccountDelete = async () => {
      let res = await fetch('http://localhost:3000/api/account/:key', {
        method: 'DELETE',
        body: JSON.stringify(key)
      })

      const response = await res.json()
      console.log(response)
    }
    handleAccountDelete()
    console.log(key);
  };

  const columns = [
    {
      title: 'Account',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Client',
      dataIndex: 'client',
      key: 'client',
    },
    {
      title: 'Responsable',
      dataIndex: 'responsable',
      key: 'responsable',
    },
    {
      title: 'Team',
      dataIndex: 'team',
      render: (text: string) => (
        <Button onClick={handleState} type="link">
          {text}
        </Button>
      ),
      key: 'button',
    },
    {
      title: () => <EditOutlined />,
      dataIndex: 'edit',
      key: 'edit',
      render: (_: any, record: { key: React.Key }) =>
        /*  dataSource.length >= 1 ? ( */
        <Popconfirm title="Sure to edit?" onConfirm={() => handleEdit(record.key)}>
          <EditOutlined />
        </Popconfirm>
      /* ) : null, */      
      /* render: () => (
        <Button onClick={handleEdit} type="text">
          <EditOutlined />
        </Button>
      ), */
    },
    {
      title: () => <DeleteOutlined />,
      dataIndex: 'delete',
      key: 'delete',
      render: (_: any, record: { key: React.Key }) =>
        /*   dataSource.length >= 1 ? ( */
        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
          <DeleteOutlined />
        </Popconfirm>
      /*   ) : null, */  /* render: () => (
        <Button onClick={handleDelete} type="text">
          <DeleteOutlined />
        </Button>
      ), */

    },
  ];

  return (
    <Layout title="account" description="account">
      <Title level={3}>ACCOUNT</Title>
      <Divider />
      <div>
        <Table
          columns={columns}
          dataSource={dataSource}
          scroll={{ x: 'max-content', y: 'max-content' }}
        />
      </div>

      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        Add a new acccount
      </Button>
      <Drawer
        title={teamDetail ? 'Team Members' : `Create a new account `}
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
        {!teamDetail && <DrawerFormAccount />}
        {teamDetail && <DrawerDetailUser />}
      </Drawer>
    </Layout>
  );
};

/* Accounts.getInitialProps = async (): Promise<any> => {
  let res = await fetch('http://localhost:3000/api/account');
  const response = await res.json();

  if (!response) {
    return {
      notFound: true,
    };
  }
  return { accounts: response.data };
}; */

export default Accounts;
