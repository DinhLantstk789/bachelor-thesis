import {Component, Fragment} from 'react';
import ArticleType from "./articleType";
import ArticleDetails from "./articleDetails";
import axios from "axios";
import {Button} from "shards-react";

class Article extends Component {
    state = {
        currentStep: 1,
        articles: 'get sample'
    }
    onTypeClicked = (event) => {
        this.setState({currentStep: 1});
    }
    onDetailsClicked = (event) => {
        this.setState({currentStep: 2});
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
        }
        return (
            <Fragment>
                {currentComponent}
            </Fragment>
        )
    }
}

export default Article;
