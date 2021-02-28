import {Component, Fragment} from 'react';
import Login from "./login";
import Header from "./header";
import Footer from "./footer";
import Article from "./artile";
import MultiStepForm from "./multiStepForm";

class App extends Component {
    state = {
        loggedUser: null
    }

    onLoginSuccess = (user) => {
        this.setState({loggedUser: user});
    }

    render() {
        let form = <MultiStepForm/>;
        let header = this.state.loggedUser != null ? <Header loggedUser={this.state.loggedUser}/> : <span/>;
        let mainComponent = this.state.loggedUser != null ? <Article loggedUser={this.state.loggedUser}/> : <Login onLoginSuccess={this.onLoginSuccess}/>;
        return (
            <Fragment>
                {header}
                {mainComponent}
                {/*{form}*/}
                <Footer/>
            </Fragment>
        )
    }
}

export default App;
