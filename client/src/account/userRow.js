import {useState} from 'react';
import {Badge, Col, Row} from "shards-react";
import * as apiCalls from "../apiCalls";
import {useDispatch, useSelector} from "react-redux";
import {ClipLoader} from "react-spinners";
import {saveAddress, saveDepartment, saveEmail, saveFamilyName, saveGivenName, saveIsAdmin, saveOpeningProfileTab, saveUserDescription} from "../redux/actions";

export default function UserRow({triggerReload, givenName, familyName, email, isAdmin, department}) {
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
                    <div style={{marginLeft: 20, marginRight: 20}} onClick={() => {
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
                    }>{isViewing ? <ClipLoader size={18} color={'#5a6169'} loading/> : <i style={{fontSize: 20}} className='fa fa-edit'/>}
                    </div>
                    <div onClick={() => {
                        if (!isDeleting) {
                            setIsDeleting(true);
                            apiCalls.deleteUser({email: email}, () => {
                                setIsDeleting(false);
                                triggerReload();
                            }, (message) => {
                                setIsDeleting(false);
                                console.log(message);
                            })
                        }
                    }}>{isDeleting ? <ClipLoader size={18} color={'#5a6169'} loading/> : <i style={{fontSize: 20}} className='fa fa-trash'/>}
                    </div>
                </Row>
            </Col>
        </Row>
    )
};

