import {Button, Card, CardBody, CardHeader, Col, Row} from "shards-react";
import Profile from "./profile";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import UserRow from "./userRow";
import {List} from "react-content-loader";
import * as apiCalls from "../apiCalls";
import {saveOpeningProfileTab} from "../redux/actions";


export default function UserManagement() {
    const [isFirstLoading, setIsFirstLoading] = useState(true);
    const [isTriggerReload, setIsTriggerReload] = useState(true);
    const [userAccounts, setUserAccounts] = useState([]);
    const openingProfileTab = useSelector(store => store.newUser.openingProfileTab);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isFirstLoading) {
            apiCalls.fetchUsers(users => {
                setIsFirstLoading(false);
                setUserAccounts(users);
            }, (message) => {
                console.log(message);
            })
        }
    }, []);

    useEffect(() => {
        if (isTriggerReload) {
            apiCalls.fetchUsers(users => {
                setIsTriggerReload(!isTriggerReload);
                setUserAccounts(users);
            }, (message) => {
                console.log(message);
            })
        }
    }, [isTriggerReload]);

    let loading = <div>
        <List/>
        <List style={{marginTop: 20}}/>
    </div>
    return (
        <Row style={{marginRight: 50, marginLeft: 50}}>
            <Col md={openingProfileTab ? 7 : 12}>
                <Card>
                    <CardHeader>
                        <Row>
                            <Col>
                                <Row>
                                    <h5 style={{marginTop: 10, marginLeft: 10, marginRight: 30}}><i className='fa fa-users'/>&nbsp;&nbsp; Registered Users</h5>
                                </Row>
                            </Col>
                            <Col>
                                <Row className='float-right'>
                                    <Button pill theme="success" style={{marginRight: 10}} onClick={() => dispatch(saveOpeningProfileTab(true))}>
                                        New user &nbsp;<i className='fa fa-plus'/>
                                    </Button>
                                </Row>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        {isFirstLoading ? loading : userAccounts.map(item => (
                            <UserRow triggerReload={() => setIsTriggerReload(!isTriggerReload)} givenName={item.givenName} familyName={item.familyName} email={item.email} isAdmin={item.isAdmin} department={item.department}/>
                        ))}
                    </CardBody>
                </Card>
            </Col>
            {openingProfileTab ? <Col md={5}><Card><Profile triggerReload={() => setIsTriggerReload(!isTriggerReload)}/></Card></Col> : ''}
        </Row>
    );
}

