import {Component, Fragment} from 'react';
import {Card, CardBody, CardHeader, Col, Row} from "shards-react";


class Profile extends Component{

    render() {
        return (
                <Card>
                    <CardHeader>
                        <h5 style={{marginTop: 10, marginLeft: 10, marginRight: 30}}>My Profile</h5>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col sm={4} md={4} style={{borderStyle:'solid',borderRightColor:'green'}}>

                                    <h1>hhhhhhhhhhhhhhhhhhhhhhhhh</h1>


                            </Col>
                            <Col sm={8} md={8}>

                            </Col>
                        </Row>
                    </CardBody>
                </Card>

        );
    }
}
export default Profile;