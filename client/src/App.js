import {Component, Fragment} from 'react';
import Login from "./login";
import Header from "./header";
import Footer from "./footer";

class App extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Login/>
                <Footer/>
            </div>
        )
    }
}

export default App;
