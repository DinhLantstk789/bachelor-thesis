import {Fragment, useEffect, useState} from 'react';
import {List} from "react-content-loader";
import axios from "axios";
import {useSelector} from "react-redux";
import PublicationDetail from "./publication/rows/publication";

export default function Publications({approvalFilter, pendingFilter}) {
    const [isLoading, setIsLoading] = useState(true);
    const [publications, setPublications] = useState([]);
    const loggedUser = useSelector(store => store.user.loggedUser);

    useEffect(() => {
        axios.post('http://localhost:1234/article/fetch', {accessToken: loggedUser.accessToken}).then(res => {
            let status = res.data.status;
            if (status === 200) {
                setIsLoading(false);
                setPublications(res.data.publications);
                console.log(publications);
            } else {
                console.log('error:', res.data.message)
            }
        })
    }, [])

    let loading = <div>
        <List/>
        <List style={{marginTop: 20}}/>
    </div>
    let showAll = approvalFilter && pendingFilter
    let showOnlyApproval = approvalFilter && !pendingFilter
    let showOnlyPending = !approvalFilter && pendingFilter
    let filteredItems = publications.filter(item => (showAll ? item : (showOnlyApproval ? item.isApproved : (showOnlyPending ? !item.isApproved : item.isApproved === undefined))));
    let result = filteredItems.map(item => (
        <PublicationDetail type={item.type} title={item.title} authors={item.creators} approved={item.isApproved} publicationId={item.id}/>
    ))
    return (
        <Fragment>
            {isLoading ? loading : result}
        </Fragment>
    )
}