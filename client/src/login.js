import {Component, Fragment} from 'react';
import Validator from "./utils/validator";
import {Button, Card, CardBody, Col, FormCheckbox, FormInput, InputGroup, InputGroupAddon, InputGroupText, Row} from "shards-react";
import Footer from "./footer";
import {saveLoggedUser, savePublicationFilterDivisions} from "./redux/actions";
import {connect} from "react-redux";
import {login} from "./utils/apiCalls";
import {sha256} from "js-sha256";
import {ClipLoader} from "react-spinners";


class Login extends Component {
    state = {
        emailCheckedResult: '',
        enteredEmail: '',
        enteredPassword: '',
        passwordCheckedResult: '',
        errorResponse: '',
        enteredCheckbox: true,
        isLoggingIn: false,
    }
    onTypingEmail = (event) => {
        this.setState({errorResponse: ''});
        this.setState({enteredEmail: event.target.value});
        let msg = Validator.validateEmail(event.target.value) ? '' : 'Email không hợp lệ, vui lòng thử lại';
        this.setState({emailCheckedResult: msg});
    }
    onTypingPassword = (event) => {
        this.setState({errorResponse: ''});
        this.setState({enteredPassword: event.target.value});
        let n = event.target.value.length;
        let msg = n >= 8 ? '' : 'Mật khẩu không hợp lệ, vui lòng thử lại';
        this.setState({passwordCheckedResult: msg});
    }

    onRememberMe = () => {
        this.setState({enteredCheckbox: !this.state.enteredCheckbox});
    }

    onSubmit = (event) => {
        event.preventDefault();
        const credentials = {
            email: this.state.enteredEmail,
            password: sha256(this.state.enteredPassword)
        }
        this.setState({isLoggingIn: true});
        login(credentials, (user) => {
            this.props.saveLoggedUser(user);
            this.setState({isLoggingIn: false});
        }, (message) => {
            this.setState({isLoggingIn: false});
            this.setState({errorResponse: message});
        })
    }

    render() {
        let isDisabled = this.state.emailCheckedResult.length !== 0 || this.state.passwordCheckedResult.length !== 0;
        return (
            <Fragment>
                <Row>
                    <Col xs={2} md={4} sm={2}/>
                    <Col xs={8} md={4} sm={8} style={{paddingLeft: 80, paddingRight: 80}}>
                        <form>
                            <Card style={{marginTop: 100}}>
                                <CardBody style={{paddingLeft: 40, paddingRight: 40}}>
                                    <div style={{textAlign: 'center', marginTop: 20, marginBottom: 30}}>
                                        <img src="images/logo.png" style={{width: 220}}/>
                                    </div>
                                    <h4 style={{textAlign: "center", marginBottom: 30, marginTop: 30}}>Đăng nhập vào hệ thống</h4>
                                    <p style={{textAlign: 'center', marginBottom: 10, color: "red"}}>{this.state.emailCheckedResult}</p>
                                    <InputGroup className="mb-2">
                                        <InputGroupAddon type="prepend">
                                            <InputGroupText><i className="fa fa-envelope" style={{width: 20}}/></InputGroupText>
                                        </InputGroupAddon>
                                        <FormInput placeholder="Email" type="email" onChange={this.onTypingEmail}/>
                                    </InputGroup>
                                    <p style={{textAlign: 'center', marginBottom: 10, marginTop: 5, color: "red"}}>{this.state.passwordCheckedResult}</p>
                                    <InputGroup className="mb-2">
                                        <InputGroupAddon type="prepend">
                                            <InputGroupText><i className="fa fa-lock" style={{width: 20}}/>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <FormInput placeholder="Mật khẩu" type="password" onChange={this.onTypingPassword}/>
                                    </InputGroup>
                                    <p style={{textAlign: 'center', marginBottom: 10, marginTop: 5}}>{this.state.errorResponse}</p>
                                    <Row style={{marginTop: 20}}>
                                        <Col xs={6} md={6} sm={6} className="float-left" style={{marginTop: 10}}>
                                            <FormCheckbox
                                                checked={this.state.enteredCheckbox}
                                                onChange={this.onRememberMe}>
                                                Lưu phiên đăng nhập
                                            </FormCheckbox>
                                        </Col>
                                        <Col xs={6} md={6} sm={6}>
                                            <Button type="submit" className="float-right" onClick={this.onSubmit}
                                                    disabled={isDisabled} pill
                                                    theme={this.state.isLoggingIn ? "success" : "primary"}>
                                                {this.state.isLoggingIn ? <span>Chờ một chút &nbsp;<ClipLoader size={12} color={'#ffffff'} loading/></span> : <span>Đăng nhập &nbsp;<i className="fa fa-arrow-right"/></span>}
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardBody>
                                <Footer institute={'Đại học Công Nghệ, ĐHQGHN'}/>
                            </Card>
                        </form>
                    </Col>
                    <Col xs={2} md={4} sm={2}/>
                </Row>
            </Fragment>

        )
    }
}

let mapStateToProps = null;
let mapDispatchToProps = {saveLoggedUser, savePublicationFilterDivisions};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
