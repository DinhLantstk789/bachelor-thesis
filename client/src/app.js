import {Component, Fragment} from 'react';
import Login from "./login";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import Dashboard from "./dashboard";

class App extends Component {
    state = {
        loggedUser: null
    }

    onLoginSuccess = (user) => {
        this.setState({loggedUser: user});
    }

    render() {
        let mainComponent = this.state.loggedUser != null ? <Dashboard loggedUser={this.state.loggedUser}/> :
            <Login onLoginSuccess={this.onLoginSuccess}/>;
        return (
            <Fragment>
                {mainComponent}
            </Fragment>
        )
    }
}

export default App;
