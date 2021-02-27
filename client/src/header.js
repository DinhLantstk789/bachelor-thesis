import {Component, Fragment} from 'react';

class Header extends Component {
    render() {
        return (
            <Fragment>
                <div className="header navbar navbar-default navbar-static-top">
                    <div className="container" style={{paddingLeft: 60, paddingRight: 60}}>
                        <div className="navbar-header">
                            <button className="navbar-toggle btn navbar-btn" data-toggle="collapse" data-target=".navbar-collapse">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
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
                                        <i className="fa fa-angle-down"></i>
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a href="index.html">Home Default</a></li>
                                        <li><a href="page_home_fixed_header.html">Header Fixed</a></li>
                                        <li><a href="page_home2.html">Home with Top Bar</a></li>
                                    </ul>
                                </li>

                                <li className="dropdown">
                                    <a className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="0" data-close-others="false" href="#">
                                        Pages
                                        <i className="fa fa-angle-down"></i>
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a href="page_about.html">About Us</a></li>
                                        <li><a href="page_services.html">Services</a></li>
                                        <li><a href="page_prices.html">Prices</a></li>
                                        <li><a href="page_contacts.html">Contact</a></li>
                                    </ul>
                                </li>
                                <li className="dropdown active">
                                    <a className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="0" data-close-others="false" href="#">
                                        Features
                                        <i className="fa fa-angle-down"></i>
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a href="feature_typography.html">Typography</a></li>
                                        <li className="active"><a href="feature_buttons.html">Buttons</a></li>
                                        <li><a href="feature_forms.html">Forms</a></li>
                                        <li><a href="feature_icons.html">Icons</a></li>
                                    </ul>
                                </li>
                                <li className="dropdown">
                                    <a className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="0" data-close-others="false" href="#">
                                        Portfolio
                                        <i className="fa fa-angle-down"></i>
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a href="portfolio_4.html">Portfolio 4</a></li>
                                        <li><a href="portfolio_3.html">Portfolio 3</a></li>
                                        <li><a href="portfolio_2.html">Portfolio 2</a></li>
                                        <li><a href="portfolio_item.html">Portfolio Item</a></li>
                                    </ul>
                                </li>
                                <li className="dropdown">
                                    <a className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="0" data-close-others="false" href="#">
                                        <img className="pull-left" style={{width: 30, marginTop: -5}} src="images/avatar.png"/>
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a href="blog.html">Account</a></li>
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
