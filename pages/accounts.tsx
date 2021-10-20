import React, { useEffect, useState } from 'react';
import { Button, Divider, Drawer, Popconfirm, Space, Table, Typography } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

import Layout from '../components/LayoutTemplate';
import DrawerFormAccount from '../components/DrawerFormAccount/DrawerFormAccount';
import DrawerDetailAccount from '../components/DrawerDetailAccount';

import { NextPage } from 'next';
import Account from '../entity/Account';
import DrawerFormAccountUpdate from '../components/DrawerFormAccountUpdate';

const { Title } = Typography;

type Props = {
  accounts: Account[];
};

const Accounts: NextPage<Props> = () => {
  const [visible, setVisible] = useState(false);
  const [accountDetail, setAccountDetail] = useState(false);
  const [accounts, setAccountsState] = useState<Account[]>([])
  const [accountId, setAccountIdState] = useState<string | undefined>()

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

  useEffect(
    () => {

      handleAccount()
    }, [])

  const dataSource = accounts.map((account) => ({ ...account, key: account._id.toString() }))

  const handleState = () => {
    setAccountDetail(true);
    setVisible(!visible);
    setAccountIdState(undefined)
    handleAccount()
  };

  const handleAccountDetail = (key: string) => {
    setAccountDetail(true)
    setVisible(!visible)
    setAccountIdState(key)
  }

  const showDrawerForm = () => {
    setAccountDetail(false);
    setVisible(!visible);
  };

  const handleEdit = (key: string) => {
    setAccountDetail(false);
    setVisible(!visible);
    setAccountIdState(key)
  };

  const handleDelete = (key: React.Key) => {
    const data = [...dataSource];
    const handleAccountDelete = async () => {
      let res = await fetch(`http://localhost:3000/api/account/${key}`, {
        method: 'DELETE',
        body: JSON.stringify(key)
      })

      const response = await res.json()
      console.log(response)
    }
    handleAccountDelete()
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: { key: string, }) =>
        <Popconfirm title="Sure to show?" onConfirm={() => handleAccountDetail(record.key)}>
          {text}
        </Popconfirm>
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
    <Layout title="account" description="account">
      <Title level={3}>ACCOUNTS</Title>
      <Divider />
      <div>
        <Table
          columns={columns}
          dataSource={dataSource}
          scroll={{ x: 'max-content', y: 'max-content' }}
        />
      </div>

      <Button type="primary" onClick={showDrawerForm} icon={<PlusOutlined />}>
        Add a new acccount
      </Button>
      <Drawer
        title={accountDetail ? 'Account Members' : `Create a new account `}
        width={720}
        onClose={handleState}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        {accountDetail && accountId && <DrawerDetailAccount id={accountId} />}
        {!accountDetail && accountId && <DrawerFormAccountUpdate id={accountId} onSubmit={handleState} />}
        {!accountDetail && !accountId && <DrawerFormAccount />}
      </Drawer>
    </Layout>
  );
};

export default Accounts;
