import {Component, Fragment} from 'react';
import {Col, FormInput, Row} from "shards-react";
import {connect} from "react-redux";
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
} from "../redux/actions";

class BookSectionMain extends Component {
    render() {
        return (
            <Fragment>
                <Row style={{marginTop: 10}}>
                    <h6 style={{marginLeft: 13, marginRight: 30, display: "inline"}}>Page Range</h6>
                    <FormInput type="number" size={"sm"} style={{width: 70}} value={this.props.bookSectionFirstPage} onChange={(e) => this.props.saveBookSectionFirstPage(e.target.value)}/>
                    <label style={{marginRight: 15, marginLeft: 15}}>to</label>
                    <FormInput type="number" size={"sm"} style={{width: 70}} value={this.props.bookSectionEndPage} onChange={(e) => this.props.saveBookSectionEndPage(e.target.value)}/>
                </Row>
                <FormInput type="text" placeholder="Enter Title of Book" value={this.props.bookSectionTitle} style={{marginTop: 10}} onChange={(e) => this.props.saveBookSectionTitle(e.target.value)}/>
                <FormInput type="text" placeholder="Enter Place of Publication" value={this.props.bookSectionPublicationPlace} style={{marginTop: 10}} onChange={(e) => this.props.saveBookSectionPublicationPlace(e.target.value)}/>
                <FormInput type="text" placeholder="Enter Publisher" style={{marginTop: 10}} value={this.props.bookSectionPublisher} onChange={(e) => this.props.saveBookSectionPublisher(e.target.value)}/>
                <FormInput type="text" placeholder="Enter Number of Pages" style={{marginTop: 10}} value={this.props.bookSectionPageNumber} onChange={(e) => this.props.saveBookSectionPageNumber(e.target.value)}/>
                <FormInput type="text" placeholder="Enter Series Name" style={{marginTop: 10}} value={this.props.bookSectionSeriesName} onChange={(e) => this.props.saveBookSectionSeriesName(e.target.value)}/>
                <Row style={{marginTop: 10}}>
                    <Col style={{marginLeft: 0, marginRight: -10}}>
                        <FormInput type="text" placeholder="Enter ISBN" value={this.props.bookSectionISBN} onChange={(e) => {
                            this.props.saveBookSectionISBN(e.target.value)
                        }}/>
                    </Col>
                    <Col style={{marginLeft: -10, marginRight: -10}}>
                        <FormInput type="text" placeholder="Enter Volume" value={this.props.bookSectionVolume} onChange={(e) => this.props.saveBookSectionVolume(e.target.value)}/>
                    </Col>
                    <Col style={{marginLeft: -10, marginRight: 0}}>
                        <FormInput type="text" placeholder="Enter Number" value={this.props.bookSectionNumber} onChange={(e) => this.props.saveBookSectionNumber(e.target.value)}/>
                    </Col>
                </Row>
            </Fragment>
        )
    }
}

let mapStateToProps = (store) => {
    return {
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
    };
};
let mapDispatchToProps = {
    saveBookSectionTitle,
    saveBookSectionPublicationPlace,
    saveBookSectionPublisher,
    saveBookSectionPageNumber,
    saveBookSectionSeriesName,
    saveBookSectionISBN,
    saveBookSectionVolume,
    saveBookSectionNumber,
    saveBookSectionFirstPage,
    saveBookSectionEndPage
};
export default connect(mapStateToProps, mapDispatchToProps)(BookSectionMain);