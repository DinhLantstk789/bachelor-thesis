import {Button, Card, CardBody, CardHeader, Col, FormInput, FormSelect, FormTextarea, Row} from "shards-react";
import {resetUserInformation, saveAddress, saveDepartment, saveEmail, saveFamilyName, saveGivenName, saveIsAdmin, savePassword, saveUserDescription} from "../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import * as apiCalls from "../apiCalls";
import {sha256} from "js-sha256";


export default function Profile({triggerReload}) {
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
    const dispatch = useDispatch();

    return (
        <Card>
            <CardHeader>
                <h5 style={{marginTop: 10, marginLeft: 10, marginRight: 30}}>My Profile</h5>
            </CardHeader>
            <CardBody style={{paddingRight: 50, paddingLeft: 50}}>
                <Row>
                    <Col md={3}>
                        <img src="./images/avatar.png" style={{width: 90}}/>
                    </Col>
                    <Col md={9} style={{marginBottom: 10}}>
                        <Row style={{marginRight: 0}}>
                            <FormInput placeholder="Given Name" value={givenName} onChange={(e) => dispatch(saveGivenName(e.target.value))}/>
                            <FormInput placeholder="Family Name" value={familyName} onChange={(e) => dispatch(saveFamilyName(e.target.value))} style={{marginTop: 10}}/>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormInput placeholder="Email" value={email} onChange={(e) => dispatch(saveEmail(e.target.value))} style={{marginTop: 10}}/>
                        <FormInput placeholder="Password" value={password} onChange={(e) => dispatch(savePassword(e.target.value))} style={{marginTop: 10}}/>
                        <FormInput placeholder="Address" value={address} onChange={(e) => dispatch(saveAddress(e.target.value))} style={{marginTop: 10}}/>
                        <FormSelect style={{marginTop: 10}} onChange={(e) => {
                            dispatch(saveDepartment(e.target.value));
                        }}>
                            <option value="Faculty of Information Technology (FIT)">Faculty of Information Technology (FIT)</option>
                            <option value="Advanced Institute of Engineering and Technology (AVITECH)">Advanced Institute of Engineering and Technology (AVITECH)</option>
                            <option value="Department of Civil Engineering and Transportation (CET)">Department of Civil Engineering and Transportation (CET)</option>
                            <option value="Center for Electronics and Telecommunications Research (CETR)">Center for Electronics and Telecommunications Research (CETR)</option>
                            <option value="Faculty of Agriculture Technology (FAT)">Faculty of Agriculture Technology (FAT)</option>
                            <option value="Faculty of Electronics and Telecommunications (FET)">Faculty of Electronics and Telecommunications (FET)</option>
                            <option value="Faculty of Engineering Mechanics and Automation (FEMA)">Faculty of Engineering Mechanics and Automation (FEMA)</option>
                            <option value="Faculty of Engineering Physics and Nanotechnology (FEPN)">Faculty of Engineering Physics and Nanotechnology (FEPN)</option>
                            <option value="Key Laboratory for Nanotechnology (Nano Lab)">Key Laboratory for Nanotechnology (Nano Lab)</option>
                            <option value="School of Aerospace Engineering (SAE)">School of Aerospace Engineering (SAE)</option>
                            <option value="Key Laboratory for Smart Integrated Systems (SISLAB)">Key Laboratory for Smart Integrated Systems (SISLAB)</option>
                        </FormSelect>
                        <FormSelect style={{marginTop: 10}} onChange={(e) => dispatch(saveIsAdmin(e.target.value === 'admin'))}>
                            <option value="user">Normal User</option>
                            <option value="admin">Administrator</option>
                        </FormSelect>
                        <FormTextarea placeholder="About" value={description} onChange={(e) => dispatch(saveUserDescription(e.target.value))} style={{marginTop: 10}}/>
                        <Row className='float-right' style={{marginTop: 10}}>
                            <Button pill theme="success" style={{marginRight: 10}} onClick={() => {
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
                                apiCalls.addUser(body, (email) => {
                                    triggerReload();
                                    dispatch(resetUserInformation());
                                }, (message) => {
                                    alert(message);
                                });
                            }
                            }>Add</Button>
                        </Row>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}
