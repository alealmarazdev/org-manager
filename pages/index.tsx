import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import 'antd/dist/antd.css'
import LayoutTemplate from '../components/LayoutTemplate';
import React from 'react';
import { Col, Divider, Row,  Typography} from 'antd';
import DescriptionItem from '../components/DescriptionItem';

const { Title } = Typography;

const Home: NextPage = () => {
  return (
    <LayoutTemplate title='arkus nexus' description='Organization Manager'>
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
    </LayoutTemplate> 
  )
}

export default Home
