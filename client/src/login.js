import {Component, Fragment} from 'react';
import Header from "./header";

class Login extends Component {
    render() {
        return (
            <div>
                <div className="page-container">
                    <div className="container margin-bottom-40">
                        <div className="row">
                            <div className="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 login-signup-page">
                                <form>
                                    <h2>Login to your account</h2>
                                    <div className="input-group margin-bottom-20">
                                        <span className="input-group-addon"><i className="fa fa-envelope"/></span>
                                        <input type="text" className="form-control" placeholder="E-mail"/>
                                    </div>
                                    <div className="input-group margin-bottom-20">
                                        <span className="input-group-addon"><i className="fa fa-lock"/></span>
                                        <input type="password" className="form-control" placeholder="Password"/>
                                        <a href="#" className="login-signup-forgot-link">Forgot?</a>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 col-sm-6">
                                            <div className="checkbox-list"><label className="checkbox">
                                                <div className="checker"><span><input type="checkbox"/></span></div>
                                                Remember me</label></div>
                                        </div>
                                        <div className="col-md-6 col-sm-6">
                                            <button type="submit" className="btn theme-btn pull-right">Login</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;
