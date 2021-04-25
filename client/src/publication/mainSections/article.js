import {Fragment} from 'react';
import {Col, FormInput, FormSelect, Row} from "shards-react";
import {
    saveBookSectionEndPage,
    saveBookSectionFirstPage,
    saveBookSectionISBN,
    saveBookSectionNumber,
    saveBookSectionPublisher,
    saveBookSectionTitle,
    saveBookSectionVolume, saveIsAdmin, saveRanking, saveUnionTitle
} from "../../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import {publicationRankingToResearchHours, unionTitleToExemption} from "../../utils/configs";

export default function Article() {
    const {bookSectionTitle, bookSectionPublisher, bookSectionISBN, bookSectionVolume, bookSectionFirstPage, bookSectionNumber, bookSectionEndPage, ranking} = useSelector(store => ({
        bookSectionTitle: store.bookSection.bookSectionTitle,
        bookSectionPublisher: store.bookSection.bookSectionPublisher,
        bookSectionISBN: store.bookSection.bookSectionISBN,
        bookSectionVolume: store.bookSection.bookSectionVolume,
        bookSectionNumber: store.bookSection.bookSectionNumber,
        bookSectionFirstPage: store.bookSection.bookSectionFirstPage,
        bookSectionEndPage: store.bookSection.bookSectionEndPage,
        ranking: store.bookSection.ranking
    }));
    const dispatch = useDispatch();
    return (
        <Fragment>
            <Row style={{marginTop: 10}}>
                <Col style={{marginLeft: 0, marginRight: -10}}>
                    <FormInput type="text" placeholder="Enter Journal or Publication Title" style={{marginTop: 10}} value={bookSectionTitle} onChange={(e) => dispatch(saveBookSectionTitle(e.target.value))}/>
                </Col>
                <Col style={{marginLeft: -10, marginRight: 0}}>
                    <FormSelect value={ranking} style={{marginTop: 10}} onChange={(e) => dispatch(saveRanking(e.target.value))}>
                        {Object.keys(publicationRankingToResearchHours['article']).map(d => <option value={d}>{d}</option>)}
                    </FormSelect>
                </Col>
            </Row>
            <FormInput type="text" placeholder="Enter Publisher" style={{marginTop: 10}} value={bookSectionPublisher} onChange={(e) => dispatch(saveBookSectionPublisher(e.target.value))}/>
            <Row style={{marginTop: 10}}>
                <Col style={{marginLeft: 0, marginRight: -10}}>
                    <FormInput type="text" placeholder="Enter ISSN" value={bookSectionISBN} onChange={(e) => dispatch(saveBookSectionISBN(e.target.value))}/>
                </Col>
                <Col style={{marginLeft: -10, marginRight: -10}}>
                    <FormInput type="text" placeholder="Enter Volume" value={bookSectionVolume} onChange={(e) => dispatch(saveBookSectionVolume(e.target.value))}/>
                </Col>
                <Col style={{marginLeft: -10, marginRight: 0}}>
                    <FormInput type="text" placeholder="Enter Number" value={bookSectionNumber} onChange={(e) => dispatch(saveBookSectionNumber(e.target.value))}/>
                </Col>
            </Row>
            <Row style={{marginTop: 10}}>
                <h6 style={{marginLeft: 13, marginRight: 30, marginTop: 2, display: "inline"}}>Page Range</h6>
                <FormInput type="number" size={"sm"} style={{width: 70}} value={bookSectionFirstPage} onChange={(e) => dispatch(saveBookSectionFirstPage(e.target.value))}/>
                <label style={{marginRight: 15, marginLeft: 15}}>to</label>
                <FormInput type="number" size={"sm"} style={{width: 70}} value={bookSectionEndPage} onChange={(e) => dispatch(saveBookSectionEndPage(e.target.value))}/>
            </Row>
        </Fragment>
    )
}


