import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import 'antd/dist/antd.css';
import LayoutTemplate from '../components/LayoutTemplate';
import React from 'react';
import { Button, Col, Divider, Row, Typography } from 'antd';
import DescriptionItem from '../components/DescriptionItem/DescriptionItem';
import Paragraph from 'antd/lib/skeleton/Paragraph';

const { Text, Title } = Typography;

const Home: NextPage = () => {
  const user = true;
  return (
    <LayoutTemplate title="arkus nexus" description="Organization Manager">
      {!user && (
        <>
          <Row justify="center">
            <Col>
              <Title level={1} style={{ color: '#fd0000' }}>
                Welcome to Arkus Nexus
              </Title>
            </Col>
          </Row>
          <Row justify="center">
            <Col>
              <Title level={2}> Organization Manager</Title>
            </Col>
          </Row>
          <Row justify="center">
            <Col>
              <Button type="primary">Login</Button>
            </Col>
          </Row>
          <Row justify="center">
            <Col>
              <Text>Please log in to continue</Text>
            </Col>
          </Row>
        </>
      )}
      {user && (
        <>
          <Title level={3}> User Profile</Title>
          <Divider />
          <Row>
            <Col span={24}>
              <DescriptionItem title="Full Name" content="Lily Potter" />
            </Col>
            <Divider />
            <Col span={24}>
              <DescriptionItem title="Email" content="email1@example.com" />
            </Col>
            <Divider />
            <Col span={24}>
              <DescriptionItem title="English level" content="Middle" />
            </Col>
            <Divider />
            <Col span={24}>
              <DescriptionItem title="Resume Link" content="China🇨🇳" />
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="Skills"
                content="C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc."
              />
            </Col>
          </Row>
          <Divider />
        </>
      )}
    </LayoutTemplate>
  );
};

export default Home;
