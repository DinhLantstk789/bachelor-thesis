import {Component, Fragment} from 'react';
import {Col, FormInput, Row} from "shards-react";
import {connect} from "react-redux";
import {saveBookSectionISBN, saveBookSectionNumber, saveBookSectionPageNumber, saveBookSectionPublicationPlace,
    saveBookSectionPublisher, saveBookSectionSeriesName, saveBookSectionVolume} from "../redux/actions";

class Book extends Component {
    render() {
        return (
            <Fragment>
                <FormInput placeholder="Enter Place of Publication" style={{marginTop: 10}} value={this.props.bookSectionPublicationPlace} onChange={(e) => this.props.saveBookSectionPublicationPlace(e.target.value)}/>
                <FormInput placeholder="Enter Publisher" style={{marginTop: 10}} value={this.props.bookSectionPublisher} onChange={(e) => this.props.saveBookSectionPublisher(e.target.value)}/>
                <FormInput placeholder="Enter Number of Pages" style={{marginTop: 10}} value={this.props.bookSectionPageNumber} onChange={(e) => this.props.saveBookSectionPageNumber(e.target.value)}/>
                <FormInput placeholder="Enter Series Name" style={{marginTop: 10}} value={this.props.bookSectionSeriesName} onChange={(e) => this.props.saveBookSectionSeriesName(e.target.value)}/>
                <Row style={{marginTop: 10}}>
                    <Col style={{marginLeft: 0, marginRight: -10}}>
                        <FormInput type="text" placeholder="Enter ISBN" value={this.props.bookSectionISBN} onChange={(e) => this.props.saveBookSectionISBN(e.target.value)}/>
                    </Col>
                    <Col style={{marginLeft: -10, marginRight: -10}}>
                        <FormInput type="text" placeholder="Enter Volume" value={this.props.saveBookSectionVolume} onChange={(e) => this.props.saveBookSectionVolume(e.target.value)}/>
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
        bookSectionPublicationPlace: store.bookSection.bookSectionPublicationPlace,
        bookSectionPublisher: store.bookSection.bookSectionPublisher,
        bookSectionPageNumber: store.bookSection.bookSectionPageNumber,
        bookSectionSeriesName: store.bookSection.bookSectionSeriesName,
        bookSectionISBN: store.bookSection.bookSectionISBN,
        bookSectionVolume: store.bookSection.bookSectionVolume,
        bookSectionNumber: store.bookSection.bookSectionNumber,
    };
};
let mapDispatchToProps = {
    saveBookSectionPublicationPlace,
    saveBookSectionPublisher,
    saveBookSectionPageNumber,
    saveBookSectionSeriesName,
    saveBookSectionISBN,
    saveBookSectionVolume,
    saveBookSectionNumber,
};
export default connect(mapStateToProps, mapDispatchToProps)(Book);