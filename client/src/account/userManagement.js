import {Button, Card, CardBody, CardHeader, Col, Row} from "shards-react";
import Profile from "./profile";
import {useEffect, useState} from "react";
import axios from "axios";
import {useSelector} from "react-redux";
import UserRow from "./userRow";


export default function UserManagement() {
    const [isLoading, setIsLoading] = useState(true);
    const [userList, setUsers] = useState([]);
    const loggedUser = useSelector(store => store.user.loggedUser);

    useEffect(() => {
        axios.post('http://localhost:1234/users/fetchUser', {accessToken: loggedUser.accessToken}).then(res => {
            let status = res.data.status;
            if (status === 200) {
                setIsLoading(false);
                setUsers(res.data.userList);
                console.log(userList);
            } else {
                console.log('error:', res.data.message)
            }
        })
    }, [isLoading])

    return (
        <Card style={{marginRight: 100, marginLeft: 100}}>
            <CardBody>
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <Row>
                                    <Col>
                                        <Row>
                                            <h5 style={{marginTop: 10, marginLeft: 10, marginRight: 30}}>User List</h5>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <Row className='float-right'>
                                            <Button pill theme="success" style={{marginRight: 10}}>
                                                New &nbsp;<i className='fa fa-plus'/>
                                            </Button>
                                        </Row>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                {userList.map(item => (
                                    <UserRow givenName={item.givenName} familyName={item.familyName} email={item.email}/>
                                ))}
                            </CardBody>
                        </Card>

                    </Col>
                    <Col>
                        <Card>
                            <Profile/>
                        </Card>
                    </Col>
                </Row>

            </CardBody>
        </Card>

    );
}

