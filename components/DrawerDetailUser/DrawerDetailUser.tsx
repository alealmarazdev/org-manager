import { Button, Col, Divider, Drawer, Row, Space, Typography } from "antd"
import React, { FC } from "react"
import DescriptionItem from "../DescriptionItem/DescriptionItem";

const { Title } = Typography;

type Props = {

  }

const DrawerDetailUser: FC<Props> =() => {
    return (
      
          <>
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
        </Row><Divider /><Row>
                <Col span={24}>
                    <DescriptionItem
                        title="Skills"
                        content="C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc." />
                </Col>
            </Row><Divider /></>
         
        );
    };
    
    export default DrawerDetailUser