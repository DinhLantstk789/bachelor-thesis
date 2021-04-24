import {Button, Col, FormInput, FormSelect, FormTextarea, Row} from "shards-react";
import {resetUserInformation, saveAcademicTitle, saveAddress, saveDepartment, saveEmail, saveFamilyName, saveGivenName, saveIsAdmin, saveManagerTitle, saveOpeningProfileTab, savePassword, saveUnionTitle, saveUserDescription} from "./redux/actions";
import {useDispatch, useSelector} from "react-redux";
import * as apiCalls from "./utils/apiCalls";
import {sha256} from "js-sha256";
import {useEffect, useState} from 'react'
import {ClipLoader} from "react-spinners";

export default function Profile({title, triggerReload}) {
    const loggedUser = useSelector(store => store.user.loggedUser);
    const {givenName, familyName, email, department, isAdmin, address, description, password, academicTitle, managerTitle, unionTitle} = useSelector(store => ({
        givenName: store.newUser.givenName,
        familyName: store.newUser.familyName,
        email: store.newUser.email,
        department: store.newUser.department,
        isAdmin: store.newUser.isAdmin,
        address: store.newUser.address,
        description: store.newUser.userDescription,
        password: store.newUser.password,
        academicTitle: store.newUser.academicTitle,
        managerTitle: store.newUser.managerTitle,
        unionTitle: store.newUser.unionTitle
    }))
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();


    const academicTitleToRequiredWorkingHours = {
        'None': 600, 'Professor.': 850, 'Associate Professor.': 750, 'Dr.': 700
    }
    const managerToExemption = {
        'None': 1, 'Rector': 0.15, 'Vice Rector': 0.2, 'Manager': 0.25, 'Vice Manager': 0.3, 'Head of Department': 0.7,
        'Deputy Head of Department': 0.75, 'Subject Manager': 0.8, 'Deputy Subject Manager': 0.85
    }

    const unionTitleToExemption = {
        'None': 1, 'Party Secretary': 0.15, 'Deputy Party Secretary': 0.3, 'Secretary': 0.85, 'Deputy Secretary': 0.9, 'Secretary of Youth Union': 0.5,
        'Deputy Secretary of Youth Union': 0.6, 'Student Union President': 0.6, 'Student Union Vice President': 0.7
    }

    const isProfileViewing = () => { /* viewing profile or adding users? */
        return title === 'Your profile';
    }

    useEffect(() => {
        if (isProfileViewing()) {
            dispatch(saveGivenName(loggedUser.givenName));
            dispatch(saveFamilyName(loggedUser.familyName));
            dispatch(saveEmail(loggedUser.email));
            dispatch(saveDepartment(loggedUser.divisions[0]));
            dispatch(saveIsAdmin(loggedUser.isAdmin));
            dispatch(saveAddress(loggedUser.address));
            dispatch(saveUserDescription(loggedUser.description));
            dispatch(saveAcademicTitle(loggedUser.academicTitle));
            dispatch(saveManagerTitle(loggedUser.managerTitle));
            dispatch(saveUnionTitle(loggedUser.unionTitle));
        }
    }, [])

    return (
        <div>
            {isProfileViewing() ? '' :
                <Row style={{marginBottom: 20}}>
                    <Col>
                        <h5 style={{marginTop: 10, marginRight: 30}}>{title}</h5>
                    </Col>
                    <Col>
                        <div className='float-right'>
                            <i style={{fontSize: 25, marginTop: 10, cursor: 'pointer'}} className='fa fa-times' onClick={() => {
                                dispatch(saveOpeningProfileTab(false));
                                dispatch(resetUserInformation());
                            }}/>
                        </div>
                    </Col>
                </Row>
            }
            <Row>
                <Col md={3}>
                    <img src="./images/avatar.png" style={{width: 90}}/>
                </Col>
                <Col md={9} style={{marginBottom: 10}}>
                    <Row style={{marginLeft: -10, marginRight: 0, marginBottom: 10}}>
                        <FormSelect value={academicTitle} onChange={(e) => dispatch(saveAcademicTitle(e.target.value))}>
                            {Object.keys(academicTitleToRequiredWorkingHours).map(d => <option value={d}>{d}</option>)}
                        </FormSelect>
                    </Row>
                    <Row>
                        <Col style={{marginLeft: -10, marginRight: -10}}>
                            <FormInput placeholder="Given Name" value={givenName} onChange={(e) => dispatch(saveGivenName(e.target.value))}/>
                        </Col>
                        <Col style={{marginLeft: -10, marginRight: 0}}>
                            <FormInput placeholder="Family Name" type='email' value={familyName} onChange={(e) => dispatch(saveFamilyName(e.target.value))}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormInput placeholder="Email" value={email} onChange={(e) => dispatch(saveEmail(e.target.value))} style={{marginTop: 10}}/>
                    <FormInput placeholder="Password" type='password' value={password} onChange={(e) => dispatch(savePassword(e.target.value))} style={{marginTop: 10}}/>
                    <Row>
                        <Col style={{marginLeft: 0, marginRight: -10}}>
                            <FormSelect value={managerTitle} style={{marginTop: 10}} onChange={(e) => dispatch(saveManagerTitle(e.target.value))}>
                                {Object.keys(managerToExemption).map(d => <option value={d}>{d}</option>)}
                            </FormSelect>
                        </Col>
                        <Col style={{marginLeft: -10, marginRight: 0}}>
                            <FormSelect value={unionTitle} style={{marginTop: 10}} onChange={(e) => dispatch(saveUnionTitle(e.target.value))}>
                                {Object.keys(unionTitleToExemption).map(d => <option value={d}>{d}</option>)}
                            </FormSelect>
                        </Col>
                    </Row>
                    <FormSelect value={isAdmin ? 'admin' : 'user'} style={{marginTop: 10}} onChange={(e) => dispatch(saveIsAdmin(e.target.value === 'admin'))}>
                        <option value="user">Ordinary User</option>
                        {loggedUser.divisions.length === 1 && !loggedUser.isAdmin ? '' : <option value="admin">Administrator</option>}
                    </FormSelect>
                    <FormSelect value={department} style={{marginTop: 10}} onChange={(e) => dispatch(saveDepartment(e.target.value))}>
                        {loggedUser.divisions.map(d => <option value={d}>{d}</option>)}
                    </FormSelect>
                    <FormInput placeholder="Address" value={address} onChange={(e) => dispatch(saveAddress(e.target.value))} style={{marginTop: 10}}/>
                    <FormTextarea placeholder="Description" value={description} onChange={(e) => dispatch(saveUserDescription(e.target.value))} style={{marginTop: 10, height: 100}}/>
                    <div className='float-right' style={{marginTop: 10}}>
                        <Button pill theme={isSubmitting ? 'secondary' : 'success'} onClick={() => {
                            if (!isSubmitting) {
                                const body = {
                                    email: email, familyName: familyName,
                                    givenName: givenName, password: sha256(password),
                                    department: department, address: address,
                                    isAdmin: isAdmin, description: description,
                                    academicTitle: academicTitle, managerTitle: managerTitle, unionTitle: unionTitle,
                                }
                                setIsSubmitting(true);
                                apiCalls.addUser(body, (email) => {
                                    triggerReload();
                                    setIsSubmitting(false);
                                    if (!isProfileViewing()) {
                                        dispatch(resetUserInformation());
                                    }
                                }, (message) => {
                                    alert(message);
                                });
                            }
                        }
                        }>{isProfileViewing() ? 'Update' : 'Submit'} &nbsp;{isSubmitting ? <ClipLoader size={13} color={'#ffffff'} loading/> : <i className='fa fa-arrow-right'/>}</Button>
                    </div>
                </Col>
            </Row>
        </div>
    );
}
