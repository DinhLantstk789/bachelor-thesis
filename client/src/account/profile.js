import {Button, Card, CardBody, CardHeader, Col, FormInput, FormSelect, FormTextarea, Row} from "shards-react";
import {resetUserInformation, saveAddress, saveDepartment, saveEmail, saveFamilyName, saveGivenName, saveIsAdmin, saveOpeningProfileTab, savePassword, saveUserDescription} from "../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import * as apiCalls from "../apiCalls";
import {sha256} from "js-sha256";
import {useState} from 'react'
import {ClipLoader} from "react-spinners";

export default function Profile({title, triggerReload}) {
    const loggedUser = useSelector(store => store.user.loggedUser);
    const {givenName, familyName, email, department, isAdmin, address, description, password} = useSelector(store => ({
        givenName: store.newUser.givenName,
        familyName: store.newUser.familyName,
        email: store.newUser.email,
        department: store.newUser.department,
        isAdmin: store.newUser.isAdmin,
        address: store.newUser.address,
        description: store.newUser.userDescription,
        password: store.newUser.password
    }))
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();
    return (
        <Card>
            <CardHeader>
                <Row>
                    <Col>
                        <h5 style={{marginTop: 10, marginRight: 30}}><i className='fa fa-user'/>&nbsp;&nbsp; {title}</h5>
                    </Col>
                    {!title.includes(loggedUser.familyName + ' ' + loggedUser.givenName) ? <Col>
                        <div className='float-right'>
                            <Button pill theme="light" onClick={() => {
                                dispatch(saveOpeningProfileTab(false));
                                dispatch(resetUserInformation());
                            }}><i className='fa fa-times'/></Button>
                        </div>
                    </Col> : ''}
                </Row>
            </CardHeader>
            <CardBody style={{paddingRight: 50, paddingLeft: 50}}>
                <Row>
                    <Col md={3}>
                        <img src="./images/avatar.png" style={{width: 90}}/>
                    </Col>
                    <Col md={9} style={{marginBottom: 10}}>
                        <Row style={{marginRight: -10}}>
                            <Col style={{marginLeft: -10, marginRight: -10}}>
                                <FormInput placeholder="Given Name" value={givenName} onChange={(e) => dispatch(saveGivenName(e.target.value))}/>
                            </Col>
                            <Col style={{marginLeft: -10, marginRight: -5}}>
                                <FormInput placeholder="Family Name" type='email' value={familyName} onChange={(e) => dispatch(saveFamilyName(e.target.value))}/>
                            </Col>
                        </Row>
                        <Row style={{marginRight: 0, marginLeft: -10}}>
                            <FormInput placeholder="Email" value={email} onChange={(e) => dispatch(saveEmail(e.target.value))} style={{marginTop: 10}}/>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormInput placeholder="Password" type='password' value={password} onChange={(e) => dispatch(savePassword(e.target.value))} style={{marginTop: 10}}/>
                        <FormSelect value={department} style={{marginTop: 10}} onChange={(e) => {
                            dispatch(saveDepartment(e.target.value));
                        }}>
                            {loggedUser.divisions.map(d => <option value={d}>{d}</option>)}
                        </FormSelect>
                        <FormSelect value={isAdmin ? 'admin' : 'user'} style={{marginTop: 10}} onChange={(e) => dispatch(saveIsAdmin(e.target.value === 'admin'))}>
                            <option value="user">Normal User</option>
                            <option value="admin">Administrator</option>
                        </FormSelect>
                        <FormInput placeholder="Address" value={address} onChange={(e) => dispatch(saveAddress(e.target.value))} style={{marginTop: 10}}/>
                        <FormTextarea placeholder="Description" value={description} onChange={(e) => dispatch(saveUserDescription(e.target.value))} style={{marginTop: 10}}/>
                        <div className='float-right' style={{marginTop: 10}}>
                            <Button pill theme={isSubmitting ? 'secondary' : 'success'} onClick={() => {
                                if (!isSubmitting) {
                                    const body = {
                                        email: email,
                                        familyName: familyName,
                                        givenName: givenName,
                                        password: sha256(password),
                                        department: department,
                                        address: address,
                                        isAdmin: isAdmin,
                                        description: description
                                    }
                                    setIsSubmitting(true);
                                    apiCalls.addUser(body, (email) => {
                                        triggerReload();
                                        dispatch(resetUserInformation());
                                        setIsSubmitting(false);
                                    }, (message) => {
                                        alert(message);
                                    });
                                }
                            }
                            }>Submit &nbsp;{isSubmitting ? <ClipLoader size={13} color={'#ffffff'} loading/> : <i className='fa fa-arrow-right'/>}</Button>
                        </div>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}
