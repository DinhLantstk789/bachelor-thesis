import {Component, Fragment} from 'react';
import Login from "./login";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import Home from "./home";
import {connect} from "react-redux";
import {verifyCookie} from "./apiCalls";
import {saveLoggedUser} from "./redux/actions";
import {ClipLoader} from "react-spinners";

function Loading() {
    return (
        <p style={{paddingTop: 300, textAlign: 'center'}}>
            <ClipLoader size={60} color={'#157ffb'} loading/>
        </p>
    )
}

class App extends Component {
    componentDidMount() {
        verifyCookie((loggedUser) => {
            this.props.saveLoggedUser(loggedUser);
        }, (message) => {
            this.props.saveLoggedUser(null);
        })
    }

    render() {
        return (
            <Fragment>
                {this.props.loggedUser === undefined ? <Loading/> : this.props.loggedUser != null ? <Home/> : <Login/>}
            </Fragment>
        )
    }
}

let mapStateToProps = (store) => {
    return {loggedUser: store.user.loggedUser};
}
let mapDispatchToProps = {saveLoggedUser};
export default connect(mapStateToProps, mapDispatchToProps)(App);
