import {Fragment, useEffect, useState} from 'react';
import {List} from "react-content-loader";
import {useSelector} from "react-redux";
import PublicationDetail from "./publication/rows/publication";
import {fetchPublication} from "./apiCalls";

export default function Publications({approvalFilter, pendingFilter}) {
    const [isLoading, setIsLoading] = useState(true);
    const [publications, setPublications] = useState([]);
    const loggedUser = useSelector(store => store.user.loggedUser);

    useEffect(() => {
        fetchPublication({}, (publications) => {
            setIsLoading(false);
            setPublications(publications);
        }, (message) => {
            console.log('error:', message);
        })
    }, [isLoading])

    let loading = <div>
        <List/>
        <List style={{marginTop: 20}}/>
    </div>
    let showAll = approvalFilter && pendingFilter
    let showOnlyApproval = approvalFilter && !pendingFilter
    let showOnlyPending = !approvalFilter && pendingFilter
    let filteredItems = publications.filter(item => (showAll ? item : (showOnlyApproval ? item.isApproved : (showOnlyPending ? !item.isApproved : item.isApproved === undefined))));
    let result = filteredItems.map(item => (
        <PublicationDetail type={item.type} title={item.title} authors={item.creators} approved={item.isApproved} publicationId={item.id} forceReload={() => setIsLoading(true)}/>
    ))
    return (
        <Fragment>
            {isLoading ? loading : result}
        </Fragment>
    )
}