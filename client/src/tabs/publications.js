import {Fragment, useEffect, useState} from 'react';
import {List} from "react-content-loader";
import {useDispatch, useSelector} from "react-redux";
import PublicationRow from "../rows/publicationRow";
import {fetchPublication} from "../apiCalls";
import {setTriggerReloadAllPublication} from "../redux/actions";

export default function Publications({approvalFilter, pendingFilter}) {
    const [isLoading, setIsLoading] = useState(true);
    const [triggerReload, setTriggerReload] = useState(false);
    const [publications, setPublications] = useState([]);
    const triggerReloadAllPublication = useSelector(store => store.filter.triggerReloadAllPublication);
    const dispatch = useDispatch();

    const filteredDivisions = useSelector(store => store.filter.divisions);
    const filteredYearFrom = useSelector(store => store.filter.yearFrom);
    const filteredYearTo = useSelector(store => store.filter.yearTo);
    const searchPublicationContent = useSelector(store => store.publication.searchPublicationContent);

    useEffect(() => {
        const body = {
            isFiltering: true,
            filteredDivisions: filteredDivisions,
            filteredYearFrom: filteredYearFrom,
            filteredYearTo: filteredYearTo
        }
        fetchPublication(body, (publications) => {
            setIsLoading(false);
            dispatch(setTriggerReloadAllPublication(false));
            setPublications(publications);
        }, (message) => alert(message));
    }, []);

    useEffect(() => {
        if (triggerReloadAllPublication) {
            dispatch(setTriggerReloadAllPublication(false));
            setIsLoading(true);
            const body = {
                isFiltering: true,
                filteredDivisions: filteredDivisions,
                filteredYearFrom: filteredYearFrom,
                filteredYearTo: filteredYearTo
            }
            fetchPublication(body, (publications) => {
                setIsLoading(false);
                setPublications(publications);
            }, (message) => alert(message));
        }
    });

    useEffect(() => {
        const body = {
            isFiltering: true,
            filteredDivisions: filteredDivisions,
            filteredYearFrom: filteredYearFrom,
            filteredYearTo: filteredYearTo
        }
        fetchPublication(body, (publications) => {
            setPublications(publications);
            dispatch(setTriggerReloadAllPublication(false));
        }, (message) => alert(message));
    }, [triggerReload]);

    let loading = <div>
        <List/>
        <List style={{marginTop: 20}}/>
    </div>

    let showAll = approvalFilter && pendingFilter
    let showOnlyApproval = approvalFilter && !pendingFilter
    let showOnlyPending = !approvalFilter && pendingFilter
    let filteredItems = publications.filter(item => (showAll ? item : (showOnlyApproval ? item.isApproved : (showOnlyPending ? !item.isApproved : item.isApproved === undefined))));
    let finalFilteredItemsAfterSearch = [];
    filteredItems.forEach(fi => {
        let canAdd = false;
        const searchKey = searchPublicationContent.toLowerCase();
        if (fi.title.toLowerCase().includes(searchKey)) canAdd = true;
        if (fi.selectedDate.toLowerCase().includes(searchKey)) canAdd = true;
        fi.creators.forEach(c => {
            if ((c.familyName + ' ' + c.givenName + ' ' + c.email).toLowerCase().includes(searchKey)) {
                canAdd = true
            }
        })
        if (canAdd) finalFilteredItemsAfterSearch.push(fi);
    })
    return (
        <Fragment>
            {isLoading ? loading : finalFilteredItemsAfterSearch.map(item => (
                <PublicationRow triggerUpdateUI={() => setTriggerReload(!triggerReload)} type={item.type} title={item.title} authors={item.creators} approved={item.isApproved} publicationId={item.id} selectedDate={item.selectedDate}/>
            ))}
        </Fragment>
    )
}