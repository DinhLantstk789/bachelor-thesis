import {Component, Fragment} from 'react';

class ArticleType extends Component {
    state = {
        type: 'article'
    }

    constructor(props, context) {
        super(props, context);
        this.state.type = this.props.type;
    }

    onTypeRadioChanged = (event) => {
        let newType = event.target.value
        this.props.goiHamNayKhiThayDoiRadio(newType);
        this.setState({type: newType});
    }

    render() {
        return (
            <Fragment>
                <div className="form-group">
                    <div className="col-md-9">
                        <div className="a">
                            <form onChange={this.onTypeRadioChanged}>
                                <div className="radio-list">
                                    <label>
                                        <input type="radio" value="article"
                                               checked={this.state.type === 'article'}/>
                                        Article
                                    </label>
                                    <label>
                                        <input type="radio" value="book-section"
                                               checked={this.state.type === 'book-section'}/>
                                        Book Section
                                    </label>
                                    <label>

                                        <input type="radio" value="technical-report"
                                               checked={this.state.type === 'technical-report'}/>
                                        Technical Report
                                    </label>
                                    <label>

                                        <input type="radio" value="conference-workshop-item"
                                               checked={this.state.type === 'conference-workshop-item'}/>
                                        Conference or Workshop Item
                                    </label>
                                    <label>
                                        <input type="radio" value="book"
                                               checked={this.state.type === 'book'}/>
                                        Book
                                    </label>
                                    <label>
                                        <input type="radio" value="thesis"
                                               checked={this.state.type === 'thesis'}/>
                                        Thesis
                                    </label>
                                    <label>
                                        <input type="radio" value="patent"
                                               checked={this.state.type === 'patent'}/>
                                        Patent
                                    </label>
                                    <label>

                                        <input type="radio" value="image"
                                               checked={this.state.type === 'image'}/>

                                        Image
                                    </label>
                                    <label>
                                        <input type="radio" value="video"
                                               checked={this.state.type === 'video'}/>
                                        Video
                                    </label>
                                    <label>
                                        <input type="radio" value="dataset"
                                               checked={this.state.type === 'dataset'}/>
                                        Dataset
                                    </label>
                                    <label>
                                        <input type="radio" value="experiment"
                                               checked={this.state.type === 'experiment'}/>
                                        Experiment
                                    </label>
                                    <label>
                                        <input type="radio" value="project-grant"
                                               checked={this.state.type === 'project-grant'}/>
                                        Project/Grant
                                    </label>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default ArticleType;
