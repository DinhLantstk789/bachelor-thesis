import React, {useState} from 'react';
import {Badge, Col, Row} from "shards-react";
import * as apiCalls from "../utils/apiCalls";
import {useDispatch} from "react-redux";
import {ClipLoader} from "react-spinners";
import {
    saveAddress,
    saveDepartment,
    saveEmail,
    saveFamilyName,
    saveGivenName,
    saveImpactScoreOpeningPublicationDetails,
    saveImpactScoreOpeningUserEmail,
    saveImpactScoreOpeningUserName,
    saveImpactScoreOpeningUserScore,
    saveImpactScoreTriggerReloadAllPublication,
    saveIsAdmin,
    saveOpeningProfileTab,
    saveUserDescription
} from "../redux/actions";

export default function UserRow({triggerReload, impactScore, givenName, familyName, email, isAdmin, department}) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isViewing, setIsViewing] = useState(false);
    const dispatch = useDispatch();
    return (
        <Row>
            <Col md={8}>
                <Row style={{marginLeft: 0}}>
                    <h6>{isAdmin ? <Badge theme="secondary" pill style={{marginRight: 10}}>Admin</Badge> : ''}{givenName}&nbsp;{familyName}</h6>
                </Row>
                <Row style={{marginLeft: 0, marginTop: -10}}>
                    <p style={{fontSize: 14}}>{email}, {department}</p>
                </Row>
            </Col>
            <Col md={4}>
                <Row className='float-right' style={{marginRight: 10, marginTop: 13}}>
                    {impactScore ?
                        <div style={{textAlign: 'center', marginTop: -10, cursor: 'pointer'}} onClick={() => {
                            dispatch(saveImpactScoreOpeningPublicationDetails(true));
                            dispatch(saveImpactScoreOpeningUserEmail(email));
                            dispatch(saveImpactScoreOpeningUserScore(impactScore));
                            dispatch(saveImpactScoreOpeningUserName(givenName + ' ' + familyName));
                            dispatch(saveImpactScoreTriggerReloadAllPublication(true));
                        }}>Total Score &nbsp;&nbsp;<label style={{fontSize: 23}}><Badge theme='primary' href="#" pill>{impactScore}</Badge></label>
                        </div> : <div>
                            <span style={{marginLeft: 20, marginRight: 20}} onClick={() => {
                                if (!isViewing) {
                                    setIsViewing(true);
                                    apiCalls.fetchFullyUserData({email: email}, (u) => {
                                        dispatch(saveEmail(u[0].email));
                                        dispatch(saveGivenName(u[0].givenName));
                                        dispatch(saveFamilyName(u[0].familyName));
                                        dispatch(saveAddress(u[0].address));
                                        dispatch(saveIsAdmin(u[0].isAdmin));
                                        dispatch(saveDepartment(u[0].department));
                                        dispatch(saveUserDescription(u[0].userDescription));
                                        setIsViewing(false);
                                        dispatch(saveOpeningProfileTab(true));
                                    }, (message) => {
                                        alert(message);
                                    });
                                }
                            }
                            }>{isViewing ? <ClipLoader size={18} color={'#5a6169'} loading/> : <i style={{fontSize: 20, cursor: 'pointer'}} className='fa fa-edit'/>}
                            </span>
                            <span onClick={() => {
                                if (!isDeleting) {
                                    setIsDeleting(true);
                                    apiCalls.deleteUser({email: email}, () => {
                                        setIsDeleting(false);
                                        triggerReload();
                                    }, (message) => {
                                        setIsDeleting(false);
                                        alert(message);
                                    })
                                }
                            }}>{isDeleting ? <ClipLoader size={18} color={'#5a6169'} loading/> : <i style={{fontSize: 20, cursor: 'pointer'}} className='fa fa-trash'/>}
                            </span>
                        </div>}
                </Row>
            </Col>
        </Row>
    )
};

