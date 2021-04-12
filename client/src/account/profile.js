import {Button, Card, CardBody, CardHeader, Col, FormInput, FormSelect, FormTextarea, Row} from "shards-react";
import {saveAddress, saveDepartment, saveEmail, saveFamilyName, saveGivenName, saveRole, saveUserDescription} from "../redux/actions";
import {connect, useDispatch, useSelector} from "react-redux";
import axios from "axios";


export default function Profile() {
    const {givenName,familyName,email,department,role,address,userDescription} = useSelector (store =>({
        givenName: store.user.givenName,
        familyName: store.user.familyName,
        email: store.user.email,
        department: store.user.department,
        role: store.user.role,
        address: store.user.address,
        userDescription: store.user.userDescription
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
                                    dispatch(saveGivenName(e.target.value))
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
                            <option value="isDivisionAdmin">Admin of division</option>
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
                                    role: role,
                                    userDescription: userDescription
                                }
                                axios.post('http://localhost:1234/users/addUser', body).then(res => {
                                    let status = res.data.status;
                                    if (status === 200) {
                                        console.log(res.data.message);
                                    } else {
                                        console.log('error:', res.data.message)
                                    }
                                })
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
