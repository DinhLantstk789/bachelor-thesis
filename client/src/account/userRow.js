import {Fragment, useState} from 'react';
import {Col, Row} from "shards-react";
import * as apiCalls from "../apiCalls";
import {useDispatch, useSelector} from "react-redux";
import {ClipLoader} from "react-spinners";

export default function UserRow({triggerReload, givenName, familyName, email}) {
    const [isDeleting, setIsDeleting] = useState(false);
    const {loggedUser, dashboardState} = useSelector(store => ({
        loggedUser: store.user.loggedUser,
        dashboardState: store.user.dashboardState
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
                        {/*<i style={{fontSize: 20, marginLeft: 20}} className='fa fa-edit' onClick={()=>{*/}
                        {/*    dispatch(setUserDashboardState(true));*/}
                        {/*    apiCalls.fetchFullyUserData({email:email}, (userData) => {*/}
                        {/*        dispatch(saveGivenName(userData[0].givenName))*/}
                        {/*        dispatch(saveGivenName(userData[0].familyName))*/}
                        {/*        dispatch(saveGivenName(userData[0].email))*/}
                        {/*        dispatch(saveGivenName(userData[0].address))*/}
                        {/*        dispatch(saveGivenName(userData[0].department))*/}
                        {/*        dispatch(saveGivenName(userData[0].role))*/}
                        {/*        dispatch(saveGivenName(userData[0].userDescription))*/}
                        {/*        console.log(userData[0].givenName,userData[0].familyName,userData[0].email,userData[0].userDescription);*/}
                        {/*    }, (message) => {*/}
                        {/*        console.log(message);*/}
                        {/*    });*/}
                        {/* }*/}
                        {/*}/>*/}
                        <div onClick={() => {
                            setIsDeleting(true);
                            apiCalls.deleteUser({email: email}, () => {
                                setIsDeleting(false);
                                triggerReload();
                            }, (message) => {
                                setIsDeleting(false);
                                console.log(message);
                            })
                        }}>
                            {isDeleting ? <ClipLoader size={18} color={'#157ffb'} loading/> : <i style={{fontSize: 20}} className='fa fa-trash'/>}
                        </div>
                    </Row>
                </Col>
            </Row>
        </Fragment>
    )
};

