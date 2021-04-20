import {Fragment, useState} from 'react';
import {Alert, Button, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row} from "shards-react";
import Footer from "./footer";
import Dashboard from "./dashboard";
import Statistics from "./publication/statistics";
import Profile from "./account/profile";
import {useDispatch, useSelector} from "react-redux";
import UserManagement from "./account/userManagement";
import {logout} from "./apiCalls";
import {resetPublication, resetPublicationFilter, resetUserInformation, saveLoggedUser} from "./redux/actions";
import {ClipLoader} from "react-spinners";
import Filter from "./publication/filter";

export default function Home() {
    const [currentTab, setCurrentTab] = useState('publication-main');
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [openAccount, setOpenAccount] = useState(false);
    const loggedUser = useSelector(store => store.user.loggedUser);
    const isAddingPublication = useSelector(store => store.publication.isAddingPublication);
    const dispatch = useDispatch();

    return (
        <Fragment>
            <Alert id="menuNav">
                <Row>
                    <Col xs={7} md={7} sm={7}><img bottom src="./images/logo.png" style={{width: 180, marginTop: 8, marginLeft: 50}}/></Col>
                    <Col xs={5} md={5} sm={5}>
                        <Row className="float-right">
                            <Button style={{marginLeft: 10, marginRight: 5}} theme={currentTab === 'publication-main' ? 'primary' : 'light'} pill onClick={() => setCurrentTab('publication-main')}><i
                                className="fas fa-file-alt"/> &nbsp; Publications</Button>
                            {loggedUser.isAdmin ?
                                <Button style={{marginLeft: 5, marginRight: 5}} theme={currentTab === 'statistics' ? 'primary' : 'light'} pill onClick={() => setCurrentTab('statistics')}><i
                                    className="fas fa-chart-line"/> &nbsp; Statistics</Button> : ''}
                            {loggedUser.isAdmin ?
                                <Button style={{marginLeft: 5, marginRight: 5}} theme={currentTab === 'user-management' ? 'primary' : 'light'} pill onClick={() => setCurrentTab('user-management')}><i className="fas fa-users"/> &nbsp; User Management</Button> : ''}
                            <Dropdown open={openAccount} toggle={() => setOpenAccount(!openAccount)}>
                                <DropdownToggle theme={currentTab === 'profile' ? 'primary' : 'light'} pill id="dropdown1" style={{fontSize: 20, marginRight: 30, marginLeft: 5}} className="float-right">
                                    {isLoggingOut ? <ClipLoader size={15} color={'#ffffff'} loading/> : <i className={"fa fa-user"}/>}
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem onClick={() => setCurrentTab('profile')}><i className="fas fa-user-circle"/>&nbsp;&nbsp;Profile</DropdownItem>
                                    <DropdownItem onClick={() => {
                                        setIsLoggingOut(true);
                                        logout(successMessage => {
                                            setIsLoggingOut(false);
                                            dispatch(saveLoggedUser(null));
                                            dispatch(resetPublicationFilter());
                                            dispatch(resetUserInformation());
                                            dispatch(resetPublication());
                                        }, (errorMessage) => alert(errorMessage));
                                    }}><i className="fas fa-sign-out"/>&nbsp;&nbsp;Logout</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </Row>
                    </Col>
                </Row>
            </Alert>
            {currentTab === 'user-management' ? <UserManagement/> : currentTab === 'statistics' ? <Statistics/> : currentTab === 'publication-main' ?
                <Row style={{marginLeft: 20}}>
                    <Col md={8}><Dashboard/></Col>
                    <Col md={4}>
                        {isAddingPublication ? '' : <Filter/>}
                    </Col>
                </Row> :
                <Row style={{paddingLeft: 50, paddingRight: 50}}>
                    <Col><Profile title={loggedUser.familyName + ' ' + loggedUser.givenName}/></Col>
                </Row>}
            <Footer/>
        </Fragment>
    )
}