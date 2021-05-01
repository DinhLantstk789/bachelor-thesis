import React, {useEffect, useState} from 'react';
import {Badge, Col, Row, Tooltip} from "shards-react";
import * as apiCalls from "../utils/apiCalls";
import {useDispatch, useSelector} from "react-redux";
import {ClipLoader} from "react-spinners";
import {
    saveAcademicTitle,
    saveAddress,
    saveDepartment,
    saveEmail,
    saveFamilyName,
    saveGivenName,
    saveImpactScoreOpeningPublicationDetails,
    saveImpactScoreOpeningUserEmail,
    saveImpactScoreOpeningUserName,
    saveImpactScoreOpeningUserResearchHoursThreshold,
    saveImpactScoreOpeningUserScore, saveImpactScoreOpeningUserThreshold, saveImpactScoreOpeningUserTotalHours,
    saveImpactScoreTriggerReloadAllPublication,
    saveIsAdmin,
    saveManagerTitle,
    saveOpeningProfileTab,
    saveResearchHoursByYears,
    saveUnionTitle,
    saveUserDescription
} from "../redux/actions";
import {academicTitleToRequiredWorkingHours, getResearchHours, managerToExemption, unionTitleToExemption} from "../utils/configs";
import {fetchPublication} from "../utils/apiCalls";

export default function UserRow({userCompletedQuotaFilter, userIncompletedQuotaFilter, academicTitle, managerTitle, unionTitle, triggerReload, impactScore, givenName, familyName, email, isAdmin, department}) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isViewing, setIsViewing] = useState(false);
    const dispatch = useDispatch();

    const [tooltipProgressOpen, setTooltipProgressOpen] = useState(false);
    const [tooltipViewDetails, setTooltipViewDetails] = useState(false);

    const [completedHours, setCompletedHours] = useState(0);
    const [isUserPublicationsLoading, setIsUserPublicationsLoading] = useState(true);
    const filteredDivisions = useSelector(store => store.filter.divisions);
    const researchHoursFilterSelectedYear = useSelector(store => store.impactScore.userListSelectedYear);
    const [savedResearchHoursFilterSelectedYear, setSavedResearchHoursFilterSelectedYear] = useState(null);
    useEffect(() => {
        if (impactScore) {
            if (savedResearchHoursFilterSelectedYear === null || savedResearchHoursFilterSelectedYear !== researchHoursFilterSelectedYear) {
                setSavedResearchHoursFilterSelectedYear(researchHoursFilterSelectedYear);
                setIsUserPublicationsLoading(true);
                const body = {
                    isFiltering: true,
                    filteredDivisions: filteredDivisions,
                    filteredYearFrom: researchHoursFilterSelectedYear,
                    filteredYearTo: researchHoursFilterSelectedYear,
                    targetedUserEmail: email
                }
                fetchPublication(body, (publications) => {
                    setIsUserPublicationsLoading(false);
                    let totalScore = 0;
                    publications.forEach(p => {
                        totalScore += getResearchHours(email, p.impactScore, p.creators);
                    });
                    setCompletedHours(totalScore);
                }, (message) => alert(message));
            }
        }
    });

    const userPseudoId = email.replaceAll('@', '').replaceAll('.', '')
    const threshold = academicTitleToRequiredWorkingHours[academicTitle] * managerToExemption[managerTitle] * unionTitleToExemption[unionTitle];
    return (
        <div>
            {!impactScore || (impactScore && ((completedHours >= threshold && userCompletedQuotaFilter) || (completedHours < threshold && userIncompletedQuotaFilter))) ? <Row>
                <Col>
                    <Row style={{marginLeft: 0}}>
                        <h6>{isAdmin ? <Badge theme="secondary" pill style={{marginRight: 10}}>Admin</Badge> : ''}{academicTitle === 'None' ? '' : academicTitle + ' '}{familyName}&nbsp;{givenName}</h6>
                    </Row>
                    <Row style={{marginLeft: 0, marginTop: -10}}>
                        <p style={{fontSize: 14}}>{email}, {department}</p>
                    </Row>
                </Col>
                <div style={{marginRight: 15}}>
                    <Row className='float-right' style={{marginRight: 10, marginTop: 13}}>
                        {impactScore ?
                            <div style={{textAlign: 'center', marginTop: -10, cursor: 'pointer'}}>
                                {isUserPublicationsLoading ? <div style={{marginTop: 0}}><ClipLoader size={35} color={'#5a6169'} loading/></div> : <label style={{fontSize: 20}}>
                                    <Badge id={'tooltipProgressOpen-' + userPseudoId} style={{paddingLeft: 13, paddingRight: 13, paddingTop: 7, paddingBottom: 7}} pill theme={completedHours >= threshold ? 'success' : 'secondary'}>
                                        {Math.round(completedHours)} / {Math.round(threshold)} {completedHours >= threshold ? <i style={{fontSize: 15}} className='fa fa-check'/> : ''}
                                    </Badge>
                                    <i id={'tooltipViewDetails-' + userPseudoId} style={{fontSize: 20, marginLeft: 15, cursor: 'pointer'}} className='fa fa-arrow-right' onClick={() => {
                                        dispatch(saveImpactScoreOpeningPublicationDetails(true));
                                        dispatch(saveResearchHoursByYears(null));
                                        dispatch(saveImpactScoreOpeningUserEmail(email));
                                        dispatch(saveImpactScoreOpeningUserThreshold(threshold));
                                        dispatch(saveImpactScoreOpeningUserTotalHours(completedHours));
                                        dispatch(saveImpactScoreOpeningUserResearchHoursThreshold(threshold));
                                        dispatch(saveImpactScoreOpeningUserScore(null));
                                        dispatch(saveImpactScoreOpeningUserName(givenName + ' ' + familyName));
                                        dispatch(saveImpactScoreTriggerReloadAllPublication(true));
                                    }}/>
                                    <Tooltip
                                        open={tooltipProgressOpen} placement={'left'}
                                        target={"#tooltipProgressOpen-" + userPseudoId}
                                        toggle={() => setTooltipProgressOpen(!tooltipProgressOpen)}>
                                        Số giờ nghiên cứu đã thực hiện {Math.round(completedHours)} &bull; Định mức yêu cầu {threshold} &bull;
                                        {completedHours === threshold ? ' Hoàn thành chỉ tiêu' : completedHours >= threshold ? ' Vượt chỉ tiêu ' + Math.round(100 * (completedHours / threshold - 1)) + '%' : ' Chưa đạt chỉ tiêu'}
                                    </Tooltip>
                                    <Tooltip
                                        open={tooltipViewDetails}
                                        target={"#tooltipViewDetails-" + userPseudoId}
                                        toggle={() => setTooltipViewDetails(!tooltipViewDetails)}>
                                        Xem chi tiết
                                    </Tooltip>
                                </label>}
                            </div> : <div>
                            <span style={{marginLeft: 20, marginRight: 20}} onClick={() => {
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
                                        dispatch(saveAcademicTitle(u[0].academicTitle));
                                        dispatch(saveManagerTitle(u[0].managerTitle));
                                        dispatch(saveUnionTitle(u[0].unionTitle));
                                        setIsViewing(false);
                                        dispatch(saveOpeningProfileTab('Update user'));
                                    }, (message) => {
                                        alert(message);
                                    });
                                }
                            }
                            }>{isViewing ? <ClipLoader size={18} color={'#5a6169'} loading/> : <i style={{fontSize: 20, cursor: 'pointer'}} className='fa fa-edit'/>}
                            </span>
                                <span onClick={() => {
                                    if (!isDeleting) {
                                        setIsDeleting(true);
                                        apiCalls.deleteUser({email: email}, () => {
                                            setIsDeleting(false);
                                            triggerReload();
                                        }, (message) => {
                                            setIsDeleting(false);
                                            alert(message);
                                        })
                                    }
                                }}>{isDeleting ? <ClipLoader size={18} color={'#5a6169'} loading/> : <i style={{fontSize: 20, cursor: 'pointer'}} className='fa fa-trash'/>}
                            </span>
                            </div>}
                    </Row>
                </div>
            </Row> : ''}
        </div>
    )
};

