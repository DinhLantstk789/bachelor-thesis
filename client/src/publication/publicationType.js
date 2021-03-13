import {Component, Fragment} from 'react';
import RadioGroup from "../radioGroup";
import {saveArticleType} from "../redux/actions";
import {connect} from "react-redux";

class PublicationType extends Component {
    render() {
        return (
            <Fragment>
                <h6 style={{marginRight: 30, display: "inline"}}><i className='fa fa-star' style={{marginRight: 10}}/>Type:</h6>
                <RadioGroup selectedId={this.props.selectedId} enableTooltip={true} inline={true} radioArray={[{
                    name: 'Article',
                    id: 'article',
                    tooltip: 'An article in a journal, magazine, newspaper. Not necessarily peer-reviewed.'
                }, {
                    name: 'Book section',
                    id: 'book-section',
                    tooltip: 'A chapter or section in a book'
                }, {
                    name: 'Technical Report',
                    id: 'technical-report',
                    tooltip: 'A monograph. This maybe a technical report, project report, documentation or discussion paper.'
                }, {
                    name: 'Conference or Workshop Item',
                    id: 'conference-workshop-item',
                    tooltip: 'A paper, poster,speech,lecture or presentation given at a conference, workshop or other event.'
                }, {
                    name: 'Book',
                    id: 'book',
                    tooltip: 'A book or a conference volume'
                }, {
                    name: 'Thesis',
                    id: 'thesis',
                    tooltip: 'A thesis or dissertation'
                }, {
                    name: 'Patent',
                    id: 'patent',
                    tooltip: 'A published patent. Do not include as yet unpublished patent applications.'
                }, {
                    name: 'Image',
                    id: 'image',
                    tooltip: 'A digital photograph or visual image.'
                }, {
                    name: 'Video',
                    id: 'video',
                    tooltip: 'A digital video.'
                }, {
                    name: 'Dataset',
                    id: 'dataset',
                    tooltip: 'A bounded collection of quantitative data.'
                }, {
                    name: 'Experiment',
                    id: 'experiment',
                    tooltip: 'Experiment data with intermediate analyses and summary results.'
                }, {
                    name: 'Teaching Resource',
                    id: 'teaching-resource',
                    tooltip: 'Lecture notes, exercises, exam papers or course syllabuses.'
                }, {
                    name: 'Project-Grant',
                    id: 'project-grant',
                    tooltip: 'Something within the scope of the repository, but not covered by the other categories.'
                }]} onSelected={(selectedId) => this.props.saveArticleType(selectedId)}/>
            </Fragment>
        )
    }
}

let mapStateToProps = (store) => {
    return {selectedId: store.article.articleType};
}
let mapDispatchToProps = {saveArticleType};
export default connect(mapStateToProps, mapDispatchToProps)(PublicationType);