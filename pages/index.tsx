import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import 'antd/dist/antd.css';
import LayoutTemplate from '../components/LayoutTemplate';

import fetch from 'isomorphic-unfetch';

import Login from '../components/Login';
import Profile from '../components/Profile';
import { useUser } from '@auth0/nextjs-auth0';
import User from '../entity/User';

type Props = {
  users: User[];
};

const Home: NextPage<Props> = () => {
  const { user, error, isLoading } = useUser();
  const [usersState, setUsersState] = useState([])

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

  const userSelected = usersState.find((u: any) => u.email == user?.email);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (userSelected) {
    return (
      <LayoutTemplate title="arkus nexus" description="Organization Manager">
        <Profile user={userSelected} />
      </LayoutTemplate>
    );
  }
  return (
    <LayoutTemplate title="arkus nexus" description="Organization Manager">
      <Login />
    </LayoutTemplate>
  );
};

export default Home;
