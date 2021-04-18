import {Fragment, useState} from 'react';
import {Alert, Button, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row} from "shards-react";
import Footer from "./footer";
import Dashboard from "./dashboard";
import Statistics from "./statistics";
import Profile from "./account/profile";
import {useDispatch, useSelector} from "react-redux";
import UserManagement from "./account/userManagement";
import {logout} from "./apiCalls";
import {saveLoggedUser} from "./redux/actions";
import {ClipLoader} from "react-spinners";

export default function Home() {
    const [viewProfile, setViewProfile] = useState(false);
    const [currentTab, setCurrentTab] = useState('');
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [openAccount, setOpenAccount] = useState(false);
    const loggedUser = useSelector(store => store.user.loggedUser);
    const dispatch = useDispatch();

    return (
        <Fragment>
            <Alert id="menuNav">
                <Row>
                    <Col xs={7} md={7} sm={7}><img bottom src="./images/logo.png" style={{width: 180, marginTop: 8, marginLeft: 50}}/></Col>
                    <Col xs={5} md={5} sm={5}>
                        <Row className="float-right">
                            <Button theme={currentTab === 'publication-main' ? 'primary' : 'light'} pill onClick={() => setCurrentTab('publication-main')}>Publications</Button>
                            {loggedUser.isAdmin ? <Button theme={currentTab === 'user-management' ? 'primary' : 'light'} pill onClick={() => setCurrentTab('user-management')}>User Management</Button> : ''}
                            <Dropdown open={openAccount} toggle={() => setOpenAccount(!openAccount)}>
                                <DropdownToggle theme={currentTab === 'profile' ? 'primary' : 'light'} pill id="dropdown1" style={{fontSize: 20, marginRight: 30}} className="float-right">
                                    {isLoggingOut ? <ClipLoader size={15} color={'#ffffff'} loading/> : <i className={"fa fa-user"}/>}
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem onClick={() => setCurrentTab('profile')}><i className="fas fa-user-circle"/>&nbsp;&nbsp;See your profile</DropdownItem>
                                    <DropdownItem><i className="fas fa-cogs"/>&nbsp;&nbsp;Settings</DropdownItem>
                                    <DropdownItem onClick={() => {
                                        setIsLoggingOut(true);
                                        logout(successMessage => {
                                            setIsLoggingOut(false);
                                            dispatch(saveLoggedUser(null));
                                        }, (errorMessage) => alert(errorMessage));
                                    }}><i className="fas fa-sign-out"/>&nbsp;&nbsp;Log Out</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </Row>
                    </Col>
                </Row>
            </Alert>
            {currentTab === 'user-management' ? <UserManagement/> : currentTab === 'publication-main' ?
                <Row style={{marginLeft: 20}}>
                    <Col md={8}><Dashboard/></Col>
                    <Col md={4}><Statistics/></Col>
                </Row> :
                <Row style={{marginLeft: 20}}>
                    <Col md={8}><Profile/></Col>
                </Row>}
            <Footer/>
        </Fragment>
    )
}