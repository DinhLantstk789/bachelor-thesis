import {Component, Fragment} from 'react';
import ArticleType from "./articleType";
import ArticleDetails from "./articleDetails";
import ArticleSubjects from "./articleSubjects";
import ArticleDeposit from "./articleDeposit";

class Article extends Component {
    state = {
        currentStep: 1,
        type: 'article'
    }
    onTypeClicked = (event) => {
        this.setState({currentStep: 1});
    }
    onDetailsClicked = (event) => {
        this.setState({currentStep: 2});
    }
    onSubjectsClicked = (event) => {
        this.setState({currentStep: 3});
    }
    onDepositClicked = (event) => {
        this.setState({currentStep: 4});
    }
    onArticleTypeChanged = (newType) => {
        this.setState({type: newType});
    }


    render() {
        let currentComponent = null;
        let step = ''
        switch (this.state.currentStep) {
            case 1:
                currentComponent = <ArticleType type={this.state.type} onArticleTypeChanged={this.onArticleTypeChanged}/>;
                step = 'Type';
                break;
            case 2:
                currentComponent = <ArticleDetails type={this.state.type}/>;
                step = 'Details';
                break;
            case 3:
                currentComponent = <ArticleSubjects type={this.state.type}/>;
                step = 'Subject';
                break;
            case 4:
                currentComponent = <ArticleDeposit type={this.state.type}/>;
                step = 'Deposit';
                break;
        }
        return (
            <Fragment>
                <div className="panel panel-info col-md-6">
                    <button className="btn default green-stripe" onClick={this.onTypeClicked}><i className="fa fa-user"/>Type</button>
                    ->
                    <button onClick={this.onDetailsClicked}>Details</button> ->
                    <button onClick={this.onSubjectsClicked}>Subjects</button> ->
                    <button onClick={this.onDepositClicked}>Deposit</button>
                    <div className="panel-heading"><h4>Add Article -- {step}</h4></div>
                    <div className="panel-body">
                        {currentComponent}
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Article;
