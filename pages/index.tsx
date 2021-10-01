import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import 'antd/dist/antd.css';
import LayoutTemplate from '../components/LayoutTemplate';
import React from 'react';

/* import { getOrCreateConnection } from '../utils';
import { User } from '../entity/Test/user'; */
import Login from '../components/Login';
import Profile from '../components/Profile';
import { useUser } from '@auth0/nextjs-auth0';

/* export async function getServerSideProps() {
  const conn = await getOrCreateConnection();
  const postRepo = conn.getRepository<User>('User');

  const posts = await postRepo.find();
  console.log(`${posts.length} posts fetched from the database`);

  return {
    props: { msg: 'Hello world!', posts },
  }; 
}*/

const Home: NextPage = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <LayoutTemplate title="arkus nexus" description="Organization Manager">
        <Profile user={user} />
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
