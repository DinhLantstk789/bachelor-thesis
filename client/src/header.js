import {Component, Fragment} from 'react';

class Header extends Component {
    state = {
        loggedUser: null
    }

    static getDerivedStateFromProps(newProps, prevState) {
        return {loggedUser: newProps.loggedUser};
    }

    render() {
        let dropdown = 'dropdown';
        let dropdownActive = 'dropdown active';
        return (
            <Fragment>
                <div className="header navbar navbar-default navbar-static-top">
                    <div className="container" style={{paddingLeft: 60, paddingRight: 60}}>
                        <div className="navbar-header">
                            <button className="navbar-toggle btn navbar-btn" data-toggle="collapse" data-target=".navbar-collapse">
                                <span className="icon-bar"/>
                                <span className="icon-bar"/>
                                <span className="icon-bar"/>
                            </button>
                            <a className="navbar-brand logo-v1" style={{marginTop: -5}} href="index.html">
                                <img src="images/logo.png" style={{width: 170}}/>
                            </a>
                        </div>

                        <div className="navbar-collapse collapse">
                            <ul className="nav navbar-nav">
                                <li className="dropdown">
                                    <a className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="0" data-close-others="false" href="#">
                                        Home
                                        <i className="fa fa-angle-down"/>
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a href="index.html">Home Default</a></li>
                                        <li><a href="page_home_fixed_header.html">Header Fixed</a></li>
                                        <li><a href="page_home2.html">Home with Top Bar</a></li>
                                    </ul>
                                </li>

                                <li className={dropdown}>
                                    <a className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="0" data-close-others="false" href="#">
                                        About
                                        <i className="fa fa-angle-down"/>
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a href="page_about.html">About Us</a></li>
                                        <li><a href="page_contacts.html">Contact</a></li>
                                    </ul>
                                </li>
                                <li className={dropdownActive}>
                                    <a className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="0" data-close-others="false" href="#">
                                        Browse
                                        <i className="fa fa-angle-down"/>
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a href="feature_typography.html">Browse by Year</a></li>
                                        <li className="active"><a href="feature_buttons.html">Browse by Subject</a></li>
                                        <li><a href="feature_forms.html">Browse by Division</a></li>
                                        <li><a href="feature_icons.html">Browse by Author</a></li>
                                    </ul>
                                </li>
                                <li className="dropdown">
                                    <a className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="0" data-close-others="false" href="#">
                                        <img className="pull-left" style={{width: 30, marginTop: -5}} src="images/avatar.png"/>
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a href="blog.html">{this.state.loggedUser.name}</a></li>
                                        <li><a href="blog.html">{this.state.loggedUser.email}</a></li>
                                        <li><a href="blog_item.html">Logout</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Header;
