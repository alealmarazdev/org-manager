import { Button, Col, Divider, Drawer, Row, Space, Typography } from "antd"
import React, { FC, useEffect, useState } from "react"
import Account from "../../entity/Account";
import DescriptionItem from "../DescriptionItem/DescriptionItem";

const { Title } = Typography;

type Props = {
  id: string | undefined
}

const DrawerDetailAccount: FC<Props> = ({ id }) => {
  const [account, setAccountState] = useState<Account>({})

  useEffect(
    () => {
      const handleAccount = async () => {
        let res = await fetch(`http://localhost:3000/api/account/${id}`);
        const response = await res.json();

        if (!response) {
          return {
            notFound: true,
          };
        }

        return setAccountState(response.data)
      }
      handleAccount()
    }, [])

  return (
    <>
      <Row>
        <Col span={24}>
          <DescriptionItem title="Account Name" content={account.name} />
        </Col>
        <Divider />
        <Col span={24}>
          <DescriptionItem title="Client" content={account.client} />
        </Col>
        <Divider />
        <Col span={24}>
          <DescriptionItem title="Responsable" content={account.responsable} />
        </Col>
        <Divider />
      </Row>
    </>

  );
};

export default DrawerDetailAccount