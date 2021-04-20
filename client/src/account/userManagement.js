import {Button, Card, CardBody, CardHeader, Col, Row} from "shards-react";
import Profile from "./profile";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import UserRow from "./userRow";
import {List} from "react-content-loader";
import * as apiCalls from "../apiCalls";
import {saveOpeningProfileTab} from "../redux/actions";


export default function UserManagement() {
    const loggedUser = useSelector(store => store.user.loggedUser);
    const [isFirstLoading, setIsFirstLoading] = useState(true);
    const [isTriggerReload, setIsTriggerReload] = useState(true);
    const [userAccounts, setUserAccounts] = useState([]);
    const openingProfileTab = useSelector(store => store.newUser.openingProfileTab);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isTriggerReload) {
            apiCalls.fetchUsers(users => {
                setIsFirstLoading(false);
                setIsTriggerReload(!isTriggerReload);
                let filteredUsers = [];
                users.map(u => {
                    if (u.email !== 'admin@eprints.vnu.edu.vn' && u.email !== loggedUser.email) { /* ignore super admin and the current user */
                        filteredUsers.push(u);
                    }
                })
                setUserAccounts(filteredUsers);
            }, (message) => {
                alert(message);
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
                            <Col md={8}>
                                <Row>
                                    <h5 style={{marginTop: 10, marginLeft: 10, marginRight: 30}}><i className='fa fa-users'/>&nbsp;&nbsp; Registered users
                                        {loggedUser.divisions.length === 1 ? ' in the ' + loggedUser.divisions[0] : ' in all departments'}
                                    </h5>
                                </Row>
                            </Col>
                            <Col md={4}>
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
            {openingProfileTab ? <Col md={5}><Card><Profile title={'Add new user'} triggerReload={() => setIsTriggerReload(!isTriggerReload)}/></Card></Col> : ''}
        </Row>
    );
}

