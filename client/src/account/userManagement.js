import {Button, Card, CardBody, CardHeader, Col, Row} from "shards-react";
import Profile from "./profile";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import UserRow from "./userRow";
import {List} from "react-content-loader";
import * as apiCalls from "../apiCalls";
import {setUserDashboardState} from "../redux/actions";


export default function UserManagement() {
    const [isLoading, setIsLoading] = useState(true);
    const [userList, setUsers] = useState([]);
    const {loggedUser,dashboardState} = useSelector(store =>({
        loggedUser:store.user.loggedUser,
        dashboardState:store.user.dashboardState
    }))
    const dispatch = useDispatch();

    useEffect(() => {
        apiCalls.fetchUsers({}, (userList) => {
            setIsLoading(false);
            setUsers(userList);
            console.log(userList);
        }, (message) => {
            console.log(message);
        })
    }, [isLoading,dashboardState]);

    let loading = <div>
        <List/>
        <List style={{marginTop: 20}}/>
    </div>
    let result = userList.map(item => (
        <UserRow givenName={item.givenName} familyName={item.familyName} email={item.email} reload={() => setIsLoading(true)}/>
    ))
    return (
        <Row style={{marginRight: 100, marginLeft: 100}}>
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
                                    <Button pill theme="success" style={{marginRight: 10}} onClick={() => {
                                        dispatch(setUserDashboardState(true));
                                    }}>
                                        New &nbsp;<i className='fa fa-plus'/>
                                    </Button>
                                </Row>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        {isLoading ? loading : result}
                    </CardBody>
                </Card>
            </Col>
            <Col>
                {dashboardState ? <Card><Profile/></Card> : ""}
            </Col>
        </Row>
    );
}

