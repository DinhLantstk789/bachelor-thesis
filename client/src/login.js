import './App.css';
import {Component, Fragment} from 'react';
import Header from "./header";
import Footer from "./footer";

class Login extends Component {
    render(){
        return (
            <div>
                <Header/>
                this is login form
                <Footer/>
            </div>
        )
    }
}

export default Login;
