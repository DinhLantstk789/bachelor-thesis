import {Fragment, useEffect} from 'react';
import {Col, Row} from "shards-react";
import { saveGivenName, setUserDashboardState} from "../redux/actions";
import * as apiCalls from "../apiCalls";
import {useDispatch, useSelector} from "react-redux";


export default function UserRow({givenName, familyName, email,reload}) {
    const {loggedUser,dashboardState} = useSelector(store =>({
        loggedUser:store.user.loggedUser,
        dashboardState:store.user.dashboardState
    }))
 const dispatch = useDispatch();
    return (
        <Fragment>
            <Row>
                <Col md={8}>
                    <Row style={{marginLeft: 0}}>
                        <h6>{givenName}&nbsp;{familyName}</h6>
                    </Row>
                    <Row style={{marginLeft: 0, marginTop: -10}}>
                        <p style={{fontSize: 14}}>{email}</p>
                    </Row>
                </Col>
                <Col md={4}>
                    <Row className='float-right' style={{marginRight: 10, marginTop: 13}}>
                        <i style={{fontSize: 20, marginLeft: 20}} className='fa fa-edit' onClick={()=>{
                            dispatch(setUserDashboardState(true));
                            console.log(dashboardState)
                            apiCalls.fetchFullyUserData({email:email}, (userData) => {
                                dispatch(saveGivenName(userData[0].givenName))
                                dispatch(saveGivenName(userData[0].familyName))
                                dispatch(saveGivenName(userData[0].email))
                                dispatch(saveGivenName(userData[0].address))
                                dispatch(saveGivenName(userData[0].department))
                                dispatch(saveGivenName(userData[0].role))
                                dispatch(saveGivenName(userData[0].userDescription))
                            }, (message) => {
                                console.log(message);
                            });

                         }
                        }/>
                        <i style={{fontSize: 20, marginLeft: 20, marginRight: 20}} className='fa fa-trash' onClick={()=>{

                                apiCalls.deleteUser({email: email}, () => {
                                    console.log('thu suong 123');
                                    reload();
                                }, (message) => {
                                    console.log(message);
                                })
                        }}/>
                    </Row>
                </Col>
            </Row>
        </Fragment>
    )
};

