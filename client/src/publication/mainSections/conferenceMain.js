import {Fragment} from 'react';
import {Col, FormInput, FormSelect, Row} from "shards-react";
import {saveBookSectionTitle, saveRanking,} from "../../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import {publicationRankingToResearchHours} from "../../utils/configs";

export default function ConferenceMain() {
    const {bookSectionTitle, ranking} = useSelector(store => ({
        bookSectionTitle: store.bookSection.bookSectionTitle,
        ranking: store.bookSection.ranking
    }));
    const dispatch = useDispatch();
    return (
        <Fragment>
            <Row style={{marginTop: 10}}>
                <Col style={{marginLeft: 0, marginRight: -10}}>
                    <FormInput type="text" placeholder="Event Title" style={{marginTop: 10}} value={bookSectionTitle} onChange={(e) => dispatch(saveBookSectionTitle(e.target.value))}/>
                </Col>
                <Col style={{marginLeft: -10, marginRight: 0}}>
                    <FormSelect value={ranking} style={{marginTop: 10}} onChange={(e) => dispatch(saveRanking(e.target.value))}>
                        {Object.keys(publicationRankingToResearchHours['conference-workshop-item']).map(d => <option value={d}>{d}</option>)}
                    </FormSelect>
                </Col>
            </Row>
        </Fragment>
    )
}


