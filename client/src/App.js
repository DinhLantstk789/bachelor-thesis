import {Component, Fragment} from 'react';
import Login from "./login";
import Header from "./header";
import Footer from "./footer";
import Article from "./artile";

class App extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Article/>
            </div>
        )
    }
}

export default App;
