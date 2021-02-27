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
        let msg = Validator.validateEmail(event.target.value) ? '' : 'Invalid email. Please try again.';
        this.setState({emailCheckedResult: msg});
    }
    onTypingPassword = (event) => {
        this.setState({enteredPassword: event.target.value});
        let n = event.target.value.length;
        let msg = n >= 8 ? '' : 'Invalid password. Please try again';
        this.setState({passwordCheckedResult: msg});
    }

    onSubmit = (event) => {
        event.preventDefault();
        const credentials = {
            email: this.state.enteredEmail,
            password: this.state.enteredPassword
        }
        axios.post('http://localhost:1234/users/login', credentials).then(res => {
            let status = res.data.status;
            if (status === 0) {
                this.props.onLoginSuccess(res.data.user);
            } else {
                alert(res.data.message);
            }
        })
    }

    render() {
        let isDisabled = this.state.emailCheckedResult.length !== 0 || this.state.passwordCheckedResult.length !== 0;
        return (
            <Fragment>
                <div className="page-container" style={{marginTop: 70}}>
                    <div className="container" style={{marginBottom: 40, textAlign: 'center'}}>
                        <div className="row" style={{paddingLeft: 170, paddingRight: 170}}>
                            <div className="col-md-4 col-md-offset-4 col-sm-4 col-sm-offset-4 login-signup-page">
                                <form onSubmit={this.onSubmit}>
                                    <div className='row' style={{textAlign: "center", marginBottom: 25, marginTop: 25}}>
                                        <img src="images/logo.png" style={{width: 200}}/>
                                    </div>
                                    <h2 style={{textAlign: "center", marginBottom: 30}}>Login to your account</h2>
                                    <span>{this.state.emailCheckedResult}</span>
                                    <div className="input-group" style={{marginTop: 10, marginBottom: 20}}>
                                        <span className="input-group-addon"><i className="fa fa-envelope"/></span>
                                        <input type="text" className="form-control" placeholder="E-mail" onChange={this.onTypingEmail}/>
                                    </div>
                                    <span>{this.state.passwordCheckedResult}</span>
                                    <div className="input-group" style={{marginTop: 10, marginBottom: 20}}>
                                        <span className="input-group-addon"><i className="fa fa-lock"/></span>
                                        <input type="password" className="form-control" placeholder="Password" onChange={this.onTypingPassword}/>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-7 col-sm-7">
                                            <div className="checkbox-list pull-left">
                                                <label className="checkbox">
                                                    <input type="checkbox"/>
                                                    Remember me</label>
                                            </div>
                                        </div>
                                        <div className="col-md-5 col-sm-5">
                                            <button type="submit" className="btn theme-btn pull-right" disabled={isDisabled}>Login
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
