import {Component, Fragment} from 'react';
import ArticleType from "./articleType";
import ArticleDetails from "./articleDetails";
import ArticleSubjects from "./articleSubjects";
import ArticleDeposit from "./articleDeposit";
import axios from "axios";
import {Button} from "shards-react";

class Article extends Component {
    state = {
        loggedUser: null,
        currentStep: 1,
        articles: 'get sample'
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

    static getDerivedStateFromProps(newProps, prevState) {
        return {loggedUser: newProps.loggedUser};
    }

    onSampleClicked = () => {
        let requestConfigs = {
            headers: {
                token: this.state.loggedUser.accessToken
            }
        }
        axios.get('http://localhost:1234/article/fetch', requestConfigs).then(res => {
            let status = res.data.status;
            if (status === 0) {
                let articlesSample = '';
                articlesSample = res.data.articles[0]['name'] + ' ' + res.data.articles[1]['name'];
                this.setState({articles: articlesSample});
            } else {
                alert(res.data.message);
            }
        })
    }


    render() {
        let currentComponent = null;
        let id = '';
        let step = ''
        switch (this.state.currentStep) {
            case 1:
                currentComponent = <ArticleType/>;
                step = 'Type';
                break;
            case 2:
                currentComponent = <ArticleDetails/>;
                step = 'Details';
                break;
            case 3:
                currentComponent = <ArticleSubjects/>;
                step = 'Subject';
                break;
            case 4:
                currentComponent = <ArticleDeposit/>;
                step = 'Deposit';
                break;
        }
        return (
            <Fragment>
                <div className="example">
                    <Button theme="secondary" onClick={this.onTypeClicked}>Type</Button>
                    <Button theme="success" onClick={this.onDetailsClicked}>Details</Button>
                    <Button theme="info" onClick={this.onSubjectsClicked}>Subject</Button>
                    <Button theme="warning" onClick={this.onDepositClicked}>Deposit</Button>
                    <Button theme="danger" onClick={this.onSampleClicked}>{this.state.articles}</Button>
                </div>
                {currentComponent}
            </Fragment>
        )
    }
}

export default Article;
