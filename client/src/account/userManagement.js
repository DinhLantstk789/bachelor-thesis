import {Button, Card, CardBody, CardHeader, Col, Row} from "shards-react";
import Profile from "./profile";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import UserRow from "./userRow";
import {List} from "react-content-loader";
import * as apiCalls from "../apiCalls";


export default function UserManagement() {
    const [isLoading, setIsLoading] = useState(true);
    const [userAccounts, setUserAccounts] = useState([]);
    const loggedUser = useSelector(store => store.user.loggedUser);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isLoading) {
            apiCalls.fetchUsers(users => {
                setUserAccounts(users);
                setIsLoading(false);
                console.log(users);
            }, (message) => {
                console.log(message);
            })
        }
    }, [isLoading]);

    let loading = <div>
        <List/>
        <List style={{marginTop: 20}}/>
    </div>
    return (
        <Row style={{marginRight: 50, marginLeft: 50, marginBottom: 50}}>
            <Col md={7}>
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
                                    <Button pill theme="success" style={{marginRight: 10}} onClick={() => {
                                        console.log(userAccounts);
                                    }}>
                                        New &nbsp;<i className='fa fa-plus'/>
                                    </Button>
                                </Row>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        {isLoading ? loading : userAccounts.map(item => (<UserRow triggerReload={() => setIsLoading(true)} givenName={item.givenName} familyName={item.familyName} email={item.email}/>))}
                    </CardBody>
                </Card>
            </Col>
            <Col md={5}>
                <Card><Profile triggerReload={() => setIsLoading(true)}/></Card>
            </Col>
        </Row>
    );
}

