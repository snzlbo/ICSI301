import React from 'react';
import './Header.css';

class Header extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <header>
                <img className = "logo" src="/components/header/images/logo.svg"/>
                <nav>
                    <ul className = "nav_links">
                        <li><a href= "../../getting-started.html">Getting started</a></li>
                        <li><a href="../../p2.html">States</a></li>
                        <li><a href="../../p4.html">Switch</a></li>
                        <li><a href="../../p5.html">SPA</a></li>
                    </ul>
                </nav>
            </header>
        );
    }
}
export default Header;
