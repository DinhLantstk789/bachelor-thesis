import {Component, Fragment} from 'react';
import Login from "./login";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import Dashboard from "./dashboard";
import {connect} from "react-redux";


class App extends Component {
    render() {
        return (
            <Fragment>
                {this.props.loggedUser != null ? <Dashboard/> : <Login/>}
            </Fragment>
        )
    }
}

let mapStateToProps = (store) => {
    return {loggedUser: store.user.loggedUser};
}
let mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(App);
