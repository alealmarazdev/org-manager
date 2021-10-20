import { Button, Col, Divider, Drawer, Row, Space, Typography } from "antd"
import React, { FC, useEffect, useState } from "react"
import User from "../../entity/User";
import DescriptionItem from "../DescriptionItem/DescriptionItem";

const { Title } = Typography;

type Props = {
    id: string | undefined
}

const DrawerDetailUser: FC<Props> = ({ id }) => {
    const [user, setUserState] = useState<User>({})

    useEffect(
        () => {
            const handleUser = async () => {
                let res = await fetch(`http://localhost:3000/api/user/${id}`);
                const response = await res.json();

                if (!response) {
                    return {
                        notFound: true,
                    };
                }

                return setUserState(response.data)
            }
            handleUser()
        }, [])
    
    return (

        <>
            <Row>
                <Col span={24}>
                    <DescriptionItem title="Full Name" content={user.name} />
                </Col>
                <Divider />
                <Col span={24}>
                    <DescriptionItem title="Email" content={user.email} />
                </Col>
                <Divider />
                <Col span={24}>
                    <DescriptionItem title="English level" content={user.english_level} />
                </Col>
                <Divider />
                <Col span={24}>
                    <DescriptionItem title="Resume Link" content={user.resume} />
                </Col>
            </Row>
            <Divider />
            <Row>
                <Col span={24}>
                    <DescriptionItem title="Skills" content={user.skills} />
                </Col>
            </Row>
            <Divider />
        </>

    );
};

export default DrawerDetailUser