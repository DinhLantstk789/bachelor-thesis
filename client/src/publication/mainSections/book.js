import {Fragment} from 'react';
import {Col, FormInput, FormSelect, Row} from "shards-react";
import {useDispatch, useSelector} from "react-redux";
import {
    saveBookSectionISBN, saveBookSectionNumber, saveBookSectionPageNumber, saveBookSectionPublicationPlace,
    saveBookSectionPublisher, saveBookSectionSeriesName, saveBookSectionVolume, saveRanking
} from "../../redux/actions";
import {publicationRankingToResearchHours} from "../../utils/configs";

export default function Book() {
    const {bookSectionPublicationPlace, bookSectionPublisher, bookSectionPageNumber, bookSectionSeriesName, bookSectionISBN, bookSectionVolume, bookSectionNumber, ranking} = useSelector(store => ({
        bookSectionPublicationPlace: store.bookSection.bookSectionPublicationPlace,
        bookSectionPublisher: store.bookSection.bookSectionPublisher,
        bookSectionPageNumber: store.bookSection.bookSectionPageNumber,
        bookSectionSeriesName: store.bookSection.bookSectionSeriesName,
        bookSectionISBN: store.bookSection.bookSectionISBN,
        bookSectionVolume: store.bookSection.bookSectionVolume,
        bookSectionNumber: store.bookSection.bookSectionNumber,
        ranking: store.bookSection.ranking
    }));
    const dispatch = useDispatch();

    return (
        <Fragment>
            <FormInput placeholder="Enter Place of Publication" style={{marginTop: 10}} value={bookSectionPublicationPlace} onChange={(e) => dispatch(saveBookSectionPublicationPlace(e.target.value))}/>
            <Row>
                <Col style={{marginLeft: 0, marginRight: -10}}>
                    <FormInput type="text" placeholder="Enter Publisher" style={{marginTop: 10}} value={bookSectionPublisher} onChange={(e) => dispatch(saveBookSectionPublisher(e.target.value))}/>
                </Col>
                <Col style={{marginLeft: -10, marginRight: 0}}>
                    <FormSelect value={ranking} style={{marginTop: 10}} onChange={(e) => dispatch(saveRanking(e.target.value))}>
                        {Object.keys(publicationRankingToResearchHours['book']).map(d => <option value={d}>{d}</option>)}
                    </FormSelect>
                </Col>
            </Row>
            <FormInput placeholder="Enter Number of Pages" style={{marginTop: 10}} value={bookSectionPageNumber} onChange={(e) => dispatch(saveBookSectionPageNumber(e.target.value))}/>
            <FormInput placeholder="Enter Series Name" style={{marginTop: 10}} value={bookSectionSeriesName} onChange={(e) => dispatch(saveBookSectionSeriesName(e.target.value))}/>
            <Row style={{marginTop: 10}}>
                <Col style={{marginLeft: 0, marginRight: -10}}>
                    <FormInput type="text" placeholder="Enter ISBN" value={bookSectionISBN} onChange={(e) => dispatch(saveBookSectionISBN(e.target.value))}/>
                </Col>
                <Col style={{marginLeft: -10, marginRight: -10}}>
                    <FormInput type="text" placeholder="Enter Volume" value={bookSectionVolume} onChange={(e) => dispatch(saveBookSectionVolume(e.target.value))}/>
                </Col>
                <Col style={{marginLeft: -10, marginRight: 0}}>
                    <FormInput type="text" placeholder="Enter Number" value={bookSectionNumber} onChange={(e) => dispatch(saveBookSectionNumber(e.target.value))}/>
                </Col>
            </Row>
        </Fragment>
    )
}
