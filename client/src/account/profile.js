import {Button, Card, CardBody, CardHeader, Col, FormInput, FormSelect, FormTextarea, Row} from "shards-react";
import {resetUserInformation, saveAddress, saveDepartment, saveEmail, saveFamilyName, saveGivenName, savePassword, saveRole, saveUserDescription, setUserDashboardState} from "../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import * as apiCalls from "../apiCalls";


export default function Profile() {
    const {givenName, familyName, email, department, role, address, userDescription, dashboardState, password} = useSelector(store => ({
        givenName: store.user.givenName,
        familyName: store.user.familyName,
        email: store.user.email,
        department: store.user.department,
        role: store.user.role,
        address: store.user.address,
        userDescription: store.user.userDescription,
        dashboardState: store.user.dashboardState,
        password: store.user.password
    }))
    const dispatch = useDispatch();

    return (
        <Card>
            <CardHeader>
                <h5 style={{marginTop: 10, marginLeft: 10, marginRight: 30}}>My Profile</h5>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col sm={4} md={4} id="setVerticalLine">
                        <div>
                            <img src="./images/avatar.png" style={{width: 200, display: 'block', marginLeft: 'auto', marginRight: 'auto'}}/>
                            <span style={{width: 200, display: 'block', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center', marginTop: 10}}>tstk789@gmail.com</span>
                        </div>
                    </Col>
                    <Col sm={8} md={8} style={{paddingRight: 100, paddingLeft: 50}}>
                        <Row>
                            <Col style={{marginRight: -10}}>
                                <FormInput placeholder="Given Name" value={givenName} onChange={(e) => {
                                    dispatch(saveGivenName(e.target.value));
                                }} style={{marginTop: 10}}/>
                            </Col>
                            <Col style={{marginLeft: -10}}>
                                <FormInput placeholder="Family Name" value={familyName} onChange={(e) => {
                                    dispatch(saveFamilyName(e.target.value))
                                }} style={{marginTop: 10}}/>
                            </Col>
                        </Row>
                        <FormInput placeholder="Email" value={email} onChange={(e) => {
                            dispatch(saveEmail(e.target.value))
                        }} style={{marginTop: 10}}/>
                        <FormInput placeholder="Password" value={password} onChange={(e) => {
                            dispatch(savePassword(e.target.value))
                        }} style={{marginTop: 10}}/>
                        <FormInput placeholder="Address" value={address} onChange={(e) => {
                            dispatch(saveAddress(e.target.value))
                        }} style={{marginTop: 10}}/>
                        <FormInput placeholder="Department" style={{marginTop: 10}} value={department} onChange={(e) => {
                            dispatch(saveDepartment(e.target.value))
                        }}/>
                        <FormSelect style={{marginTop: 10}} onChange={(e) => {
                            dispatch(saveRole(e.target.value))
                        }}>
                            <option value="isUser"> User</option>
                            <option value="Advanced Institute of Engineering and Technology (AVITECH)">Admin of Advanced Institute of Engineering and Technology (AVITECH)</option>
                            <option value="Department of Civil Engineering and Transportation (CET)">Admin of Department of Civil Engineering and Transportation (CET)</option>
                            <option value="Center for Electronics and Telecommunications Research (CETR)">Admin of Center for Electronics and Telecommunications Research (CETR)</option>
                            <option value="Faculty of Agriculture Technology (FAT)">Admin of Faculty of Agriculture Technology (FAT)</option>
                            <option value="Faculty of Electronics and Telecommunications (FET)">Admin of Faculty of Electronics and Telecommunications (FET)</option>
                            <option value="Faculty of Engineering Mechanics and Automation (FEMA)">Admin of Faculty of Engineering Mechanics and Automation (FEMA)</option>
                            <option value="Faculty of Engineering Physics and Nanotechnology (FEPN)">Admin of Faculty of Engineering Physics and Nanotechnology (FEPN)</option>
                            <option value="Faculty of Information Technology (FIT)">Admin of Faculty of Information Technology (FIT)</option>
                            <option value="Key Laboratory for Nanotechnology (Nano Lab)">Admin of Key Laboratory for Nanotechnology (Nano Lab)</option>
                            <option value="School of Aerospace Engineering (SAE)">Admin of School of Aerospace Engineering (SAE)</option>
                            <option value="Key Laboratory for Smart Integrated Systems (SISLAB)">Admin of Key Laboratory for Smart Integrated Systems (SISLAB)</option>
                        </FormSelect>
                        <FormTextarea placeholder="About" value={userDescription} onChange={(e) => {
                            dispatch(saveUserDescription(e.target.value))
                        }} style={{marginTop: 10}}/>
                        <Row className='float-right' style={{marginTop: 10}}>
                            <Button pill theme="success" style={{marginRight: 10}} onClick={() => {
                                const body = {
                                    givenName: givenName,
                                    familyName: familyName,
                                    email: email,
                                    address: address,
                                    department: department,
                                    password:password,
                                    role: role,
                                    userDescription: userDescription
                                }
                                apiCalls.addUser(body, (email) => {
                                    console.log(email);
                                    dispatch(setUserDashboardState(false));
                                    // dispatch(resetUserInformation());
                                }, (message) => {
                                    console.log(message);
                                });
                            }
                            }>
                                Add
                            </Button>
                        </Row>
                    </Col>
                </Row>
            </CardBody>
        </Card>

    );
}
