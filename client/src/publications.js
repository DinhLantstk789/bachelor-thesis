import {Fragment, useEffect, useState} from 'react';
import {List} from "react-content-loader";
import {useDispatch, useSelector} from "react-redux";
import PublicationRow from "./publication/rows/publicationRow";
import {fetchPublication} from "./apiCalls";
import {setTriggerReloadAllPublication} from "./redux/actions";

export default function Publications({approvalFilter, pendingFilter}) {
    const [isLoading, setIsLoading] = useState(true);
    const [triggerReload, setTriggerReload] = useState(false);
    const [publications, setPublications] = useState([]);
    const triggerReloadAllPublication = useSelector(store => store.filter.triggerReloadAllPublication);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchPublication((publications) => {
            setIsLoading(false);
            dispatch(setTriggerReloadAllPublication(false));
            setPublications(publications);
        }, (message) => alert(message));
    }, []);

    useEffect(() => {
        if (triggerReloadAllPublication) {
            setIsLoading(true);
            fetchPublication((publications) => {
                setIsLoading(false);
                dispatch(setTriggerReloadAllPublication(false));
                setPublications(publications);
            }, (message) => alert(message));
        }
    });

    useEffect(() => {
        fetchPublication((publications) => {
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
    return (
        <Fragment>
            {isLoading ? loading : filteredItems.map(item => (
                <PublicationRow triggerUpdateUI={() => setTriggerReload(!triggerReload)} type={item.type} title={item.title} authors={item.creators} approved={item.isApproved} publicationId={item.id}/>
            ))}
        </Fragment>
    )
}