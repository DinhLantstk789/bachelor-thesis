import {Component, Fragment} from 'react';
import Login from "./login";
import Header from "./header";
import Footer from "./footer";
import Article from "./artile";

class App extends Component {
    state = {
        email: null
    }
    onLoginSuccess = (email)=>{
        this.setState({email: email});
    }

    render() {
        let mainComponent = this.state.email != null ? <Article/> : <Login onLoginSuccess = {this.onLoginSuccess}/>;
        return (
            <div>
                <Header/>
                {mainComponent}
                <Footer/>
            </div>
        )
    }
}

export default App;
