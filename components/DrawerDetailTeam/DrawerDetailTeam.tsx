import { Button, Col, Divider, Drawer, Row, Space, Typography } from "antd"
import React, { FC, useEffect, useState } from "react"
import Team from "../../entity/Team";
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
  id: string | undefined
  }

const DrawerDetailTeam: FC<Props> =({ id }) => {
  const [team, setTeamState] = useState<Team>({})

  useEffect(
    () => {
        const handleTeam = async () => {
            let res = await fetch(`http://localhost:3000/api/team/${id}`);
            const response = await res.json();

            if (!response) {
                return {
                    notFound: true,
                };
            }

            return setTeamState(response.data)
        }
        handleTeam()
    }, [])
    console.log('=====>', team)
    return (
      
          <>
          <Row>
            <Col span={24}>
                <DescriptionItem title="Team Name" content={team.name} />
            </Col>
            <Col span={24}>
                <DescriptionItem title="Members" content="email1@example.com" />
            </Col>
            <Divider />
           
            </Row>
            <Divider />
            </>
         
        );
    };
    
    export default DrawerDetailTeam