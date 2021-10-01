import { Button, Col, Row, Typography } from 'antd';
import React, { FC } from 'react';

const { Text, Title } = Typography;

type Props = {};

const Login: FC<Props> = () => (
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
);

export default Login;
