import { Col, Divider, Row, Typography } from 'antd';
import React, { FC } from 'react';
import User from '../../entity/User';
import DescriptionItem from '../DescriptionItem';

const { Title } = Typography;

type Props = { user: User };

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
        <DescriptionItem
          title="English level"
          content={`${user.english_level}`}
        />
      </Col>
      <Divider />
      <Col span={24}>
        <DescriptionItem title="Resume Link" content={`${user.resume}`} />
      </Col>
    </Row>
    <Divider />
    <Row>
      <Col span={24}>
        <DescriptionItem title="Skills" content={`${user.skills}`} />
      </Col>
    </Row>
    <Divider />
  </>
);

export default Profile;
