import {Badge, Button, Card, CardBody, CardHeader, Col, FormInput, InputGroup, InputGroupAddon, InputGroupText, Row} from "shards-react";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import UserRow from "../rows/userRow";
import {List} from "react-content-loader";
import * as apiCalls from "../utils/apiCalls";
import {fetchPublication} from "../utils/apiCalls";
import {resetImpactScore, saveImpactScoreOpeningPublicationDetails, saveImpactScoreOpeningUserEmail, saveImpactScoreOpeningUserName, saveImpactScoreOpeningUserResearchHoursThreshold, saveImpactScoreOpeningUserScore, saveImpactScoreOpeningUserThreshold, saveImpactScoreOpeningUserTotalHours, saveImpactScoreSearchPublicationContent, saveImpactScoreTriggerReloadAllPublication, saveImpactScoreUserSelectedYear, saveImpactScoreUserSortBy, saveResearchHoursByYears} from "../redux/actions";
import {academicTitleToRequiredWorkingHours, getResearchHours, managerToExemption, searchUsers, sortUsers, unionTitleToExemption, userSorting} from "../utils/configs";
import {encodeBase64, saveAs} from "@progress/kendo-file-saver";
import {CartesianGrid, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, LineChart} from "recharts";
import {ClipLoader} from "react-spinners";
import PublicationList from "./publicationList";
import YearSelector from "../publication/yearSelector";
import SortingSelector from "../publication/sortingSelector";


export default function ResearchHours() {
    const windowHeight = useSelector(store => store.home.windowHeight);
    const loggedUser = useSelector(store => store.user.loggedUser);
    const [tooltipOverallProgressOpen, setTooltipOverallProgressOpen] = useState(false);

    const [isFirstLoading, setIsFirstLoading] = useState(true);
    const [userAccounts, setUserAccounts] = useState([]);
    const openingPublicationDetails = useSelector(store => store.impactScore.openingPublicationDetails);
    const dispatch = useDispatch();

    const [searchOpen, setSearchOpen] = useState(false);
    const [searchUserContent, setSearchUserContent] = useState('');

    /* publication details */
    const [userCompletedQuotaFilter, setUserCompletedQuotaFilter] = useState(true);
    const [userIncompletedQuotaFilter, setUserIncompletedQuotaFilter] = useState(true);
    const [publicationDetailsSearchOpen, setPublicationDetailsSearchOpen] = useState(false);
    const [publicationDetailsSortingOpen, setPublicationDetailsSortingOpen] = useState(false);
    const [publicationDetailsFilterYearOpen, setPublicationDetailsFilterYearOpen] = useState(false);

    const searchPublicationContent = useSelector(store => store.impactScore.searchPublicationContent);

    const userSortBy = useSelector(store => store.impactScore.userSortBy);
    const publicationDetailsSortBy = useSelector(store => store.impactScore.publicationDetailsSortBy);
    const researchHoursSelectedYear = useSelector(store => store.impactScore.userListSelectedYear);
    const researchHoursStatisticByYear = useSelector(store => store.impactScore.researchHoursByYears);
    const impactScoreOpeningUserName = useSelector(store => store.impactScore.openingUserName);
    const impactScoreOpeningUserThreshold = useSelector(store => store.impactScore.openingUserThreshold);
    const impactScoreOpeningUserTotalHours = useSelector(store => store.impactScore.openingUserTotalHours);
    const impactScoreOpeningUserScore = useSelector(store => store.impactScore.openingUserScore);
    const triggerReloadAllPublication = useSelector(store => store.impactScore.triggerReloadAllPublication);
    const openingUserEmail = useSelector(store => store.impactScore.openingUserEmail);

    const CustomTooltip = ({active, payload, label}) => {
        if (active && payload && payload.length) {
            let currentPoint = null;
            researchHoursStatisticByYear.forEach(d => {
                if (label === d.name) currentPoint = d;
            });
            return (
                <div style={{backgroundColor: '#FFFFFF', opacity: 0.6, padding: 10}}>
                    <h5 className="label">{`Total research hours in ${label}: ${Math.round(currentPoint.hours)}`}</h5>
                    <b>Required Research Hours: </b>{currentPoint.threshold}<br/>
                    <b>Completion Rate: </b>{(100 * currentPoint.hours / currentPoint.threshold).toFixed(2)}% {currentPoint.hours >= currentPoint.threshold ? <label style={{color: 'green'}}><i className='fa fa-check'/></label> : '☹️'}<br/>
                </div>
            );
        }
        return null;
    };

    const filteredDivisions = useSelector(store => store.filter.divisions);
    useEffect(() => {
        if (triggerReloadAllPublication || isFirstLoading) {
            dispatch(saveImpactScoreTriggerReloadAllPublication(false));
            if (!loggedUser.isAdmin) {
                dispatch(saveImpactScoreOpeningPublicationDetails(true));
                dispatch(saveImpactScoreOpeningUserEmail(loggedUser.email));
                dispatch(saveImpactScoreOpeningUserName(loggedUser.givenName + ' ' + loggedUser.familyName));
            }
            const body = {
                isFiltering: true,
                filteredDivisions: filteredDivisions,
                filteredYearFrom: researchHoursSelectedYear,
                filteredYearTo: researchHoursSelectedYear,
                targetedUserEmail: openingUserEmail
            }
            fetchPublication(body, (publications) => {
                let countTotalHours = 0;
                publications.forEach(p => {
                    countTotalHours += getResearchHours(openingUserEmail, p.impactScore, p.creators);
                });
                let hoursThreshold = 0;
                for (let i = 0; i < userAccounts.length; i++) {
                    const u = userAccounts[i];
                    if (u.email === openingUserEmail) {
                        const academicTitle = u.academicTitle, managerTitle = u.managerTitle, unionTitle = u.unionTitle;
                        hoursThreshold += academicTitleToRequiredWorkingHours[academicTitle] * managerToExemption[managerTitle] * unionTitleToExemption[unionTitle]
                    }
                }
                dispatch(saveImpactScoreOpeningUserThreshold(hoursThreshold));
                dispatch(saveImpactScoreOpeningUserTotalHours(countTotalHours));

                apiCalls.fetchUsers({filterApproved: true}, users => {
                    setIsFirstLoading(false);
                    let filteredUsers = [];
                    users.map(u => {
                        if (loggedUser.isAdmin && u.email !== 'admin@eprints.vnu.edu.vn') {
                            filteredUsers.push(u);
                        } else {
                            if (u.email === loggedUser.email) {
                                filteredUsers.push(u);
                                const threshold = academicTitleToRequiredWorkingHours[u.academicTitle] * managerToExemption[u.managerTitle] * unionTitleToExemption[u.unionTitle]
                                dispatch(saveImpactScoreOpeningUserResearchHoursThreshold(threshold));
                            }
                        }
                    })
                    setUserAccounts(filteredUsers);
                }, (message) => {
                    alert(message);
                })
            }, (message) => alert(message));
        }
    });

    const dataExport = () => {
        fetchPublication({}, (publications) => {
            let payload = 'Kiểu bài báo, Tiêu đề, Các tác giả, Giờ quy đổi\n';
            let countTotalHours = 0;
            publications.forEach(p => {
                const y = parseInt(p.selectedDate.split('-')[0]);
                if (y === researchHoursSelectedYear) {
                    for (let i = 0; i < p.creators.length; i++) {
                        const c = p.creators[i]
                        if (c.email === openingUserEmail) {
                            let allAuthors = ''
                            p.creators.forEach(c => allAuthors += c.givenName + ' ' + c.familyName + ', ');
                            const h = getResearchHours(openingUserEmail, p.impactScore, p.creators);
                            payload += '"' + p.type + '","' + p.title + '","' + allAuthors.substring(0, allAuthors.length - 2) + '",' + h + '\n';
                            countTotalHours += h;
                            break;
                        }
                    }
                }
            });
            let hoursThreshold = 0;
            for (let i = 0; i < userAccounts.length; i++) {
                const u = userAccounts[i];
                if (u.email === openingUserEmail) {
                    const academicTitle = u.academicTitle, managerTitle = u.managerTitle, unionTitle = u.unionTitle;
                    hoursThreshold += academicTitleToRequiredWorkingHours[academicTitle] * managerToExemption[managerTitle] * unionTitleToExemption[unionTitle]
                }
            }
            payload += '\n,,Tổng số giờ NCKH,' + countTotalHours + ',';
            payload += '\n,,Số giờ yêu cầu,' + hoursThreshold + ',';
            payload += '\n,,' + (countTotalHours === hoursThreshold ? 'Đạt chỉ tiêu' : countTotalHours > hoursThreshold ? 'Vượt chỉ tiêu, '
                + Math.round(100 * (countTotalHours / hoursThreshold - 1)) + '%' : ('Chưa đạt chỉ tiêu,' + Math.round(100 * (countTotalHours / hoursThreshold)) + '%'))
            const dataURI = "data:text/plain;base64," + encodeBase64(payload);
            saveAs(dataURI, researchHoursSelectedYear + '-' + impactScoreOpeningUserName.replaceAll(' ', '-').toLowerCase() + '.csv');
        }, (message) => alert(message));
    }
    /* filtering and sorting */
    let filteredUsers = searchUsers(sortUsers(userAccounts, userSortBy), searchUserContent);
    return (
        <Row style={{marginRight: 50, marginLeft: 50}}>
            {loggedUser.isAdmin ? <Col md={openingPublicationDetails ? 7 : 12}>
                <Card>
                    <CardHeader>
                        <Row>
                            <Col md={6}>
                                <Row>
                                    <h5 style={{lineHeight: 1.5, marginTop: 10, marginLeft: 10, marginRight: 10}}>&nbsp; Tất cả người dùng
                                        {loggedUser.divisions.length === 1 ? ' - ' + loggedUser.divisions[0] : ''}
                                    </h5>
                                    <div style={{paddingTop: 12, paddingLeft: 20}}>
                                        <Badge theme={userCompletedQuotaFilter ? 'success' : 'light'} href="#" pill style={{marginRight: 5, paddingLeft: 10, paddingRight: 10}} onClick={() => {
                                            setUserCompletedQuotaFilter(!userCompletedQuotaFilter);
                                        }}>Hoàn thành &nbsp;<i className="fas fa-check"/> </Badge>
                                        <Badge theme={userIncompletedQuotaFilter ? 'secondary' : 'light'} href="#" pill style={{marginLeft: 5, paddingLeft: 10, paddingRight: 10}} onClick={() => {
                                            setUserIncompletedQuotaFilter(!userIncompletedQuotaFilter);
                                        }}>Chưa đạt chỉ tiêu &nbsp;<i className="fas fa-clock"/> </Badge>
                                    </div>
                                </Row>
                            </Col>
                            <Col md={6}>
                                <Row className='float-right'>
                                    <YearSelector linkedValue={researchHoursSelectedYear} onSelected={(y) => {
                                        dispatch(saveImpactScoreUserSelectedYear(y));
                                        dispatch(saveImpactScoreSearchPublicationContent(y));
                                        dispatch(saveImpactScoreTriggerReloadAllPublication(true));
                                    }}/>
                                    <Button pill theme='light' style={{marginRight: 10}} onClick={() => {
                                        if (searchOpen) setSearchUserContent('');
                                        setSearchOpen(!searchOpen);
                                    }}><i className='fa fa-search'/>
                                    </Button>
                                    <SortingSelector sortingType='user' onSelected={(s) => dispatch(saveImpactScoreUserSortBy(s))}/>
                                </Row>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody style={{overflow: "scroll", height: windowHeight - 270}}>
                        {searchOpen ? <InputGroup style={{marginBottom: 30}}>
                            <InputGroupAddon type="prepend"><InputGroupText><i className="fa fa-search"/></InputGroupText></InputGroupAddon>
                            <FormInput value={searchUserContent} placeholder="Tìm người dùng theo tên, email, khoa, hoặc bộ môn" onChange={(e) => setSearchUserContent(e.target.value)}/>
                        </InputGroup> : ''}
                        {isFirstLoading ? <div style={{width: 1000}}><List/><List style={{marginTop: 20}}/></div> : filteredUsers.map(item => (
                            <UserRow userCompletedQuotaFilter={userCompletedQuotaFilter} userIncompletedQuotaFilter={userIncompletedQuotaFilter} triggerReload={() => {
                                dispatch(saveImpactScoreTriggerReloadAllPublication(true));
                            }} academicTitle={item.academicTitle} managerTitle={item.managerTitle} unionTitle={item.unionTitle}
                                     impactScore={item.impactScore} givenName={item.givenName} familyName={item.familyName} email={item.email} isAdmin={item.isAdmin} department={item.department}/>
                        ))}
                    </CardBody>
                </Card>
            </Col> : ''}
            {openingPublicationDetails ? <Col md={loggedUser.isAdmin ? 5 : 12}>
                <Card>
                    <CardHeader>
                        <Row>
                            <Col>
                                <div style={{marginBottom: 10, marginRight: 10, marginTop: 20}}>
                                    <Row>
                                        <Col>
                                            <h6 style={{textAlign: 'left', marginLeft: 20, marginBottom: 20}}>Hoàn thành tổng cộng &nbsp;
                                                <Badge theme='primary' pill>{Math.round(impactScoreOpeningUserScore)}</Badge>&nbsp; giờ nghiên cứu
                                            </h6>
                                        </Col>
                                        <div style={{marginTop: -10}}>
                                            <YearSelector linkedValue={researchHoursSelectedYear} onSelected={(y) => {
                                                dispatch(saveImpactScoreUserSelectedYear(y));
                                                dispatch(saveImpactScoreSearchPublicationContent(y));
                                                dispatch(saveImpactScoreTriggerReloadAllPublication(true));
                                            }}/>
                                        </div>
                                        <div style={{marginTop: -10}}>
                                            <Button id='exportStatistic' pill theme='light' style={{marginLeft: 3, marginRight: 10}} onClick={() => dataExport()}>
                                                <i className='fa fa-download'/>
                                            </Button>
                                        </div>
                                        {loggedUser.isAdmin ? <i style={{fontSize: 20, marginLeft: 10, marginRight: 10, cursor: 'pointer'}} className='fa fa-times' onClick={() => {
                                            const oldSelectedYear = researchHoursSelectedYear;
                                            dispatch(resetImpactScore());
                                            dispatch(saveImpactScoreSearchPublicationContent(researchHoursSelectedYear));
                                            dispatch(saveImpactScoreUserSelectedYear(oldSelectedYear));
                                        }}/> : ''}
                                    </Row>
                                    {researchHoursStatisticByYear === null ? <div style={{height: 200, textAlign: 'center', padding: 70}}><ClipLoader size={60} color={'#157ffb'} loading/></div> :
                                        <ResponsiveContainer width='100%' height={200}>
                                            <LineChart data={researchHoursStatisticByYear}>
                                                <CartesianGrid strokeDasharray="3 3"/>
                                                <XAxis dataKey="name" padding={{left: 20, right: 20}}/>
                                                <YAxis/>
                                                <Tooltip content={<CustomTooltip/>}/>
                                                <Line type="monotone" dataKey="hours" stroke="#8884d8" activeDot={{r: 5}}/>
                                            </LineChart>
                                        </ResponsiveContainer>
                                    }
                                </div>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <Row style={{marginBottom: 15}}>
                            <Col md={12}>
                                <Row style={{marginTop: 10, marginBottom: 5, marginLeft: 0, marginRight: 10}}>
                                    <h5><span>&nbsp; </span>Công bố của {impactScoreOpeningUserName} năm {researchHoursSelectedYear}</h5>
                                    <Col>
                                        <Row className='float-right'>
                                            <Badge id='tooltipProgressOpen' style={{paddingLeft: 13, paddingRight: 13, paddingTop: 8, paddingBottom: 8}} pill theme={impactScoreOpeningUserTotalHours >= impactScoreOpeningUserThreshold ? 'success' : 'secondary'}>
                                                <span style={{fontSize: 15}}>
                                                    {Math.round(impactScoreOpeningUserTotalHours)} / {impactScoreOpeningUserThreshold} &nbsp; {impactScoreOpeningUserTotalHours >= impactScoreOpeningUserThreshold ? <i className='fa fa-check'/> : ''}
                                                </span>
                                                <Tooltip
                                                    open={tooltipOverallProgressOpen}
                                                    target='#tooltipProgressOpen'
                                                    toggle={() => setTooltipOverallProgressOpen(!tooltipOverallProgressOpen)}>
                                                    Số giờ nghiên cứu đã thực hiện {Math.round(impactScoreOpeningUserTotalHours)} &bull; Định mức yêu cầu {impactScoreOpeningUserThreshold} &bull;
                                                    {impactScoreOpeningUserTotalHours === impactScoreOpeningUserThreshold ? ' Hoàn thành chỉ tiêu' : impactScoreOpeningUserTotalHours >= impactScoreOpeningUserThreshold ? ' Vượt chỉ tiêu ' + Math.round(100 * (impactScoreOpeningUserTotalHours / impactScoreOpeningUserThreshold - 1)) + '%' : ' Chưa đạt chỉ tiêu'}
                                                </Tooltip>
                                            </Badge>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                            {/*<Col md={8}>*/}
                            {/*    <Row className='float-right'>*/}
                            {/*<Row className='float-right' style={{marginRight: 5}}>*/}
                            {/*    <Dropdown open={publicationDetailsFilterYearOpen} toggle={() => setPublicationDetailsFilterYearOpen(!publicationDetailsFilterYearOpen)} className='mr-2'>*/}
                            {/*        <DropdownToggle theme='light' pill>Year {researchHoursFilterSelectedYear} &nbsp; <i className="fa fa-sort"/></DropdownToggle>*/}
                            {/*        <DropdownMenu>*/}
                            {/*            {yearRange.map(s =>*/}
                            {/*                <DropdownItem onClick={() => {*/}
                            {/*                    dispatch(saveImpactScoreUserSelectedYear(s));*/}
                            {/*                    dispatch(saveImpactScoreSearchPublicationContent(s));*/}
                            {/*                }}>{s}</DropdownItem>*/}
                            {/*            )}*/}
                            {/*        </DropdownMenu>*/}
                            {/*    </Dropdown>*/}
                            {/*</Row>*/}
                            {/*<Dropdown open={publicationDetailsSortingOpen} toggle={() => setPublicationDetailsSortingOpen(!publicationDetailsSortingOpen)} className='mr-2'>*/}
                            {/*<DropdownToggle theme='light' pill>{publicationDetailsSortBy} &nbsp; <i className="fa fa-sort"/></DropdownToggle>*/}
                            {/*<DropdownMenu>*/}
                            {/*    {['Recently Added', 'Title Ascending', 'Title Descending', 'Date Ascending', 'Date Descending'].map(s =>*/}
                            {/*        <DropdownItem onClick={() => dispatch(saveImpactScorePublicationDetailSortBy(s))}>{s}</DropdownItem>)}*/}
                            {/*</DropdownMenu>*/}
                            {/*<Button pill theme='light' style={{marginLeft: 10}} onClick={() => {*/}
                            {/*    if (publicationDetailsSearchOpen) {*/}
                            {/*        // dispatch(saveSearchPublicationContent(''));*/}
                            {/*        // dispatch(saveImpactScoreSearchPublicationContent(''));*/}
                            {/*    }*/}
                            {/*    setPublicationDetailsSearchOpen(!publicationDetailsSearchOpen);*/}
                            {/*}}><i className='fa fa-search'/>*/}
                            {/*</Button>*/}
                            {/*</Dropdown>*/}
                            {/*</Row>*/}
                            {/*</Col>*/}
                        </Row>
                        {/*{publicationDetailsSearchOpen ? <InputGroup style={{marginBottom: 30}}>*/}
                        {/*    <InputGroupAddon type="prepend"><InputGroupText><i className="fa fa-search"/></InputGroupText></InputGroupAddon>*/}
                        {/*    <FormInput value={searchPublicationContent} placeholder="Search publications, authors, and years" onChange={(e) => {*/}
                        {/*        dispatch(saveImpactScoreSearchPublicationContent(e.target.value));*/}
                        {/*    }}/>*/}
                        {/*</InputGroup> : ''}*/}
                        <div style={{overflow: "scroll", height: windowHeight - 618}}>
                            <PublicationList isForImpactScore={true} approvalFilter={true} pendingFilter={false}/>
                        </div>
                    </CardBody>
                </Card>
            </Col> : ''}
        </Row>
    );
}
