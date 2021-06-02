import React, {Fragment, useEffect, useState} from 'react';
import {Alert, Button, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, ModalHeader, Row} from "shards-react";
import Footer from "./footer";
import Publications from "./tabs/publications";
import Statistics from "./tabs/statistics";
import Profile from "./profile";
import {useDispatch, useSelector} from "react-redux";
import Management from "./tabs/management";
import {fetchPublication, logout} from "./utils/apiCalls";
import {resetImpactScore, resetPublication, resetPublicationFilter, resetUserInformation, saveHomeYearsRange, saveImpactScoreSearchPublicationContent, saveLoggedUser, saveOpeningProfileTab, saveSearchPublicationContent, saveWindowHeight, setDashboardState} from "./redux/actions";
import {ClipLoader} from "react-spinners";
import Filter from "./publication/filter";
import ResearchHours from "./tabs/researchHours";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

export default function Home() {
    const [currentTab, setCurrentTab] = useState('publication-main');
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [profileDetailsOpen, setProfileDetailsOpen] = useState(false);
    const loggedUser = useSelector(store => store.user.loggedUser);
    const isAddingPublication = useSelector(store => store.publication.isAddingPublication);
    const statisticsByYears = useSelector(store => store.publication.statisticsByYears);
    const dispatch = useDispatch();

    const clearData = () => {
        dispatch(setDashboardState(false));
        dispatch(saveImpactScoreSearchPublicationContent(''));
        dispatch(saveSearchPublicationContent(''));
        dispatch(resetImpactScore());
    }

    const handleResize = () => {
        dispatch(saveWindowHeight(window.innerHeight - 50));
    }
    useEffect(() => {
        window.addEventListener('resize', () => handleResize());
        return () => handleResize();
    });

    useEffect(() => {
        fetchPublication({}, (pubs) => {
            let minYear = 3000, maxYear = 0;
            pubs.forEach(p => {
                const y = parseInt(p.selectedDate.split('-')[0]);
                minYear = y < minYear ? y : minYear;
                maxYear = y > maxYear ? y : maxYear;
            });
            let yr = [];
            for (let i = minYear; i <= maxYear; i++) yr.push(i);
            console.log(yr);
            dispatch(saveHomeYearsRange(yr))
        }, (message) => alert(message));
    }, []);


    return (
        <Fragment>
            <Modal open={profileDetailsOpen} toggle={() => setProfileDetailsOpen(!profileDetailsOpen)}>
                <ModalHeader>
                    <Row style={{marginLeft: 0, marginRight: 0}}>Your profile</Row>
                </ModalHeader>
                <ModalBody>
                    <Profile triggerReload={() => {
                    }}/>
                </ModalBody>
            </Modal>
            <Alert id="menuNav">
                <Row style={{padding: 10}}>
                    <Col xs={3} md={3} sm={3}><img bottom src="./images/logo.png" style={{width: 170, marginTop: 5, marginLeft: 50}}/></Col>
                    <Col xs={9} md={9} sm={9}>
                        <Row className="float-right">
                            <Button style={{marginLeft: 10, marginRight: 7}} theme={currentTab === 'publication-main' ? 'primary' : 'light'} pill onClick={() => {
                                setCurrentTab('publication-main');
                                clearData();
                            }}><i className="fas fa-microscope"/> &nbsp; Công bố khoa học</Button>
                            <Button style={{marginLeft: 7, marginRight: 7}} theme={currentTab === 'statistics' ? 'primary' : 'light'} pill onClick={() => {
                                setCurrentTab('statistics');
                                clearData();
                            }}><i className="fas fa-chart-pie"/> &nbsp; Thống kê</Button>
                            <Button style={{marginLeft: 7, marginRight: 7}} theme={currentTab === 'research-hour' ? 'primary' : 'light'} pill onClick={() => {
                                setCurrentTab('research-hour');
                                clearData();
                            }}><i className="fas fa-star"/> &nbsp; Giờ nghiên cứu</Button>
                            {loggedUser.isAdmin ?
                                <Button style={{marginLeft: 7, marginRight: 7}} theme={currentTab === 'user-management' ? 'primary' : 'light'} pill onClick={() => {
                                    setCurrentTab('user-management');
                                    clearData();
                                }}><i className="fas fa-users"/> &nbsp; Quản lý người dùng</Button> : ''}
                            <Button style={{marginLeft: 7, marginRight: 7}} theme='light' pill onClick={() => {
                                setProfileDetailsOpen(true);
                                dispatch(saveOpeningProfileTab('Your profile'));
                            }}><i className="fas fa-user"/> &nbsp;{loggedUser.givenName + ' ' + loggedUser.familyName}</Button>
                            <div style={{marginTop: 10, marginLeft: 10, marginRight: 10}}>
                                {isLoggingOut ? <ClipLoader size={20} color={'#157ffb'} loading/> : <i style={{fontSize: 20, cursor: 'pointer', color: '#157ffb'}} className="fas fa-sign-out-alt" onClick={() => {
                                    setIsLoggingOut(true);
                                    logout(successMessage => {
                                        setIsLoggingOut(false);
                                        dispatch(saveLoggedUser(null));
                                        dispatch(resetPublicationFilter(loggedUser.divisions));
                                        dispatch(resetUserInformation());
                                        dispatch(resetPublication());
                                        clearData();
                                    }, (errorMessage) => alert(errorMessage));
                                }}/>}
                            </div>
                        </Row>
                    </Col>
                </Row>
            </Alert>
            {currentTab === 'user-management' ? <Management/> : currentTab === 'research-hour' ? <ResearchHours/> : currentTab === 'statistics' ? <Statistics/> :
                <Row style={{marginLeft: 20}}>
                    <Col md={8}><Publications/></Col>
                    <Col md={4}>
                        <div>
                            <div style={{marginRight: 50, marginBottom: 20}}>
                                <h6 style={{textAlign: 'center', marginLeft: 40}}>Tổng quan số lượng công bố khoa học qua các năm</h6>
                                {statisticsByYears === null ? <div style={{height: 250, textAlign: 'center', padding: 70}}><ClipLoader size={60} color={'#157ffb'} loading/></div> :
                                    <ResponsiveContainer width='100%' height={225}>
                                        <LineChart data={statisticsByYears}>
                                            <CartesianGrid strokeDasharray="3 3"/>
                                            <XAxis dataKey="name" padding={{left: 20, right: 20}}/>
                                            <YAxis/>
                                            <Tooltip/>
                                            <Line type="monotone" dataKey="publications" stroke="#8884d8" activeDot={{r: 5}}/>
                                        </LineChart>
                                    </ResponsiveContainer>
                                }
                            </div>
                            {isAddingPublication ? '' : <Filter/>}
                        </div>
                    </Col>
                </Row>
            }
            <Footer institute={'Đại học Công Nghệ, Đại học quốc gia Hà Nội'}/>
        </Fragment>
    )
}