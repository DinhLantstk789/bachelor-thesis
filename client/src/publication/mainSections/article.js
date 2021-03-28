import {Component, Fragment} from 'react';
import {Col, FormInput, Row} from "shards-react";
import {
    saveBookSectionEndPage,
    saveBookSectionFirstPage,
    saveBookSectionISBN,
    saveBookSectionNumber,
    saveBookSectionPublisher,
    saveBookSectionTitle,
    saveBookSectionVolume
} from "../../redux/actions";
import {connect} from "react-redux";

class Article extends Component {
    render() {
        return (
            <Fragment>
                <FormInput type="text" placeholder="Enter Journal or Publication Title" style={{marginTop: 10}} value={this.props.bookSectionTitle} onChange={(e) => this.props.saveBookSectionTitle(e.target.value)} />
                <FormInput type="text" placeholder="Enter Publisher" style={{marginTop: 10}} value={this.props.bookSectionPublisher} onChange={(e) => this.props.saveBookSectionPublisher(e.target.value)} />
                <Row style={{marginTop: 10}}>
                    <Col style={{marginLeft: 0, marginRight: -10}}>
                        <FormInput type="text" placeholder="Enter ISSN" value={this.props.bookSectionISBN} onChange={(e) => this.props.saveBookSectionISBN(e.target.value)}/>
                    </Col>
                    <Col style={{marginLeft: -10, marginRight: -10}}>
                        <FormInput type="text" placeholder="Enter Volume" value={this.props.bookSectionVolume} onChange={(e) => this.props.saveBookSectionVolume(e.target.value)}/>
                    </Col>
                    <Col style={{marginLeft: -10, marginRight: 0}}>
                        <FormInput type="text" placeholder="Enter Number"value={this.props.bookSectionNumber} onChange={(e) => this.props.saveBookSectionNumber(e.target.value)}/>
                    </Col>
                </Row>
                <Row style={{marginTop: 10}}>
                    <h6 style={{marginLeft: 13, marginRight: 30, marginTop: 2, display: "inline"}}>Page Range</h6>
                    <FormInput type="number" size={"sm"} style={{width: 70}} value={this.props.bookSectionFirstPage} onChange={(e) => this.props.saveBookSectionFirstPage(e.target.value)}/>
                    <label style={{marginRight: 15, marginLeft: 15}}>to</label>
                    <FormInput type="number" size={"sm"} style={{width: 70}} value={this.props.bookSectionEndPage} onChange={(e) => this.props.saveBookSectionEndPage(e.target.value)}/>
                </Row>
            </Fragment>
        )
    }
}


let mapStateToProps = (store) => {
    return {
        bookSectionTitle: store.bookSection.bookSectionTitle,
        bookSectionPublisher: store.bookSection.bookSectionPublisher,
        bookSectionISBN: store.bookSection.bookSectionISBN,
        bookSectionVolume: store.bookSection.bookSectionVolume,
        bookSectionNumber: store.bookSection.bookSectionNumber,
        bookSectionFirstPage: store.bookSection.bookSectionFirstPage,
        bookSectionEndPage: store.bookSection.bookSectionEndPage
    };
};
let mapDispatchToProps = {
    saveBookSectionTitle,
    saveBookSectionPublisher,
    saveBookSectionISBN,
    saveBookSectionVolume,
    saveBookSectionNumber,
    saveBookSectionFirstPage,
    saveBookSectionEndPage
};
export default connect(mapStateToProps, mapDispatchToProps)(Article);
