import React from "react";
import '../../assets/css/header.css';
import { Link } from 'react-router-dom';
function Header() {
    return (
        <header>
            <nav>
                <div>
                    <a href="/"><img src={require('../../assets/images/yogo-o.png')} alt="YOGO'O"></img></a>
                </div>
                <div>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/">Documentation</Link></li>
                        <li><Link to="/">Testing</Link></li>
                        <li><Link to="/">Products</Link></li>
                        <li><Link to="/">FAQs</Link></li>
                        <li></li>
                        {/* <li>Account</li> */}
                    </ul>
                </div>
                <ul>
                    <li><Link to="transactions">Transactions</Link></li>
                    <li><Link to="create-user">Create user</Link></li>
                    <button type="submit">Log In</button>
                </ul>
            </nav>
        </header>
    )
};

export default Header;