import React, {Fragment, useEffect, useState} from 'react';
import {List} from "react-content-loader";
import {useDispatch, useSelector} from "react-redux";
import PublicationRow from "../rows/publicationRow";
import {fetchPublication} from "../utils/apiCalls";
import {saveImpactScoreTriggerReloadAllPublication, savePublicationStatisticByYears, setTriggerReloadAllPublication} from "../redux/actions";
import {Badge} from "shards-react";

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
    const impactScoreOpeningUserName = useSelector(store => store.impactScore.openingUserName);
    const impactScoreOpeningUserScore = useSelector(store => store.impactScore.openingUserScore);

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
        }, (message) => alert(message));
    }, [triggerReload]);


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
    if (publicationSortBy === 'Recently Added') filteredItems.sort((a, b) => a.databaseAddedOn > b.databaseAddedOn ? -1 : 1);
    if (publicationSortBy === 'Score Ascending') filteredItems.sort((a, b) => a.impactScore < b.impactScore ? -1 : 1);
    if (publicationSortBy === 'Score Descending') filteredItems.sort((a, b) => a.impactScore > b.impactScore ? -1 : 1);
    if (publicationSortBy === 'Title Ascending') filteredItems.sort((a, b) => a.title < b.title ? -1 : 1);
    if (publicationSortBy === 'Title Descending') filteredItems.sort((a, b) => a.title > b.title ? -1 : 1);
    if (publicationSortBy === 'Date Ascending') filteredItems.sort((a, b) => a.selectedDate < b.selectedDate ? -1 : 1);
    if (publicationSortBy === 'Date Descending') filteredItems.sort((a, b) => a.selectedDate > b.selectedDate ? -1 : 1);
    /* searching */
    let finalFilteredItemsAfterSearch = [];
    filteredItems.forEach(fi => {
        let canAdd = false;
        const searchKey = searchPublicationContent.toLowerCase();
        if (fi.title.toLowerCase().includes(searchKey)) canAdd = true;
        if (fi.selectedDate.toLowerCase().includes(searchKey)) canAdd = true;
        fi.creators.forEach(c => {
            if ((c.familyName + ' ' + c.givenName + ' ' + c.email).toLowerCase().includes(searchKey)) canAdd = true;
        })
        if (canAdd) finalFilteredItemsAfterSearch.push(fi);
    })
    return (
        <Fragment>
            {impactScoreOpeningUserName !== null ? <div style={{textAlign: 'center', marginBottom: 25}}><label style={{fontSize: 18}}>
                {impactScoreOpeningUserName} has the total score of &nbsp;
                <Badge theme='primary' pill>{impactScoreOpeningUserScore}</Badge>
                &nbsp; including the following publications
            </label></div> : ''}
            {isLoading ? loading : finalFilteredItemsAfterSearch.map(item => (
                <PublicationRow isForImpactScore={isForImpactScore} impactScore={item.impactScore} triggerUpdateUI={() => setTriggerReload(true)} type={item.type} title={item.title} authors={item.creators} approved={item.isApproved}
                                publicationId={item.id} selectedDate={item.selectedDate}/>
            ))}
        </Fragment>
    )
}