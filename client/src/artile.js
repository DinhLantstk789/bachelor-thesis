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
        let id = '';
        let step = ''
        switch (this.state.currentStep) {
            case 1:
                currentComponent = <ArticleType type={this.state.type} onArticleTypeChanged={this.onArticleTypeChanged}/>;
                step = 'Type';
                id = 'active'
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
                <div className='row'>
                    <div className="panel panel-info col-md-6">
                        <div className="container">
                            <ul className="progressbar" style={{marginTop: 20}}>
                                <li className={id} onClick={this.onTypeClicked}>Type</li>
                                <li  onClick={this.onDetailsClicked}>Details</li>
                                <li  onClick={this.onSubjectsClicked}>Subjects</li>
                                <li onClick={this.onDepositClicked}>Deposit</li>
                            </ul>
                        </div>
                        <div className="panel-body" style={{marginTop: 20}}>
                            {currentComponent}
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Article;
