import { FC } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { Layout, Menu, Breadcrumb } from 'antd';
import logo from '../../public/images/ArkusNexus500.png';
import data from '../../utils/data';
import User from '../../entity/User';
const { Header, Content, Footer } = Layout;
const { Item } = Menu;

type Props = {
  title: string;
  description: string,
  user?: User
};

const LayoutTemplate: FC<Props> = ({ title, description, children, user }) => {

  return (
    <>
      <Head>
        <title>{title ? `${title} - OM` : 'Organization Manager'}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <Layout className="layout">
        <Header>
          <NextLink href={`/`} passHref>
            <div className="logo">
              <img className="logoImg" src={logo.src} alt="" />
            </div>
          </NextLink>
          {user && (
            <>
              <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                {data.flow.map((navbar, index) => {
                  const key = 'NB' + index + 1;
                  return (
                    <Item key={key}>
                      <NextLink href={`/${navbar.link}`} passHref>
                        {navbar.list}
                      </NextLink>
                    </Item>
                  );
                })}
              </Menu>
            </>
          )}
        </Header>
        <Content
          style={{
            padding: '0 50px',
            height: 'calc(100vh - 120px)',
            margin: '100px',
          }}
        >
          <div className="site-layout-content">{children}</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Arkus Nexus ©2021 Created by Mind Team
        </Footer>
      </Layout>
    </>
  );
};
export default LayoutTemplate;
