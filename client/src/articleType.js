import {Component, Fragment} from 'react';
import {Tooltip, FormRadio, Row} from "shards-react";
import Button from "@material-ui/core/Button";

class ArticleType extends Component {
    state = {
        type: 'article',
        articleOpen: false, bookOpen: false,
        bookSectionOpen: false,
    }

    constructor(props) {
        super(props);
        this.onTypeRadioChanged = this.onTypeRadioChanged.bind(this);
        this.toggle = this.toggle.bind(this);

    }

    onTypeRadioChanged(newType) {
        this.setState({
            type: newType
        });
        this.props.onArticleTypeChanged(newType);
    }

    toggle(pos) {
        const newState = {};
        newState[pos] = !this.state[pos];
        this.setState({...this.state, ...newState});
    }

    render() {
        return (
            <Fragment>
                <div style={{marginTop: 30}}>
                    <div>
                        <label id="article" style={{paddingRight: 10}}>
                            <FormRadio
                                name="typeArticle"
                                checked={this.state.type === "article"}
                                onChange={() => {
                                    this.onTypeRadioChanged("article");
                                }}>
                                Article
                            </FormRadio>
                        </label>
                        <Tooltip
                            placement="right" style={{maxWidth: 900}}
                            open={this.state.articleOpen}
                            target="#article"
                            toggle={() => this.toggle("articleOpen")}>
                            An article in a journal, magazine, newspaper. Not necessarily peer-reviewed
                        </Tooltip>
                    </div>
                    <div>
                        <label id="bookSection" style={{paddingRight: 10}}>
                            <FormRadio
                                name="typeArticle"
                                checked={this.state.type === "book-section"}
                                onChange={() => {
                                    this.onTypeRadioChanged("book-section");
                                }}>
                                Book-section
                            </FormRadio>
                        </label>
                    </div>
                    <Tooltip
                        placement="right" style={{maxWidth: 900}}
                        open={this.state.bookOpen}
                        target="#bookSection"
                        toggle={() => this.toggle("bookOpen")}>
                        A chapter or section in a book
                    </Tooltip>

                    <FormRadio
                        name="typeArticle"
                        checked={this.state.type === "technical-report"}
                        onChange={() => {
                            this.onTypeRadioChanged("technical-report");
                        }}>
                        Technical-Report
                    </FormRadio>
                    <FormRadio
                        name="typeArticle"
                        checked={this.state.type === "conference-workshop-item"}
                        onChange={() => {
                            this.onTypeRadioChanged("conference-workshop-item");
                        }}
                    >
                        Conference or Workshop Item
                    </FormRadio>
                    <FormRadio
                        name="typeArticle"
                        checked={this.state.type === "book"}
                        onChange={() => {
                            this.onTypeRadioChanged("book");
                        }}
                    >
                        Book
                    </FormRadio>
                    <FormRadio
                        name="typeArticle"
                        checked={this.state.type === "thesis"}
                        onChange={() => {
                            this.onTypeRadioChanged("thesis");
                        }}
                    >
                        Thesis
                    </FormRadio>
                    <FormRadio
                        name="typeArticle"
                        checked={this.state.type === "patent"}
                        onChange={() => {
                            this.onTypeRadioChanged("patent");
                        }}
                    >
                        Patent
                    </FormRadio>
                    <FormRadio
                        name="typeArticle"
                        checked={this.state.type === "image"}
                        onChange={() => {
                            this.onTypeRadioChanged("image");
                        }}
                    >
                        Image
                    </FormRadio>
                    <FormRadio
                        name="typeArticle"
                        checked={this.state.type === "video"}
                        onChange={() => {
                            this.onTypeRadioChanged("video");
                        }}
                    >
                        Video
                    </FormRadio>
                    <FormRadio
                        name="typeArticle"
                        checked={this.state.type === "dataset"}
                        onChange={() => {
                            this.onTypeRadioChanged("dataset");
                        }}
                    >
                        Dataset
                    </FormRadio>
                    <FormRadio
                        name="typeArticle"
                        checked={this.state.type === "experiment"}
                        onChange={() => {
                            this.onTypeRadioChanged("experiment");
                        }}
                    >
                        Experiment
                    </FormRadio>
                    <FormRadio
                        name="typeArticle"
                        checked={this.state.type === "teaching-resource"}
                        onChange={() => {
                            this.onTypeRadioChanged("teaching-resource");
                        }}
                    >
                        Teaching Resource
                    </FormRadio>
                    <FormRadio
                        name="typeArticle"
                        checked={this.state.type === "project-grant"}
                        onChange={() => {
                            this.onTypeRadioChanged("project-grant");
                        }}
                    >
                        Project/Grant
                    </FormRadio>
                </div>

            </Fragment>
        )
    }
}

export default ArticleType;
