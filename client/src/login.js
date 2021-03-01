import {Component, Fragment} from 'react';
import Validator from "./validator";
import axios from "axios";
import {sha256} from 'js-sha256';
import {
    InputGroup,
    InputGroupText,
    InputGroupAddon,
    FormInput, Card,
    CardHeader,
    CardTitle, FormCheckbox,
    CardImg,
    CardBody,
    CardFooter,
    Button, Container, Row, Col
} from "shards-react";
import Footer from "./footer";

class Login extends Component {
    state = {
        emailCheckedResult: '',
        enteredEmail: '',
        enteredPassword: '',
        passwordCheckedResult: '',
        errorResponse: '',
        enteredCheckbox: true
    }

    onTypingEmail = (event) => {
        this.setState({errorResponse: ''});
        this.setState({enteredEmail: event.target.value});
        let msg = Validator.validateEmail(event.target.value) ? '' : 'Invalid email. Please try again.';
        this.setState({emailCheckedResult: msg});
    }
    onTypingPassword = (event) => {
        this.setState({errorResponse: ''});
        this.setState({enteredPassword: event.target.value});
        let n = event.target.value.length;
        let msg = n >= 8 ? '' : 'Invalid password. Please try again';
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
        axios.post('http://localhost:1234/users/login', credentials).then(res => {
            let status = res.data.status;
            if (status === 0) {
                this.props.onLoginSuccess(res.data.user);
            } else {
                this.setState({errorResponse: res.data.message});
            }
        })
    }

    render() {
        let isDisabled = this.state.emailCheckedResult.length !== 0 || this.state.passwordCheckedResult.length !== 0;
        return (
            <Fragment>
                <Row>
                    <Col xs={4} md={4} sm={4}/>
                    <Col xs={4} md={4} sm={4} style={{paddingLeft: 60, paddingRight: 60}}>
                        <form>
                            <Card style={{marginTop: 100}}>
                                <CardBody style={{paddingLeft: 40, paddingRight: 40}}>
                                    <div style={{textAlign: 'center', marginTop: 20, marginBottom: 30}}>
                                        <img src="images/logo.png" style={{width: 220}}/>
                                    </div>
                                    <h4 style={{textAlign: "center", marginBottom: 20, marginTop: 20}}>Login to your
                                        account</h4>
                                    <p style={{
                                        textAlign: 'center',
                                        marginBottom: 10
                                    }}>{this.state.emailCheckedResult}</p>
                                    <InputGroup className="mb-2">
                                        <InputGroupAddon type="prepend">
                                            <InputGroupText><i className="fa fa-envelope"
                                                               style={{width: 20}}/></InputGroupText>
                                        </InputGroupAddon>
                                        <FormInput placeholder="Email" type="email" onChange={this.onTypingEmail}/>
                                    </InputGroup>
                                    <p style={{
                                        textAlign: 'center',
                                        marginBottom: 10
                                    }}>{this.state.passwordCheckedResult}</p>
                                    <InputGroup className="mb-2">
                                        <InputGroupAddon type="prepend">
                                            <InputGroupText><i className="fa fa-lock"
                                                               style={{width: 20}}/>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <FormInput placeholder="Password" type="password"
                                                   onChange={this.onTypingPassword}/>
                                    </InputGroup>
                                    <p style={{
                                        textAlign: 'center',
                                        marginBottom: 10
                                    }}>{this.state.errorResponse}</p>
                                    <Row style={{marginTop: 15}}>
                                        <Col xs={6} md={6} sm={6} className="pull-left" style={{marginTop: 10}}>
                                            <FormCheckbox
                                                checked={this.state.enteredCheckbox}
                                                onChange={this.onRememberMe}>
                                                Remember me
                                            </FormCheckbox>
                                        </Col>
                                        <Col xs={6} md={6} sm={6}>
                                            <Button type="submit" className="pull-right" onClick={this.onSubmit}
                                                    disabled={isDisabled} pill
                                                    theme="primary">
                                                Login &rarr;
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardBody>
                                <Footer/>
                            </Card>
                        </form>
                    </Col>
                    <Col xs={4} md={4} sm={4}/>
                </Row>
            </Fragment>

        )
    }
}

export default Login;
