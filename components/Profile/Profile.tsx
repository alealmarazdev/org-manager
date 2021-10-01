import { UserProfile } from '@auth0/nextjs-auth0';
import { Col, Divider, Row, Typography } from 'antd';
import React, { FC } from 'react';
import DescriptionItem from '../DescriptionItem';

const { Text, Title } = Typography;

type Props = { user: UserProfile };

const Profile: FC<Props> = ({ user }) => (
  <>
    <Title level={3}> User Profile</Title>
    <Divider />
    <Row>
      <Col span={24}>
        <DescriptionItem title="Full Name" content={`${user.name}`} />
      </Col>
      <Divider />
      <Col span={24}>
        <DescriptionItem title="Email" content={`${user.email}`} />
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
);

export default Profile;
