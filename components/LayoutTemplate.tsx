import { useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { Layout, Menu, Breadcrumb } from 'antd';
import logo from '../public/images/ArkusNexus500.png';
import data from '../utils/data'
const { Header, Content, Footer } = Layout;
const { Item } = Menu;



export default function LayoutTemplate( Params: { title: string; description: string; children: any; } ) {
  const { title, description, children } = Params
  return (
    <>
      <Head>
        <title>{title ? `${title} - OM` : 'Organization Manager'}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <Layout className="layout">
        <Header>
          <div className="logo">
            <img className="logoImg" src={logo.src} alt="" />
          </div>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            {data.flow.map((navbar, index) => {
             const key = 'NB' + index + 1;
              return (
                <Item key={key}>
                  <NextLink href={`/${navbar.link}`} passHref >
                    {navbar.link}
                  </NextLink>
                </Item>
              )
            })}
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}
          <div className="site-layout-content">{children}</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Arkus Nexus ©2021 Created by Mind Team
        </Footer>
      </Layout>
    </>
  );
}
