import {Fragment} from 'react';
import {Col, FormInput, Row} from "shards-react";
import {useDispatch, useSelector} from "react-redux";
import {
    saveBookSectionEndPage,
    saveBookSectionFirstPage,
    saveBookSectionISBN,
    saveBookSectionNumber,
    saveBookSectionPageNumber,
    saveBookSectionPublicationPlace,
    saveBookSectionPublisher,
    saveBookSectionSeriesName,
    saveBookSectionTitle,
    saveBookSectionVolume
} from "../../redux/actions";

export default function BookSection() {
    const {
        bookSectionTitle, bookSectionPublicationPlace, bookSectionPublisher, bookSectionPageNumber, bookSectionSeriesName, bookSectionISBN, bookSectionVolume,
        bookSectionNumber, bookSectionFirstPage, bookSectionEndPage
    } = useSelector(store => ({
        bookSectionTitle: store.bookSection.bookSectionTitle,
        bookSectionPublicationPlace: store.bookSection.bookSectionPublicationPlace,
        bookSectionPublisher: store.bookSection.bookSectionPublisher,
        bookSectionPageNumber: store.bookSection.bookSectionPageNumber,
        bookSectionSeriesName: store.bookSection.bookSectionSeriesName,
        bookSectionISBN: store.bookSection.bookSectionISBN,
        bookSectionVolume: store.bookSection.bookSectionVolume,
        bookSectionNumber: store.bookSection.bookSectionNumber,
        bookSectionFirstPage: store.bookSection.bookSectionFirstPage,
        bookSectionEndPage: store.bookSection.bookSectionEndPage
    }));
    const dispatch = useDispatch();
    return (
        <Fragment>
            <Row style={{marginTop: 10}}>
                <h6 style={{marginLeft: 13, marginRight: 30, display: "inline"}}>Page Range</h6>
                <FormInput type="number" size={"sm"} style={{width: 70}} value={bookSectionFirstPage} onChange={(e) => dispatch(saveBookSectionFirstPage(e.target.value))}/>
                <label style={{marginRight: 15, marginLeft: 15}}>to</label>
                <FormInput type="number" size={"sm"} style={{width: 70}} value={bookSectionEndPage} onChange={(e) => dispatch(saveBookSectionEndPage(e.target.value))}/>
            </Row>
            <FormInput type="text" placeholder="Enter Title of Book" value={bookSectionTitle} style={{marginTop: 10}} onChange={(e) => dispatch(saveBookSectionTitle(e.target.value))}/>
            <FormInput type="text" placeholder="Enter Place of Publication" value={bookSectionPublicationPlace} style={{marginTop: 10}} onChange={(e) => dispatch(saveBookSectionPublicationPlace(e.target.value))}/>
            <FormInput type="text" placeholder="Enter Publisher" style={{marginTop: 10}} value={bookSectionPublisher} onChange={(e) => dispatch(saveBookSectionPublisher(e.target.value))}/>
            <FormInput type="text" placeholder="Enter Number of Pages" style={{marginTop: 10}} value={bookSectionPageNumber} onChange={(e) => dispatch(saveBookSectionPageNumber(e.target.value))}/>
            <FormInput type="text" placeholder="Enter Series Name" style={{marginTop: 10}} value={bookSectionSeriesName} onChange={(e) => dispatch(saveBookSectionSeriesName(e.target.value))}/>
            <Row style={{marginTop: 10}}>
                <Col style={{marginLeft: 0, marginRight: -10}}>
                    <FormInput type="text" placeholder="Enter ISBN" value={bookSectionISBN} onChange={(e) => {
                        dispatch(saveBookSectionISBN(e.target.value));
                    }}/>
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
