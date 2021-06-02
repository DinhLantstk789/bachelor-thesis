import React, {Fragment, useEffect, useState} from 'react';
import {List} from "react-content-loader";
import {useDispatch, useSelector} from "react-redux";
import PublicationRow from "./publicationRow";
import {fetchPublication} from "../utils/apiCalls";
import {saveImpactScoreOpeningUserScore, saveImpactScoreTriggerReloadAllPublication, savePublicationStatisticByYears, saveResearchHoursByYears, setTriggerReloadAllPublication} from "../redux/actions";
import { getResearchHours, searchPublications, sortPublications} from "../utils/configs";

export default function PublicationList({isForImpactScore, approvalFilter, pendingFilter}) {
    const [isLoading, setIsLoading] = useState(true);
    const [triggerReload, setTriggerReload] = useState(true);
    const [publications, setPublications] = useState([]);
    const triggerReloadAllPublication = useSelector(store => store.filter.triggerReloadAllPublication);
    const publicationSortBy = useSelector(store => isForImpactScore ? store.impactScore.publicationDetailsSortBy : store.publication.sortBy);

    const filteredDivisions = useSelector(store => store.filter.divisions);
    const filteredYearFrom = useSelector(store => store.filter.yearFrom);
    const filteredYearTo = useSelector(store => store.filter.yearTo);
    const searchPublicationContent = useSelector(store => isForImpactScore ? store.impactScore.searchPublicationContent : store.publication.searchPublicationContent);
    const dispatch = useDispatch();

    const triggerReloadAllPublicationFromImpactScore = useSelector(store => store.impactScore.triggerReloadAllPublication);
    const impactScoreOpeningUserEmail = useSelector(store => store.impactScore.openingUserEmail);
    const openingUserResearchHoursThreshold = useSelector(store => store.impactScore.openingUserResearchHoursThreshold);


    const parseYearCount = (publications) => {
        let publicationYearCount = {};
        let minYear = 3000, maxYear = 0;
        publications.forEach(p => {
            const y = parseInt(p.selectedDate.split('-')[0]);
            minYear = y < minYear ? y : minYear;
            maxYear = y > maxYear ? y : maxYear;
            publicationYearCount[y] = publicationYearCount[y] ? publicationYearCount[y] + 1 : 1
        });
        let finalPublicationsCount = {};
        for (let i = minYear; i <= maxYear; i += 1) {
            finalPublicationsCount[i] = publicationYearCount[i] ? publicationYearCount[i] : 0;
        }
        dispatch(savePublicationStatisticByYears(Object.keys(finalPublicationsCount).map(y => ({name: y, publications: finalPublicationsCount[y]}))));
    }

    /* parse the corresponding hours of each publication for the targeted author */
    const parseHoursCount = (publications) => {
        let newPublications = publications;
        let hoursCount = {};
        let minYear = 3000, maxYear = 0;
        let totalScore = 0;
        newPublications.forEach(p => {
            const y = parseInt(p.selectedDate.split('-')[0]);
            minYear = y < minYear ? y : minYear;
            maxYear = y > maxYear ? y : maxYear;
            const weighedImpactScore = getResearchHours(impactScoreOpeningUserEmail, p.impactScore, p.creators);
            p['weighedImpactScore'] = weighedImpactScore;
            hoursCount[y] = hoursCount[y] ? hoursCount[y] + weighedImpactScore : weighedImpactScore;
            totalScore += weighedImpactScore;
        });
        setPublications(newPublications);
        let finalHoursCount = {};
        for (let i = minYear; i <= maxYear; i += 1) {
            finalHoursCount[i] = hoursCount[i] ? hoursCount[i] : 0;
        }
        dispatch(saveResearchHoursByYears(Object.keys(finalHoursCount).map(y => ({name: y, hours: finalHoursCount[y], threshold: openingUserResearchHoursThreshold}))));
        dispatch(saveImpactScoreOpeningUserScore(totalScore));
    }

    useEffect(() => {
        const body = {
            isFiltering: true,
            filteredDivisions: filteredDivisions,
            filteredYearFrom: filteredYearFrom,
            filteredYearTo: filteredYearTo,
            targetedUserEmail: impactScoreOpeningUserEmail
        }
        fetchPublication(body, (publications) => {
            setIsLoading(false);
            setTriggerReload(false);
            dispatch(setTriggerReloadAllPublication(false));
            setPublications(publications);
            parseYearCount(publications);
            if (isForImpactScore) parseHoursCount(publications);
        }, (message) => alert(message));
    }, [triggerReload]);

    const researchHoursFilterSelectedYear = useSelector(store => store.impactScore.userListSelectedYear);
    useEffect(() => {
        if (triggerReloadAllPublicationFromImpactScore || triggerReloadAllPublication) {
            dispatch(setTriggerReloadAllPublication(false));
            dispatch(saveImpactScoreTriggerReloadAllPublication(false));
            setIsLoading(true);
            const body = {
                isFiltering: true,
                filteredDivisions: filteredDivisions,
                filteredYearFrom: filteredYearFrom,
                filteredYearTo: filteredYearTo,
                targetedUserEmail: impactScoreOpeningUserEmail
            }
            fetchPublication(body, (publications) => {
                setIsLoading(false);
                setPublications(publications);
                parseYearCount(publications);
                if (isForImpactScore) parseHoursCount(publications);
            }, (message) => alert(message));
        }
    });

    let loading = <div>
        <List/>
        <List style={{marginTop: 20}}/>
    </div>

    /* filtering and sorting */
    let showAll = approvalFilter && pendingFilter
    let showOnlyApproval = approvalFilter && !pendingFilter
    let showOnlyPending = !approvalFilter && pendingFilter

    let filteredItems = publications.filter(item => (showAll ? item : (showOnlyApproval ? item.isApproved : (showOnlyPending ? !item.isApproved : item.isApproved === undefined))));
    filteredItems = sortPublications(filteredItems, publicationSortBy);
    /* searching */
    let finalFilteredItemsAfterSearch = [];
    if (!isForImpactScore) {
        finalFilteredItemsAfterSearch = searchPublications(filteredItems, searchPublicationContent);
    } else {
        filteredItems.forEach(fi => {
            if (parseInt(fi.selectedDate.toLowerCase().split('-')[0]) === researchHoursFilterSelectedYear) {
                finalFilteredItemsAfterSearch.push(fi);
            }
        })
    }
    return (
        <Fragment>
            {isLoading ? loading : finalFilteredItemsAfterSearch.map(item => (
                <PublicationRow isForImpactScore={isForImpactScore} impactScore={item.impactScore} weighedImpactScore={item.weighedImpactScore}
                                triggerUpdateUI={() => setTriggerReload(true)} type={item.type} title={item.title} authors={item.creators}
                                approved={item.isApproved} publicationId={item.id} selectedDate={item.selectedDate}/>
            ))}
        </Fragment>
    )
}