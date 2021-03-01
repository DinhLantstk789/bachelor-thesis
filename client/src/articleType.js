import {Component, Fragment} from 'react';
import {Tooltip, FormRadio} from "shards-react";

class ArticleType extends Component {
    state = {
        type: 'article',
        articleOpen: false,
        bookSectionOpen: false
    }

    constructor(props, context) {
        super(props, context);
        this.state.type = this.props.type;
    }

    onTypeRadioChanged = (newType) => {
        // this.props.onArticleTypeChanged(newType);
        // this.setState({type: newType});
    }

    render() {
        return (
            <Fragment>
                <div className="form-group">
                    <div className="a">
                        <FormRadio
                            id="articleLabel"
                            checked={this.state.type === 'article'}
                            onChange={this.onTypeRadioChanged('article')}>
                            Article
                        </FormRadio>

                        <Tooltip
                            open={this.state.articleOpen}
                            target="#articleLabel"
                            toggle={() => {
                                this.setState({
                                    articleOpen: !this.state.articleOpen
                                });
                            }}>
                            An article in a journal, magazine, newspaper. Not necessarily
                            peer-reviewed. May be an electronic-only medium, such as an online journal or news
                            website
                        </Tooltip>

                        <FormRadio
                            id="bookSectionLabel"
                            checked={this.state.type === 'book'}
                            onChange={this.onTypeRadioChanged('book')}>
                            Book Section
                        </FormRadio>

                        <Tooltip
                            open={this.state.bookSectionOpen}
                            target="#bookSectionLabel"
                            toggle={() => {
                                this.setState({
                                    bookSectionOpen: !this.state.bookSectionOpen
                                });
                            }}>
                            A chapter or section in a book.
                        </Tooltip>
                        <label>
                            <input type="radio" value="technical-report"
                                   checked={this.state.type === 'technical-report'}/>
                            Technical Report
                        </label>
                        <p id='p-type'>A monograph. This may be a technical report, project report,
                            documentation, manual, working paper or discussion paper.</p>
                        <label>
                            <input type="radio" value="conference-workshop-item"
                                   checked={this.state.type === 'conference-workshop-item'}/>
                            Conference or Workshop Item
                        </label>
                        <p id='p-type'>A paper, poster, speech, lecture or presentation given at a conference,
                            workshop
                            or other event. If the conference item has been published in a journal or book
                            then please use "Book Section" or "Article" instead.</p>
                        <label>
                            <input type="radio" value="book" checked={this.state.type === 'book'}/>
                            Book
                        </label>
                        <p id='p-type'>A book or a conference volume.</p>
                        <label>
                            <input type="radio" value="thesis" checked={this.state.type === 'thesis'}/>
                            Thesis
                        </label>
                        <p id='p-type'>A thesis or dissertation.</p>
                        <label>
                            <input type="radio" value="patent" checked={this.state.type === 'patent'}/>
                            Patent
                        </label>
                        <p id='p-type'>A published patent. Do not include as yet unpublished patent
                            applications.</p>
                        <label>
                            <input type="radio" value="image" checked={this.state.type === 'image'}/>
                            Image
                        </label>
                        <p id='p-type'>A digital photograph or visual image.</p>
                        <label>
                            <input type="radio" value="video" checked={this.state.type === 'video'}/>
                            Video
                        </label>
                        <p id='p-type'>A digital video.</p>
                        <label>
                            <input type="radio" value="dataset" checked={this.state.type === 'dataset'}/>
                            Dataset
                        </label>
                        <p id='p-type'>A bounded collection of quantitative data (e.g. spreadsheet or XML data
                            file).</p>
                        <label>
                            <input type="radio" value="experiment" checked={this.state.type === 'experiment'}/>
                            Experiment
                        </label>
                        <p id='p-type'> Experimental data with intermediate analyses and summary results.</p>
                        <label>
                            <input type="radio" value="teaching-resource"
                                   checked={this.state.type === 'teaching-resource'}/>
                            Teaching-Resource
                        </label>
                        <p id='p-type'>Lecture notes, exercises, exam papers or course syllabuses.</p>
                        <label>
                            <input type="radio" value="project-grant"
                                   checked={this.state.type === 'project-grant'}/>
                            Project/Grant
                        </label>
                        <p id='p-type'> Something within the scope of the repository, but not covered by the
                            other categories. </p>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default ArticleType;
