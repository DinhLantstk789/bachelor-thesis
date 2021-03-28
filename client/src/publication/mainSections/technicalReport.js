import {Component, Fragment} from 'react';
import {FormInput} from "shards-react";
import {saveBookSectionPageNumber, saveBookSectionPublicationPlace, saveBookSectionPublisher, saveBookSectionTitle, saveInstitution, savePublicationDepartment,} from "../../redux/actions";
import {connect} from "react-redux";

class TechnicalReport extends Component {
    render() {
        return (
            <Fragment>
                <FormInput placeholder="Enter Institution" style={{marginTop: 10}} value={this.props.institution} onChange={(e) =>
                    this.props.saveInstitution(e.target.value)}/>
                <FormInput placeholder="Enter Department" style={{marginTop: 10}} value={this.props.publicationDepartment} onChange={(e) =>
                    this.props.savePublicationDepartment(e.target.value)}/>
                <FormInput placeholder="Enter Place of Publication" style={{marginTop: 10}} value={this.props.bookSectionPublicationPlace} onChange={(e) =>
                    this.props.saveBookSectionPublicationPlace(e.target.value)}/>
                <FormInput placeholder="Enter Publisher" style={{marginTop: 10}} value={this.props.bookSectionPublisher} onChange={(e) =>
                    this.props.saveBookSectionPublisher(e.target.value)}/>
                <FormInput placeholder="Enter Number of Pages" style={{marginTop: 10}} value={this.props.bookSectionPageNumber} onChange={(e) =>
                    this.props.saveBookSectionPageNumber(e.target.value)}/>
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
        institution:store.technicalReport.institution,
        publicationDepartment:store.publication.publicationDepartment


    };
};
let mapDispatchToProps = {
    saveBookSectionTitle,
    saveBookSectionPublicationPlace,
    saveBookSectionPublisher,
    saveBookSectionPageNumber,
    saveInstitution,
    savePublicationDepartment
};
export default connect(mapStateToProps, mapDispatchToProps)(TechnicalReport);
