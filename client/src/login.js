import {Component, Fragment} from 'react';
import Validator from "./validator";
import axios from "axios";

class Login extends Component {
    state = {
        emailCheckedResult: '',
        enteredEmail: '',
        enteredPassword: '',
        passwordCheckedResult: ''
    }

    onTypingEmail = (event) => {
        this.setState({enteredEmail: event.target.value});
        if (Validator.validateEmail(event.target.value)) {
            this.setState({emailCheckedResult: ''});
        } else {
            this.setState({emailCheckedResult: 'Invalidated email. Please try again.'});
        }
    }

    onTypingPassword = (event) => {
        this.setState({enteredPassword: event.target.value});
        let n = event.target.value.length;
        if (n < 8) {
            this.setState({passwordCheckedResult: 'invalidated password.please try again'});
        } else {
            this.setState({passwordCheckedResult: ''});
        }
    }

    onSubmit = (event) => {
        event.preventDefault();
        const credentials = {
            email:this.state.enteredEmail,
            password: this.state.enteredPassword
        }
        axios.post('http://localhost:1234/users/login', credentials).then(res => {
            let id = res.data.id;
            let userType = res.data.userType;
            if (userType === 'admin') {
                console.log('hello admin');
            } else if (userType === 'lecturer') {
                console.log('hello lecturer. Please add new articles.');
            }
        })
    }

    render() {
        let isDisabled = this.state.emailCheckedResult.length !== 0 || this.state.passwordCheckedResult.length !== 0;
        return (
            <Fragment>
                <div className="page-container">
                    <div className="container margin-bottom-40">
                        <div className="row">
                            <div className="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 login-signup-page">
                                <form onSubmit={this.onSubmit}>
                                    <h2>Login to your account</h2>
                                    <span>{this.state.emailCheckedResult}</span>
                                    <div className="input-group margin-bottom-20">
                                        <span className="input-group-addon"><i className="fa fa-envelope"/></span>
                                        <input type="text" className="form-control" placeholder="E-mail"
                                               onChange={this.onTypingEmail}/>
                                    </div>
                                    <span>{this.state.passwordCheckedResult}</span>
                                    <div className="input-group margin-bottom-20">
                                        <span className="input-group-addon"><i className="fa fa-lock"/></span>
                                        <input type="password" className="form-control" placeholder="Password"
                                               onChange={this.onTypingPassword}/>
                                        <a href="#" className="login-signup-forgot-link">Forgot?</a>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 col-sm-6">
                                            <div className="checkbox-list"><label className="checkbox">
                                                <div className="checker"><span><input type="checkbox"/></span></div>
                                                Remember me</label></div>
                                        </div>
                                        <div className="col-md-6 col-sm-6">
                                            <button type="submit" className="btn theme-btn pull-right"
                                                    disabled={isDisabled}>Login
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Login;
