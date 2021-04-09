import {Fragment} from 'react';
import {FormInput} from "shards-react";
import {saveBookSectionPageNumber, saveBookSectionPublicationPlace, saveBookSectionPublisher, saveInstitution, savePublicationDepartment,} from "../../redux/actions";
import {useDispatch, useSelector} from "react-redux";

export default function TechnicalReport() {
    const { bookSectionPublicationPlace, bookSectionPublisher, bookSectionPageNumber, institution, publicationDepartment} = useSelector(store => ({
        bookSectionPublicationPlace: store.bookSection.bookSectionPublicationPlace,
        bookSectionPublisher: store.bookSection.bookSectionPublisher,
        bookSectionPageNumber: store.bookSection.bookSectionPageNumber,
        institution: store.technicalReport.institution,
        publicationDepartment: store.publication.publicationDepartment
    }));
    const dispatch = useDispatch();
    return (
        <Fragment>
            <FormInput placeholder="Enter Institution" style={{marginTop: 10}} value={institution} onChange={(e) =>
                dispatch(saveInstitution(e.target.value))}/>
            <FormInput placeholder="Enter Department" style={{marginTop: 10}} value={publicationDepartment} onChange={(e) =>
                dispatch(savePublicationDepartment(e.target.value))}/>
            <FormInput placeholder="Enter Place of Publication" style={{marginTop: 10}} value={bookSectionPublicationPlace} onChange={(e) =>
                dispatch(saveBookSectionPublicationPlace(e.target.value))}/>
            <FormInput placeholder="Enter Publisher" style={{marginTop: 10}} value={bookSectionPublisher} onChange={(e) =>
                dispatch(saveBookSectionPublisher(e.target.value))}/>
            <FormInput placeholder="Enter Number of Pages" style={{marginTop: 10}} value={bookSectionPageNumber} onChange={(e) =>
                dispatch(saveBookSectionPageNumber(e.target.value))}/>
        </Fragment>
        )
}
