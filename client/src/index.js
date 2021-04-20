import React, {Fragment, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from "./redux/reducers";
import {ClipLoader} from "react-spinners";
import {verifyCookie} from "./utils/apiCalls";
import {saveLoggedUser} from "./redux/actions";
import Home from "./home";
import Login from "./login";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"


function Loading() {
    return (
        <p style={{paddingTop: 300, textAlign: 'center'}}>
            <ClipLoader size={60} color={'#157ffb'} loading/>
        </p>
    )
}

function App() {
    const loggedUser = useSelector(store => store.user.loggedUser);
    const dispatch = useDispatch();

    useEffect(() => {
        verifyCookie((loggedUser) => {
            dispatch(saveLoggedUser(loggedUser));
        }, (message) => {
            dispatch(saveLoggedUser(null));
        })
    }, [])

    return (
        <Fragment>
            {loggedUser === undefined ? <Loading/> : loggedUser != null ? <Home/> : <Login/>}
        </Fragment>
    )
}


ReactDOM.render(
    <React.StrictMode>
        <Provider store={createStore(rootReducer)}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
