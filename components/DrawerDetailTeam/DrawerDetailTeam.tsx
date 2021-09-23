import { Button, Col, Divider, Drawer, Row, Space, Typography } from "antd"
import React, { FC } from "react"
import DescriptionItem from "../DescriptionItem/DescriptionItem";

const { Title } = Typography;
interface DataType {
    key: React.Key;
    account: string;
    client: string;
    responsable: string;
    team: string[];
  
  }
  

type Props = {

  }

const DrawerDetailTeam: FC<Props> =() => {
    return (
      
          <>
          <Row>
            <Col span={24}>
                <DescriptionItem title="Team Name" content="Rio" />
            </Col>
           
            <Col span={24}>
                <DescriptionItem title="Email" content="email1@example.com" />
            </Col>
            <Divider />
           
            </Row>
            <Divider />
            </>
         
        );
    };
    
    export default DrawerDetailTeam