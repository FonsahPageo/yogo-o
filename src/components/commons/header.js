import React, { useEffect, useState } from "react";
import '../../assets/css/header.css';
import { Link } from 'react-router-dom';
function Header() {
    useEffect(() => {
        document.title = "YOGO'O";
    }, []);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    return (
        <header>
            <nav>
                <div>
                    <a href="/"><img src={require('../../assets/images/yogo-o.png')} alt="YOGO'O"></img></a>
                </div>
                <div>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/">About YOGO'O</Link></li>
                        <li><Link to="/">Test API</Link></li>
                        <li><Link to="/">Products</Link></li>
                        <li><Link to="/">FAQs</Link></li>
                    </ul>
                </div>
                <ul>
                    <li className="dropdown" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
                        <span>Manage users</span>
                        {isDropdownOpen && (
                            <ul className="dropdown-menu">
                                <li><Link to="create-user">Create User</Link></li>
                                <li><Link to="update-user">Update User</Link></li>
                            </ul>
                        )}
                    </li>
                    <li><Link to="view-transactions">Transactions</Link></li>
                    <button type="submit">Log In</button>
                </ul>
            </nav>
        </header>
    )
};

export default Header;