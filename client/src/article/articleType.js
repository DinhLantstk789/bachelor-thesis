import {Component, Fragment} from 'react';
import {Tooltip, FormRadio, Row} from "shards-react";
import Button from "@material-ui/core/Button";
import RadioGroup from "../radioGroup";

class ArticleType extends Component {
    state = {
        type: 'article'
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <div style={{marginTop: 30}}>
                    <RadioGroup enableTooltip={true} radioArray={[{
                        name: 'Article',
                        id: 'article',
                        tooltip: 'An article in a journal, magazine, newspaper. Not necessarily peer-reviewed'
                    }, {
                        name: 'Book section',
                        id: 'book-section',
                        tooltip: 'A chapter or section in a book'
                    }, {
                        name: 'Technical Report',
                        id: 'technical-report',
                        tooltip: 'A chapter or section in a book'
                    }, {
                        name: 'Conference or Workshop Item',
                        id: 'conference-workshop-item',
                        tooltip: 'A chapter or section in a book'
                    }, {
                        name: 'Book',
                        id: 'book',
                        tooltip: 'A chapter or section in a book'
                    }, {
                        name: 'Thesis',
                        id: 'thesis',
                        tooltip: 'A chapter or section in a book'
                    }, {
                        name: 'Patent',
                        id: 'patent',
                        tooltip: 'A chapter or section in a book'
                    }, {
                        name: 'Image',
                        id: 'image',
                        tooltip: 'A chapter or section in a book'
                    }, {
                        name: 'Video',
                        id: 'video',
                        tooltip: 'A chapter or section in a book'
                    }, {
                        name: 'Dataset',
                        id: 'dataset',
                        tooltip: 'A chapter or section in a book'
                    }, {
                        name: 'Experiment',
                        id: 'experiment',
                        tooltip: 'A chapter or section in a book'
                    }, {
                        name: 'Teaching Resource',
                        id: 'teaching-resource',
                        tooltip: 'A chapter or section in a book'
                    }, {
                        name: 'Project-Grant',
                        id: 'project-grant',
                        tooltip: 'A chapter or section in a book'
                    }]} onSelected={(selectedId) => {
                        this.props.onArticleTypeChanged(selectedId);
                    }}/>
                </div>
            </Fragment>
        )
    }
}

export default ArticleType;
